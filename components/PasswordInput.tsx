'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from '../app/auth.module.css';

interface PasswordInputProps {
  id: string;
  name: string;
  placeholder: string;
  minLength?: number;
  required?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function PasswordInput({ id, name, placeholder, minLength, required, className, style }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <input 
        type={showPassword ? 'text' : 'password'} 
        id={id} 
        name={name} 
        required={required} 
        placeholder={placeholder}
        className={className || styles.input}
        minLength={minLength}
        style={{ ...style, paddingRight: '2.5rem' }}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: 'absolute',
          right: '0.75rem',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--zinc-500)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0
        }}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}
