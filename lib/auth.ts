import { cookies } from 'next/headers';
import { createSession, getSession, getUserById } from './db';

export async function setSession(userId: string) {
  const session = await createSession(userId);
  const cookieStore = await cookies();
  cookieStore.set('session_id', session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function getAuthUser() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value;
  if (!sessionId) return null;
  
  const session = await getSession(sessionId);
  if (!session || new Date(session.expiresAt) < new Date()) return null;
  
  return await getUserById(session.userId);
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session_id');
}
