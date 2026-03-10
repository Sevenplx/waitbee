'use client';

import React from 'react';
import styles from '../../admin.module.css';

export default function SettingsPage() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Platform Settings</h1>
          <p className={styles.pageSubtitle}>Configure global aspects of the website.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnPrimary}>Save Changes</button>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Branding */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Branding</h3>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div className={styles.settingsForm}>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Site Name</label>
                  <input type="text" className={styles.adminInput} defaultValue="WaitlistBuilder" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Primary Color</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input type="color" defaultValue="#000000" className="h-10 w-10 rounded cursor-pointer border-0 p-0" />
                      <input type="text" className={styles.adminInput} defaultValue="#000000" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Accent Color</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input type="color" defaultValue="#3b82f6" className="h-10 w-10 rounded cursor-pointer border-0 p-0" />
                      <input type="text" className={styles.adminInput} defaultValue="#3b82f6" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Logo URL</label>
                  <input type="text" className={styles.adminInput} placeholder="https://..." />
                </div>
              </div>
            </div>
          </div>

          {/* Landing Page Content */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Landing Page Content</h3>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div className={styles.settingsForm}>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Hero Title</label>
                  <input type="text" className={styles.adminInput} defaultValue="Build Your Waitlist in Minutes" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Hero Subtitle</label>
                  <div style={{ display: 'flex' }}>
                    <textarea className={styles.adminTextarea} rows={3} defaultValue="The easiest way to capture leads and validate your idea before you build."></textarea>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">CTA Button Text</label>
                  <input type="text" className={styles.adminInput} defaultValue="Start for free" />
                </div>
              </div>
            </div>
          </div>

        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Domain Settings */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Domain Settings</h3>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div className={styles.settingsForm}>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Main Domain</label>
                  <input type="text" className={styles.adminInput} defaultValue="waitlistbuilder.com" />
                </div>
                <label className={styles.toggleLabel}>
                  <div className={styles.toggleSwitch}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.toggleSlider}></span>
                  </div>
                  Enable Custom Domains for Users
                </label>
              </div>
            </div>
          </div>

          {/* Maintenance Mode */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Maintenance Mode</h3>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div className={styles.settingsForm}>
                <label className={styles.toggleLabel}>
                  <div className={styles.toggleSwitch}>
                    <input type="checkbox" />
                    <span className={styles.toggleSlider}></span>
                  </div>
                  Enable Site Maintenance
                </label>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Maintenance Message</label>
                  <div style={{ display: 'flex' }}>
                    <textarea className={styles.adminTextarea} rows={3} defaultValue="We are currently performing scheduled maintenance. We'll be back shortly."></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
