import { getAuthUser } from '@/lib/auth';
import { getUserWaitlists } from '@/lib/db';
import { redirect } from 'next/navigation';
import { logoutAction } from '@/app/actions';
import Link from 'next/link';
import styles from './dashboard-list.module.css';
import { headers } from 'next/headers';

export default async function DashboardIndexPage() {
  const user = await getAuthUser();
  if (!user) {
    redirect('/login');
  }

  const waitlists = await getUserWaitlists(user.id);
  
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logo}>WaitlistBuilder</Link>
          <div className={styles.userNav}>
            <span className={styles.userEmail}>{user.email}</span>
            <form action={logoutAction}>
              <button type="submit" className={styles.logoutBtn}>Log out</button>
            </form>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.topBar}>
          <h1 className={styles.title}>My Waitlists</h1>
          <Link href="/create" className={styles.createBtn}>
            Create New
          </Link>
        </div>

        {waitlists.length === 0 ? (
          <div className={styles.empty}>
            <h2 className={styles.emptyTitle}>No waitlists yet</h2>
            <p className={styles.emptyDesc}>Create your first waitlist to start collecting emails.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {waitlists.map(w => (
              <Link href={`/dashboard/${w.id}`} key={w.id} className={styles.card}>
                <h2 className={styles.cardTitle}>{w.productName}</h2>
                <div className={styles.cardUrl}>{protocol}://{host}/w/{w.slug}</div>
                <div className={styles.cardFooter}>
                  <span>{new Date(w.createdAt).toLocaleDateString()}</span>
                  <span>Manage &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
