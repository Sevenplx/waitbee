import { Skeleton } from '@/components/Skeleton';
import styles from './dashboard.module.css';

export default function WaitlistDetailsLoading() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Skeleton width="24px" height="24px" circle />
            <Skeleton width="200px" height="1.5rem" />
          </div>
          <Skeleton width="150px" height="1rem" />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.topSection}>
          <div>
            <Skeleton width="300px" height="3rem" className="mb-4" />
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Skeleton width="100px" height="1rem" />
              <Skeleton width="250px" height="1rem" />
            </div>
          </div>
          
          <div className={styles.statsCard} style={{ display: 'flex', padding: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <Skeleton width="120px" height="0.875rem" className="mb-2" />
              <Skeleton width="60px" height="2rem" />
            </div>
            <div className={styles.statsDivider}></div>
            <Skeleton width="40px" height="40px" borderRadius="0.5rem" />
          </div>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <Skeleton width="150px" height="1.75rem" />
          </div>
          
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}><Skeleton width="100px" height="0.875rem" /></th>
                  <th className={`${styles.th} ${styles.thRight}`}><Skeleton width="100px" height="0.875rem" /></th>
                  <th className={styles.th} style={{ width: '40px' }}></th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className={styles.tr}>
                    <td className={styles.td}><Skeleton width="200px" height="1rem" /></td>
                    <td className={`${styles.td} ${styles.tdRight}`}><Skeleton width="150px" height="1rem" /></td>
                    <td className={styles.td}><Skeleton width="24px" height="24px" circle /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
