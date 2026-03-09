'use client';

import React from 'react';
import { Database, HardDrive, RefreshCw, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import styles from '../../admin.module.css';

export default function ToolsPage() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>System Tools & Alerts</h1>
          <p className={styles.pageSubtitle}>Manage backups, clear caches, and view system logs.</p>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Backups */}
          <div className={styles.panel}>
            <div className={styles.panelHeader} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Database className="w-5 h-5 text-zinc-500" />
              <h3 className={styles.panelTitle}>Database Backups</h3>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <p className={styles.settingsSectionDesc}>Create and download manual backups of your database.</p>
              
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button className={styles.btnPrimary}>Run Manual Backup</button>
                <button className={styles.btnOutline}>Download Latest</button>
              </div>

              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem' }}>Recent Backups</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { date: 'Today, 03:00 AM', size: '45.2 MB', type: 'Automated' },
                  { date: 'Yesterday, 03:00 AM', size: '44.8 MB', type: 'Automated' },
                  { date: 'Oct 22, 14:30 PM', size: '44.5 MB', type: 'Manual' },
                ].map((backup, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '8px', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <HardDrive size={16} className="text-zinc-400" />
                      <span style={{ fontWeight: 500 }}>{backup.date}</span>
                      <span style={{ color: '#666' }}>{backup.type}</span>
                    </div>
                    <span style={{ color: '#666' }}>{backup.size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cache Management */}
          <div className={styles.panel}>
            <div className={styles.panelHeader} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <RefreshCw className="w-5 h-5 text-zinc-500" />
              <h3 className={styles.panelTitle}>Cache Management</h3>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <p className={styles.settingsSectionDesc}>Clear system caches to force fresh data loading. Use with caution during high traffic.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #f0f0f0' }}>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 500 }}>Clear Application Cache</h4>
                    <p style={{ fontSize: '0.8rem', color: '#666' }}>Clears cached landing pages and user dashboards.</p>
                  </div>
                  <button className={styles.btnOutline}>Clear Cache</button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 500 }}>Rebuild Analytics</h4>
                    <p style={{ fontSize: '0.8rem', color: '#666' }}>Recalculates all stats. May take a few minutes.</p>
                  </div>
                  <button className={styles.btnOutline}>Rebuild Data</button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* System Logs */}
          <div className={styles.panel}>
            <div className={styles.panelHeader} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FileText className="w-5 h-5 text-zinc-500" />
              <h3 className={styles.panelTitle}>Admin Audit Logs</h3>
              <button className={styles.btnOutline} style={{ marginLeft: 'auto', padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>View All</button>
            </div>
            <div style={{ padding: '0' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[
                  { action: 'Admin Bob deleted user #321', time: '10 mins ago', type: 'danger' },
                  { action: 'Owner changed site logo', time: '2 hours ago', type: 'info' },
                  { action: 'Alice Owner updated Stripe keys', time: '5 hours ago', type: 'warning' },
                  { action: 'System automated backup completed', time: '14 hours ago', type: 'success' },
                  { action: 'Admin Bob suspended user #892', time: '1 day ago', type: 'warning' },
                  { action: 'Alice Owner added new Admin (Diana)', time: '2 days ago', type: 'info' },
                ].map((log, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    padding: '1rem 1.5rem', 
                    borderBottom: i !== 5 ? '1px solid #f0f0f0' : 'none',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{ marginTop: '0.25rem' }}>
                      {log.type === 'danger' ? <AlertTriangle size={16} className="text-red-500" /> :
                       log.type === 'warning' ? <AlertTriangle size={16} className="text-amber-500" /> :
                       log.type === 'success' ? <CheckCircle2 size={16} className="text-emerald-500" /> :
                       <FileText size={16} className="text-blue-500" />}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.9rem', color: '#000', fontWeight: 500 }}>{log.action}</p>
                      <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
