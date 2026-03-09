import Link from 'next/link';
import { CheckCircle2, Twitter, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/Button';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-500">
        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
      </div>

      <h1 className="text-4xl font-bold tracking-tight mb-4">You&apos;re on the waitlist!</h1>
      <p className="text-zinc-500 text-lg max-w-md mb-12">
        We&apos;ve added your email to our priority list. We&apos;ll notify you as soon as we&apos;re ready for you.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
        <Button 
          variant="primary" 
          className="w-full"
          icon={<Twitter className="w-4 h-4" />}
        >
          Share on Twitter
        </Button>
        <Link href="/" className="w-full">
          <Button variant="outline" className="w-full" icon={<Home className="w-4 h-4" />}>
            Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
