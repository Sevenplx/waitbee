import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { getAuthUser } from '@/lib/auth';
import styles from './page.module.css';

export default async function Home() {
  const user = await getAuthUser();

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <header className={styles.header}>
        <div className={styles.logo}>WaitlistBuilder</div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {user ? (
            <Link href="/dashboard" className={styles.navLink}>
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className={styles.navLink}>
                Log in
              </Link>
              <Link href="/signup" className={styles.navLink}>
                Sign up
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero */}
      <main className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Create a Waitlist Page <br className={styles.heroTitleBr} /> in 60 Seconds
        </h1>
        <p className={styles.heroSubtitle}>
          Validate your idea, collect early users, and build hype. No bloated features, no complex dashboards. Just a minimal, fast, no-BS waitlist builder.
        </p>
        <Link 
          href="/create" 
          className={styles.ctaButton}
        >
          Create My Waitlist
          <ArrowRight className={styles.ctaIcon} />
        </Link>
      </main>

      {/* How it works */}
      <section className={styles.howItWorks}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <div className={styles.grid3}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <h3 className={styles.stepTitle}>Create page</h3>
              <p className={styles.stepDesc}>Enter your product details and customize the look in seconds.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <h3 className={styles.stepTitle}>Share link</h3>
              <p className={styles.stepDesc}>Get a unique URL instantly. Share it on Twitter, LinkedIn, or your network.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>3</div>
              <h3 className={styles.stepTitle}>Collect emails</h3>
              <p className={styles.stepDesc}>Watch your list grow. Export to CSV anytime from your simple dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={styles.pricing}>
        <h2 className={styles.sectionTitle}>Simple Pricing</h2>
        <div className={styles.pricingGrid}>
          {/* Free Tier */}
          <div className={styles.pricingCard}>
            <h3 className={styles.planName}>Free</h3>
            <p className={styles.planDesc}>Perfect for validating a single idea.</p>
            <div className={styles.planPrice}>$0<span>/mo</span></div>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}><CheckCircle2 className={styles.featureIcon} /> 1 waitlist</li>
              <li className={styles.featureItem}><CheckCircle2 className={styles.featureIcon} /> 100 emails max</li>
              <li className={styles.featureItem}><CheckCircle2 className={styles.featureIcon} /> Standard branding</li>
            </ul>
            <Link href="/create" className={styles.planButton}>
              Get Started
            </Link>
          </div>
          
          {/* Pro Tier */}
          <div className={styles.pricingCardPro}>
            <div className={styles.badge}>
              Coming Soon
            </div>
            <h3 className={styles.planName}>Pro</h3>
            <p className={styles.planDesc}>For serious founders and creators.</p>
            <div className={styles.planPrice}>$9<span>/mo</span></div>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}><CheckCircle2 className={styles.featureIcon} /> Unlimited waitlists</li>
              <li className={styles.featureItem}><CheckCircle2 className={styles.featureIcon} /> Unlimited emails</li>
              <li className={styles.featureItem}><CheckCircle2 className={styles.featureIcon} /> No branding</li>
              <li className={styles.featureItem}><CheckCircle2 className={styles.featureIcon} /> CSV export</li>
            </ul>
            <button disabled className={styles.planButtonPro}>
              Coming Soon
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
