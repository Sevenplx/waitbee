import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { getUserById } from './db';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-for-development-only'
);

export async function setSession(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set('session_id', token, {
    httpOnly: true,
    secure: true, // Required for SameSite=None
    sameSite: 'none', // Required for cross-origin iframe
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_id')?.value;
  if (!token) return null;
  
  try {
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId as string;
    if (!userId) return null;
    
    return await getUserById(userId);
  } catch (e) {
    console.error('JWT verification failed:', e);
    return null;
  }
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session_id');
}
