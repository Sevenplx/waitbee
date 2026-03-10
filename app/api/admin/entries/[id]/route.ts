import { NextResponse } from 'next/server';
import { deleteWaitlistEntry } from '@/lib/db';
import { getAdminUser } from '@/lib/auth';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await deleteWaitlistEntry(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete Entry Error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
