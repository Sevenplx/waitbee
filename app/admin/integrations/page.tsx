'use client';

import React from 'react';
import { Mail, CreditCard, BarChart2, Webhook, CheckCircle2 } from 'lucide-react';
import styles from '../../admin.module.css';

export default function IntegrationsPage() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Integrations</h1>
          <p className={styles.pageSubtitle}>Connect third-party services to power your platform.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnPrimary}>Save Integrations</button>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Email Provider */}
          <div className={styles.panel}>
            <div className={styles.panelHeader} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Mail className="w-5 h-5 text-zinc-500" />
              <h3 className={styles.panelTitle}>Email Provider (SendGrid)</h3>
              <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#10b981', fontWeight: 600, backgroundColor: '#d1fae5', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                <CheckCircle2 size={12} /> Connected
              </span>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <p className={styles.settingsSectionDesc}>Configure your email provider to send transactional emails and announcements.</p>
              <div className={styles.settingsForm}>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">API Key</label>
                  <input type="password" placeholder="SG.xxxxxxxxxxxxxxxxxxxx" className={styles.adminInput} defaultValue="SG.fakeapikey12345" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">From Email Address</label>
                  <input type="email" className={styles.adminInput} defaultValue="hello@waitlistbuilder.com" />
                </div>
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className={styles.panel}>
            <div className={styles.panelHeader} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <BarChart2 className="w-5 h-5 text-zinc-500" />
              <h3 className={styles.panelTitle}>Google Analytics</h3>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <p className={styles.settingsSectionDesc}>Track platform-wide traffic and user behavior.</p>
              <div className={styles.settingsForm}>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Measurement ID</label>
                  <input type="text" placeholder="G-XXXXXXXXXX" className={styles.adminInput} />
                </div>
                <label className={styles.toggleLabel}>
                  <div className={styles.toggleSwitch}>
                    <input type="checkbox" />
                    <span className={styles.toggleSlider}></span>
                  </div>
                  Enable tracking
                </label>
              </div>
            </div>
          </div>

        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Stripe */}
          <div className={styles.panel}>
            <div className={styles.panelHeader} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CreditCard className="w-5 h-5 text-zinc-500" />
              <h3 className={styles.panelTitle}>Stripe Billing</h3>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <p className={styles.settingsSectionDesc}>Accept payments and manage subscriptions for premium users.</p>
              <div className={styles.settingsForm}>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Publishable Key</label>
                  <input type="text" placeholder="pk_test_..." className={styles.adminInput} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Secret Key</label>
                  <input type="password" placeholder="sk_test_..." className={styles.adminInput} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Webhook Secret</label>
                  <input type="password" placeholder="whsec_..." className={styles.adminInput} />
                </div>
              </div>
            </div>
          </div>

          {/* Webhooks */}
          <div className={styles.panel}>
            <div className={styles.panelHeader} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Webhook className="w-5 h-5 text-zinc-500" />
              <h3 className={styles.panelTitle}>Global Webhooks</h3>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <p className={styles.settingsSectionDesc}>Send platform events to external services (e.g., Zapier, Make).</p>
              <div className={styles.settingsForm}>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Endpoint URL</label>
                  <input type="url" placeholder="https://hooks.zapier.com/..." className={styles.adminInput} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Events to send</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <input type="checkbox" defaultChecked /> User Registered
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <input type="checkbox" defaultChecked /> Waitlist Created
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <input type="checkbox" /> Subscription Upgraded
                    </label>
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
