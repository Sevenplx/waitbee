'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

export const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/waitlist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/success');
      } else {
        if (data.error === 'already_joined') {
          setError("You're already on the waitlist.");
        } else {
          setError('Something went wrong. Please try again later.');
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          icon={<Mail className="w-4 h-4" />}
          error={error || undefined}
        />
        <Button 
          type="submit" 
          isLoading={isLoading}
          className="sm:w-auto w-full whitespace-nowrap"
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Join Waitlist
        </Button>
      </div>
      
      {error && !validateEmail(email) && email !== '' && (
        <div className="flex items-center gap-2 text-red-600 text-sm animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </form>
  );
};
