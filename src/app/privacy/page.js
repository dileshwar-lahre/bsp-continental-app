"use client";

import Link from "next/link";
import { FiShield, FiLock, FiArrowUpRight, FiZap, FiHome } from "react-icons/fi";

export default function PrivacyPage() {
  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 antialiased font-sans select-none lg:pl-64 transition-all duration-300 pb-16">
      
      {/* 🎯 SIDEBAR CLEARANCE & MATCHED CONTAINER (max-w-6xl) */}
      <div className="w-full max-w-6xl mx-auto space-y-6 pt-8 px-4 sm:px-6 md:px-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-slate-600 hover:text-[#217044] uppercase tracking-wider transition-all">
            <FiHome size={15} className="text-[#217044]" /> Back to Home
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-[#217044] text-white text-[10px] font-black uppercase tracking-widest shadow-2xs">
            <FiZap size={12} /> BSP CCONTINENTAL PVT LTD
          </span>
        </div>

        {/* 🚀 Header Card */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#217044]/10 text-[#217044] text-[10px] font-black uppercase tracking-wider border border-[#217044]/20">
            <FiLock size={12} /> Data Protection Policy
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950">
            Privacy <span className="text-[#217044]">Policy</span>
          </h1>
          <p className="text-xs text-slate-500 font-extrabold uppercase tracking-wider">
            Last Updated: August 2026 | BSP CCONTINENTAL PVT LTD
          </p>
        </section>

        {/* Content Block */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed font-semibold">
          
          <div className="space-y-2">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">1.</span> Information We Collect
            </h2>
            <p className="text-slate-600">
              To provide credit score management, loan advisory, and property compliance services, we collect personal details including your Name, Phone Number, Email Address, Financial Credentials, and Property Documentation submitted via secure forms.
            </p>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-5">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">2.</span> How We Use Your Data
            </h2>
            <p className="text-slate-600">
              Your information is strictly used to evaluate loan readiness, process credit score restoration queries, perform property due diligence, communicate progress, and comply with legal regulatory mandates.
            </p>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-5">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">3.</span> Data Sharing & Third Parties
            </h2>
            <p className="text-slate-600">
              We do not sell or rent your personal data. Data is shared exclusively with verified banking partners, NBFCs, legal professionals, and regulatory authorities necessary to complete your requested financial or compliance transactions.
            </p>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-5">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">4.</span> Data Security
            </h2>
            <p className="text-slate-600">
              We employ industry-standard encryption, secure cloud infrastructure, and database access controls to prevent unauthorized access, alteration, or disclosure of your sensitive information.
            </p>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-5">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">5.</span> Your Privacy Rights
            </h2>
            <p className="text-slate-600">
              You reserve the right to request access to, correction of, or deletion of your personal records from our database by submitting an official email request to <strong>bspccontinental@gmail.com</strong>.
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-5">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">6.</span> Privacy Inquiries
            </h2>
            <p className="text-slate-600">
              For any questions regarding data safety or this policy, reach our protection desk:
            </p>
            <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200/90 text-xs font-bold text-slate-900 space-y-1">
              <p className="text-[#217044] font-black uppercase">BSP CCONTINENTAL PVT LTD Data Protection Desk</p>
              <p>Address: Shop No OAS 4, Super Market Complex, 2nd Floor, Agrasen Chowk, Bilaspur (C.G.) 495001</p>
              <p>Email: bspccontinental@gmail.com | Phone: +91 95759 59137</p>
            </div>
          </div>

          <div className="pt-4 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#217044] hover:bg-[#185332] text-white font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>Questions About Privacy? Reach Us</span>
              <FiArrowUpRight className="text-base" />
            </Link>
          </div>

        </section>

      </div>
    </div>
  );
}