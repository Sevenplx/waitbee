'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, 
  Users, 
  Settings, 
  BarChart3, 
  Link as LinkIcon, 
  Wrench, 
  UserCircle,
  Bell,
  Rocket,
  Search,
  Menu,
  ChevronLeft
} from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin-login');
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoIcon}>
            <Rocket className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && <span className={styles.brandName}>Owner Portal</span>}
          <button 
            className={styles.collapseBtn} 
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className={styles.navMenu}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <Link href="/admin" className={`${styles.navItem} ${pathname === '/admin' ? styles.navItemActive : ''}`} title="Dashboard">
                <Home className="w-4 h-4" />
                {!isCollapsed && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className={`${styles.navItem} ${pathname === '/admin/users' ? styles.navItemActive : ''}`} title="Users">
                <Users className="w-4 h-4" />
                {!isCollapsed && <span>Users</span>}
              </Link>
            </li>
            <li>
              <Link href="/admin/settings" className={`${styles.navItem} ${pathname === '/admin/settings' ? styles.navItemActive : ''}`} title="Platform Settings">
                <Settings className="w-4 h-4" />
                {!isCollapsed && <span>Platform Settings</span>}
              </Link>
            </li>
            <li>
              <Link href="/admin/analytics" className={`${styles.navItem} ${pathname === '/admin/analytics' ? styles.navItemActive : ''}`} title="Analytics">
                <BarChart3 className="w-4 h-4" />
                {!isCollapsed && <span>Analytics</span>}
              </Link>
            </li>
            <li>
              <Link href="/admin/integrations" className={`${styles.navItem} ${pathname === '/admin/integrations' ? styles.navItemActive : ''}`} title="Integrations">
                <LinkIcon className="w-4 h-4" />
                {!isCollapsed && <span>Integrations</span>}
              </Link>
            </li>
            <li>
              <Link href="/admin/tools" className={`${styles.navItem} ${pathname === '/admin/tools' ? styles.navItemActive : ''}`} title="Tools & Alerts">
                <Wrench className="w-4 h-4" />
                {!isCollapsed && <span>Tools & Alerts</span>}
              </Link>
            </li>
          </ul>

          <div className={styles.navSectionTitle}>
            {!isCollapsed ? 'Administration' : 'Admin'}
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <Link href="/admin/admins" className={`${styles.navItem} ${pathname === '/admin/admins' ? styles.navItemActive : ''}`} title="Manage Admins">
                <UserCircle className="w-4 h-4" />
                {!isCollapsed && <span>Manage Admins</span>}
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.avatar}>
            OW
          </div>
          {!isCollapsed && (
            <div className={styles.userInfo}>
              <span className={styles.userName}>Owner</span>
              <span className={styles.userEmail}>admin@site.com</span>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${styles.mainContent} ${isCollapsed ? styles.mainContentExpanded : ''}`}>
        {/* Top Header */}
        <header className={styles.topBar}>
          <div className={styles.searchBar}>
            <Search className={styles.searchIcon} size={16} />
            <input 
              type="text" 
              placeholder="Search users, waitlists..." 
              className={styles.searchInput}
            />
          </div>

          <div className={styles.topBarActions}>
            <button className={styles.iconButton}>
              <Bell className="w-5 h-5" />
              <span className={styles.badge}></span>
            </button>
            <div style={{ height: '24px', width: '1px', backgroundColor: '#e5e5e5' }}></div>
            <button onClick={handleLogout} className={styles.signOutBtn}>
              Sign Out
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className={styles.pageContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
