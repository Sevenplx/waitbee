import { createWaitlistAction } from '@/app/actions';
import { getAuthUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import styles from './create.module.css';

export default async function CreateWaitlist() {
  const user = await getAuthUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Create Waitlist</h1>
          <p className={styles.subtitle}>Set up your page in seconds.</p>
        </div>
        
        <form action={createWaitlistAction} className={styles.form}>
          <div>
            <label htmlFor="productName" className={styles.label}>Product Name</label>
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
            <label htmlFor="description" className={styles.label}>Short Description</label>
            <textarea 
              id="description" 
              name="description" 
              required 
              rows={3}
              placeholder="What are you building? Keep it punchy."
              className={styles.textarea}
            />
          </div>

          <div>
            <label htmlFor="buttonText" className={styles.label}>Button Text</label>
            <input 
              type="text" 
              id="buttonText" 
              name="buttonText" 
              defaultValue="Join Waitlist"
              required 
              className={styles.input}
            />
          </div>

          <div className={styles.grid2}>
            <div>
              <label htmlFor="bgColor" className={styles.label}>Background</label>
              <select 
                id="bgColor" 
                name="bgColor" 
                className={styles.select}
              >
                <option value="bg-white">White</option>
                <option value="bg-zinc-50">Light Gray</option>
                <option value="bg-blue-50">Soft Blue</option>
                <option value="bg-purple-50">Soft Purple</option>
                <option value="bg-emerald-50">Soft Green</option>
                <option value="bg-zinc-900">Dark Mode</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            className={styles.submitBtn}
          >
            Create Page
          </button>
        </form>
      </div>
    </div>
  );
}
