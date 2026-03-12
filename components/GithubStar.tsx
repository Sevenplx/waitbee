'use client';

import { useEffect, useState } from 'react';

export default function GithubStarPill() {
  const [stars, setStars] = useState<string>('...');

  useEffect(() => {
    async function fetchStars() {
      try {
        const res = await fetch(
          'https://api.github.com/repos/Sevenplx/waitlist-builder'
        );

        const data = await res.json();
        let count = data.stargazers_count;

        if (count >= 1000) {
          count = (count / 1000).toFixed(1) + 'k';
        }

        setStars(count);
      } catch (err) {
        console.error('GitHub fetch failed', err);
      }
    }

    fetchStars();
  }, []);

  return (
    <a
      href="https://github.com/Sevenplx/waitlist-builder"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 8px 6px 12px',
        border: '1px solid #e5e7eb',
        borderRadius: '999px',
        background: '#ffffff',
        fontSize: '14px',
        fontWeight: 500,
        color: '#111827',
        textDecoration: 'none',
        transition: 'all .2s ease'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="currentColor"
          style={{ color: '#6b7280' }}
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 
          7.59.4.07.55-.17.55-.38 
          0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94
          -.09-.23-.48-.94-.82-1.13
          -.28-.15-.68-.52-.01-.53
          .63-.01 1.08.58 1.23.82
          .72 1.21 1.87.87 2.33.66
          .07-.52.28-.87.51-1.07
          -1.78-.2-3.64-.89-3.64-3.95
          0-.87.31-1.59.82-2.15
          -.08-.2-.36-1.02.08-2.12
          0 0 .67-.21 2.2.82
          .64-.18 1.32-.27 2-.27
          s1.36.09 2 .27
          c1.53-1.04 2.2-.82 2.2-.82
          .44 1.1.16 1.92.08 2.12
          .51.56.82 1.27.82 2.15
          0 3.07-1.87 3.75-3.65 3.95
          .29.25.54.73.54 1.48
          0 1.07-.01 1.93-.01 2.2
          0 .21.15.46.55.38
          A8.01 8.01 0 0 0 16 8
          c0-4.42-3.58-8-8-8"/>
        </svg>

        Star
      </div>

      <span
        style={{
          padding: '4px 8px',
          borderRadius: '999px',
          background: '#f3f4f6',
          fontWeight: 600,
          fontSize: '13px',
          color: '#374151'
        }}
      >
        {stars}
      </span>
    </a>
  );
}