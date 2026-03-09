'use client';

import React from 'react';
import { BarChart3, TrendingUp, Users, MousePointerClick } from 'lucide-react';
import styles from '../../admin.module.css';

export default function AnalyticsPage() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Platform Analytics</h1>
          <p className={styles.pageSubtitle}>See the big picture for the whole platform.</p>
        </div>
        <div className={styles.headerActions}>
          <select className="px-4 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>All Time</option>
          </select>
          <button className={styles.btnOutline}>Export Data</button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Total Pageviews</span>
            <div className={styles.statIconWrapper}><BarChart3 className="w-4 h-4" /></div>
          </div>
          <div className={styles.statValueContainer}>
            <h2 className={styles.statValue}>124.5K</h2>
            <span className={styles.statTrendUp}>+14%</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Unique Visitors</span>
            <div className={styles.statIconWrapper}><Users className="w-4 h-4" /></div>
          </div>
          <div className={styles.statValueContainer}>
            <h2 className={styles.statValue}>45.2K</h2>
            <span className={styles.statTrendUp}>+8%</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Avg. Conversion Rate</span>
            <div className={styles.statIconWrapper}><MousePointerClick className="w-4 h-4" /></div>
          </div>
          <div className={styles.statValueContainer}>
            <h2 className={styles.statValue}>12.4%</h2>
            <span className={styles.statTrendDown}>-1.2%</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>New Waitlists Created</span>
            <div className={styles.statIconWrapper}><TrendingUp className="w-4 h-4" /></div>
          </div>
          <div className={styles.statValueContainer}>
            <h2 className={styles.statValue}>342</h2>
            <span className={styles.statTrendUp}>+24%</span>
          </div>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>User Growth</h3>
          </div>
          <div style={{ padding: '2rem', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
            <p className="text-zinc-400 text-sm">[ Line Chart Placeholder: User growth over time ]</p>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Traffic Sources</h3>
          </div>
          <div style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { source: 'Direct', value: '45%', color: '#000' },
                { source: 'Twitter / X', value: '25%', color: '#3b82f6' },
                { source: 'Google Search', value: '20%', color: '#10b981' },
                { source: 'Referral', value: '10%', color: '#8b5cf6' },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.85rem', fontWeight: 500 }}>
                    <span>{item.source}</span>
                    <span>{item.value}</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: item.value, height: '100%', backgroundColor: item.color, borderRadius: '4px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.panel} style={{ marginTop: '2rem' }}>
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle}>Top Performing Waitlists</h3>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Waitlist Name</th>
                <th>Creator</th>
                <th>Views</th>
                <th>Signups</th>
                <th>Conversion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 500 }}>AI Startup Beta</td>
                <td style={{ color: '#666' }}>john@example.com</td>
                <td>12,450</td>
                <td>3,210</td>
                <td style={{ color: '#10b981', fontWeight: 500 }}>25.7%</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 500 }}>SaaS Tool Early Access</td>
                <td style={{ color: '#666' }}>jane@startup.io</td>
                <td>8,230</td>
                <td>1,150</td>
                <td style={{ color: '#10b981', fontWeight: 500 }}>13.9%</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 500 }}>Newsletter Launch</td>
                <td style={{ color: '#666' }}>mike@agency.com</td>
                <td>5,120</td>
                <td>890</td>
                <td style={{ color: '#10b981', fontWeight: 500 }}>17.3%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
