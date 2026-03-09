import Link from 'next/link';
import { ArrowLeft, Rocket } from 'lucide-react';
import { WaitlistForm } from '@/components/WaitlistForm';

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-black transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-black/5 p-8 border border-zinc-100">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
            <Rocket className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-2">Join the Waitlist</h1>
          <p className="text-zinc-500">Be the first to know when we launch our beta.</p>
        </div>

        <WaitlistForm />

        <p className="mt-8 text-center text-xs text-zinc-400">
          By joining, you agree to our terms and privacy policy.
        </p>
      </div>
    </div>
  );
}
