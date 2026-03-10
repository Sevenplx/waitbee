import { cookies } from 'next/headers';
import { getUserById } from './db';
import {
  createUserToken,
  createAdminToken,
  verifyUserToken,
  verifyAdminToken,
  USER_SESSION_COOKIE,
  ADMIN_SESSION_COOKIE,
  COOKIE_OPTIONS,
} from './session';

// ── User Session ────────────────────────────────────────────────────────────

export async function setUserSession(userId: string, email: string) {
  const token = await createUserToken(userId, email);
  const cookieStore = await cookies();
  cookieStore.set(USER_SESSION_COOKIE, token, COOKIE_OPTIONS);
}

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(USER_SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = await verifyUserToken(token);
  if (!payload) return null;
  return await getUserById(payload.userId);
}

export async function clearUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete(USER_SESSION_COOKIE);
}

// ── Admin Session ───────────────────────────────────────────────────────────

export async function setAdminSession(userId: string, email: string) {
  const token = await createAdminToken(userId, email);
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, COOKIE_OPTIONS);
}

export async function getAdminUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = await verifyAdminToken(token);
  if (!payload) return null;
  return await getUserById(payload.userId);
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

// Legacy alias — keeps any existing calls to clearSession() working
export { clearUserSession as clearSession };
