'use client';

import { useState } from 'react';
import { Clipboard } from 'lucide-react';
import styles from './CopyButton.module.css';

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={styles.copyWrapper}>
      <button onClick={handleCopy} className={styles.copyBtn}>
        <Clipboard size={16} />
        <span className={`${styles.tooltip} ${copied ? styles.show : ''}`}>
          {copied ? 'Copied!' : 'Copy'}
        </span>
      </button>
    </div>
  );
}