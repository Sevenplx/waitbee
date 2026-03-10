import { Skeleton } from '@/components/Skeleton';
import styles from './dashboard-list.module.css';

export default function DashboardLoading() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Skeleton width="150px" height="2rem" />
          <div className={styles.userNav}>
            <Skeleton width="100px" height="1rem" />
            <Skeleton width="80px" height="2rem" borderRadius="0.375rem" />
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.topBar}>
          <div>
            <Skeleton width="200px" height="2.5rem" className="mb-2" />
            <Skeleton width="300px" height="1rem" />
          </div>
          <Skeleton width="120px" height="2.5rem" borderRadius="0.5rem" />
        </div>

        <div className={styles.grid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.card} style={{ pointerEvents: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <Skeleton width="60%" height="1.5rem" />
                <Skeleton width="1rem" height="1rem" circle />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <Skeleton width="80%" height="0.875rem" />
              </div>

              <div className={styles.cardFooter}>
                <Skeleton width="40%" height="0.875rem" />
                <Skeleton width="20%" height="0.875rem" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
