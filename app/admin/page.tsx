'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Activity, TrendingUp, DollarSign, List, ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/Skeleton';
import styles from '../admin.module.css';

interface DashboardStats {
  totalUsers: number;
  activeWaitlists: number;
  trafficSummary: string;
  revenue: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching dashboard stats
    const fetchStats = async () => {
      try {
        // Mock data for the UI
        setTimeout(() => {
          setStats({
            totalUsers: 1248,
            activeWaitlists: 42,
            trafficSummary: '45.2K',
            revenue: '$12,450'
          });
          setIsLoading(false);
        }, 500);
      } catch (err) {
        console.error('Failed to fetch stats');
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div>
        <div className={styles.pageHeader}>
          <div>
            <Skeleton width="250px" height="2.5rem" className="mb-2" />
            <Skeleton width="400px" height="1rem" />
          </div>
          <div className={styles.headerActions}>
            <Skeleton width="120px" height="2.5rem" borderRadius="0.375rem" />
            <Skeleton width="120px" height="2.5rem" borderRadius="0.375rem" />
          </div>
        </div>

        <div className={styles.statsGrid}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statHeader}>
                <Skeleton width="100px" height="0.875rem" />
                <Skeleton width="2rem" height="2rem" circle />
              </div>
              <div className={styles.statValueContainer}>
                <Skeleton width="60px" height="2rem" />
                <Skeleton width="40px" height="1rem" />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <Skeleton width="150px" height="1.5rem" />
            </div>
            <div className={styles.activityList}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={styles.activityItem}>
                  <Skeleton width="2rem" height="2rem" circle className="mr-3" />
                  <div className={styles.activityContent}>
                    <Skeleton width="150px" height="1rem" className="mb-1" />
                    <Skeleton width="250px" height="0.875rem" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <Skeleton width="120px" height="1.5rem" />
            </div>
            <div className={styles.quickActionsList}>
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} width="100%" height="3rem" borderRadius="0.5rem" className="mb-2" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard Overview</h1>
          <p className={styles.pageSubtitle}>Welcome back. Here&apos;s what&apos;s happening on your platform today.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>Download Report</button>
          <button className={styles.btnPrimary}>View Analytics</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {/* Total Users */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Total Users</span>
            <div className={styles.statIconWrapper}>
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className={styles.statValueContainer}>
            <h2 className={styles.statValue}>{stats?.totalUsers.toLocaleString()}</h2>
            <span className={styles.statTrendUp}>
              <ArrowUpRight className="w-3 h-3" />
              12%
            </span>
          </div>
        </div>

        {/* Active Waitlists */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Active Waitlists</span>
            <div className={styles.statIconWrapper}>
              <List className="w-4 h-4" />
            </div>
          </div>
          <div className={styles.statValueContainer}>
            <h2 className={styles.statValue}>{stats?.activeWaitlists}</h2>
            <span className={styles.statTrendUp}>
              <ArrowUpRight className="w-3 h-3" />
              4%
            </span>
          </div>
        </div>

        {/* Traffic Summary */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Traffic Summary (30d)</span>
            <div className={styles.statIconWrapper}>
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className={styles.statValueContainer}>
            <h2 className={styles.statValue}>{stats?.trafficSummary}</h2>
            <span className={styles.statTrendDown}>
              <ArrowDownRight className="w-3 h-3" />
              2%
            </span>
          </div>
        </div>

        {/* Revenue */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Revenue (MRR)</span>
            <div className={styles.statIconWrapper}>
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className={styles.statValueContainer}>
            <h2 className={styles.statValue}>{stats?.revenue}</h2>
            <span className={styles.statTrendUp}>
              <ArrowUpRight className="w-3 h-3" />
              18%
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className={styles.contentGrid}>
        {/* Recent Activity */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Recent Activity</h3>
            <button className={styles.panelAction}>View All</button>
          </div>
          <div className={styles.activityList}>
            {[
              { action: 'New user registered', details: 'john@example.com signed up for Pro plan', time: '2 mins ago', icon: Users },
              { action: 'Waitlist created', details: 'Acme SaaS waitlist launched', time: '1 hour ago', icon: List },
              { action: 'System alert', details: 'Database backup completed successfully', time: '3 hours ago', icon: Activity },
              { action: 'Subscription upgraded', details: 'jane@example.com upgraded to Enterprise', time: '5 hours ago', icon: TrendingUp },
            ].map((item, i) => (
              <div key={i} className={styles.activityItem}>
                <div className={styles.activityIcon}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div className={styles.activityContent}>
                  <p className={styles.activityTitle}>{item.action}</p>
                  <p className={styles.activityDesc}>{item.details}</p>
                </div>
                <span className={styles.activityTime}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Quick Actions</h3>
          </div>
          <div className={styles.quickActionsList}>
            <button className={styles.quickActionBtn}>
              Manage Users
              <ArrowUpRight className={`w-4 h-4 ${styles.quickActionIcon}`} />
            </button>
            <button className={styles.quickActionBtn}>
              Edit Landing Page
              <ArrowUpRight className={`w-4 h-4 ${styles.quickActionIcon}`} />
            </button>
            <button className={styles.quickActionBtn}>
              Send Announcement
              <ArrowUpRight className={`w-4 h-4 ${styles.quickActionIcon}`} />
            </button>
            <button className={styles.quickActionBtn}>
              System Logs
              <ArrowUpRight className={`w-4 h-4 ${styles.quickActionIcon}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
