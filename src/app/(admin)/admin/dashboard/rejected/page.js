'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  FiArrowLeft, FiClock, FiFileText, FiShield, 
  FiBriefcase, FiRefreshCw, FiExternalLink, FiUser, 
  FiPhone, FiMail, FiSend, FiMessageSquare, FiXCircle, FiEye, FiDownload, FiCheckCircle
} from 'react-icons/fi';
import Link from 'next/link';

export default function AdminRejectedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Admin Decision Drawer States
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [replyStatus, setReplyStatus] = useState('Rejected');
  const [replyFile, setReplyFile] = useState(null);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const fetchRejectedRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/requests');
      const result = await response.json();
      if (response.ok && result.success) {
        const rejectedOnly = (result.data || []).filter(r => r.status === 'Rejected');
        setRejectedRequests(rejectedOnly);
      }
    } catch (err) {
      console.error('Fetch Rejected Requests Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchRejectedRequests();
    }
  }, [status]);

  // 📥 FORCE DOWNLOAD S3 DOCUMENT
  const triggerForceDownload = async (fileUrl, fileName) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName || 'Rejected_Application_Slip.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
      window.open(fileUrl, '_blank');
    }
  };

  const openReplyBox = (req) => {
    setActiveReplyId(req._id);
    setReplyStatus('Rejected');
    setReplyMessage(req.adminReply?.message || '');
    setReplyFile(null);
  };

  const handleAdminDecisionSubmit = async (requestId) => {
    setIsSubmittingReply(true);
    let uploadedAdminDoc = { name: '', url: '' };

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
        alert(`Status updated to [${replyStatus}]!`);
        if (replyStatus !== 'Rejected') {
          setRejectedRequests(prev => prev.filter(req => req._id !== requestId));
        } else {
          fetchRejectedRequests();
        }
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
        <FiRefreshCw className="w-6 h-6 text-rose-600 animate-spin" />
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Loading Rejected Archive...</span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 antialiased py-8 md:py-12 px-4 md:px-8 font-sans flex flex-col items-center select-none">
      <div className="w-full max-w-5xl space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-100 p-6 rounded-3xl shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <Link href="/admin/dashboard/requests" className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-500 transition-all">
                <FiArrowLeft size={16} />
              </Link>
              <div>
                <h1 className="text-lg md:text-xl font-black text-rose-600 uppercase tracking-tight flex items-center gap-2">
                  <FiXCircle size={20} /> REJECTED APPLICATIONS ARCHIVE
                </h1>
                <p className="text-xs font-bold text-slate-400">
                  Total Rejected Records: <span className="text-rose-600 font-black">{rejectedRequests.length}</span>
                </p>
              </div>
            </div>
          </div>

          <button onClick={fetchRejectedRequests} disabled={loading} className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-2xl uppercase tracking-wider transition-all cursor-pointer shadow-xs">
            <FiRefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Sync Ledger</span>
          </button>
        </div>

        {/* Listing */}
        {rejectedRequests.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center space-y-3 shadow-xs">
            <FiFileText className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-black text-slate-800 uppercase">No Rejected Records</h3>
          </div>
        ) : (
          <div className="space-y-5">
            {rejectedRequests.map((req) => (
              <div key={req._id} className="bg-white border border-rose-100 rounded-3xl p-6 shadow-xs space-y-5 hover:border-rose-200 transition-all">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
                  <span className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border ${
                    req.serviceType === 'Property Vetting' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                  }`}>
                    {req.serviceType === 'Property Vetting' ? <FiShield size={13} /> : <FiBriefcase size={13} />}
                    {req.serviceType === 'Property Vetting' ? 'Property Paper Check' : 'Loan Solution'}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200">
                      ● Rejected
                    </span>

                    <button onClick={() => openReplyBox(req)} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-rose-600 text-white font-black text-[10px] rounded-xl uppercase transition-all cursor-pointer">
                      <FiMessageSquare size={13} /> Re-evaluate Decision
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-xs">
                  <div className="md:col-span-4 bg-slate-50/70 p-4 rounded-2xl border border-slate-100 space-y-2">
                    <span className="text-[9px] text-slate-400 font-black uppercase block">CLIENT DETAILS</span>
                    <p className="font-black text-slate-900 flex items-center gap-2"><FiUser size={14} className="text-rose-600" /> {req.userName || 'Anonymous'}</p>
                    <p className="font-bold text-slate-600 flex items-center gap-2 font-mono text-[11px]"><FiMail size={13} className="text-slate-400" /> {req.userEmail || 'N/A'}</p>
                    {req.userPhone && <p className="font-bold text-slate-600 flex items-center gap-2 font-mono text-[11px]"><FiPhone size={13} className="text-slate-400" /> {req.userPhone}</p>}
                  </div>

                  <div className="md:col-span-8 bg-slate-50/70 p-4 rounded-2xl border border-slate-100 space-y-2">
                    <span className="text-[9px] text-slate-400 font-black uppercase block">PAYLOAD DETAILS</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {req.details?.ownerName && <div><span className="text-[9px] text-slate-400 font-bold block uppercase">Owner Name</span><p className="font-bold text-slate-900">{req.details.ownerName}</p></div>}
                      {req.details?.propertyLocation && <div><span className="text-[9px] text-slate-400 font-bold block uppercase">Location / Khasra No</span><p className="font-bold text-slate-900">{req.details.propertyLocation}</p></div>}
                      {req.details?.bankName && <div><span className="text-[9px] text-slate-400 font-bold block uppercase">Bank Name</span><p className="font-bold text-slate-900">{req.details.bankName}</p></div>}
                      {req.details?.loanAmount > 0 && <div><span className="text-[9px] text-slate-400 font-bold block uppercase">Loan Amount</span><p className="font-bold text-slate-900 font-mono">₹{req.details.loanAmount?.toLocaleString('en-IN')}</p></div>}
                    </div>

                    {/* Client Papers VIEW + DOWNLOAD */}
                    {req.documentsList && req.documentsList.length > 0 && (
                      <div className="pt-2 border-t border-slate-200/60 flex items-center gap-2 flex-wrap">
                        <span className="text-[9px] text-slate-400 font-black uppercase block">Client Papers:</span>
                        {req.documentsList.map((doc, idx) => (
                          <div key={idx} className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-xl text-[10px] font-bold text-indigo-600">
                            <FiFileText size={12} />
                            <span className="truncate max-w-[120px]">{doc.name}</span>
                            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800" title="View"><FiEye size={12} /></a>
                            <button onClick={() => triggerForceDownload(doc.url, doc.name)} className="text-slate-600 hover:text-slate-900 cursor-pointer" title="Download"><FiDownload size={12} /></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Sent Rejection Reason Display */}
                {req.adminReply?.message && (
                  <div className="bg-rose-50/80 border border-rose-200 p-4 rounded-2xl space-y-2">
                    <span className="text-[9px] font-black text-rose-700 uppercase tracking-widest block">SENT REJECTION REASON & SLIP</span>
                    <p className="text-xs font-bold text-slate-800">"{req.adminReply.message}"</p>
                    {req.adminReply.document?.url && (
                      <div className="flex items-center gap-2 pt-1">
                        <a href={req.adminReply.document.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-rose-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase">
                          <FiEye size={12} /> View Reason PDF
                        </a>
                        <button onClick={() => triggerForceDownload(req.adminReply.document.url, req.adminReply.document.name || 'Rejection_Slip.pdf')} className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase cursor-pointer">
                          <FiDownload size={12} /> Download PDF
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Re-evaluate Modal */}
                {activeReplyId === req._id && (
                  <div className="bg-slate-950 text-white p-6 rounded-3xl space-y-4 border border-slate-800">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <h4 className="text-xs font-black uppercase text-indigo-400">CHANGE DECISION FROM REJECTED</h4>
                      <button onClick={() => setActiveReplyId(null)} className="text-slate-400 text-xs font-bold">Cancel</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400">Target Status</label>
                        <select value={replyStatus} onChange={(e) => setReplyStatus(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold text-white outline-none">
                          <option value="Rejected">Keep Rejected</option>
                          <option value="In Review">Move to In Review Desk</option>
                          <option value="Approved">Approve & Move to Approved Archive</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400">Attach Certificate / Reason Slip</label>
                        <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={(e) => setReplyFile(e.target.files[0])} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-300 outline-none cursor-pointer" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-400">Update Message</label>
                      <textarea rows={3} value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none resize-none" />
                    </div>

                    <button onClick={() => handleAdminDecisionSubmit(req._id)} disabled={isSubmittingReply} className="w-full bg-indigo-600 hover:bg-indigo-500 font-black text-xs py-3.5 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer">
                      {isSubmittingReply ? 'Updating...' : <><FiSend size={14} /> Update Decision & Move Item</>}
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