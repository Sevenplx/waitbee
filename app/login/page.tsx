import { loginAction } from '@/app/actions';
import Link from 'next/link';
import PasswordInput from '@/components/PasswordInput';
import styles from '../auth.module.css';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string, reset?: string }> }) {
  const { error, reset } = await searchParams;
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Log in to manage your waitlists.</p>
        
        {error === 'invalid' && (
          <div className={styles.error}>Invalid email or password.</div>
        )}
        {reset === 'success' && (
          <div className={styles.success} style={{ color: '#10b981', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'center', marginBottom: '1rem', fontSize: '0.875rem' }}>
            Password reset successfully. You can now log in.
          </div>
        )}
        
        <form action={loginAction} className={styles.form}>
          <div>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              placeholder="you@example.com"
              className={styles.input}
            />
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label htmlFor="password" className={styles.label} style={{ marginBottom: 0 }}>Password</label>
              <Link href="/forgot-password" style={{ fontSize: '0.75rem', color: 'var(--zinc-500)' }} className={styles.link}>Forgot password?</Link>
            </div>
            <PasswordInput 
              id="password" 
              name="password" 
              required 
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Log in
          </button>
        </form>
        
        <div className={styles.linkText}>
          Don&apos;t have an account? <Link href="/signup" className={styles.link}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}
