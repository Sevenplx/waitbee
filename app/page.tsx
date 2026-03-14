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
          <Link className={styles.featureLink} href="#features">Features</Link>
          <Link href="https://www.github.com/Sevenplx/waitbee">GitHub</Link>
          {/* Donate Button */}
          <DonateButton className="navLinksLink" />
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
          <div className={styles.trustText}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
            <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z"/>
          </svg>
            Trusted by early-stage founders building side projects and startups.
          </div>
        </div>

        {/* How it works */}
        <div className={styles.heroContainer}>
  <div className={styles.heroText}>
    {/* Your existing hero content: badge, title, description, buttons */}
  </div>

  <div className={styles.heroVideo}>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/F0OkwXKcPSE?si=o92WswUDzb8Fl8ir"
      title="How it works and walkthrough"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  </div>
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
            <Link href="https://www.github.com/Sevenplx/waitbee" className={styles.footerLink} target="_blank">
              GitHub
            </Link>
            <Link href="https://www.github.com/Sevenplx/waitbee/issues/new" className={styles.footerLink} target="_blank">
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
