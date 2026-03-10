import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-for-development-only'
);

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'none' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 1 week
};

export const USER_SESSION_COOKIE = 'user_session';
export const ADMIN_SESSION_COOKIE = 'admin_session';

// ── Token creation ──────────────────────────────────────────────────────────

export async function createUserToken(userId: string, email: string) {
  return new SignJWT({ userId, email, type: 'user' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function createAdminToken(userId: string, email: string) {
  return new SignJWT({ userId, email, type: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

// ── Token verification (Edge-compatible, no Prisma) ─────────────────────────

export async function verifyUserToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.type !== 'user') return null;
    return payload as { userId: string; email: string; type: 'user' };
  } catch {
    return null;
  }
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.type !== 'admin') return null;
    return payload as { userId: string; email: string; type: 'admin' };
  } catch {
    return null;
  }
}

export { COOKIE_OPTIONS };
