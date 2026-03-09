import prisma from './prisma';
import * as crypto from 'crypto';
import { sendConfirmationEmail } from './email';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: string;
}

export interface ResetToken {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
}

export interface Waitlist {
  id: string;
  userId: string;
  productName: string;
  description: string;
  slug: string;
  buttonText: string;
  bgColor: string;
  maxSubscribers: number;
  createdAt: string;
}

export interface Subscriber {
  id: string;
  waitlistId: string;
  email: string;
  createdAt: string;
}

// Helper to ensure tables exist using raw SQL through Prisma
// This is a fallback for when migrations haven't been run
async function ensureTables() {
  try {
    // Check if users table exists
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL
      );
    `;
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS reset_tokens (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        token TEXT UNIQUE NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL
      );
    `;
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS waitlists (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        product_name TEXT NOT NULL,
        description TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        button_text TEXT NOT NULL,
        bg_color TEXT NOT NULL,
        max_subscribers INTEGER DEFAULT 100,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS subscribers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        waitlist_id UUID REFERENCES waitlists(id) ON DELETE CASCADE,
        email TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(waitlist_id, email)
      );
    `;
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS waitlist_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Database tables verified/created');
  } catch (error) {
    console.error('Error ensuring tables exist:', error);
  }
}

// Run ensureTables on module load (or we could run it before the first query)
let tablesEnsured = false;
async function initDb() {
  if (!tablesEnsured) {
    await ensureTables();
    tablesEnsured = true;
  }
}

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derivedKey}`;
}

export async function addWaitlistEntry(email: string) {
  await initDb();
  try {
    const entry = await prisma.waitlistEntry.create({
      data: { email },
    });
    return { success: true, entry };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { success: false, error: 'already_joined' };
    }
    throw error;
  }
}

export async function getWaitlistEntries() {
  await initDb();
  return await prisma.waitlistEntry.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function deleteWaitlistEntry(id: string) {
  await initDb();
  await prisma.waitlistEntry.delete({
    where: { id },
  });
}

export async function createUser(email: string, password: string): Promise<User> {
  await initDb();
  const passwordHash = hashPassword(password);
  
  try {
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });
    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
    };
  } catch (error: any) {
    if (error.code === 'P2002') { // Prisma unique constraint violation
      throw new Error('User already exists');
    }
    throw error;
  }
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
  await initDb();
  const user = await prisma.user.findUnique({
    where: { email },
  });
  
  if (!user) return null;
  
  const [salt, key] = user.passwordHash.split(':');
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  if (key === derivedKey) {
    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
    };
  }
  return null;
}

export async function getUserById(id: string): Promise<User | null> {
  await initDb();
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) return null;
  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
  };
}

export async function createSession(userId: string): Promise<Session> {
  await initDb();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  
  const session = await prisma.session.create({
    data: {
      userId,
      expiresAt,
    },
  });
  return {
    ...session,
    expiresAt: session.expiresAt.toISOString(),
  };
}

export async function getSession(id: string): Promise<Session | null> {
  await initDb();
  const session = await prisma.session.findUnique({
    where: { id },
  });
  if (!session) return null;
  return {
    ...session,
    expiresAt: session.expiresAt.toISOString(),
  };
}

export async function createResetToken(email: string): Promise<string | null> {
  await initDb();
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) return null;

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60);
  
  await prisma.resetToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt,
    },
  });
  return token;
}

export async function resetPassword(token: string, newPassword: string): Promise<boolean> {
  await initDb();
  const resetToken = await prisma.resetToken.findUnique({
    where: { token },
  });
  
  if (!resetToken) return false;
  if (resetToken.expiresAt < new Date()) return false;
  
  const passwordHash = hashPassword(newPassword);
  
  await prisma.user.update({
    where: { id: resetToken.userId },
    data: { passwordHash },
  });
  
  await prisma.resetToken.delete({
    where: { token },
  });
  return true;
}

export async function createWaitlist(userId: string, data: Omit<Waitlist, 'id' | 'userId' | 'slug' | 'maxSubscribers' | 'createdAt'>) {
  await initDb();
  const slug = data.productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + crypto.randomBytes(2).toString('hex');
  
  const waitlist = await prisma.waitlist.create({
    data: {
      userId,
      productName: data.productName,
      description: data.description,
      slug,
      buttonText: data.buttonText,
      bgColor: data.bgColor,
    },
  });
  
  return {
    ...waitlist,
    createdAt: waitlist.createdAt.toISOString(),
  };
}

export async function getUserWaitlists(userId: string) {
  await initDb();
  const waitlists = await prisma.waitlist.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  
  return waitlists.map(w => ({
    ...w,
    createdAt: w.createdAt.toISOString(),
  }));
}

export async function getWaitlistById(id: string) {
  await initDb();
  const waitlist = await prisma.waitlist.findUnique({
    where: { id },
  });
  if (!waitlist) return null;
  return {
    ...waitlist,
    createdAt: waitlist.createdAt.toISOString(),
  };
}

export async function getWaitlistBySlug(slug: string) {
  await initDb();
  const waitlist = await prisma.waitlist.findUnique({
    where: { slug },
  });
  if (!waitlist) return null;
  return {
    ...waitlist,
    createdAt: waitlist.createdAt.toISOString(),
  };
}

export async function addSubscriber(waitlistId: string, email: string) {
  await initDb();
  const waitlist = await getWaitlistById(waitlistId);
  if (!waitlist) throw new Error('Waitlist not found');
  
  // Check for duplicate
  const existing = await prisma.subscriber.findUnique({
    where: {
      waitlistId_email: {
        waitlistId,
        email,
      },
    },
  });
  if (existing) {
    return { status: 'duplicate' };
  }

  // Check limit
  const currentCount = await prisma.subscriber.count({
    where: { waitlistId },
  });
  if (currentCount >= waitlist.maxSubscribers) {
    return { status: 'full' };
  }

  await prisma.subscriber.create({
    data: {
      waitlistId,
      email,
    },
  });

  // Send confirmation email asynchronously
  sendConfirmationEmail(email, waitlist.productName).catch(console.error);

  return { status: 'success' };
}

export async function deleteWaitlist(id: string, userId: string) {
  await initDb();
  const waitlist = await prisma.waitlist.findUnique({ where: { id } });
  if (!waitlist || waitlist.userId !== userId) {
    throw new Error('Unauthorized or not found');
  }
  await prisma.waitlist.delete({ where: { id } });
}

export async function deleteSubscriber(id: string, waitlistId: string, userId: string) {
  await initDb();
  const waitlist = await prisma.waitlist.findUnique({ where: { id: waitlistId } });
  if (!waitlist || waitlist.userId !== userId) {
    throw new Error('Unauthorized or not found');
  }
  await prisma.subscriber.delete({ where: { id } });
}

export async function getSubscribers(waitlistId: string) {
  await initDb();
  const subscribers = await prisma.subscriber.findMany({
    where: { waitlistId },
    orderBy: { createdAt: 'desc' },
  });
  
  return subscribers.map(s => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
  }));
}
