import Link from 'next/link';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/Button';

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-8">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>

      <h1 className="text-4xl font-bold tracking-tight mb-4">Something went wrong</h1>
      <p className="text-zinc-500 text-lg max-w-md mb-12">
        We encountered an unexpected error. Please try again later or return to the homepage.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
        <Link href="/" className="w-full">
          <Button variant="primary" className="w-full" icon={<RefreshCcw className="w-4 h-4" />}>
            Try Again
          </Button>
        </Link>
        <Link href="/" className="w-full">
          <Button variant="outline" className="w-full" icon={<Home className="w-4 h-4" />}>
            Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
