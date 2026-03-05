import { signupAction } from '@/app/actions';
import Link from 'next/link';
import PasswordInput from '@/components/PasswordInput';
import styles from '../auth.module.css';

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create an account</h1>
        <p className={styles.subtitle}>Start building your waitlist today.</p>
        
        {error === 'exists' && (
          <div className={styles.error}>An account with this email already exists.</div>
        )}
        
        <form action={signupAction} className={styles.form}>
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
            <label htmlFor="password" className={styles.label}>Password</label>
            <PasswordInput 
              id="password" 
              name="password" 
              required 
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Sign up
          </button>
        </form>
        
        <div className={styles.linkText}>
          Already have an account? <Link href="/login" className={styles.link}>Log in</Link>
        </div>
      </div>
    </div>
  );
}
