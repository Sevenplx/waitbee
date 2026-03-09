import React from 'react';
import Link from 'next/link';
import { 
  Home, 
  Users, 
  Settings, 
  BarChart3, 
  Link as LinkIcon, 
  Wrench, 
  UserCircle,
  Bell,
  Rocket
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col fixed h-full">
        <div className="p-6 border-b border-zinc-200 flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">Owner Portal</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            <li>
              <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-zinc-100 text-zinc-900">
                <Home className="w-4 h-4" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
                <Users className="w-4 h-4" />
                Users
              </Link>
            </li>
            <li>
              <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
                <Settings className="w-4 h-4" />
                Platform Settings
              </Link>
            </li>
            <li>
              <Link href="/admin/analytics" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </Link>
            </li>
            <li>
              <Link href="/admin/integrations" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
                <LinkIcon className="w-4 h-4" />
                Integrations
              </Link>
            </li>
            <li>
              <Link href="/admin/tools" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
                <Wrench className="w-4 h-4" />
                Tools & Alerts
              </Link>
            </li>
          </ul>

          <div className="mt-8 px-6 mb-2">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Administration</h3>
          </div>
          <ul className="space-y-1 px-3">
            <li>
              <Link href="/admin/admins" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
                <UserCircle className="w-4 h-4" />
                Manage Admins
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-zinc-200">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600 font-medium text-sm">
              OW
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-900">Owner</span>
              <span className="text-xs text-zinc-500">admin@site.com</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96">
              <input 
                type="text" 
                placeholder="Search users, waitlists..." 
                className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
              />
              <svg className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-6 w-px bg-zinc-200"></div>
            <button className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
              Sign Out
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
