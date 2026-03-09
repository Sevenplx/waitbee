'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Users, Mail, Calendar, Trash2, LogOut, Rocket, Loader2 } from 'lucide-react';
import { Button } from '@/components/Button';

interface WaitlistEntry {
  id: string;
  email: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch('/api/admin/list');
        if (response.ok) {
          const data = await response.json();
          setEntries(data.entries);
        } else if (response.status === 401) {
          router.push('/admin-login');
        }
      } catch (err) {
        console.error('Failed to fetch entries');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, [router]);

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,Joined At\n"
      + entries.map(e => `${e.email},${new Date(e.createdAt).toLocaleString()}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `waitlist_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/admin-login');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    try {
      const response = await fetch(`/api/admin/entries/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setEntries(entries.filter(e => e.id !== id));
      } else {
        alert('Failed to delete entry');
      }
    } catch (err) {
      alert('Something went wrong');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span>Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleLogout} icon={<LogOut className="w-4 h-4" />}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-zinc-600" />
              </div>
              <span className="text-zinc-500 font-medium">Total Signups</span>
            </div>
            <div className="text-4xl font-bold tracking-tight">{entries.length}</div>
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-200 flex justify-between items-center bg-zinc-50/50">
            <h2 className="font-bold text-lg">Email List</h2>
            <Button variant="secondary" size="sm" onClick={handleExport} icon={<Download className="w-4 h-4" />}>
              Export CSV
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-zinc-400 text-xs font-semibold uppercase tracking-wider border-b border-zinc-100">
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Joined At</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {entries.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-zinc-400">
                      No signups yet.
                    </td>
                  </tr>
                ) : (
                  entries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="px-6 py-4 font-medium flex items-center gap-3">
                        <Mail className="w-4 h-4 text-zinc-300" />
                        {entry.email}
                      </td>
                      <td className="px-6 py-4 text-zinc-500 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-zinc-300" />
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleDelete(entry.id)}
                          className="text-zinc-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
