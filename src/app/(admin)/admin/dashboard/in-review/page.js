'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  FiArrowLeft, FiClock, FiFileText, FiShield, 
  FiBriefcase, FiRefreshCw, FiExternalLink, FiUser, 
  FiPhone, FiMail, FiSend, FiMessageSquare, FiEye, FiCheckCircle, FiXCircle
} from 'react-icons/fi';
import Link from 'next/link';

export default function AdminInReviewPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [inReviewRequests, setInReviewRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Admin Action Form States
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [replyStatus, setReplyStatus] = useState('Approved'); // Default Next Step: Approved
  const [replyFile, setReplyFile] = useState(null);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // 📥 Fetch only "In Review" Applications
  const fetchInReviewRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/requests');
      const result = await response.json();
      if (response.ok && result.success) {
        const reviewOnly = (result.data || []).filter(r => r.status === 'In Review');
        setInReviewRequests(reviewOnly);
      }
    } catch (err) {
      console.error('Fetch In-Review Requests Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchInReviewRequests();
    }
  }, [status]);

  const openReplyBox = (req) => {
    setActiveReplyId(req._id);
    setReplyStatus('Approved');
    setReplyMessage(req.adminReply?.message || '');
    setReplyFile(null);
  };

  // 🚀 SUBMIT DECISION (APPROVE OR REJECT)
  const handleAdminDecisionSubmit = async (requestId) => {
    setIsSubmittingReply(true);

    let uploadedAdminDoc = { name: '', url: '' };

    // 1. Upload S3 PDF if attached by Admin
    if (replyFile) {
      try {
        const uploadPayload = new FormData();
        uploadPayload.append('file', replyFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadPayload
        });

        const uploadResult = await uploadRes.json();
        if (uploadRes.ok && uploadResult.success) {
          uploadedAdminDoc = {
            name: uploadResult.name || replyFile.name,
            url: uploadResult.fileUrl || uploadResult.url
          };
        }
      } catch (uploadErr) {
        alert("Admin file upload error: " + uploadErr.message);
        setIsSubmittingReply(false);
        return;
      }
    }

    // 2. Patch to Central Database
    try {
      const response = await fetch('/api/requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          status: replyStatus,
          adminMessage: replyMessage,
          adminDocument: uploadedAdminDoc.url ? uploadedAdminDoc : undefined
        })
      });

      const result = await response.json();
      if (response.ok && result.success) {
        alert(`Status changed to [${replyStatus}]! Item shifted out of In-Review desk.`);
        
        // ⚡ Turant In-Review list se remove kar do
        setInReviewRequests(prev => prev.filter(req => req._id !== requestId));
        setActiveReplyId(null);
      } else {
        alert(result.message || 'Update failed');
      }
    } catch (err) {
      alert('Error updating status decision');
    } finally {
      setIsSubmittingReply(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center gap-3 font-sans">
        <FiRefreshCw className="w-6 h-6 text-indigo-600 animate-spin" />
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Loading In-Review Desk...</span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 antialiased py-8 md:py-12 px-4 md:px-8 font-sans flex flex-col items-center select-none">
      <div className="w-full max-w-5xl space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-100 p-6 rounded-3xl shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <Link href="/admin/dashboard/requests" className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-950 transition-all">
                <FiArrowLeft size={16} />
              </Link>
              <div>
                <h1 className="text-lg md:text-xl font-black text-indigo-600 uppercase tracking-tight flex items-center gap-2">
                  <FiEye size={20} /> IN-REVIEW APPLICATIONS DESK
                </h1>
                <p className="text-xs font-bold text-slate-400">
                  Applications currently under verification: <span className="text-indigo-600 font-black">{inReviewRequests.length}</span>
                </p>
              </div>
            </div>
          </div>

          <button onClick={fetchInReviewRequests} disabled={loading} className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-2xl uppercase tracking-wider transition-all cursor-pointer shadow-xs">
            <FiRefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Sync Desk</span>
          </button>
        </div>

        {/* Listing Cards */}
        {inReviewRequests.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center space-y-3 shadow-xs">
            <FiFileText className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-black text-slate-800 uppercase">No Applications In Review</h3>
            <p className="text-xs text-slate-400 font-medium">Saare applications verify ho chuke hain.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {inReviewRequests.map((req) => (
              <div key={req._id} className="bg-white border border-indigo-100 rounded-3xl p-6 shadow-xs space-y-5 hover:border-indigo-200 transition-all">
                
                {/* Header Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
                  <span className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border ${
                    req.serviceType === 'Property Vetting' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                  }`}>
                    {req.serviceType === 'Property Vetting' ? <FiShield size={13} /> : <FiBriefcase size={13} />}
                    {req.serviceType === 'Property Vetting' ? 'Property Paper Check' : 'Loan Solution'}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-600 border border-indigo-200">
                      ● Under Active Review
                    </span>

                    <button 
                      onClick={() => openReplyBox(req)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white font-black text-[10px] rounded-xl uppercase tracking-wider transition-all cursor-pointer shadow-3xs"
                    >
                      <FiMessageSquare size={13} /> Change Status / Final Decision
                    </button>
                  </div>
                </div>

                {/* Info Payload */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-xs">
                  <div className="md:col-span-4 bg-slate-50/70 p-4 rounded-2xl border border-slate-100 space-y-2">
                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block">CLIENT DETAILS</span>
                    <p className="font-black text-slate-900 flex items-center gap-2"><FiUser size={14} className="text-indigo-600" /> {req.userName || 'Anonymous'}</p>
                    <p className="font-bold text-slate-600 flex items-center gap-2 font-mono text-[11px]"><FiMail size={13} className="text-slate-400" /> {req.userEmail || 'N/A'}</p>
                    {req.userPhone && <p className="font-bold text-slate-600 flex items-center gap-2 font-mono text-[11px]"><FiPhone size={13} className="text-slate-400" /> {req.userPhone}</p>}
                  </div>

                  <div className="md:col-span-8 bg-slate-50/70 p-4 rounded-2xl border border-slate-100 space-y-2">
                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block">SUBMISSION PAYLOAD</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {req.details?.ownerName && <div><span className="text-[9px] text-slate-400 font-bold block uppercase">Owner Name</span><p className="font-bold text-slate-900">{req.details.ownerName}</p></div>}
                      {req.details?.propertyLocation && <div><span className="text-[9px] text-slate-400 font-bold block uppercase">Location / Khasra No</span><p className="font-bold text-slate-900">{req.details.propertyLocation}</p></div>}
                      {req.details?.bankName && <div><span className="text-[9px] text-slate-400 font-bold block uppercase">Bank Name</span><p className="font-bold text-slate-900">{req.details.bankName}</p></div>}
                      {req.details?.loanAmount > 0 && <div><span className="text-[9px] text-slate-400 font-bold block uppercase">Loan Amount</span><p className="font-bold text-slate-900 font-mono">₹{req.details.loanAmount?.toLocaleString('en-IN')}</p></div>}
                    </div>

                    {req.documentsList && req.documentsList.length > 0 && (
                      <div className="pt-2 border-t border-slate-200/60 flex items-center gap-2 flex-wrap">
                        <span className="text-[9px] text-slate-400 font-black uppercase block">Client Papers ({req.documentsList.length}):</span>
                        {req.documentsList.map((doc, idx) => (
                          <a key={idx} href={doc.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-white border border-slate-200 px-3 py-1 rounded-xl text-[10px] font-bold text-indigo-600">
                            <FiFileText size={12} /> <span className="truncate max-w-[120px]">{doc.name}</span> <FiExternalLink size={11} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* ACTION DECISION MODAL */}
                {activeReplyId === req._id && (
                  <div className="bg-slate-950 text-white p-6 rounded-3xl space-y-4 animate-fadeIn border border-slate-800">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <h4 className="text-xs font-black uppercase tracking-wider text-indigo-400">CHANGE STATUS & DISPATCH DECISION</h4>
                      <button onClick={() => setActiveReplyId(null)} className="text-slate-400 hover:text-white text-xs font-bold">Cancel</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* STATUS DECISION SELECTOR */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400">Select Final Decision</label>
                        <select 
                          value={replyStatus} 
                          onChange={(e) => setReplyStatus(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold text-white outline-none"
                        >
                          <option value="Approved">Approve (Send to Approved Archive)</option>
                          <option value="Rejected">Reject (Send to Rejected Archive)</option>
                        </select>
                      </div>

                      {/* FILE ATTACHMENT */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400">Attach Verified PDF / Decision Paper</label>
                        <input 
                          type="file" 
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={(e) => setReplyFile(e.target.files[0])}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-300 outline-none cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-400">Action Guidance Message / Remarks</label>
                      <textarea 
                        rows={3} 
                        placeholder="Client ke liye detailed action message likhein..."
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none resize-none"
                      />
                    </div>

                    <button 
                      onClick={() => handleAdminDecisionSubmit(req._id)}
                      disabled={isSubmittingReply}
                      className={`w-full font-black text-xs py-3.5 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        replyStatus === 'Rejected' 
                          ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {isSubmittingReply ? 'Processing Decision...' : (
                        replyStatus === 'Rejected' 
                          ? <><FiXCircle size={15} /> Confirm Reject & Move Item</>
                          : <><FiCheckCircle size={15} /> Confirm Approve & Move Item</>
                      )}
                    </button>
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