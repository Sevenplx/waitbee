import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'email_required' }, { status: 400 });
  }

  const entry = await prisma.waitlistEntry.findUnique({
    where: { email },
  });

  return NextResponse.json({ exists: !!entry });
}
