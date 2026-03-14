'use client';

import { useEffect, useRef, useState } from 'react';
import CopyButton from '@/components/CopyButton';
import styles from './SharePopup.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface SharePopupProps {
  waitlistSlug: string;
  show: boolean;
  onClose: () => void;
}

export default function SharePopup({ waitlistSlug, show, onClose }: SharePopupProps) {
  const [publicUrl, setPublicUrl] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPublicUrl(`${window.location.protocol}//${window.location.host}/w/${waitlistSlug}`);
  }, [waitlistSlug]);

  if (!show) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) onClose();
  };

  const message = '🚀 Discover new projects before they launch. Join WaitBee for early access.';

  return (
    <div className={styles.modalOverlay} ref={modalRef} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>

        <div className={styles.header}>
          <h2>Share this waitlist</h2>
          <p className={styles.thanksMessage}>Invite others to join early access!</p>
        </div>

        <div className={styles.linkBox}>
          <input value={publicUrl} readOnly />
          <div className={styles.copyBtn}>
          <CopyButton text={publicUrl} />
          </div>
          
        </div>

        <div className={styles.socials}>
          <div
            className={styles.social}
            onClick={() =>
              window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicUrl)}&summary=${encodeURIComponent(message)}`,
                "_blank"
              )
            }
          >
            <div className={`${styles.circle} ${styles.linkedin}`}><i className="bi bi-linkedin"></i></div>
            LinkedIn
          </div>

          <div
            className={styles.social}
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(publicUrl)}&quote=${encodeURIComponent(message)}`,
                "_blank"
              )
            }
          >
            <div className={`${styles.circle} ${styles.facebook}`}><i className="bi bi-facebook"></i></div>
            Facebook
          </div>

          <div
            className={styles.social}
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(publicUrl)}`,
                "_blank"
              )
            }
          >
            <div className={`${styles.circle} ${styles.x}`}><i className="bi bi-twitter-x"></i></div>
            X
          </div>

          <div
            className={styles.social}
            onClick={() =>
              window.open(
                `https://www.reddit.com/submit?url=${encodeURIComponent(publicUrl)}&title=${encodeURIComponent(message)}`,
                "_blank"
              )
            }
          >
            <div className={`${styles.circle} ${styles.reddit}`}><i className="bi bi-reddit"></i></div>
            Reddit
          </div>
        </div>
        <div className={styles.info}>
          <i className="bi bi-info-circle"></i>
          <p>Public links can be reshared. Share responsibly. Third-party services may apply their own policies.</p>
        </div>
      </div>
    </div>
  );
}