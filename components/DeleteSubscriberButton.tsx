'use client';

import { DeleteButton } from './DeleteButton';
import { deleteSubscriberAction } from '@/app/actions';

export function DeleteSubscriberButton({ id, waitlistId, email }: { id: string, waitlistId: string, email: string }) {
  return (
    <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
      <DeleteButton
        iconOnly
        title={`Delete Subscriber`}
        description={`Are you sure you want to delete ${email} from this waitlist? This action cannot be undone.`}
        onConfirm={async () => {
          await deleteSubscriberAction(id, waitlistId);
        }}
      />
    </div>
  );
}
