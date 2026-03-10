'use client';

import { signupAction } from '@/app/actions';
import Link from 'next/link';
import PasswordInput from '@/components/PasswordInput';
import { Button } from '@/components/Button';
import { SubmitButton } from '@/components/SubmitButton';
import { Rocket, Mail, Lock, AlertCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import styles from '@/app/auth.module.css';
import { Suspense } from 'react';

function SignupContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  
  return (
    <div className={styles.card}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <div style={{ width: '3rem', height: '3rem', backgroundColor: 'var(--black)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white ' }}>
          <Rocket className="w-6 h-6" />
        </div>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>Create an account</h1>
        <p className={styles.subtitle}>Start building your waitlist today.</p>
      </div>
      
      {error === 'exists' && (
        <div className={styles.error}>
          <AlertCircle className="w-4 h-4" style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
          <span>An account with this email already exists.</span>
        </div>
      )}
      
      <form action={signupAction} className={styles.form}>
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
          <label htmlFor="password" className={styles.label}>Password</label>
          <div style={{ position: 'relative' }}>
            <Lock className="w-4 h-4" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--zinc-400)', zIndex: 10 }} />
            <PasswordInput 
              id="password" 
              name="password" 
              required 
              placeholder="••••••••"
              minLength={6}
              className={styles.input}
              style={{ paddingLeft: '3rem' }}
            />
          </div>
          <p style={{ fontSize: '10px', color: 'var(--zinc-400)', marginTop: '0.25rem' }}>Must be at least 6 characters long.</p>
        </div>

        <SubmitButton className={styles.submitBtn}>
          Sign up
        </SubmitButton>
      </form>
      
      <div className={styles.linkText}>
        Already have an account? <Link href="/login" className={styles.link}>Log in</Link>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<div className={styles.card}>Loading...</div>}>
        <SignupContent />
      </Suspense>
    </div>
  );
}
