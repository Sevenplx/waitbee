import { resetPasswordAction } from '@/app/actions';
import Link from 'next/link';
import PasswordInput from '@/components/PasswordInput';
import styles from '../auth.module.css';

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string, error?: string }> }) {
  const { token, error } = await searchParams;
  
  if (!token) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Invalid Link</h1>
          <p className={styles.subtitle}>This password reset link is invalid or has expired.</p>
          <Link href="/forgot-password" className={styles.submitBtn} style={{ display: 'block', textDecoration: 'none', textAlign: 'center' }}>
            Request new link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>New Password</h1>
        <p className={styles.subtitle}>Enter your new password below.</p>
        
        {error === 'invalid' && (
          <div className={styles.error}>This password reset link is invalid or has expired.</div>
        )}
        
        <form action={resetPasswordAction} className={styles.form}>
          <input type="hidden" name="token" value={token} />
          
          <div>
            <label htmlFor="password" className={styles.label}>New Password</label>
            <PasswordInput 
              id="password" 
              name="password" 
              required 
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
