'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  FiArrowLeft, FiBell, FiCheck, FiClock, 
  FiExternalLink, FiRefreshCw, FiShield, FiBriefcase, FiUser 
} from 'react-icons/fi';
import Link from 'next/link';

export default function AdminNotificationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const fetchAdminNotifications = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/notifications?email=ADMIN');
      const result = await response.json();
      if (response.ok && result.success) {
        setNotifications(result.data || []);
      }
    } catch (err) {
      console.error('Fetch Admin Notifications Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchAdminNotifications();
    }
  }, [status]);

  const handleNotificationClick = async (notif) => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId: notif._id })
      });
    } catch (e) {
      console.error(e);
    }
    router.push(notif.targetUrl || '/admin/dashboard/requests');
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center gap-3 font-sans">
        <FiRefreshCw className="w-6 h-6 text-indigo-600 animate-spin" />
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Loading Admin Notifications...</span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 antialiased py-8 md:py-12 px-4 md:px-8 font-sans flex flex-col items-center select-none">
      <div className="w-full max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-100 p-6 rounded-3xl shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <Link href="/admin/dashboard/requests" className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-500 transition-all">
                <FiArrowLeft size={16} />
              </Link>
              <div>
                <h1 className="text-lg md:text-xl font-black text-slate-950 uppercase tracking-tight flex items-center gap-2">
                  <FiBell size={20} className="text-indigo-600" /> ADMIN NOTIFICATION STUDIO
                </h1>
                <p className="text-xs font-bold text-slate-400">
                  Client Application Submission Alerts: <span className="text-indigo-600 font-black">{notifications.length}</span>
                </p>
              </div>
            </div>
          </div>

          <button onClick={fetchAdminNotifications} disabled={loading} className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-950 hover:bg-slate-800 text-white font-black text-xs rounded-2xl uppercase tracking-wider transition-all cursor-pointer">
            <FiRefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Sync Alerts</span>
          </button>
        </div>

        {/* List */}
        {notifications.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center space-y-3 shadow-xs">
            <FiBell className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-black text-slate-800 uppercase">No Admin Notifications</h3>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div 
                key={notif._id}
                onClick={() => handleNotificationClick(notif)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer space-y-2 flex items-start justify-between gap-4 ${
                  notif.isRead 
                    ? 'bg-white border-slate-100 hover:border-slate-200 shadow-2xs' 
                    : 'bg-indigo-50/70 border-indigo-200 shadow-xs hover:border-indigo-300 ring-1 ring-indigo-200'
                }`}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1 ${
                      notif.serviceType === 'Property Vetting' ? 'bg-indigo-100 text-indigo-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {notif.serviceType === 'Property Vetting' ? <FiShield size={10} /> : <FiBriefcase size={10} />}
                      {notif.serviceType}
                    </span>

                    {!notif.isRead && (
                      <span className="px-2 py-0.5 bg-rose-500 text-white text-[8px] font-black uppercase rounded-md tracking-wider">NEW REQUEST</span>
                    )}
                  </div>

                  <h4 className="text-xs font-black text-slate-900">{notif.title}</h4>
                  <p className="text-xs text-slate-600 font-medium">{notif.message}</p>
                  
                  <span className="text-[9px] font-bold text-slate-400 font-mono block pt-1">
                    {new Date(notif.createdAt).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="text-indigo-600 self-center">
                  <FiExternalLink size={16} />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}