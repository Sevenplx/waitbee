'use client';

import { loginAction } from '@/app/actions';
import Link from 'next/link';
import PasswordInput from '@/components/PasswordInput';
import { Button } from '@/components/Button';
import { SubmitButton } from '@/components/SubmitButton';
import { Rocket, Mail, Lock, AlertCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import styles from '@/app/auth.module.css';
import { Suspense } from 'react';

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const reset = searchParams.get('reset');
  
  return (
    <div className={styles.card}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <div style={{ width: '3rem', height: '3rem', backgroundColor: 'var(--black)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <Rocket className="w-6 h-6" />
        </div>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Log in to manage your waitlists.</p>
      </div>
      
      {error === 'invalid' && (
        <div className={styles.error}>
          <AlertCircle className="w-4 h-4" style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
          <span>Invalid email or password.</span>
        </div>
      )}
      
      {reset === 'success' && (
        <div className={styles.error} style={{ backgroundColor: '#f0fdf4', color: '#15803d', borderColor: '#bbf7d0' }}>
          <Rocket className="w-4 h-4" style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
          <span>Password reset successfully. You can now log in.</span>
        </div>
      )}
      
      <form action={loginAction} className={styles.form}>
        <div>
          <label htmlFor="email" className={styles.label}>Email Address</label>
          <div style={{ position: 'relative' }}>
            <Mail className="w-4 h-4" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--zinc-400)' }} />
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              placeholder="you@example.com"
              className={styles.input}
              style={{ paddingLeft: '3rem' }}
            />
          </div>
        </div>
        
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label htmlFor="password" className={styles.label} style={{ marginBottom: 0 }}>Password</label>
            <Link href="/forgot-password" style={{ fontSize: '0.75rem', color: 'var(--zinc-500)' }}>Forgot password?</Link>
          </div>
          <div style={{ position: 'relative' }}>
            <Lock className="w-4 h-4" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--zinc-400)', zIndex: 10 }} />
            <PasswordInput 
              id="password" 
              name="password" 
              required 
              placeholder="••••••••"
              className={styles.input}
              style={{ paddingLeft: '3rem' }}
            />
          </div>
        </div>

        <SubmitButton className={styles.submitBtn}>
          Log in
        </SubmitButton>
      </form>
      
      <div className={styles.linkText}>
        Don&apos;t have an account? <Link href="/signup" className={styles.link}>Sign up</Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<div className={styles.card}>Loading...</div>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
