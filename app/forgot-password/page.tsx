import { forgotPasswordAction } from '@/app/actions';
import Link from 'next/link';
import styles from '../auth.module.css';

export default async function ForgotPasswordPage({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  const { success } = await searchParams;
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Reset Password</h1>
        <p className={styles.subtitle}>Enter your email to receive a reset link.</p>
        
        {success === 'true' ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#10b981', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              If an account exists with that email, we have sent a password reset link.
            </div>
            <Link href="/login" className={styles.submitBtn} style={{ display: 'block', textDecoration: 'none' }}>
              Return to login
            </Link>
          </div>
        ) : (
          <form action={forgotPasswordAction} className={styles.form}>
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

            <button type="submit" className={styles.submitBtn}>
              Send Reset Link
            </button>
          </form>
        )}
        
        {!success && (
          <div className={styles.linkText}>
            Remember your password? <Link href="/login" className={styles.link}>Log in</Link>
          </div>
        )}
      </div>
    </div>
  );
}
