import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// 1. Use a standard font to prevent layout shift
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// 2. Separate Viewport (Next.js 14+ requirement)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000', // Matches your "Midnight" theme
};

export const metadata: Metadata = {
  metadataBase: new URL('https://waitlistbuilder.com'), // Replace with your actual domain
  title: {
    default: 'WaitlistBuilder | Launch Your Product with a Viral Waitlist',
    template: '%s | WaitlistBuilder',
  },
  description: 'The open-source waitlist builder for indie founders. Build hype, collect emails, and launch your product in under 60 seconds.',
  keywords: ['Waitlist Builder', 'SaaS Launch', 'Early Access', 'Lead Generation', 'Open Source'],
  authors: [{ name: 'Chemitha Sathsilu (Sevenplx)', url: 'https://github.com/sevenplx' }],
  creator: 'Chemitha Sathsilu',
  
  // 3. OpenGraph for better Social Media Sharing (Twitter/FB/LinkedIn)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://waitlistbuilder.com',
    title: 'WaitlistBuilder - Launch Your Product with a Viral Waitlist',
    description: 'Used by early-stage founders to quickly build hype, collect emails, and launch their products.',
    siteName: 'WaitlistBuilder',
    images: [{
        url: '/yt-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'WaitlistBuilder Preview',
      }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WaitlistBuilder',
    description: 'Build your viral waitlist in seconds.',
    creator: '@sevenplx', // Your twitter handle
    images: ['/yt-thumbnail.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/logo.svg', // Website favicon
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body 
        className="antialiased min-h-screen bg-white" 
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}