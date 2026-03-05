import { sql } from '@vercel/postgres';
import crypto from 'crypto';

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

// Helper to ensure tables exist
async function ensureTables() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS sessions (
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id),
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS reset_tokens (
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id),
        token TEXT UNIQUE NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS waitlists (
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id),
        product_name TEXT NOT NULL,
        description TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        button_text TEXT NOT NULL,
        bg_color TEXT NOT NULL,
        max_subscribers INTEGER DEFAULT 100,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS subscribers (
        id UUID PRIMARY KEY,
        waitlist_id UUID REFERENCES waitlists(id),
        email TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(waitlist_id, email)
      );
    `;
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derivedKey}`;
}

export async function createUser(email: string, password: string): Promise<User> {
  await ensureTables();
  const id = crypto.randomUUID();
  const passwordHash = hashPassword(password);
  
  try {
    const { rows } = await sql`
      INSERT INTO users (id, email, password_hash)
      VALUES (${id}, ${email}, ${passwordHash})
      RETURNING id, email, password_hash as "passwordHash", created_at as "createdAt"
    `;
    return rows[0] as User;
  } catch (error: any) {
    if (error.code === '23505') { // Unique violation
      throw new Error('User already exists');
    }
    throw error;
  }
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
  await ensureTables();
  const { rows } = await sql`
    SELECT id, email, password_hash as "passwordHash", created_at as "createdAt"
    FROM users
    WHERE email = ${email}
  `;
  const user = rows[0] as User;
  if (!user) return null;
  
  const [salt, key] = user.passwordHash.split(':');
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  if (key === derivedKey) return user;
  return null;
}

export async function getUserById(id: string): Promise<User | null> {
  await ensureTables();
  const { rows } = await sql`
    SELECT id, email, password_hash as "passwordHash", created_at as "createdAt"
    FROM users
    WHERE id = ${id}
  `;
  return (rows[0] as User) || null;
}

export async function createSession(userId: string): Promise<Session> {
  await ensureTables();
  const id = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  
  const { rows } = await sql`
    INSERT INTO sessions (id, user_id, expires_at)
    VALUES (${id}, ${userId}, ${expiresAt})
    RETURNING id, user_id as "userId", expires_at as "expiresAt"
  `;
  return rows[0] as Session;
}

export async function getSession(id: string): Promise<Session | null> {
  await ensureTables();
  const { rows } = await sql`
    SELECT id, user_id as "userId", expires_at as "expiresAt"
    FROM sessions
    WHERE id = ${id}
  `;
  return (rows[0] as Session) || null;
}

export async function createResetToken(email: string): Promise<string | null> {
  await ensureTables();
  const { rows: userRows } = await sql`SELECT id FROM users WHERE email = ${email}`;
  const user = userRows[0];
  if (!user) return null;

  const id = crypto.randomUUID();
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60).toISOString();
  
  await sql`
    INSERT INTO reset_tokens (id, user_id, token, expires_at)
    VALUES (${id}, ${user.id}, ${token}, ${expiresAt})
  `;
  return token;
}

export async function resetPassword(token: string, newPassword: string): Promise<boolean> {
  await ensureTables();
  const { rows: tokenRows } = await sql`
    SELECT user_id as "userId", expires_at as "expiresAt"
    FROM reset_tokens
    WHERE token = ${token}
  `;
  const resetToken = tokenRows[0];
  if (!resetToken) return false;
  
  if (new Date(resetToken.expiresAt) < new Date()) return false;
  
  const passwordHash = hashPassword(newPassword);
  
  await sql`
    UPDATE users
    SET password_hash = ${passwordHash}
    WHERE id = ${resetToken.userId}
  `;
  
  await sql`DELETE FROM reset_tokens WHERE token = ${token}`;
  return true;
}

export async function createWaitlist(userId: string, data: Omit<Waitlist, 'id' | 'userId' | 'slug' | 'maxSubscribers' | 'createdAt'>) {
  await ensureTables();
  const id = crypto.randomUUID();
  const slug = data.productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + crypto.randomBytes(2).toString('hex');
  
  const { rows } = await sql`
    INSERT INTO waitlists (id, user_id, product_name, description, slug, button_text, bg_color)
    VALUES (${id}, ${userId}, ${data.productName}, ${data.description}, ${slug}, ${data.buttonText}, ${data.bgColor})
    RETURNING id, user_id as "userId", product_name as "productName", description, slug, button_text as "buttonText", bg_color as "bgColor", max_subscribers as "maxSubscribers", created_at as "createdAt"
  `;
  return rows[0] as Waitlist;
}

export async function getUserWaitlists(userId: string) {
  await ensureTables();
  const { rows } = await sql`
    SELECT id, user_id as "userId", product_name as "productName", description, slug, button_text as "buttonText", bg_color as "bgColor", max_subscribers as "maxSubscribers", created_at as "createdAt"
    FROM waitlists
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;
  return rows as Waitlist[];
}

export async function getWaitlistById(id: string) {
  await ensureTables();
  const { rows } = await sql`
    SELECT id, user_id as "userId", product_name as "productName", description, slug, button_text as "buttonText", bg_color as "bgColor", max_subscribers as "maxSubscribers", created_at as "createdAt"
    FROM waitlists
    WHERE id = ${id}
  `;
  return (rows[0] as Waitlist) || null;
}

export async function getWaitlistBySlug(slug: string) {
  await ensureTables();
  const { rows } = await sql`
    SELECT id, user_id as "userId", product_name as "productName", description, slug, button_text as "buttonText", bg_color as "bgColor", max_subscribers as "maxSubscribers", created_at as "createdAt"
    FROM waitlists
    WHERE slug = ${slug}
  `;
  return (rows[0] as Waitlist) || null;
}

export async function addSubscriber(waitlistId: string, email: string) {
  await ensureTables();
  const waitlist = await getWaitlistById(waitlistId);
  if (!waitlist) throw new Error('Waitlist not found');
  
  // Check for duplicate
  const { rows: existing } = await sql`
    SELECT id FROM subscribers WHERE waitlist_id = ${waitlistId} AND email = ${email}
  `;
  if (existing.length > 0) {
    return { status: 'duplicate' };
  }

  // Check limit
  const { rows: countRows } = await sql`
    SELECT COUNT(*) as count FROM subscribers WHERE waitlist_id = ${waitlistId}
  `;
  const currentCount = parseInt(countRows[0].count);
  if (currentCount >= waitlist.maxSubscribers) {
    return { status: 'full' };
  }

  const id = crypto.randomUUID();
  await sql`
    INSERT INTO subscribers (id, waitlist_id, email)
    VALUES (${id}, ${waitlistId}, ${email})
  `;
  return { status: 'success' };
}

export async function getSubscribers(waitlistId: string) {
  await ensureTables();
  const { rows } = await sql`
    SELECT id, waitlist_id as "waitlistId", email, created_at as "createdAt"
    FROM subscribers
    WHERE waitlist_id = ${waitlistId}
    ORDER BY created_at DESC
  `;
  return rows as Subscriber[];
}
