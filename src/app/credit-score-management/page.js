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
  FiArrowLeft, 
  FiCheck,
  FiTrendingUp,
  FiZap,
  FiAward
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

  const [selectedServices, setSelectedServices] = useState([
    "CIBIL Report Audit & Analysis",
    "Credit Score Restoration"
  ]);

  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
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

    if (!idFront || !idBack || !panCardFile) {
      alert('Kripya Identity Proof (Front & Back) aur PAN Card teeno documents upload karein!');
      return;
    }

    setIsSubmitting(true);
    setSuccessMsg('');

    try {
      const uploadedDocs = await Promise.all([
        uploadFileToS3(idFront, 'Identity Proof Front'),
        uploadFileToS3(idBack, 'Identity Proof Back'),
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
        setSuccessMsg('Aapka Application successfully submit ho gaya hai!');
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

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 antialiased py-6 md:py-10 px-4 sm:px-6 md:px-10 lg:pl-64 font-sans flex flex-col transition-all duration-300 select-none">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-blue-600 uppercase tracking-wider transition-all">
            <FiArrowLeft size={16} /> Back
          </Link>
          <span className="text-xs font-black text-blue-600 uppercase tracking-wider bg-blue-50 border border-blue-100 px-3 py-1 rounded-xl">
            Credit Advisory Desk
          </span>
        </div>

        {/* Top Header Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-xl uppercase tracking-wider">
              <FiTrendingUp size={14} /> Credit Advisory
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-950 uppercase tracking-tight">
              Credit Score Management & Dispute Resolution
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              Fix credit report errors, resolve CIBIL disputes, and systematically rebuild your loan eligibility.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-blue-50/80 border border-blue-100 px-4 py-2 rounded-2xl shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-black text-blue-700 uppercase tracking-wider">
              Online Support
            </span>
          </div>
        </div>

        {/* MAIN SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          
          {/* 👈 LEFT SIDE: COMPACT PAGE.JS STYLE CARDS */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-6">
            
            {/* Service Selection Card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-black uppercase text-blue-600 tracking-wider">
                  Select Advisory Services
                </span>
                <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
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
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between active:scale-[0.99] ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                          : 'bg-slate-50 border-slate-200/90 text-slate-800 hover:border-blue-400'
                      }`}
                    >
                      <span className="text-xs font-black">{serviceName}</span>
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                        isSelected ? 'bg-white text-blue-600 border-white' : 'bg-white border-slate-300 text-transparent'
                      }`}>
                        <FiCheck size={13} strokeWidth={3} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Compact Workflow Steps */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs space-y-3">
              <span className="text-xs font-black uppercase text-slate-900 block pb-2 border-b border-slate-100">
                Resolution Workflow
              </span>
              
              <div className="grid grid-cols-1 gap-2.5 pt-1">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-2 py-1 rounded-md">STEP 01</span>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase">Bureau Report Audit</h4>
                    <p className="text-[11px] font-bold text-slate-400">Map inaccuracies & DPD flags</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-2 py-1 rounded-md">STEP 02</span>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase">Dispute Escalation</h4>
                    <p className="text-[11px] font-bold text-slate-400">Official filing with bureaus</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-2 py-1 rounded-md">STEP 03</span>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase">Track in Ledger</h4>
                    <p className="text-[11px] font-bold text-slate-400">Status updates in `/my-requests`</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Benefits Matrix */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-5 shadow-2xs space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-1.5">
                <FiAward size={14} /> Key Benefits
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-extrabold text-slate-800">
                <div className="flex items-center gap-1.5"><FiCheckCircle className="text-emerald-500 shrink-0" size={14} /> Better CIBIL Score</div>
                <div className="flex items-center gap-1.5"><FiCheckCircle className="text-emerald-500 shrink-0" size={14} /> Loan Eligibility</div>
                <div className="flex items-center gap-1.5"><FiCheckCircle className="text-emerald-500 shrink-0" size={14} /> Error-Free Report</div>
                <div className="flex items-center gap-1.5"><FiCheckCircle className="text-emerald-500 shrink-0" size={14} /> Bank Reputation</div>
              </div>
            </div>

          </div>

          {/* 👉 RIGHT SIDE: APPLICATION FORM */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xs space-y-6">
            
            <div className="pb-3 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-black text-slate-950 uppercase tracking-tight flex items-center gap-2">
                <FiShield className="text-blue-600" size={20} /> Application & Identity Details
              </h2>
            </div>

            {successMsg ? (
              <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-3">
                <FiCheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-sm font-black text-emerald-950 uppercase">{successMsg}</h3>
                <p className="text-xs text-slate-500 font-medium">Redirecting to `/my-requests` ledger...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Applicant Personal Fields */}
                <div className="space-y-3">
                  <span className="text-xs font-black uppercase text-slate-900 block">
                    1. Applicant Information
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400">Legal Name (as on PAN)</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Legal Name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400">Mobile Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-Digit Mobile"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-blue-600 focus:bg-white font-mono transition-all"
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
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 uppercase outline-none focus:border-blue-600 focus:bg-white font-mono transition-all"
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
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Upload Section */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <span className="text-xs font-black uppercase text-slate-900 block">
                    2. Mandatory Identity Proofs
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Front */}
                    <div className="border border-dashed border-slate-300 bg-slate-50 p-3.5 rounded-2xl text-center space-y-1.5 hover:border-blue-600 transition-all">
                      <FiFileText className="mx-auto text-blue-600" size={20} />
                      <span className="text-[10px] font-black text-slate-900 uppercase block">ID Proof (Front)</span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        required
                        onChange={(e) => setIdFront(e.target.files[0])}
                        className="text-[9px] text-slate-500 w-full file:mr-1 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[9px] file:font-black file:bg-blue-50 file:text-blue-700 cursor-pointer"
                      />
                    </div>

                    {/* Back */}
                    <div className="border border-dashed border-slate-300 bg-slate-50 p-3.5 rounded-2xl text-center space-y-1.5 hover:border-blue-600 transition-all">
                      <FiFileText className="mx-auto text-blue-600" size={20} />
                      <span className="text-[10px] font-black text-slate-900 uppercase block">ID Proof (Back)</span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        required
                        onChange={(e) => setIdBack(e.target.files[0])}
                        className="text-[9px] text-slate-500 w-full file:mr-1 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[9px] file:font-black file:bg-blue-50 file:text-blue-700 cursor-pointer"
                      />
                    </div>

                    {/* PAN Card */}
                    <div className="border border-dashed border-slate-300 bg-slate-50 p-3.5 rounded-2xl text-center space-y-1.5 hover:border-blue-600 transition-all">
                      <FiCreditCard className="mx-auto text-blue-600" size={20} />
                      <span className="text-[10px] font-black text-slate-900 uppercase block">PAN Card Front</span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        required
                        onChange={(e) => setPanCardFile(e.target.files[0])}
                        className="text-[9px] text-slate-500 w-full file:mr-1 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[9px] file:font-black file:bg-blue-50 file:text-blue-700 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Query Note */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Custom Query / Remarks (Optional)</label>
                  <textarea
                    name="customMessage"
                    rows={2}
                    value={formData.customMessage}
                    onChange={handleChange}
                    placeholder="Briefly describe loan rejections or credit score concerns..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 outline-none focus:border-blue-600 focus:bg-white resize-none transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs py-4 rounded-2xl uppercase tracking-wider transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Uploading Scans & Submitting...' : <><FiUpload size={16} /> Submit Application</>}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}