'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, AlertCircle, Rocket, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styles from '../admin.module.css';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push('/admin');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <div className={styles.logoIcon} style={{ marginBottom: '1rem' }}>
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <h1 className={styles.loginTitle}>Owner Portal</h1>
          <p className={styles.loginSubtitle}>Sign in to manage the platform.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Admin Email</label>
            <div style={{ position: 'relative' }}>
              <Mail className="w-4 h-4" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
              <input
                type="email"
                className={styles.formInput}
                style={{ paddingLeft: '2.5rem' }}
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock className="w-4 h-4" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
              <input
                type="password"
                className={styles.formInput}
                style={{ paddingLeft: '2.5rem' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626', fontSize: '0.85rem', padding: '0.75rem', backgroundColor: '#fef2f2', borderRadius: '8px', marginBottom: '1.25rem' }}>
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" className={styles.loginBtn} disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In to Mission Control'}
          </button>
          
          <Link href="#" className={styles.forgotPassword}>
            Forgot Password?
          </Link>
        </form>
      </div>
      
      <Link href="/" className={styles.backLink}>
        <ArrowLeft className="w-4 h-4" />
        Back to WaitlistBuilder
      </Link>
    </div>
  );
}
