'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Activity, TrendingUp, DollarSign, List, ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/Button';

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
        // In a real app, this would be an API call
        // const response = await fetch('/api/admin/stats');
        // const data = await response.json();
        
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
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-zinc-500 text-sm mt-1">Welcome back. Here's what's happening on your platform today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">Download Report</Button>
          <Button size="sm" className="bg-black hover:bg-zinc-800 text-white">View Analytics</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-zinc-500">Total Users</span>
            <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-zinc-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">{stats?.totalUsers.toLocaleString()}</h2>
            <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              12%
            </span>
          </div>
        </div>

        {/* Active Waitlists */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-zinc-500">Active Waitlists</span>
            <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
              <List className="w-4 h-4 text-zinc-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">{stats?.activeWaitlists}</h2>
            <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              4%
            </span>
          </div>
        </div>

        {/* Traffic Summary */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-zinc-500">Traffic Summary (30d)</span>
            <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-zinc-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">{stats?.trafficSummary}</h2>
            <span className="flex items-center text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
              <ArrowDownRight className="w-3 h-3 mr-1" />
              2%
            </span>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-zinc-500">Revenue (MRR)</span>
            <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-zinc-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">{stats?.revenue}</h2>
            <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              18%
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-zinc-200 flex items-center justify-between">
            <h3 className="font-semibold text-zinc-900">Recent Activity</h3>
            <button className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">View All</button>
          </div>
          <div className="divide-y divide-zinc-100">
            {[
              { action: 'New user registered', details: 'john@example.com signed up for Pro plan', time: '2 mins ago', icon: Users },
              { action: 'Waitlist created', details: 'Acme SaaS waitlist launched', time: '1 hour ago', icon: List },
              { action: 'System alert', details: 'Database backup completed successfully', time: '3 hours ago', icon: Activity },
              { action: 'Subscription upgraded', details: 'jane@example.com upgraded to Enterprise', time: '5 hours ago', icon: TrendingUp },
            ].map((item, i) => (
              <div key={i} className="px-6 py-4 flex items-start gap-4 hover:bg-zinc-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="w-4 h-4 text-zinc-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-900">{item.action}</p>
                  <p className="text-sm text-zinc-500 truncate">{item.details}</p>
                </div>
                <span className="text-xs text-zinc-400 whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-zinc-200">
            <h3 className="font-semibold text-zinc-900">Quick Actions</h3>
          </div>
          <div className="p-4 space-y-2">
            <button className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:text-black transition-colors flex items-center justify-between group">
              Manage Users
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:text-black transition-colors flex items-center justify-between group">
              Edit Landing Page
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:text-black transition-colors flex items-center justify-between group">
              Send Announcement
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:text-black transition-colors flex items-center justify-between group">
              System Logs
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
