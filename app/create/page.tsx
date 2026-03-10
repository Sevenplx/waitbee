import { createWaitlistAction } from '@/app/actions';
import { getAuthUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Rocket, ArrowLeft, Sparkles, Layout, Palette, Type } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { SubmitButton } from '@/components/SubmitButton';
import styles from './create.module.css';

export default async function CreateWaitlist() {
  const user = await getAuthUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <div className={styles.container}>
      <Link href="/dashboard" style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--zinc-500)' }}>
        <ArrowLeft className="w-4 h-4" />
        Back to dashboard
      </Link>

      <div className={styles.card}>
        <div className={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: 'var(--black)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Sparkles className="w-6 h-6" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <h1 className={styles.title}>Create Waitlist</h1>
              <p className={styles.subtitle}>Set up your launch page in seconds.</p>
            </div>
          </div>
        </div>
        
        <form action={createWaitlistAction} className={styles.form}>
          <div>
            <label htmlFor="productName" className={styles.label}>
              <Layout className="w-4 h-4" style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Product Name
            </label>
            <input 
              type="text" 
              id="productName" 
              name="productName" 
              required 
              placeholder="e.g. Acme SaaS"
              className={styles.input}
            />
          </div>
          
          <div>
            <label htmlFor="description" className={styles.label}>
              <Type className="w-4 h-4" style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Short Description
            </label>
            <textarea 
              id="description" 
              name="description" 
              required 
              rows={4}
              placeholder="What are you building? Keep it punchy."
              className={styles.textarea}
            />
          </div>

          <div className={styles.grid2}>
            <div>
              <label htmlFor="buttonText" className={styles.label}>
                <Rocket className="w-4 h-4" style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Button Text
              </label>
              <input 
                type="text" 
                id="buttonText" 
                name="buttonText" 
                defaultValue="Join Waitlist"
                required 
                className={styles.input}
              />
            </div>

            <div>
              <label htmlFor="bgColor" className={styles.label}>
                <Palette className="w-4 h-4" style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Theme
              </label>
              <select 
                id="bgColor" 
                name="bgColor" 
                className={styles.select}
              >
                <option value="bg-white">Clean White</option>
                <option value="bg-zinc-50">Soft Gray</option>
                <option value="bg-blue-50">Ocean Blue</option>
                <option value="bg-purple-50">Royal Purple</option>
                <option value="bg-emerald-50">Nature Green</option>
              </select>
            </div>
          </div>

          <SubmitButton className={styles.submitBtn} icon={<Rocket className="w-5 h-5" />}>
            Create Launch Page
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
