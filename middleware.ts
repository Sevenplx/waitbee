import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  verifyUserToken,
  verifyAdminToken,
  USER_SESSION_COOKIE,
  ADMIN_SESSION_COOKIE,
} from './lib/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const userToken = request.cookies.get(USER_SESSION_COOKIE)?.value;
  const adminToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  // Verify each session independently — null if missing or invalid
  const userSession = userToken ? await verifyUserToken(userToken) : null;
  const adminSession = adminToken ? await verifyAdminToken(adminToken) : null;

  const isUserRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/create');
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin-login';
  const isUserAuthPage = pathname === '/login' || pathname === '/signup';
  const isAdminLoginPage = pathname === '/admin-login';

  // ── USER-AUTHENTICATED rules ─────────────────────────────────────────────
  if (userSession) {
    // Redirect away from user login/signup pages
    if (isUserAuthPage) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // User must not access /admin/*
    if (isAdminRoute) {
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
    // /admin-login is fine to visit (separate system — no redirect)
  }

  // ── ADMIN-AUTHENTICATED rules ────────────────────────────────────────────
  if (adminSession) {
    // Redirect away from /admin-login
    if (isAdminLoginPage) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    // Admin must not access user dashboard/create
    if (isUserRoute) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // ── UNAUTHENTICATED rules ────────────────────────────────────────────────
  if (!userSession && isUserRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (!adminSession && isAdminRoute) {
    return NextResponse.redirect(new URL('/admin-login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/create/:path*',
    '/admin/:path*',
    '/admin-login',
    '/login',
    '/signup',
  ],
};
