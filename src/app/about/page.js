"use client";

import React from "react";
import Link from "next/link";
import { 
  FiShield, 
  FiTrendingUp, 
  FiPieChart, 
  FiFileText, 
  FiArrowRight, 
  FiZap, 
  FiLock, 
  FiUserCheck, 
  FiMapPin 
} from "react-icons/fi";

// Balanced character length aur bina kisi galat marketing claim ke
const coreServices = [
  {
    number: "01",
    title: "Property Compliance",
    desc: "Verification of land registry archives, title deed records, and revenue clearances prior to property acquisition.",
    href: "/services/property-compliance",
    icon: <FiShield className="text-xl text-[#217044]" />
  },
  {
    number: "02",
    title: "CIBIL Score Management",
    desc: "Diagnostic review of multi-bureau credit files, clerical discrepancy identification, and formal dispute coordination.",
    href: "/services/cibil-management",
    icon: <FiTrendingUp className="text-xl text-[#f3c251]" />
  },
  {
    number: "03",
    title: "Financial Consulting",
    desc: "Institutional capital structuring, balance sheet ratio diagnostics, and lender-compliant project report formulation.",
    href: "/services/financial-consulting",
    icon: <FiPieChart className="text-xl text-[#217044]" />
  },
  {
    number: "04",
    title: "Project Finance Assistance",
    desc: "Pre-underwriting proposal screening, borrower obligation alignment, and file preparation before banking review.",
    href: "/services/loan-readiness",
    icon: <FiFileText className="text-xl text-[#f3c251]" />
  }
];

const whyChooseUs = [
  {
    title: "Fast & Structured Processing",
    desc: "Systematic legal gap diagnostics, ratio evaluation, and prompt turnaround without procedural bottlenecks.",
    icon: <FiZap className="text-2xl text-[#f3c251]" />
  },
  {
    title: "100% Confidential & Secure",
    desc: "Strict non-disclosure protocols safeguarding personal tax files, banking ledgers, and property title records.",
    icon: <FiLock className="text-2xl text-[#217044]" />
  },
  {
    title: "Expert Fiduciary Consultants",
    desc: "Practical advisory grounded strictly in institutional banking guidelines and verified statutory compliance standards.",
    icon: <FiUserCheck className="text-2xl text-[#f3c251]" />
  },
  {
    title: "Local State Presence",
    desc: "Dedicated corporate desk operating from Agrasen Chowk, Bilaspur for direct, in-person documentation vetting.",
    icon: <FiMapPin className="text-2xl text-[#217044]" />
  }
];

export default function AboutPage() {
  return (
    <main className="w-full bg-[#FAFBFD] text-slate-900 select-none antialiased pt-0 m-0">
      
      {/* ─── 1. FOUNDER & VISION (NO TOP MARGIN/PADDING GAP) ─── */}
      <section className="w-full bg-[#052516] text-white pt-24 pb-20 sm:pt-28 sm:pb-24 px-6 sm:px-12 lg:px-20 border-b border-emerald-950/70">
        <div className="max-w-7xl mx-auto space-y-7">
          
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2.5px] bg-[#f3c251]" />
            <span className="text-xs font-mono font-black uppercase tracking-[0.24em] text-[#f3c251]">
              FOUNDER & VISION
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight max-w-4xl">
            BUILDING CLARITY INTO FINANCIAL DECISIONS.
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/85 font-normal max-w-2xl leading-relaxed">
            BSP Ccontinental brings financial-readiness and compliance guidance into one structured, understandable advisory experience.
          </p>

          <div className="pt-2 space-y-0.5">
            <h3 className="text-xl sm:text-2xl font-bold text-[#f3c251]">
              Mr. Krishna Gedam
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/70 font-medium tracking-wide">
              Founder, BSP Ccontinental Pvt Ltd
            </p>
          </div>

        </div>
      </section>

      {/* ─── 2. OUR CORE SERVICES (SYMMETRIC EQUAL TEXT + INQUIRY NOW) ─── */}
      <section className="w-full py-20 sm:py-24 px-6 sm:px-12 lg:px-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="space-y-2">
            <span className="text-xs font-mono font-black uppercase tracking-[0.22em] text-[#217044] block">
              WHAT WE DO
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#052516]">
              Our Core Advisory Practices.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {coreServices.map((item) => (
              <div key={item.number} className="space-y-4 group flex flex-col justify-between">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                    <div className="w-11 h-11 rounded-xl bg-white shadow-xs flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="font-mono text-xs font-black text-slate-400">
                      {item.number}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-black uppercase tracking-tight text-slate-900 group-hover:text-[#217044] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 font-normal leading-relaxed min-h-[56px]">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-[#217044] hover:text-[#052516] uppercase tracking-wider transition-colors pt-2"
                >
                  <span>Inquiry Now</span>
                  <FiArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 3. WHY CHOOSE US (EQUAL BALANCED FLOW) ─── */}
      <section className="w-full py-20 sm:py-24 px-6 sm:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="space-y-2">
            <span className="text-xs font-mono font-black uppercase tracking-[0.22em] text-[#f3c251] block">
              THE BENCHMARK
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#052516]">
              Why Choose BSP Ccontinental.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50/70 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 4. START WITH CLARITY CTA BANNER ─── */}
      <section className="w-full py-16 sm:py-24 px-6 sm:px-12 lg:px-20 bg-[#FAFBFD]">
        <div className="max-w-7xl mx-auto relative w-full bg-[#052516] text-white py-14 sm:py-20 px-6 sm:px-12 lg:px-16 overflow-hidden rounded-3xl shadow-2xl">
          <div className="absolute top-1/2 -right-32 w-[520px] h-[520px] rounded-full border border-[#217044]/25 pointer-events-none -translate-y-1/2" />
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#217044]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6 text-left">
            <span className="text-xs sm:text-[13px] font-black uppercase tracking-[0.24em] text-[#f3c251] block">
              READY FOR THE NEXT STEP?
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-black uppercase tracking-tight text-white leading-[1.04]">
              START WITH CLARITY.
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/85 font-medium max-w-xl leading-relaxed">
              Discuss your institutional finance, loan-readiness audit or property compliance documentation with our Bilaspur consulting team.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-[#f3c251] hover:bg-[#e4b443] text-[#052516] text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 text-center cursor-pointer"
              >
                REQUEST A CONSULTATION
              </Link>

              <a
                href="tel:9575059137"
                className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-white border border-white/40 hover:border-white text-xs font-black uppercase tracking-wider rounded-xl transition-all active:scale-95 text-center cursor-pointer"
              >
                CALL DESK NOW
              </a>
            </div>

            <div className="pt-6 sm:pt-8 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs font-medium text-emerald-200/70">
              <span className="font-bold uppercase text-white tracking-wider text-[11px]">
                BSP Ccontinental Pvt Ltd
              </span>
              <span className="tracking-wide text-emerald-200/90 font-mono text-[11px] sm:text-xs">
                +91 95750 59137 | +91 95759 59137
              </span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}