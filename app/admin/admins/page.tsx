'use client';

import React from 'react';
import { Plus, Edit, Trash2, ShieldCheck } from 'lucide-react';
import styles from '../../admin.module.css';

const mockAdmins = [
  { id: 'ADM-001', name: 'Alice Owner', email: 'alice@site.com', role: 'Owner', lastLogin: '2 mins ago', created: '2023-01-15' },
  { id: 'ADM-002', name: 'Bob Co-Admin', email: 'bob@site.com', role: 'Full Admin', lastLogin: '1 hour ago', created: '2023-06-22' },
  { id: 'ADM-003', name: 'Charlie Data', email: 'charlie@site.com', role: 'Analytics Only', lastLogin: '1 day ago', created: '2023-08-10' },
  { id: 'ADM-004', name: 'Diana Support', email: 'diana@site.com', role: 'Support', lastLogin: '5 mins ago', created: '2023-11-01' },
];

export default function AdminsPage() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Admin Management</h1>
          <p className={styles.pageSubtitle}>Manage platform administrators and their roles.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnPrimary} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={16} />
            Add Admin
          </button>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Last Login</th>
                <th>Created</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockAdmins.map((admin) => (
                <tr key={admin.id}>
                  <td>
                    <div style={{ fontWeight: 500, color: '#000', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {admin.name}
                      {admin.role === 'Owner' && <ShieldCheck size={14} color="#10b981" />}
                    </div>
                  </td>
                  <td style={{ color: '#666' }}>{admin.email}</td>
                  <td>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.75rem', 
                      fontWeight: 600,
                      backgroundColor: admin.role === 'Owner' ? '#fef3c7' : admin.role === 'Full Admin' ? '#e0e7ff' : '#f3f4f6',
                      color: admin.role === 'Owner' ? '#d97706' : admin.role === 'Full Admin' ? '#4338ca' : '#4b5563'
                    }}>
                      {admin.role}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: '#666' }}>{admin.lastLogin}</td>
                  <td style={{ fontSize: '0.85rem', color: '#666' }}>{new Date(admin.created).toLocaleDateString()}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button className={styles.tableActionBtn} title="Edit Role" disabled={admin.role === 'Owner'} style={{ opacity: admin.role === 'Owner' ? 0.5 : 1 }}>
                        <Edit size={16} />
                      </button>
                      <button className={`${styles.tableActionBtn} danger`} title="Remove Admin" disabled={admin.role === 'Owner'} style={{ opacity: admin.role === 'Owner' ? 0.5 : 1 }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
