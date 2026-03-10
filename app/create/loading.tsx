import { Skeleton } from '@/components/Skeleton';
import styles from './create.module.css';

export default function CreateWaitlistLoading() {
  return (
    <div className={styles.container}>
      <div style={{ position: 'absolute', top: '2rem', left: '2rem' }}>
        <Skeleton width="150px" height="1.25rem" />
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
            <Skeleton width="3rem" height="3rem" borderRadius="1rem" />
            <div style={{ textAlign: 'left' }}>
              <Skeleton width="200px" height="2rem" className="mb-2" />
              <Skeleton width="250px" height="1rem" />
            </div>
          </div>
        </div>
        
        <div className={styles.form}>
          <div className="mb-6">
            <Skeleton width="120px" height="1rem" className="mb-2" />
            <Skeleton width="100%" height="3rem" borderRadius="0.5rem" />
          </div>
          
          <div className="mb-6">
            <Skeleton width="150px" height="1rem" className="mb-2" />
            <Skeleton width="100%" height="8rem" borderRadius="0.5rem" />
          </div>

          <div className={styles.grid2} style={{ marginBottom: '2rem' }}>
            <div>
              <Skeleton width="100px" height="1rem" className="mb-2" />
              <Skeleton width="100%" height="3rem" borderRadius="0.5rem" />
            </div>

            <div>
              <Skeleton width="80px" height="1rem" className="mb-2" />
              <Skeleton width="100%" height="3rem" borderRadius="0.5rem" />
            </div>
          </div>

          <Skeleton width="100%" height="3.5rem" borderRadius="0.75rem" />
        </div>
      </div>
    </div>
  );
}
