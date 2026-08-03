'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  FiArrowLeft, FiFileText, FiUpload, 
  FiX, FiCheck, FiUser, FiMapPin, FiShield, FiAlertCircle, FiLock, FiLogIn,
  FiPhone, FiCheckCircle
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

export default function PropertyVettingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    ownerName: '',
    userPhone: '',
    propertyLocation: '',
    customMessage: ''
  });

  // Selected Services State
  const [selectedServices, setSelectedServices] = useState([
    "Title Verification",
    "Ownership Verification"
  ]);

  useEffect(() => {
    if (session?.user?.name) {
      setFormData(prev => ({ ...prev, ownerName: session.user.name }));
    }
  }, [session]);
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, msg: '' });

  const handleServiceToggle = (serviceName) => {
    if (selectedServices.includes(serviceName)) {
      setSelectedServices(selectedServices.filter((item) => item !== serviceName));
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

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

    if (selectedServices.length === 0) {
      setSubmitStatus({
        success: false,
        msg: 'Kripya kam se kam ek Property Compliance service select karein!'
      });
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

      setTimeout(() => router.push('/my-requests'), 1500);

    } catch (dbError) {
      setIsSubmitting(false);
      setSubmitStatus({ success: false, msg: `Database error: ${dbError.message}` });
    }
  };

  // AUTH GUARD
  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center px-4 font-sans text-center lg:pl-64">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full shadow-2xs space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <FiLock size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 uppercase">Login Required</h3>
            <p className="text-xs font-semibold text-slate-500">Property Compliance service use karne ke liye pehle Login karein.</p>
          </div>
          <Link href="/login" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer">
            <FiLogIn size={14} /> Go to Login Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 antialiased py-6 md:py-10 px-4 sm:px-6 md:px-10 lg:pl-64 font-sans flex flex-col transition-all duration-300 select-none">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-blue-600 uppercase tracking-wider transition-all">
            <FiArrowLeft size={16} /> Back
          </Link>
          <span className="text-xs font-black text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-xl">
            Property Compliance Services
          </span>
        </div>

        {/* Page Main Heading */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 uppercase tracking-tight">
            Property Compliance Services
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500">
            Secure Property Before Investment. Buying or mortgaging a property without proper verification can result in legal disputes and financial loss.
          </p>
        </div>

        {/* MAIN SPLIT GRID: LEFT SIDEBAR (SERVICES & BENEFITS) + RIGHT FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          
          {/* 👈 LEFT SIDE: SERVICE CHECKLIST & BENEFITS (5 COLS, STICKY & VISIBLE) */}
          <div className="lg:col-span-5 lg:sticky lg:top-6 space-y-4 z-10">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-black uppercase text-blue-600 tracking-wider">
                  Services Include
                </span>
                <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {selectedServices.length} Selected
                </span>
              </div>

              <div className="space-y-2.5">
                {SERVICES_LIST.map((service) => {
                  const isSelected = selectedServices.includes(service.name);
                  return (
                    <div
                      key={service.id}
                      onClick={() => handleServiceToggle(service.name)}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between active:scale-[0.99] ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-50/80 border-slate-200 text-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-black pr-2">{service.name}</span>
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                        isSelected ? 'bg-white text-blue-600 border-white' : 'bg-white border-slate-300 text-transparent'
                      }`}>
                        <FiCheck size={13} strokeWidth={3} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Benefits */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Benefits</span>
                <div className="grid grid-cols-2 gap-2 text-xs font-extrabold text-slate-800">
                  <div className="flex items-center gap-1.5"><FiCheckCircle className="text-emerald-500 shrink-0" size={14} /> Safe Investment</div>
                  <div className="flex items-center gap-1.5"><FiCheckCircle className="text-emerald-500 shrink-0" size={14} /> Legal Protection</div>
                  <div className="flex items-center gap-1.5"><FiCheckCircle className="text-emerald-500 shrink-0" size={14} /> Fraud Prevention</div>
                  <div className="flex items-center gap-1.5"><FiCheckCircle className="text-emerald-500 shrink-0" size={14} /> Complete Due Diligence</div>
                </div>
              </div>
            </div>
          </div>

          {/* 👉 RIGHT SIDE: APPLICATION FORM & FILE UPLOAD (7 COLS) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xs space-y-6">
            
            <div className="pb-3 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-black text-slate-950 uppercase tracking-tight flex items-center gap-2">
                <FiShield className="text-blue-600" size={20} /> Property Due-Diligence Application
              </h2>
            </div>

            {submitStatus.msg && (
              <div className={`border-l-4 p-4 rounded-xl flex items-center gap-3 text-xs font-bold bg-white shadow-2xs ${
                submitStatus.success ? 'text-slate-800 border-emerald-500' : 'text-rose-600 border-rose-500'
              }`}>
                {submitStatus.success ? <FiCheck className="text-emerald-600 w-5 h-5 shrink-0" /> : <FiAlertCircle className="text-rose-600 w-5 h-5 shrink-0" />}
                <p className="flex-1">{submitStatus.msg}</p>
              </div>
            )}

            <form onSubmit={handleVettingSubmit} className="space-y-6">
              
              {/* 1. Asset Owner Info */}
              <div className="space-y-3">
                <span className="text-xs font-black uppercase text-slate-900 block">
                  1. Asset Owner Information
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Owner / Applicant Full Name</label>
                    <div className="relative flex items-center">
                      <input
                        required
                        type="text"
                        placeholder="Owner or company name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Mobile Contact</label>
                    <input
                      required
                      type="tel"
                      placeholder="10-Digit Mobile"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-blue-600 focus:bg-white font-mono transition-all"
                      value={formData.userPhone}
                      onChange={(e) => setFormData({ ...formData, userPhone: e.target.value })}
                    />
                  </div>

                  <div className="col-span-full space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Property Location & Khasra Details</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Khasra #210/4, Sector-4 Raipur"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all"
                      value={formData.propertyLocation}
                      onChange={(e) => setFormData({ ...formData, propertyLocation: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* 2. Upload Registry/Khasra Scans */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <span className="text-xs font-black uppercase text-slate-900 block">
                  2. Upload Registry / Khasra Scans
                </span>

                <div className="relative w-full">
                  <label className="w-full bg-slate-50 hover:bg-blue-50/50 border border-dashed border-slate-300 hover:border-blue-600 rounded-2xl py-6 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all group">
                    <FiUpload className="w-5 h-5 text-blue-600 group-hover:-translate-y-1 transition-transform" />
                    <span className="text-xs font-black text-slate-900">Select Registry / Khasra / Agreement Papers</span>
                    <span className="text-[10px] font-bold text-slate-400">PDF, PNG, JPG accepted</span>
                    <input type="file" multiple accept=".pdf,.png,.jpg,.jpeg" className="hidden" onChange={handleFileSelection} disabled={isSubmitting} />
                  </label>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                    {selectedFiles.map((file, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl flex items-center justify-between text-xs font-bold text-slate-800">
                        <div className="flex items-center gap-2 truncate max-w-[85%]">
                          <FiFileText className="text-blue-600 shrink-0 w-4 h-4" />
                          <span className="truncate max-w-[140px]">{file.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({file.size})</span>
                        </div>
                        <button type="button" onClick={() => removeFileFromQueue(idx)} className="text-slate-400 hover:text-rose-600 transition-all cursor-pointer"><FiX className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Remarks */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Custom Remarks / Notes (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Property square footage, seller history, specific legal doubts..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 outline-none focus:border-blue-600 focus:bg-white resize-none transition-all"
                  value={formData.customMessage}
                  onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-black text-xs py-4 rounded-2xl uppercase tracking-wider transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Uploading Papers & Submitting...' : <><FiUpload size={16} /> Submit Property For Verification</>}
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}