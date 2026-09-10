"use client";

import React from "react";
import Link from "next/link";
import { 
  FiArrowRight, 
  FiCheckCircle 
} from "react-icons/fi";

const coreServices = [
  {
    number: "01",
    title: "Property Compliance",
    desc: "Certified title deed scrutiny, sub-registrar search reports, revenue map survey checks, and boundary dispute vetting.",
    href: "/services/property-compliance",
  },
  {
    number: "02",
    title: "CIBIL Score Management",
    desc: "Line-by-line credit audit across bureaus, clerical discrepancy disputes, and structured credit restoration.",
    href: "/services/cibil-management",
  },
  {
    number: "03",
    title: "Financial Consulting",
    desc: "Institutional secured business loan assistance, MSME debt structuring, DPR/CMA formulation, and project finance assistance.",
    href: "/services/financial-consulting",
  },
];

const highlights = [
  {
    title: "Integrated FinTech & PropTech",
    desc: "Combining financial loan eligibility diagnostics with legal property compliance under one single advisory roof.",
  },
  {
    title: "100% Confidential & Secure",
    desc: "Strict non-disclosure protocols safeguarding personal tax files, banking ledgers, and property title archives.",
  },
  {
    title: "Expert Fiduciary Advisory",
    desc: "Practical advisory grounded strictly in institutional banking guidelines and verified statutory compliance standards.",
  },
  {
    title: "Dedicated State Office",
    desc: "Operating from Agrasen Chowk, Bilaspur for direct physical document examination and verified local support.",
  },
];

export default function AboutPage() {
  return (
    <main className="w-full bg-[#FAFBFD] text-slate-900 select-none antialiased pt-0 m-0">
      
      {/* ─── 1. HERO HEADER ─── */}
      <section className="w-full bg-[#052516] text-white pt-28 pb-16 sm:pt-32 sm:pb-20 px-6 sm:px-12 lg:px-20 border-b border-emerald-950/70">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-[2px] bg-[#f3c251]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.24em] text-[#f3c251]">
              
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            BSP CONTINENTAL PRIVATE LIMITED
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal max-w-3xl">
            A Chhattisgarh-based FinTech and PropTech enterprise founded by <strong className="text-white font-bold">Mr. Krishna Gedam</strong>, delivering a unified ecosystem for credit score management, institutional lending readiness, and certified property legal due diligence.
          </p>

          <div className="pt-2">
            <span className="text-xs font-mono font-bold text-[#f3c251] tracking-wider uppercase">
              Secure Finance • Compliant Properties • Sustainable Growth
            </span>
          </div>
        </div>
      </section>

      {/* ─── 2. SEAMLESS FLOWING EDITORIAL ─── */}
      <div className="w-full py-16 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto space-y-16">
        
        {/* Company Overview */}
        <article className="space-y-3 border-b border-slate-200/80 pb-12">
          <span className="text-xs font-mono font-black uppercase tracking-[0.22em] text-[#217044] block">
            COMPANY OVERVIEW
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#052516]">
            Transforming Advisory Through Integrated Solutions
          </h2>
          <div className="space-y-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            <p>
              BSP Continental Private Limited addresses two of the most critical challenges facing individuals, businesses, and investors in India: financial borrowing eligibility and property legal non-compliance.
            </p>
            <p>
              By unifying financial consulting, credit score rehabilitation, and certified property title examination, we reduce transaction risks, halt fraud, minimize loan application rejections, and build confidence in real estate investments.
            </p>
          </div>
        </article>

        {/* The Problem Addressed */}
        <article className="space-y-3 border-b border-slate-200/80 pb-12">
          <span className="text-xs font-mono font-black uppercase tracking-[0.22em] text-[#217044] block">
            THE CRITICAL PROBLEM
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#052516]">
            Risks of Fragmented Financial &amp; Land Advisory
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Individuals, MSMEs, and commercial developers often face unexpected financial shocks due to fragmented consultants, inaccurate bureau reporting, insufficient loan documentation, and incomplete property verification. Without certified scrutiny of land records, buyers and businesses encounter fraudulent conveyance deeds, boundary disputes, bank rejections, and long-term capital losses.
          </p>
        </article>

        {/* Mission & Vision */}
        <article className="space-y-6 border-b border-slate-200/80 pb-12">
          <span className="text-xs font-mono font-black uppercase tracking-[0.22em] text-[#217044] block">
            PURPOSE &amp; DIRECTION
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 border-l-2 border-[#217044] pl-5">
              <h3 className="text-base font-black text-slate-900 uppercase tracking-wide">
                Our Mission
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                To empower businesses and individuals with reliable financial consulting, secure lending solutions, and comprehensive property compliance services that foster sustainable financial growth.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-[#f3c251] pl-5">
              <h3 className="text-base font-black text-slate-900 uppercase tracking-wide">
                Our Vision
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                To become India's most trusted financial consultancy and property compliance company by delivering transparent, innovative, technology-enabled, and client-focused financial solutions.
              </p>
            </div>
          </div>
        </article>

        {/* Core Advisory Services */}
        <article className="space-y-6 border-b border-slate-200/80 pb-12">
          <span className="text-xs font-mono font-black uppercase tracking-[0.22em] text-[#217044] block">
            AREAS OF EXPERTISE
          </span>
          <div className="divide-y divide-slate-100">
            {coreServices.map((svc) => (
              <div key={svc.number} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-black text-[#217044]">{svc.number}</span>
                    <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">{svc.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed pl-7 sm:pl-7 font-normal">
                    {svc.desc}
                  </p>
                </div>
                <Link 
                  href={svc.href}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-[#217044] hover:text-[#052516] uppercase tracking-wider pl-7 sm:pl-0 shrink-0"
                >
                  <span>Inquiry Now</span>
                  <FiArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </article>

        {/* Institutional Benchmarks */}
        <article className="space-y-6 border-b border-slate-200/80 pb-12">
          <span className="text-xs font-mono font-black uppercase tracking-[0.22em] text-[#217044] block">
            THE BENCHMARK
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3.5">
                <FiCheckCircle className="text-lg text-[#217044] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Direct Action Line */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
          <div>
            <h3 className="text-lg font-black uppercase text-[#052516]">
              Ready for the Next Step?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Discuss your institutional finance, loan audit, or property compliance documentation directly with our Bilaspur team.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-7 py-3.5 bg-[#217044] hover:bg-[#164e2e] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95 shrink-0"
          >
            Contact Desk
          </Link>
        </div>

      </div>

    </main>
  );
}