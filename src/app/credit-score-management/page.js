'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  FiShield, 
  FiUpload, 
  FiCheckCircle, 
  FiFileText, 
  FiCreditCard, 
  FiCheck,
  FiTrendingUp,
  FiZap,
  FiAward,
  FiHome,
  FiLock,
  FiLogIn,
  FiX
} from 'react-icons/fi';
import Link from 'next/link';

const CORE_SERVICES = [
  "CIBIL Report Audit & Analysis",
  "Credit Score Restoration",
  "CRIF & Experian Dispute Filing",
  "Loan Rejection Resolution"
];

export default function CreditScoreManagementPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setForm] = useState({
    fullName: session?.user?.name || '',
    phone: '',
    panNumber: '',
    dob: '',
    customMessage: '',
  });

  // 1. DEFAULT SELECTION BAND (By Default Blank/Empty Array)
  const [selectedServices, setSelectedServices] = useState([]);

  const [aadhaarFront, setAadhaarFront] = useState(null);
  const [aadhaarBack, setAadhaarBack] = useState(null);
  const [panCardFile, setPanCardFile] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleServiceToggle = (serviceName) => {
    if (selectedServices.includes(serviceName)) {
      setSelectedServices(selectedServices.filter((item) => item !== serviceName));
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadFileToS3 = async (file, label) => {
    if (!file) return null;
    const uploadPayload = new FormData();
    uploadPayload.append('file', file);

    const uploadRes = await fetch('/api/upload', {
      method: 'POST',
      body: uploadPayload,
    });

    const result = await uploadRes.json();
    if (uploadRes.ok && result.success) {
      return {
        name: `${label} - ${file.name}`,
        url: result.fileUrl || result.url,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        docType: label,
      };
    } else {
      throw new Error(`${label} upload failed.`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status !== 'authenticated') {
      alert('Pehle Login kijiye submission ke liye!');
      router.push('/login');
      return;
    }

    if (selectedServices.length === 0) {
      alert('Kripya kam se kam ek service select karein!');
      return;
    }

    if (!aadhaarFront || !aadhaarBack || !panCardFile) {
      alert('Kripya Aadhaar Card (Front & Back) aur PAN Card teeno mandatory documents upload karein!');
      return;
    }

    setIsSubmitting(true);
    setSuccessMsg('');

    try {
      const uploadedDocs = await Promise.all([
        uploadFileToS3(aadhaarFront, 'Aadhaar Card Front'),
        uploadFileToS3(aadhaarBack, 'Aadhaar Card Back'),
        uploadFileToS3(panCardFile, 'PAN Card Front'),
      ]);

      const validDocs = uploadedDocs.filter(Boolean);

      const payload = {
        userName: formData.fullName || session?.user?.name || 'Verified Applicant',
        userEmail: session?.user?.email,
        userPhone: formData.phone,
        serviceType: 'CIBIL Audit',
        details: {
          panNumber: formData.panNumber,
          dateOfBirth: formData.dob,
          selectedServices: selectedServices,
          customMessage: formData.customMessage,
        },
        documentsList: validDocs,
        status: 'Pending',
      };

      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setSuccessMsg('Aapka Credit Score Application successfully submit ho gaya hai!');
        setTimeout(() => router.push('/my-requests'), 2000);
      } else {
        alert(result.message || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      alert('Submission error: ' + err.message);
    } finally {
      setIsSubmitting(false);
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
            <p className="text-xs font-semibold text-slate-500">Credit Score Advisory service use karne ke liye pehle Login karein.</p>
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
            <FiTrendingUp size={12} /> Credit Advisory Desk
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
            Credit Score Management & Dispute Resolution
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-3xl leading-relaxed">
            Fix credit report errors, resolve CIBIL disputes, and systematically rebuild your loan approval eligibility.
          </p>
        </div>

        {/* MAIN SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 👈 LEFT SIDE: SERVICE CHECKLIST (4 COLS) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Service Selection Card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-black uppercase text-[#217044] tracking-wider">
                  Select Advisory Services
                </span>
                <span className="text-[10px] font-black text-[#217044] bg-[#217044]/10 px-2 py-0.5 rounded-md">
                  {selectedServices.length} Selected
                </span>
              </div>

              <div className="space-y-2">
                {CORE_SERVICES.map((serviceName, idx) => {
                  const isSelected = selectedServices.includes(serviceName);
                  return (
                    <div
                      key={idx}
                      onClick={() => handleServiceToggle(serviceName)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between active:scale-[0.99] ${
                        isSelected
                          ? 'bg-[#217044] text-white border-[#217044] shadow-sm'
                          : 'bg-slate-50/80 border-slate-200 text-slate-800 hover:border-[#217044]/40'
                      }`}
                    >
                      <span className="text-xs font-black pr-2 leading-tight">{serviceName}</span>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                        isSelected ? 'bg-white text-[#217044] border-white' : 'bg-white border-slate-300 text-transparent'
                      }`}>
                        <FiCheck size={11} strokeWidth={3} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Workflow Card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-sm space-y-3">
              <span className="text-xs font-black uppercase text-slate-900 block pb-2 border-b border-slate-100">
                Resolution Process
              </span>
              
              <div className="space-y-2 pt-1">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <span className="text-[10px] font-black text-[#217044] bg-[#217044]/10 border border-[#217044]/20 px-2 py-1 rounded-md">01</span>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase">Bureau Report Audit</h4>
                    <p className="text-[10px] font-bold text-slate-400">Map inaccuracies & DPD flags</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <span className="text-[10px] font-black text-[#217044] bg-[#217044]/10 border border-[#217044]/20 px-2 py-1 rounded-md">02</span>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase">Dispute Escalation</h4>
                    <p className="text-[10px] font-bold text-slate-400">Official filing with bureaus</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <span className="text-[10px] font-black text-[#217044] bg-[#217044]/10 border border-[#217044]/20 px-2 py-1 rounded-md">03</span>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase">Score Rebuild</h4>
                    <p className="text-[10px] font-bold text-slate-400">Track progress in `/my-requests`</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-5 shadow-2xs space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#217044] flex items-center gap-1.5">
                <FiAward size={14} /> Advisory Benefits
              </span>
              <div className="grid grid-cols-1 gap-2 text-xs font-extrabold text-slate-800">
                <div className="flex items-center gap-1.5"><FiCheckCircle className="text-[#217044] shrink-0" size={14} /> Improved CIBIL Score</div>
                <div className="flex items-center gap-1.5"><FiCheckCircle className="text-[#217044] shrink-0" size={14} /> Higher Loan Eligibility</div>
                <div className="flex items-center gap-1.5"><FiCheckCircle className="text-[#217044] shrink-0" size={14} /> Error & Dispute Clean-up</div>
              </div>
            </div>

          </div>

          {/* 👉 RIGHT SIDE: APPLICATION FORM (8 COLS) */}
          <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            
            <div className="pb-3 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-black text-slate-950 uppercase tracking-tight flex items-center gap-2">
                <FiShield className="text-[#217044]" size={20} /> Application & Identity Details
              </h2>
            </div>

            {successMsg ? (
              <div className="bg-emerald-50/80 border border-emerald-200 p-8 rounded-2xl text-center space-y-3">
                <FiCheckCircle className="w-12 h-12 text-[#217044] mx-auto" />
                <h3 className="text-sm font-black text-[#217044] uppercase">{successMsg}</h3>
                <p className="text-xs text-slate-500 font-medium">Redirecting to `/my-requests` ledger...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Applicant Personal Fields */}
                <div className="space-y-3">
                  <span className="text-xs font-black uppercase text-[#217044] block">
                    1. Personal Information
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400">Legal Name (as on PAN/Aadhaar)</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Legal Name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-[#217044] focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400">Mobile Contact</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 95759 59137"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-[#217044] focus:bg-white font-mono transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400">PAN Card Number</label>
                      <input
                        type="text"
                        name="panNumber"
                        required
                        maxLength={10}
                        value={formData.panNumber}
                        onChange={(e) => setForm({ ...formData, panNumber: e.target.value.toUpperCase() })}
                        placeholder="ABCDE1234F"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 uppercase outline-none focus:border-[#217044] focus:bg-white font-mono transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400">Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        required
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-[#217044] focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Upload Section (Aadhaar Front, Aadhaar Back, PAN Card) */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#217044] block">
                      2. Mandatory Identity Proofs
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">PDF, PNG, JPG accepted</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* Aadhaar Front */}
                    <div className="border border-dashed border-slate-300 bg-slate-50/70 hover:bg-slate-50 p-4 rounded-2xl text-center space-y-2 hover:border-[#217044] transition-all flex flex-col justify-between">
                      <div className="space-y-1">
                        <FiFileText className="mx-auto text-[#217044]" size={22} />
                        <span className="text-[11px] font-black text-slate-900 uppercase block">Aadhaar Card</span>
                        <span className="text-[9px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100 inline-block">FRONT SIDE</span>
                      </div>
                      
                      <label className="cursor-pointer block">
                        <span className="text-[10px] font-black text-[#217044] bg-white border border-[#217044]/30 px-3 py-1.5 rounded-xl block truncate shadow-2xs">
                          {aadhaarFront ? aadhaarFront.name : "Choose File"}
                        </span>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          required
                          className="hidden"
                          onChange={(e) => setAadhaarFront(e.target.files[0])}
                        />
                      </label>
                    </div>

                    {/* Aadhaar Back */}
                    <div className="border border-dashed border-slate-300 bg-slate-50/70 hover:bg-slate-50 p-4 rounded-2xl text-center space-y-2 hover:border-[#217044] transition-all flex flex-col justify-between">
                      <div className="space-y-1">
                        <FiFileText className="mx-auto text-[#217044]" size={22} />
                        <span className="text-[11px] font-black text-slate-900 uppercase block">Aadhaar Card</span>
                        <span className="text-[9px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100 inline-block">BACK SIDE</span>
                      </div>
                      
                      <label className="cursor-pointer block">
                        <span className="text-[10px] font-black text-[#217044] bg-white border border-[#217044]/30 px-3 py-1.5 rounded-xl block truncate shadow-2xs">
                          {aadhaarBack ? aadhaarBack.name : "Choose File"}
                        </span>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          required
                          className="hidden"
                          onChange={(e) => setAadhaarBack(e.target.files[0])}
                        />
                      </label>
                    </div>

                    {/* PAN Card Front */}
                    <div className="border border-dashed border-slate-300 bg-slate-50/70 hover:bg-slate-50 p-4 rounded-2xl text-center space-y-2 hover:border-[#217044] transition-all flex flex-col justify-between">
                      <div className="space-y-1">
                        <FiCreditCard className="mx-auto text-[#217044]" size={22} />
                        <span className="text-[11px] font-black text-slate-900 uppercase block">PAN Card</span>
                        <span className="text-[9px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100 inline-block">FRONT SIDE</span>
                      </div>
                      
                      <label className="cursor-pointer block">
                        <span className="text-[10px] font-black text-[#217044] bg-white border border-[#217044]/30 px-3 py-1.5 rounded-xl block truncate shadow-2xs">
                          {panCardFile ? panCardFile.name : "Choose File"}
                        </span>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          required
                          className="hidden"
                          onChange={(e) => setPanCardFile(e.target.files[0])}
                        />
                      </label>
                    </div>

                  </div>
                </div>

                {/* 3. Query Note */}
                <div className="space-y-1 pt-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Custom Query / Remarks (Optional)</label>
                  <textarea
                    name="customMessage"
                    rows={2}
                    value={formData.customMessage}
                    onChange={handleChange}
                    placeholder="Briefly describe loan rejections or credit score concerns..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-medium text-slate-900 outline-none focus:border-[#217044] focus:bg-white resize-none transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#217044] hover:bg-[#185332] text-white font-black text-xs py-4 rounded-2xl uppercase tracking-wider transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'Uploading Documents & Submitting...' : <><FiUpload size={16} /> Submit Credit Application</>}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}