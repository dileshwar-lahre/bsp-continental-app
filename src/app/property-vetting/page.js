'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  FiArrowLeft, FiFileText, FiUpload, 
  FiX, FiCheck, FiUser, FiMapPin, FiShield, FiAlertCircle, FiLock, FiLogIn 
} from 'react-icons/fi';
import Link from 'next/link';

export default function PropertyVettingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    ownerName: '',
    userPhone: '',
    propertyLocation: '',
    customMessage: ''
  });

  useEffect(() => {
    if (session?.user?.name) {
      setFormData(prev => ({ ...prev, ownerName: session.user.name }));
    }
  }, [session]);
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, msg: '' });

  const handleFileSelection = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const mapped = files.map(file => ({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      fileObject: file
    }));

    setSelectedFiles(prev => [...prev, ...mapped]);
    e.target.value = ''; 
  };

  const removeFileFromQueue = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleVettingSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user?.email) {
      setSubmitStatus({
        success: false,
        msg: 'Aap logged in nahi hain! Kripya pehle login karein.'
      });
      setTimeout(() => router.push('/login'), 1500);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ success: false, msg: '' });

    const finalUploadedUrls = [];
    let uploadFailed = false;

    if (selectedFiles.length > 0) {
      for (const fileItem of selectedFiles) {
        try {
          const uploadPayload = new FormData();
          uploadPayload.append('file', fileItem.fileObject);

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: uploadPayload
          });

          const result = await response.json();
          if (!response.ok || !result.success) throw new Error(result.error || `Upload failed`);

          finalUploadedUrls.push({ 
            name: result.name || fileItem.name, 
            url: result.fileUrl || result.url, 
            size: fileItem.size 
          });

        } catch (err) {
          uploadFailed = true;
          setIsSubmitting(false);
          setSubmitStatus({ success: false, msg: `AWS Upload failed: ${err.message}` });
          break;
        }
      }
    }

    if (uploadFailed) return;

    try {
      const dbResponse = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: formData.ownerName || session.user.name || "Owner",
          userEmail: session.user.email, // Logged in user email
          userPhone: formData.userPhone,
          serviceType: "Property Vetting",
          details: {
            ownerName: formData.ownerName,
            propertyLocation: formData.propertyLocation,
            customMessage: formData.customMessage
          },
          documentsList: finalUploadedUrls,
          status: "Pending"
        })
      });

      const dbResult = await dbResponse.json();
      if (!dbResponse.ok || !dbResult.success) throw new Error(dbResult.message || "DB transaction fault.");

      setIsSubmitting(false);
      setSubmitStatus({ success: true, msg: 'Property Vetting request submitted! Redirecting to your requests ledger...' });

      setFormData({ ownerName: '', userPhone: '', propertyLocation: '', customMessage: '' });
      setSelectedFiles([]);

      setTimeout(() => router.push('/my-requests'), 1500);

    } catch (dbError) {
      setIsSubmitting(false);
      setSubmitStatus({ success: false, msg: `Database error: ${dbError.message}` });
    }
  };

  // 🔒 AUTH GUARD FOR NON-LOGGED IN USERS
  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center px-4 font-sans text-center">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 max-w-md w-full shadow-xs space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <FiLock size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 uppercase">Login Required</h3>
            <p className="text-xs font-semibold text-slate-400">Property Vetting service use karne ke liye pehle Login karein.</p>
          </div>
          <Link href="/login" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
            <FiLogIn size={14} /> Go to Login Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 antialiased py-8 md:py-16 px-4 md:px-8 font-sans flex flex-col justify-start items-center select-none">
      <div className="w-full max-w-4xl space-y-8">
        
        <div className="flex items-center justify-between px-1">
          <Link href="/" className="inline-flex items-center gap-2 text-[11px] font-black text-slate-400 hover:text-slate-950 uppercase tracking-widest transition-all">
            <FiArrowLeft className="w-3.5 h-3.5" /> Back to Console
          </Link>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase">LEGAL VETTING ENGINE</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black">
            <FiShield size={12} /> Legal Property Due-Diligence
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-950 uppercase tracking-tight">PROPERTY ASSET VETTING</h2>
          <p className="text-xs text-slate-400 font-bold max-w-xl leading-relaxed">
            Upload plot registry copies, Khasra papers, or agreement drafts for 100% legal verification from legal experts.
          </p>
        </div>

        {submitStatus.msg && (
          <div className={`border-l-4 p-4 rounded-xl flex items-center gap-3 text-xs font-bold bg-white shadow-xs ${
            submitStatus.success ? 'text-slate-800 border-emerald-500' : 'text-rose-600 border-rose-500'
          }`}>
            {submitStatus.success ? <FiCheck className="text-emerald-600 w-5 h-5" /> : <FiAlertCircle className="text-rose-600 w-5 h-5" />}
            <p className="flex-1">{submitStatus.msg}</p>
          </div>
        )}

        <form onSubmit={handleVettingSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch">
          
          <div className="md:col-span-7 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="pb-2 border-b border-slate-50">
                <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block">Section 01</span>
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider">Asset Owner Records</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Owner Full Name</label>
                <div className="relative flex items-center">
                  <FiUser className="absolute left-4 text-slate-400 w-4 h-4" />
                  <input required type="text" placeholder="Owner or company identity name" className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-11 pr-4 py-3 text-xs text-slate-800 font-semibold outline-none focus:bg-white focus:border-indigo-600 transition-all" value={formData.ownerName} onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Mobile Number</label>
                <input required type="tel" placeholder="+91 98765 43210" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs text-slate-800 font-semibold outline-none focus:bg-white focus:border-indigo-600 transition-all font-mono" value={formData.userPhone} onChange={(e) => setFormData({ ...formData, userPhone: e.target.value })} />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Location & Khasra Details</label>
                <div className="relative flex items-center">
                  <FiMapPin className="absolute left-4 text-slate-400 w-4 h-4" />
                  <input required type="text" placeholder="e.g. Khasra #210/4, Sector-4 Raipur" className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-11 pr-4 py-3 text-xs text-slate-800 font-semibold outline-none focus:bg-white focus:border-indigo-600 transition-all" value={formData.propertyLocation} onChange={(e) => setFormData({ ...formData, propertyLocation: e.target.value })} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Remarks / Notes</label>
                <textarea rows={3} placeholder="Property square footage, layout notes..." className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs text-slate-800 font-medium outline-none focus:bg-white focus:border-indigo-600 transition-all resize-none" value={formData.customMessage} onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4 flex-1">
              <div className="pb-2 border-b border-slate-50">
                <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block">Section 02</span>
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider">Registry Document Scans</h3>
              </div>

              <div className="relative w-full">
                <label className="w-full bg-slate-50 hover:bg-slate-100/60 border border-dashed border-slate-200 rounded-2xl py-7 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all group">
                  <FiUpload className="w-5 h-5 text-indigo-600 group-hover:-translate-y-1 transition-transform" />
                  <span className="text-xs font-black text-slate-950">Select Registry / Khasra Papers</span>
                  <input type="file" multiple accept=".pdf,.png,.jpg,.jpeg" className="hidden" onChange={handleFileSelection} disabled={isSubmitting} />
                </label>
              </div>

              {selectedFiles.length > 0 && (
                <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                  {selectedFiles.map((file, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-100 px-3 py-2.5 rounded-xl flex items-center justify-between text-xs font-bold text-slate-800 shadow-3xs">
                      <div className="flex items-center gap-2 truncate max-w-[85%]">
                        <FiFileText className="text-indigo-600 flex-shrink-0 w-4 h-4" />
                        <span className="truncate max-w-[120px]">{file.name}</span>
                      </div>
                      <button type="button" onClick={() => removeFileFromQueue(idx)} className="text-slate-400 hover:text-rose-600 transition-all"><FiX className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer">
                {isSubmitting ? 'Uploading to Server Stack...' : 'Submit Property For Verification'}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}