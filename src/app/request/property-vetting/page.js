'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  FiArrowLeft, FiFileText, FiUpload, FiX, FiCheck, 
  FiUser, FiMapPin, FiShield, FiAlertCircle, FiPhone, FiZap 
} from 'react-icons/fi';
import Link from 'next/link';

export default function PropertyVettingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // Clean empty inputs (No pre-filled text)
  const [formData, setFormData] = useState({
    ownerName: '',
    userPhone: '',
    propertyLocation: '',
    customMessage: ''
  });
  
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
    setIsSubmitting(true);
    setSubmitStatus({ success: false, msg: '' });

    const finalUploadedUrls = [];
    let uploadFailed = false;

    // 1. Upload files to S3
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
          setSubmitStatus({ success: false, msg: `Upload error: ${err.message}` });
          break;
        }
      }
    }

    if (uploadFailed) return;

    // 2. Save data to Database
    try {
      const dbResponse = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: formData.ownerName || session?.user?.name || "Property Applicant",
          userEmail: session?.user?.email || "bspccontinental@gmail.com",
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
      if (!dbResponse.ok || !dbResult.success) throw new Error(dbResult.message || "DB transaction error.");

      setIsSubmitting(false);
      setSubmitStatus({ success: true, msg: 'Property Legal Vetting Request Submitted Successfully!' });
      
      setFormData({ ownerName: '', userPhone: '', propertyLocation: '', customMessage: '' });
      setSelectedFiles([]);

      setTimeout(() => router.push('/my-requests'), 1500);
    } catch (dbError) {
      setIsSubmitting(false);
      setSubmitStatus({ success: false, msg: `Database error: ${dbError.message}` });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 py-8 md:py-12 px-4 md:px-8 font-sans flex flex-col justify-center items-center select-none">
      
      <div className="w-full max-w-4xl space-y-6">
        
        {/* Navigation & Brand Header */}
        <div className="flex items-center justify-between px-1">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-[#217044] uppercase tracking-wider transition-colors"
          >
            <FiArrowLeft className="w-4 h-4 text-[#217044]" /> Back to Dashboard
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#217044] text-white text-[10px] font-black uppercase tracking-widest shadow-sm">
            <FiZap size={12} /> BSP CCONTINENTAL PVT LTD
          </span>
        </div>

        {/* Title Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#217044]/10 text-[#217044] text-[10px] font-black uppercase tracking-wider border border-[#217044]/20">
            <FiShield size={12} /> Legal Property Verification
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-950 uppercase tracking-tight">
            PROPERTY ASSET VETTING
          </h1>
          <p className="text-xs text-slate-500 font-bold max-w-2xl leading-relaxed">
            Upload registry, Khasra, and plot documents for certified title search and legal clearance.
          </p>
        </div>

        {/* Status Alert */}
        {submitStatus.msg && (
          <div className={`border-l-4 p-4 rounded-2xl flex items-center gap-3 text-xs font-bold bg-white shadow-sm ${submitStatus.success ? 'text-slate-800 border-[#217044]' : 'text-rose-600 border-rose-500'}`}>
            {submitStatus.success ? <FiCheck className="text-[#217044] text-lg" /> : <FiAlertCircle className="text-rose-600 text-lg" />}
            <p>{submitStatus.msg}</p>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleVettingSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Left Inputs Section */}
          <div className="md:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-[#217044] uppercase tracking-wider">Owner / Applicant Name</label>
              <div className="relative flex items-center">
                <FiUser className="absolute left-4 text-[#217044] text-sm" />
                <input 
                  required 
                  type="text" 
                  placeholder="Enter full name" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#217044] focus:bg-white transition-all" 
                  value={formData.ownerName} 
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })} 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-[#217044] uppercase tracking-wider">Phone Number</label>
              <div className="relative flex items-center">
                <FiPhone className="absolute left-4 text-[#217044] text-sm" />
                <input 
                  required 
                  type="tel" 
                  placeholder="+91 95759 59137" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#217044] focus:bg-white transition-all" 
                  value={formData.userPhone} 
                  onChange={(e) => setFormData({ ...formData, userPhone: e.target.value })} 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-[#217044] uppercase tracking-wider">Location & Khasra No.</label>
              <div className="relative flex items-center">
                <FiMapPin className="absolute left-4 text-[#217044] text-sm" />
                <input 
                  required 
                  type="text" 
                  placeholder="e.g. Khasra #210, Bilaspur Sector-4" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#217044] focus:bg-white transition-all" 
                  value={formData.propertyLocation} 
                  onChange={(e) => setFormData({ ...formData, propertyLocation: e.target.value })} 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-[#217044] uppercase tracking-wider">Remarks / Special Instructions</label>
              <textarea 
                rows={3} 
                placeholder="Square footage, layout details, or special requests..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#217044] focus:bg-white transition-all resize-none" 
                value={formData.customMessage} 
                onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })} 
              />
            </div>
          </div>

          {/* Right Upload Column */}
          <div className="md:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6 min-h-[350px]">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#217044] uppercase tracking-wider">Document Upload</label>
                <p className="text-[11px] text-slate-500 font-medium">Upload registry, Khasra, or agreement copies (.pdf, .png, .jpg)</p>
              </div>

              <label className="w-full bg-slate-50 border-2 border-dashed border-[#217044]/30 hover:border-[#217044] rounded-2xl py-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-[#217044] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <FiUpload className="w-5 h-5" />
                </div>
                <span className="text-xs font-black text-[#217044]">Select Registry / Land Files</span>
                <input 
                  type="file" 
                  multiple 
                  accept=".pdf,.png,.jpg,.jpeg" 
                  className="hidden" 
                  onChange={handleFileSelection} 
                  disabled={isSubmitting} 
                />
              </label>

              {/* Uploaded File List */}
              {selectedFiles.length > 0 && (
                <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                  {selectedFiles.map((file, idx) => (
                    <div key={idx} className="bg-slate-50 border border-[#217044]/20 px-3 py-2 rounded-xl flex items-center justify-between text-xs font-bold">
                      <span className="truncate max-w-[140px] text-slate-900">{file.name}</span>
                      <button 
                        type="button" 
                        onClick={() => removeFileFromQueue(idx)} 
                        className="text-rose-600 hover:bg-rose-50 p-1 rounded-lg transition-colors"
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full bg-[#217044] hover:bg-[#185332] active:scale-95 text-white font-black text-xs py-4 rounded-xl uppercase tracking-wider shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Uploading Documents...' : 'Submit Property Application'}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}