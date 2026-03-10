import { NextResponse } from 'next/server';
import { verifyUser } from '@/lib/db';
import { setAdminSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'credentials_required' }, { status: 400 });
    }

    const user = await verifyUser(email, password);

    if (user) {
      await setAdminSession(user.id, email);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'invalid_credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Admin Login Error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
