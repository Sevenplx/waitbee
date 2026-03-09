import { getAuthUser } from '@/lib/auth';
import { getUserWaitlists } from '@/lib/db';
import { redirect } from 'next/navigation';
import { logoutAction } from '@/app/actions';
import Link from 'next/link';
import { headers } from 'next/headers';
import { Rocket, Plus, ExternalLink, Calendar, ArrowRight, LogOut, Layout } from 'lucide-react';
import { Button } from '@/components/Button';
import { DeleteWaitlistButton } from '@/components/DeleteWaitlistButton';
import styles from './dashboard-list.module.css';

export default async function DashboardIndexPage() {
  const user = await getAuthUser();
  if (!user) {
    redirect('/login');
  }

  const waitlists = await getUserWaitlists(user.id);
  
  const headersList = await headers();
  const host = headersList.get('host') || '';

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '2rem', height: '2rem', backgroundColor: 'var(--black)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <span className={styles.logo}>WaitlistBuilder</span>
          </Link>
          <div className={styles.userNav}>
            <span className={styles.userEmail}>{user.email}</span>
            <form action={logoutAction}>
              <button type="submit" className={styles.logoutBtn}>
                <LogOut className="w-4 h-4" style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.title}>Your Waitlists</h1>
            <p style={{ color: 'var(--zinc-500)', fontSize: '0.875rem' }}>Manage and track your product launches.</p>
          </div>
          <Link href="/create">
            <Button icon={<Plus className="w-4 h-4" />}>
              Create New
            </Button>
          </Link>
        </div>

        {waitlists.length === 0 ? (
          <div className={styles.empty}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: 'var(--zinc-50)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Layout className="w-6 h-6 text-zinc-400" />
            </div>
            <h3 className={styles.emptyTitle}>No waitlists yet</h3>
            <p className={styles.emptyDesc}>Create your first waitlist to start collecting emails from your future users.</p>
            <div style={{ marginTop: '1.5rem' }}>
              <Link href="/create">
                <Button variant="outline">Get Started</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className={styles.grid}>
            {waitlists.map(w => (
              <Link 
                href={`/dashboard/${w.id}`} 
                key={w.id} 
                className={styles.card}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h2 className={styles.cardTitle}>{w.productName}</h2>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--zinc-400)', marginBottom: '1.5rem' }}>
                  <ExternalLink className="w-3 h-3" />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{host}/w/{w.slug}</span>
                </div>

                <div className={styles.cardFooter}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar className="w-3 h-3" />
                    {new Date(w.createdAt).toLocaleDateString()}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>Manage &rarr;</span>
                    <DeleteWaitlistButton id={w.id} productName={w.productName} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
