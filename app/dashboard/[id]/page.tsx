import { getWaitlistById, getSubscribers } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';
import { Download, ExternalLink, ArrowLeft } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import styles from './dashboard.module.css';

export default async function DashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser();
  if (!user) redirect('/login');

  const { id } = await params;
  const waitlist = await getWaitlistById(id);

  if (!waitlist || waitlist.userId !== user.id) {
    notFound();
  }

  const subscribers = await getSubscribers(waitlist.id);
  
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const publicUrl = `${protocol}://${host}/w/${waitlist.slug}`;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/dashboard" className={styles.backLink} title="Back to Dashboard">
              <ArrowLeft size={20} />
            </Link>
            <div className={styles.headerTitle}>WaitlistBuilder Dashboard</div>
          </div>
          <div className={styles.headerAdmin}>Admin: {user.email}</div>
        </div>
      </header>

      <main className={styles.main}>

        <div className={styles.topSection}>
          <div>
            <h1 className={styles.productName}>{waitlist.productName}</h1>
            <div className={styles.publicLinkWrapper}>
              <span className={styles.publicLinkLabel}>Public Link:</span>
              <a href={publicUrl} target="_blank" rel="noopener noreferrer" className={styles.publicLink}>
                {publicUrl}
                <ExternalLink className={styles.publicLinkIcon} />
              </a>
            </div>
          </div>
          
          <div className={styles.statsCard}>
            <div>
              <div className={styles.statsLabel}>Total Subscribers</div>
              <div className={styles.statsValue}>{subscribers.length}</div>
            </div>
            <div className={styles.statsDivider}></div>
            <a 
              href={`/api/waitlists/${id}/export`}
              className={styles.exportBtn}
              title="Export CSV"
            >
              <Download className={styles.exportIcon} />
            </a>
          </div>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h2 className={styles.tableTitle}>Email List</h2>
          </div>
          
          {subscribers.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIconWrapper}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.emptyIcon}><path d="M21.2 8.4c.5.3.8.8.8 1.4v10.2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.8c0-.6.3-1.1.8-1.4l8-4.8c.7-.4 1.7-.4 2.4 0l8 4.8Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/></svg>
              </div>
              <p>No subscribers yet. Share your link to get started!</p>
            </div>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Email</th>
                    <th className={`${styles.th} ${styles.thRight}`}>Joined At</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className={styles.tr}>
                      <td className={styles.td}>{sub.email}</td>
                      <td className={`${styles.td} ${styles.tdRight}`}>
                        {new Date(sub.createdAt).toLocaleDateString(undefined, { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
