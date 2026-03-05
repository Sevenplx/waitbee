import { getWaitlistByToken, getSubscribers } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const waitlist = await getWaitlistByToken(token);

  if (!waitlist) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const subscribers = await getSubscribers(waitlist.id);
  
  const csvHeader = 'Email,Joined At\n';
  const csvRows = subscribers.map(sub => `${sub.email},${sub.createdAt}`).join('\n');
  const csvContent = csvHeader + csvRows;

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="waitlist-${waitlist.slug}.csv"`,
    },
  });
}
