import { getWaitlistBySlug } from '@/lib/db';
import { notFound } from 'next/navigation';
import { subscribeAction } from '@/app/actions';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import styles from './waitlist.module.css';

export default async function WaitlistPage({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ msg?: string }> }) {
  const { slug } = await params;
  const { msg } = await searchParams;
  const waitlist = await getWaitlistBySlug(slug);

  if (!waitlist) {
    notFound();
  }

  const isDark = waitlist.bgColor === 'bg-zinc-900';
  
  // We map the dynamic bg class to the global utility classes we defined in globals.css
  const bgClass = waitlist.bgColor; 

  return (
    <div className={`${styles.container} ${bgClass}`}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={`${styles.title} ${isDark ? styles.textDark : styles.textLight}`}>
            {waitlist.productName}
          </h1>
          <p className={`${styles.description} ${isDark ? styles.mutedDark : styles.mutedLight}`}>
            {waitlist.description}
          </p>
        </div>

        {msg === 'success' && (
          <div className={`${styles.successCard} ${isDark ? styles.successCardDark : styles.successCardLight}`}>
            <CheckCircle2 className={`${styles.successIcon} ${isDark ? styles.successIconDark : styles.successIconLight}`} />
            <h2 className={`${styles.successTitle} ${isDark ? styles.textDark : styles.textLight}`}>You&apos;re on the list!</h2>
            <p className={isDark ? styles.mutedDark : styles.mutedLight}>We&apos;ll be in touch soon.</p>
          </div>
        )}
        
        {msg === 'duplicate' && (
          <div className={`${styles.successCard} ${isDark ? styles.successCardDark : styles.successCardLight}`}>
            <CheckCircle2 className={`${styles.successIcon} ${isDark ? styles.successIconDark : styles.successIconLight}`} />
            <h2 className={`${styles.successTitle} ${isDark ? styles.textDark : styles.textLight}`}>Welcome back!</h2>
            <p className={isDark ? styles.mutedDark : styles.mutedLight}>You&apos;re already on the waitlist.</p>
          </div>
        )}

        {msg === 'full' && (
          <div className={`${styles.successCard} ${isDark ? styles.successCardDark : styles.successCardLight}`} style={{ borderColor: '#ef4444' }}>
            <h2 className={`${styles.successTitle} ${isDark ? styles.textDark : styles.textLight}`}>Sorry, waitlist full.</h2>
            <p className={isDark ? styles.mutedDark : styles.mutedLight}>We&apos;ve reached our maximum capacity.</p>
          </div>
        )}

        {!msg && (
          <form action={subscribeAction} className={styles.form}>
            <input type="hidden" name="waitlistId" value={waitlist.id} />
            <input type="hidden" name="slug" value={waitlist.slug} />
            
            <div className={styles.formGroup}>
              <input 
                type="email" 
                name="email" 
                required 
                placeholder="Enter your email"
                className={`${styles.input} ${isDark ? styles.inputDark : styles.inputLight}`}
              />
              <button 
                type="submit" 
                className={`${styles.button} ${isDark ? styles.buttonDark : styles.buttonLight}`}
              >
                {waitlist.buttonText}
              </button>
            </div>
          </form>
        )}
      </div>
      
      <div className={`${styles.footer} ${isDark ? styles.mutedDark : styles.mutedLight}`}>
        Powered by <Link href="/" className={styles.footerLink}>WaitlistBuilder</Link>
      </div>
    </div>
  );
}
