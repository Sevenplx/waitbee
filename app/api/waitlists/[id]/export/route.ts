import { getWaitlistById, getSubscribers } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser();
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { id } = await params;
  const waitlist = await getWaitlistById(id);

  if (!waitlist || waitlist.userId !== user.id) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const subscribers = await getSubscribers(waitlist.id);
  
  const csvHeader = 'Email,Joined At\n';
  const csvRows = subscribers.map((sub: { email: string; createdAt: string }) => `${sub.email},${sub.createdAt}`).join('\n');
  const csvContent = csvHeader + csvRows;

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="waitlist-${waitlist.slug}.csv"`,
    },
  });
}
