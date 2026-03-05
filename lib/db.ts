import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const DB_FILE = path.join(process.cwd(), 'data.json');

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

interface DB {
  users: User[];
  sessions: Session[];
  resetTokens: ResetToken[];
  waitlists: Waitlist[];
  subscribers: Subscriber[];
}

async function readDB(): Promise<DB> {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return {
      users: parsed.users || [],
      sessions: parsed.sessions || [],
      resetTokens: parsed.resetTokens || [],
      waitlists: parsed.waitlists || [],
      subscribers: parsed.subscribers || []
    };
  } catch (error) {
    return { users: [], sessions: [], resetTokens: [], waitlists: [], subscribers: [] };
  }
}

async function writeDB(db: DB) {
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));
}

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derivedKey}`;
}

export async function createUser(email: string, password: string): Promise<User> {
  const db = await readDB();
  if (db.users.some(u => u.email === email)) {
    throw new Error('User already exists');
  }
  const user: User = {
    id: crypto.randomUUID(),
    email,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  db.users.push(user);
  await writeDB(db);
  return user;
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
  const db = await readDB();
  const user = db.users.find(u => u.email === email);
  if (!user) return null;
  
  const [salt, key] = user.passwordHash.split(':');
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  if (key === derivedKey) return user;
  return null;
}

export async function getUserById(id: string): Promise<User | null> {
  const db = await readDB();
  return db.users.find(u => u.id === id) || null;
}

export async function createSession(userId: string): Promise<Session> {
  const db = await readDB();
  const session: Session = {
    id: crypto.randomUUID(),
    userId,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week
  };
  db.sessions.push(session);
  await writeDB(db);
  return session;
}

export async function getSession(id: string): Promise<Session | null> {
  const db = await readDB();
  return db.sessions.find(s => s.id === id) || null;
}

export async function createResetToken(email: string): Promise<string | null> {
  const db = await readDB();
  const user = db.users.find(u => u.email === email);
  if (!user) return null;

  const token = crypto.randomBytes(32).toString('hex');
  const resetToken: ResetToken = {
    id: crypto.randomUUID(),
    userId: user.id,
    token,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(), // 1 hour
  };
  
  db.resetTokens.push(resetToken);
  await writeDB(db);
  return token;
}

export async function resetPassword(token: string, newPassword: string): Promise<boolean> {
  const db = await readDB();
  const tokenIndex = db.resetTokens.findIndex(t => t.token === token);
  if (tokenIndex === -1) return false;
  
  const resetToken = db.resetTokens[tokenIndex];
  if (new Date(resetToken.expiresAt) < new Date()) return false;
  
  const userIndex = db.users.findIndex(u => u.id === resetToken.userId);
  if (userIndex === -1) return false;
  
  db.users[userIndex].passwordHash = hashPassword(newPassword);
  
  // Remove used token
  db.resetTokens.splice(tokenIndex, 1);
  await writeDB(db);
  return true;
}

export async function createWaitlist(userId: string, data: Omit<Waitlist, 'id' | 'userId' | 'slug' | 'maxSubscribers' | 'createdAt'>) {
  const db = await readDB();
  const id = crypto.randomUUID();
  const slug = data.productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + crypto.randomBytes(2).toString('hex');
  
  const newWaitlist: Waitlist = {
    ...data,
    id,
    userId,
    slug,
    maxSubscribers: 100, // Free tier limit
    createdAt: new Date().toISOString(),
  };
  
  db.waitlists.push(newWaitlist);
  await writeDB(db);
  return newWaitlist;
}

export async function getUserWaitlists(userId: string) {
  const db = await readDB();
  return db.waitlists.filter(w => w.userId === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getWaitlistById(id: string) {
  const db = await readDB();
  return db.waitlists.find(w => w.id === id);
}

export async function getWaitlistBySlug(slug: string) {
  const db = await readDB();
  return db.waitlists.find(w => w.slug === slug);
}

export async function addSubscriber(waitlistId: string, email: string) {
  const db = await readDB();
  const waitlist = db.waitlists.find(w => w.id === waitlistId);
  if (!waitlist) throw new Error('Waitlist not found');
  
  if (db.subscribers.some(s => s.waitlistId === waitlistId && s.email === email)) {
    return { status: 'duplicate' };
  }

  const currentCount = db.subscribers.filter(s => s.waitlistId === waitlistId).length;
  if (currentCount >= waitlist.maxSubscribers) {
    return { status: 'full' };
  }

  const newSubscriber: Subscriber = {
    id: crypto.randomUUID(),
    waitlistId,
    email,
    createdAt: new Date().toISOString(),
  };
  
  db.subscribers.push(newSubscriber);
  await writeDB(db);
  return { status: 'success' };
}

export async function getSubscribers(waitlistId: string) {
  const db = await readDB();
  return db.subscribers.filter(s => s.waitlistId === waitlistId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
