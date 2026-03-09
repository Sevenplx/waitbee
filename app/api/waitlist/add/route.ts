import { NextResponse } from 'next/server';
import { addWaitlistEntry } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: 'email_required' }, { status: 400 });
    }

    const result = await addWaitlistEntry(email);

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
