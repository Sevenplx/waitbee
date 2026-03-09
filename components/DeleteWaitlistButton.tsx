'use client';

import { DeleteButton } from './DeleteButton';
import { deleteWaitlistAction } from '@/app/actions';

export function DeleteWaitlistButton({ id, productName }: { id: string, productName: string }) {
  return (
    <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
      <DeleteButton
        iconOnly
        title={`Delete ${productName}`}
        description="Are you sure you want to delete this waitlist? This action cannot be undone and all subscribers will be permanently removed."
        onConfirm={async () => {
          await deleteWaitlistAction(id);
        }}
      />
    </div>
  );
}
