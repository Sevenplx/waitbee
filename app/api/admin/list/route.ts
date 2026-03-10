import { NextResponse } from 'next/server';
import { getWaitlistEntries } from '@/lib/db';
import { getAdminUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    const entries = await getWaitlistEntries();
    return NextResponse.json({ entries });
  } catch (error) {
    console.error('Admin List Error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
