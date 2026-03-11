import Link from 'next/link';
import { ArrowRight, Zap, Shield, Rocket, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/Button';
import styles from './landing.module.css';
import GithubStar from '@/components/GithubStar';
import DonateButton from '@/components/DonateButton';

export default function LandingPage() {
  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.logoSection}>
          <div className={styles.logoIcon}>
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <span className={styles.brandName}>WaitlistBuilder</span>
        </div>

        <div className={styles.navLinks}>
          <Link href="#features">Features</Link>
          <Link href="https://github.com/sevenplx/waitlist-builder">GitHub</Link>
          <div className={styles.navLinksBtn}>
            <DonateButton />
          </div>
        </div>

        <div className={styles.navActions}>
          <Link href="/login" className={styles.loginLink}>Log in</Link>
          <Link href="/signup" className={styles.btnGetStarted}>
            Get Started
          </Link>
          {/* GitHub Star */}
          <div style={{ marginLeft: '1rem' }}>
            <GithubStar />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.badge}>
            <Zap className="w-3 h-3" />
            <span>Now in Public Beta</span>
          </div>
          
          <h1 className={styles.title}>
            Launch your product <br />
            <span className={styles.titleAccent}>with a viral waitlist.</span>
          </h1>
          
          <p className={styles.description}>
            An open waitlist builder for indie founders and side projects.
            Launch fast, collect emails, and build hype before your product goes live.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="/create">
              <Button size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Start Building for Free
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* How it works */}
        <div className={styles.heroContainer}>
  <div className={styles.heroText}>
    {/* Your existing hero content: badge, title, description, buttons */}
  </div>

  {/* <div className={styles.heroVideo}>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/F0OkwXKcPSE?si=o92WswUDzb8Fl8ir"
      title="How it works and walkthrough"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  </div> */}
</div>

        {/* Features Grid */}
        <div id="features" className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Zap className="w-6 h-6 text-zinc-900" />
            </div>
            <h3 className={styles.featureTitle}>Lightning Fast Setup</h3>
            <p className={styles.featureDesc}>
              Create a beautiful, high-converting waitlist page in under 60 seconds. 
              No code required, just your product name and a vision.
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Shield className="w-6 h-6 text-zinc-900" />
            </div>
            <h3 className={styles.featureTitle}>Powerful Analytics</h3>
            <p className={styles.featureDesc}>
              Track your growth with real-time analytics. See where your users are coming from 
              and which channels are driving the most conversions.
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Rocket className="w-6 h-6 text-zinc-900" />
            </div>
            <h3 className={styles.featureTitle}>Built to Scale</h3>
            <p className={styles.featureDesc}>
              Whether you have 10 or 10 million signups, our infrastructure handles it all. 
              Focus on building your product while we handle the traffic.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <Rocket className="w-4 h-4" />
            <span>WaitlistBuilder</span>
          </div>
          <p className={styles.footerText}>
            Built by <a href="https://github.com/sevenplx">Chemitha Sathsilu</a> ♥ Open Source
          </p>
          <div className={styles.footerLinks}>
            <Link href="https://github.com/Sevenplx/waitlist-builder" className={styles.footerLink} target="_blank">
              GitHub
            </Link>
            <Link href="https://github.com/Sevenplx/autonin/issues/new" className={styles.footerLink} target="_blank">
              Report Bug
            </Link>
            <Link href="/admin-login" className={styles.footerLink}>
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
