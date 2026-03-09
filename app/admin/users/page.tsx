'use client';

import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Shield, ShieldAlert, Edit, Trash2 } from 'lucide-react';
import styles from '../../admin.module.css';

const mockUsers = [
  { id: 'USR-001', name: 'John Doe', email: 'john@example.com', plan: 'Free', waitlists: 3, date: '2023-10-22', status: 'Active' },
  { id: 'USR-002', name: 'Jane Smith', email: 'jane@startup.io', plan: 'Pro', waitlists: 12, date: '2023-11-05', status: 'Active' },
  { id: 'USR-003', name: 'Mike Johnson', email: 'mike@agency.com', plan: 'Enterprise', waitlists: 45, date: '2023-11-12', status: 'Active' },
  { id: 'USR-004', name: 'Sarah Wilson', email: 'sarah@test.com', plan: 'Free', waitlists: 1, date: '2023-12-01', status: 'Suspended' },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>User Management</h1>
          <p className={styles.pageSubtitle}>View and manage all registered users on the platform.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnPrimary}>Export Users</button>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHeader} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div className={styles.searchBar} style={{ width: '300px' }}>
            <Search className={styles.searchIcon} size={16} />
            <input 
              type="text" 
              placeholder="Search by name, email, or ID..." 
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className={styles.btnOutline} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={14} />
              Plan
            </button>
            <button className={styles.btnOutline} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={14} />
              Status
            </button>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Plan</th>
                <th>Waitlists</th>
                <th>Signup Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id}>
                  <td style={{ color: '#666', fontSize: '0.85rem' }}>{user.id}</td>
                  <td>
                    <div style={{ fontWeight: 500, color: '#000' }}>{user.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{user.email}</div>
                  </td>
                  <td>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.75rem', 
                      fontWeight: 600,
                      backgroundColor: user.plan === 'Pro' ? '#e0e7ff' : user.plan === 'Enterprise' ? '#fce7f3' : '#f3f4f6',
                      color: user.plan === 'Pro' ? '#4338ca' : user.plan === 'Enterprise' ? '#be185d' : '#4b5563'
                    }}>
                      {user.plan}
                    </span>
                  </td>
                  <td>{user.waitlists}</td>
                  <td>{new Date(user.date).toLocaleDateString()}</td>
                  <td>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.25rem',
                      color: user.status === 'Active' ? '#059669' : '#dc2626',
                      fontSize: '0.85rem',
                      fontWeight: 500
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: user.status === 'Active' ? '#10b981' : '#ef4444' }}></span>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button className={styles.tableActionBtn} title="Edit User"><Edit size={16} /></button>
                      {user.status === 'Active' ? (
                        <button className={`${styles.tableActionBtn} danger`} title="Suspend User"><ShieldAlert size={16} /></button>
                      ) : (
                        <button className={styles.tableActionBtn} title="Reactivate User" style={{ color: '#10b981' }}><Shield size={16} /></button>
                      )}
                      <button className={`${styles.tableActionBtn} danger`} title="Delete User"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#666' }}>
          <span>Showing 1 to 4 of 1,342 users</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className={styles.btnOutline} disabled>Previous</button>
            <button className={styles.btnOutline}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
