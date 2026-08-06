'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  FiArrowLeft, FiFileText, FiUpload, 
  FiX, FiCheck, FiShield, FiAlertCircle, FiLock, FiLogIn,
  FiZap, FiCheckCircle, FiFile, FiPaperclip, FiHome
} from 'react-icons/fi';
import Link from 'next/link';

const SERVICES_LIST = [
  { id: "title_verif", name: "Title Verification" },
  { id: "owner_verif", name: "Ownership Verification" },
  { id: "fake_owner_detect", name: "Fake Ownership Detection" },
  { id: "encumbrance_verif", name: "Encumbrance Verification" },
  { id: "search_report", name: "Search Report Preparation" },
  { id: "survey_report", name: "Survey Report Preparation" },
  { id: "risk_assessment", name: "Property Risk Assessment" }
];

const REQUIRED_DOCUMENTS = [
  { id: "registry", label: "Registry / Sale Deed Copy", required: true, note: "Main property ownership document" },
  { id: "khasra", label: "Khasra / Khatauni / B-1 Copy", required: true, note: "Revenue / land record paper" },
  { id: "layout_map", label: "Layout Map / Site Plan / Agreement", required: false, note: "Plot layout or seller agreement (Optional)" }
];

export default function PropertyVettingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    ownerName: '',
    userPhone: '',
    propertyLocation: '',
    customMessage: ''
  });

  // Default empty selection (No pre-selected service)
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, msg: '' });

  useEffect(() => {
    if (session?.user?.name) {
      setFormData(prev => ({ ...prev, ownerName: session.user.name }));
    }
  }, [session]);

  const handleServiceToggle = (serviceName) => {
    if (selectedServices.includes(serviceName)) {
      setSelectedServices(selectedServices.filter((item) => item !== serviceName));
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

  const handleCategorizedFileUpload = (e, categoryLabel) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const mapped = files.map(file => ({
      category: categoryLabel,
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

    if (selectedServices.length === 0) {
      setSubmitStatus({
        success: false,
        msg: 'Kripya kam se kam ek Property Compliance service select karein!'
      });
      return;
    }

    if (selectedFiles.length === 0) {
      setSubmitStatus({
        success: false,
        msg: 'Kripya kam se kam ek required document (Registry ya Khasra Copy) upload karein!'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ success: false, msg: '' });

    const finalUploadedUrls = [];
    let uploadFailed = false;

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
          category: fileItem.category,
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

    if (uploadFailed) return;

    try {
      const dbResponse = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: formData.ownerName || session.user.name || "Owner",
          userEmail: session.user.email,
          userPhone: formData.userPhone,
          serviceType: "Property Vetting",
          details: {
            ownerName: formData.ownerName,
            propertyLocation: formData.propertyLocation,
            selectedServices: selectedServices,
            customMessage: formData.customMessage
          },
          documentsList: finalUploadedUrls,
          status: "Pending"
        })
      });

      const dbResult = await dbResponse.json();
      if (!dbResponse.ok || !dbResult.success) throw new Error(dbResult.message || "DB transaction fault.");

      setIsSubmitting(false);
      setSubmitStatus({ success: true, msg: 'Property Compliance request submitted! Redirecting to your ledger...' });

      setFormData({ ownerName: '', userPhone: '', propertyLocation: '', customMessage: '' });
      setSelectedFiles([]);
      setSelectedServices([]);

      setTimeout(() => router.push('/my-requests'), 1500);

    } catch (dbError) {
      setIsSubmitting(false);
      setSubmitStatus({ success: false, msg: `Database error: ${dbError.message}` });
    }
  };

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center px-4 font-sans text-center lg:pl-64">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full shadow-sm space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <FiLock size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 uppercase">Login Required</h3>
            <p className="text-xs font-semibold text-slate-500">Property Compliance service use karne ke liye pehle Login karein.</p>
          </div>
          <Link href="/login" className="w-full bg-[#217044] hover:bg-[#185332] text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer">
            <FiLogIn size={14} /> Go to Login Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 antialiased py-8 px-4 sm:px-6 md:px-8 font-sans flex flex-col justify-start items-center select-none lg:pl-64 transition-all duration-300">
      
      {/* 🎯 SIDEBAR CLEARANCE & CENTERED CONTAINER */}
      <div className="w-full max-w-6xl mx-auto space-y-6">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-slate-600 hover:text-[#217044] uppercase tracking-wider transition-all">
            <FiHome size={15} className="text-[#217044]" /> Back to Home
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-[#217044]/10 text-[#217044] text-[10px] font-black uppercase tracking-widest border border-[#217044]/20">
            <FiZap size={12} /> BSP CCONTINENTAL PVT LTD
          </span>
        </div>

        {/* Header Title Card */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#217044]/10 text-[#217044] text-[10px] font-black uppercase tracking-wider border border-[#217044]/20">
            <FiShield size={12} /> Legal Property Verification
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
            Property Compliance Services
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-3xl leading-relaxed">
            Secure Property Before Investment. Upload mandatory registry and Khasra documents for certified legal clearance.
          </p>
        </div>

        {/* Status Notification */}
        {submitStatus.msg && (
          <div className={`border-l-4 p-4 rounded-2xl flex items-center gap-3 text-xs font-bold bg-white shadow-sm ${
            submitStatus.success ? 'text-slate-800 border-[#217044]' : 'text-rose-600 border-rose-500'
          }`}>
            {submitStatus.success ? <FiCheck className="text-[#217044] w-5 h-5 shrink-0" /> : <FiAlertCircle className="text-rose-600 w-5 h-5 shrink-0" />}
            <p className="flex-1">{submitStatus.msg}</p>
          </div>
        )}

        {/* MAIN SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 👈 LEFT SIDE: SERVICE CHECKLIST (4 COLS) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-black uppercase text-[#217044] tracking-wider">
                  Select Required Services
                </span>
                <span className="text-[10px] font-black text-[#217044] bg-[#217044]/10 px-2 py-0.5 rounded-md">
                  {selectedServices.length} Selected
                </span>
              </div>

              <div className="space-y-2">
                {SERVICES_LIST.map((service) => {
                  const isSelected = selectedServices.includes(service.name);
                  return (
                    <div
                      key={service.id}
                      onClick={() => handleServiceToggle(service.name)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between active:scale-[0.99] ${
                        isSelected
                          ? 'bg-[#217044] text-white border-[#217044] shadow-sm'
                          : 'bg-slate-50/80 border-slate-200 text-slate-800 hover:border-[#217044]/40'
                      }`}
                    >
                      <span className="text-xs font-black pr-2 leading-tight">{service.name}</span>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                        isSelected ? 'bg-white text-[#217044] border-white' : 'bg-white border-slate-300 text-transparent'
                      }`}>
                        <FiCheck size={11} strokeWidth={3} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Guaranteed Benefits */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Guaranteed Benefits</span>
                <div className="grid grid-cols-1 gap-1.5 text-xs font-extrabold text-slate-800">
                  <div className="flex items-center gap-1.5"><FiCheckCircle className="text-[#217044] shrink-0" size={13} /> 100% Safe Investment</div>
                  <div className="flex items-center gap-1.5"><FiCheckCircle className="text-[#217044] shrink-0" size={13} /> Legal Protection</div>
                  <div className="flex items-center gap-1.5"><FiCheckCircle className="text-[#217044] shrink-0" size={13} /> Fraud & Dispute Protection</div>
                </div>
              </div>
            </div>
          </div>

          {/* 👉 RIGHT SIDE: APPLICATION FORM & ADVANCED UPLOAD (8 COLS) */}
          <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            
            <div className="pb-3 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-black text-slate-950 uppercase tracking-tight flex items-center gap-2">
                <FiShield className="text-[#217044]" size={20} /> Asset Due-Diligence Application
              </h2>
            </div>

            <form onSubmit={handleVettingSubmit} className="space-y-6">
              
              {/* 1. Asset Owner Info */}
              <div className="space-y-3">
                <span className="text-xs font-black uppercase text-[#217044] block">
                  1. Asset Owner Information
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Owner / Applicant Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter owner name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-[#217044] focus:bg-white transition-all"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Mobile Contact</label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 95759 59137"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-[#217044] focus:bg-white font-mono transition-all"
                      value={formData.userPhone}
                      onChange={(e) => setFormData({ ...formData, userPhone: e.target.value })}
                    />
                  </div>

                  <div className="col-span-full space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Property Location & Khasra Details</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Khasra #210/4, Sector-4 Bilaspur"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-[#217044] focus:bg-white transition-all"
                      value={formData.propertyLocation}
                      onChange={(e) => setFormData({ ...formData, propertyLocation: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* 2. REQUIRED DOCUMENTS CHECKLIST & UPLOAD */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-[#217044] block">
                    2. Required Document Upload Checklist
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">PDF, PNG, JPG (Max 10MB)</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {REQUIRED_DOCUMENTS.map((doc) => {
                    const uploadedForThisDoc = selectedFiles.filter(f => f.category === doc.label);
                    const isUploaded = uploadedForThisDoc.length > 0;

                    return (
                      <div key={doc.id} className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/60 hover:bg-slate-50 transition-all space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <FiFile className="text-[#217044]" size={18} />
                            <span className="text-xs font-black text-slate-900">{doc.label}</span>
                            {doc.required ? (
                              <span className="text-[9px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">REQUIRED</span>
                            ) : (
                              <span className="text-[9px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">OPTIONAL</span>
                            )}
                          </div>

                          <label className="cursor-pointer bg-white hover:bg-[#217044] hover:text-white border border-[#217044]/40 text-[#217044] text-[11px] font-black px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-2xs">
                            <FiUpload size={13} />
                            <span>{isUploaded ? "Add More" : "Upload File"}</span>
                            <input 
                              type="file" 
                              multiple 
                              accept=".pdf,.png,.jpg,.jpeg" 
                              className="hidden" 
                              onChange={(e) => handleCategorizedFileUpload(e, doc.label)} 
                              disabled={isSubmitting} 
                            />
                          </label>
                        </div>

                        <p className="text-[11px] font-medium text-slate-500 pl-6">{doc.note}</p>

                        {/* Uploaded File List under Category */}
                        {isUploaded && (
                          <div className="pl-6 pt-1 space-y-2">
                            {uploadedForThisDoc.map((file, fileIdx) => {
                              const globalIdx = selectedFiles.findIndex(f => f === file);
                              return (
                                <div key={fileIdx} className="bg-white border border-[#217044]/30 px-3.5 py-2 rounded-xl flex items-center justify-between text-xs font-bold text-slate-800 shadow-2xs">
                                  <div className="flex items-center gap-2 truncate max-w-[85%]">
                                    <FiPaperclip className="text-[#217044] shrink-0" size={14} />
                                    <span className="truncate max-w-[200px]">{file.name}</span>
                                    <span className="text-[9px] font-mono text-slate-400">({file.size})</span>
                                  </div>
                                  <button type="button" onClick={() => removeFileFromQueue(globalIdx)} className="text-slate-400 hover:text-rose-600 transition-all">
                                    <FiX size={15} />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Remarks */}
              <div className="space-y-1 pt-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Custom Remarks / Special Doubts (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Property square footage, seller history, specific legal doubts..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-medium text-slate-900 outline-none focus:border-[#217044] focus:bg-white resize-none transition-all"
                  value={formData.customMessage}
                  onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#217044] hover:bg-[#185332] disabled:bg-slate-200 text-white font-black text-xs py-4 rounded-2xl uppercase tracking-wider transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Uploading Papers & Submitting...' : <><FiUpload size={16} /> Submit Property Papers For Verification</>}
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}