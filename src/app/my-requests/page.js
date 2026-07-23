'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  FiArrowLeft, FiClock, FiFileText, 
  FiShield, FiBriefcase, FiRefreshCw, FiExternalLink, FiLock, FiLogIn, FiUser
} from 'react-icons/fi';
import Link from 'next/link';

export default function MyRequestsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const fetchMyRequests = async () => {
    if (!session?.user?.email) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/requests?email=${encodeURIComponent(session.user.email)}`);
      const result = await response.json();
      if (response.ok && result.success) {
        setRequests(result.data || []);
      }
    } catch (err) {
      console.error('Fetch My Requests Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      fetchMyRequests();
    }
  }, [status, session]);

  if (status === 'loading' || (status === 'authenticated' && loading)) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center gap-3 font-sans">
        <FiRefreshCw className="w-6 h-6 text-indigo-600 animate-spin" />
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Loading Ledger...</span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 antialiased py-8 md:py-14 px-4 md:px-8 font-sans flex flex-col items-center select-none">
      <div className="w-full max-w-4xl space-y-8">
        
        {/* Navigation */}
        <div className="flex items-center justify-between px-1">
          <Link href="/" className="inline-flex items-center gap-2 text-[11px] font-black text-slate-400 hover:text-slate-950 uppercase tracking-widest transition-all">
            <FiArrowLeft className="w-3.5 h-3.5" /> Back to Console
          </Link>
          <button onClick={fetchMyRequests} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-700 hover:bg-slate-50 uppercase tracking-wider shadow-3xs cursor-pointer">
            <FiRefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            <span>Sync Ledger</span>
          </button>
        </div>

        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black text-slate-950 uppercase tracking-tight">MY REQUESTS LEDGER</h2>
            <p className="text-xs text-slate-400 font-bold">
              Account: <span className="text-indigo-600 font-black">{session?.user?.email}</span>
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-wider self-start sm:self-auto">
            <FiUser size={12} className="text-indigo-400" />
            <span>{session?.user?.name || 'Verified Member'}</span>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center space-y-4 shadow-xs">
            <FiFileText className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-black text-slate-900 uppercase">No Requests Found</h3>
          </div>
        ) : (
          <div className="space-y-5">
            {requests.map((req) => (
              <div key={req._id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-5 hover:border-slate-200 transition-all">
                
                {/* Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
                  <span className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border ${
                    req.serviceType === 'Property Vetting' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                  }`}>
                    {req.serviceType === 'Property Vetting' ? <FiShield size={13} /> : <FiBriefcase size={13} />}
                    {req.serviceType === 'Property Vetting' ? 'Property Paper Check' : 'Loan Solution'}
                  </span>

                  <span className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                    req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                    req.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                    'bg-amber-50 text-amber-600 border border-amber-100'
                  }`}>
                    ● {req.status || 'Pending'}
                  </span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-[9px] text-slate-400 font-black uppercase block">Applicant / Owner</span>
                    <p className="font-bold text-slate-900">{req.userName || 'N/A'}</p>
                  </div>
                  {req.details?.propertyLocation && <div><span className="text-[9px] text-slate-400 font-black uppercase block">Property Location</span><p className="font-bold text-slate-900">{req.details.propertyLocation}</p></div>}
                  {req.details?.bankName && <div><span className="text-[9px] text-slate-400 font-black uppercase block">Bank Name</span><p className="font-bold text-slate-900">{req.details.bankName}</p></div>}
                  {req.details?.loanAmount > 0 && <div><span className="text-[9px] text-slate-400 font-black uppercase block">Loan Amount</span><p className="font-bold text-slate-900 font-mono">₹{req.details.loanAmount?.toLocaleString('en-IN')}</p></div>}
                </div>

                {/* Uploaded Documents Direct Link */}
                {req.documentsList && req.documentsList.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Your Uploaded AWS S3 Papers ({req.documentsList.length})</span>
                    <div className="flex flex-wrap gap-2">
                      {req.documentsList.map((doc, idx) => (
                        <a key={idx} href={doc.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-[11px] font-bold text-indigo-600 hover:bg-slate-100 transition-all">
                          <FiFileText size={12} />
                          <span className="truncate max-w-[140px]">{doc.name}</span>
                          <FiExternalLink size={12} className="text-slate-400" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Admin Reply Display */}
                {req.adminReply?.message && (
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl space-y-2">
                    <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest block">ADMIN RESPONSE & NEXT STEPS</span>
                    <p className="text-xs font-bold text-slate-800">"{req.adminReply.message}"</p>
                    {req.adminReply.document?.url && (
                      <div className="pt-1">
                        <a href={req.adminReply.document.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all">
                          <FiFileText size={13} />
                          <span>View / Download Approved Paper</span>
                          <FiExternalLink size={12} />
                        </a>
                      </div>
                    )}
                  </div>
                )}

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}