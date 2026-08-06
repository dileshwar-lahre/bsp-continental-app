"use client";

import Link from "next/link";
import { FiShield, FiFileText, FiArrowUpRight, FiZap, FiHome } from "react-icons/fi";

export default function TermsPage() {
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
            <FiShield size={12} /> Legal Agreement
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950">
            Terms & <span className="text-[#217044]">Conditions</span>
          </h1>
          <p className="text-xs text-slate-500 font-extrabold uppercase tracking-wider">
            Last Updated: August 2026 | BSP CCONTINENTAL PVT LTD
          </p>
        </section>

        {/* Content Block */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed font-semibold">
          
          <div className="space-y-2">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">1.</span> Acceptance of Terms
            </h2>
            <p className="text-slate-600">
              By accessing or using the platform, services, and advisory solutions provided by <strong>BSP CCONTINENTAL PVT LTD</strong> ("Company", "We", "Us"), you agree to be bound by these Terms & Conditions. If you do not agree, please refrain from using our platform.
            </p>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-5">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">2.</span> Scope of Services
            </h2>
            <p className="text-slate-600">
              BSP CCONTINENTAL PVT LTD provides integrated financial consultancy, credit score improvement advisory, home & business loan assistance, property legal due diligence, and compliance services. All advisory services are provided based on information supplied by the client and available regulatory frameworks.
            </p>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-5">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">3.</span> User Responsibilities & Accuracy
            </h2>
            <p className="text-slate-600">
              Clients must provide accurate, complete, and truthful personal, financial, and property records required for consulting. BSP CCONTINENTAL PVT LTD is not liable for loan rejections or legal issues resulting from inaccurate or forged documentation submitted by the user.
            </p>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-5">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">4.</span> Financial Advisory Disclaimer
            </h2>
            <p className="text-slate-600">
              While we facilitate credit score optimization and loan readiness, final loan approvals, interest rates, and credit limits are strictly determined by respective Banks and NBFCs based on their internal risk policies.
            </p>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-5">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">5.</span> Intellectual Property
            </h2>
            <p className="text-slate-600">
              All content, brand names, algorithms, software tools, logos, and materials on this platform are the exclusive intellectual property of BSP CCONTINENTAL PVT LTD. Unauthorized copying, distribution, or reverse engineering is strictly prohibited.
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-5">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">6.</span> Contact Information
            </h2>
            <p className="text-slate-600">
              For legal inquiries regarding these terms, please contact our legal desk:
            </p>
            <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200/90 text-xs font-bold text-slate-900 space-y-1">
              <p className="text-[#217044] font-black uppercase">BSP CCONTINENTAL PVT LTD</p>
              <p>Address: Shop No OAS 4, Super Market Complex, 2nd Floor, Agrasen Chowk, Bilaspur (C.G.) 495001</p>
              <p>Email: bspccontinental@gmail.com | Phone: +91 95759 59137</p>
            </div>
          </div>

          <div className="pt-4 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#217044] hover:bg-[#185332] text-white font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>Have Questions? Contact Us</span>
              <FiArrowUpRight className="text-base" />
            </Link>
          </div>

        </section>

      </div>
    </div>
  );
}