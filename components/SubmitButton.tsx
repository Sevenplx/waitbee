'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './Button';

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
}

export function SubmitButton({ children, className, icon, variant = 'primary' }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      disabled={pending} 
      isLoading={pending} 
      className={className}
      icon={icon}
      variant={variant}
    >
      {children}
    </Button>
  );
}
