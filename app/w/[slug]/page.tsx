import { getWaitlistBySlug } from '@/lib/db';
import { notFound } from 'next/navigation';
import { subscribeAction } from '@/app/actions';
import { CheckCircle2, Rocket, AlertCircle, Mail, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import styles from './public-waitlist.module.css';

function getThemeFilter(bgColor: string) {
  switch (bgColor) {
    case 'bg-white': return 'none';
    case 'bg-zinc-50': return 'grayscale(100%) brightness(95%)';
    case 'bg-blue-50': return 'hue-rotate(20deg) saturate(150%)';
    case 'bg-purple-50': return 'hue-rotate(60deg) saturate(120%)';
    case 'bg-emerald-50': return 'hue-rotate(-60deg) saturate(120%)';
    case 'bg-zinc-900': return 'grayscale(100%) brightness(20%)';
    default: return 'none';
  }
}

export default async function WaitlistPage({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ msg?: string }> }) {
  const { slug } = await params;
  const { msg } = await searchParams;
  const waitlist = await getWaitlistBySlug(slug);

  if (!waitlist) {
    notFound();
  }

  const isDark = waitlist.bgColor === 'bg-zinc-900';
  const bgClass = waitlist.bgColor || 'bg-white'; 
  const themeFilter = getThemeFilter(bgClass);

  return (
    <div className={styles.container}>
      {/* Background Image with Filter */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1707209857286-62b9be358128?q=80&w=1518&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: themeFilter,
          zIndex: -1,
        }}
      />

      <div className={styles.card}>
        <div className={styles.logo}>
          <Rocket className="w-8 h-8" />
        </div>
        
        <h1 className={styles.title} style={{ color: isDark ? 'var(--white)' : 'var(--zinc-900)' }}>
          {waitlist.productName}
        </h1>
        <p className={styles.description} style={{ color: isDark ? 'var(--zinc-400)' : 'var(--zinc-500)' }}>
          {waitlist.description}
        </p>

        <div className="relative">
          {msg === 'success' && (
            <div className={styles.success}>
              <CheckCircle2 className="w-8 h-8 text-emerald-500" style={{ margin: '0 auto 1rem' }} />
              <h2 className={styles.successTitle}>You&apos;re on the list!</h2>
              <p>We&apos;ll be in touch as soon as we launch.</p>
            </div>
          )}
          
          {msg === 'duplicate' && (
            <div className={styles.success} style={{ backgroundColor: 'var(--blue-50)', borderColor: 'var(--blue-200)', color: 'var(--blue-800)' }}>
              <Rocket className="w-8 h-8 text-blue-500" style={{ margin: '0 auto 1rem' }} />
              <h2 className={styles.successTitle}>Welcome back!</h2>
              <p>You&apos;re already on our priority waitlist.</p>
            </div>
          )}

          {msg === 'full' && (
            <div className={styles.success} style={{ backgroundColor: '#fef2f2', borderColor: '#fecaca', color: '#991b1b' }}>
              <AlertCircle className="w-8 h-8 text-red-500" style={{ margin: '0 auto 1rem' }} />
              <h2 className={styles.successTitle}>Waitlist is full</h2>
              <p>We&apos;ve reached our maximum capacity for this round.</p>
            </div>
          )}

          {!msg && (
            <form action={subscribeAction} className={styles.form}>
              <input type="hidden" name="waitlistId" value={waitlist.id} />
              <input type="hidden" name="slug" value={waitlist.slug} />
              
              <div style={{ position: 'relative' }}>
                <Mail className="w-5 h-5" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--zinc-400)' }} />
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="Enter your email address"
                  className={styles.input}
                  style={{ paddingLeft: '3rem' }}
                />
              </div>
              <button 
                type="submit" 
                className={styles.submitBtn}
                style={{ 
                  backgroundColor: isDark ? 'var(--white)' : 'var(--zinc-900)',
                  color: isDark ? 'var(--black)' : 'var(--white)'
                }}
              >
                {waitlist.buttonText}
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', color: 'var(--zinc-400)', fontSize: '0.75rem' }}>
                <ShieldCheck className="w-3 h-3" />
                <span>No spam, just updates on our progress.</span>
              </div>
            </form>
          )}
        </div>

        <div className={styles.footer}>
          <span>Powered by</span>
          <Link href="/">WaitlistBuilder</Link>
        </div>
      </div>
    </div>
  );
}
