'use client';
import { useState, useEffect } from 'react';
import SharePopup from './SharePopup';
import { useSearchParams, useRouter } from 'next/navigation';
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from './SharePopup.module.css';

export default function Share({ waitlistSlug }: { waitlistSlug: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [open, setOpen] = useState(searchParams.get('share') === '1');

  useEffect(() => {
    setOpen(searchParams.get('share') === '1');
  }, [searchParams]);

  const openShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('share', '1');
    router.replace(url.toString());
    setOpen(true);
  };

  const closeShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('share');
    router.replace(url.toString());
    setOpen(false);
  };

  return (
    <>
      <button className={styles.shareBtn} onClick={openShare}>
        <i className="bi bi-share"></i>
      </button>

      <SharePopup
        waitlistSlug={waitlistSlug}
        show={open}
        onClose={closeShare}
      />
    </>
  );
}