"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FiArrowRight, 
  FiCheckCircle, 
  FiFileText, 
  FiTrendingUp, 
  FiShield, 
  FiPieChart 
} from "react-icons/fi";

const tags = ["ELIGIBILITY REVIEW", "DOCUMENT READINESS", "FILE STRUCTURING"];

const snapshotPoints = [
  "Eligibility assessment",
  "Document checklist",
  "Application readiness",
  "Guided next steps",
];

const services = [
  {
    number: "01",
    title: "Financial Consulting",
    tagline: "Corporate & Business Capital",
    icon: <FiPieChart className="text-xl" />,
    items: [
      "Secured Business Loan Assistance",
      "Mortgage Loan Assistance",
      "MSME & Business Finance",
      "Project Finance",
      "DPR & CMA Preparation",
    ],
    link: "/dashboard/finance",
  },
  {
    number: "02",
    title: "Loan Readiness",
    tagline: "Eligibility & Dispute Resolution",
    icon: <FiFileText className="text-xl" />,
    items: [
      "Loan Eligibility Assessment",
      "Pre-Application File Review",
      "Loan Restructuring",
      "Debt Consolidation",
      "Loan Difficulties & Rejection Resolution",
    ],
    link: "/dashboard/finance",
  },
  {
    number: "03",
    title: "CIBIL Score Management",
    tagline: "Credit Restoration & Disputes",
    icon: <FiTrendingUp className="text-xl" />,
    items: [
      "CIBIL Score Analysis",
      "Credit Report Audit",
      "Credit Score Improvement",
      "Credit Report Error Identification",
      "CIBIL, CRIF & Experian Dispute Assistance",
    ],
    link: "/dashboard/credit-score-management",
  },
  {
    number: "04",
    title: "Property Compliance",
    tagline: "Certified Title & Registry Vetting",
    icon: <FiShield className="text-xl" />,
    items: [
      "Title Deed & Ownership Verification",
      "Search & Survey Reports",
      "Registry, Khasra & B-1 Verification",
      "Mortgage Legal Assistance",
      "Property Risk & Dispute Resolution",
    ],
    link: "/dashboard/property-compliance",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ServicesCombinedSection() {
  return (
    <div className="w-full select-none antialiased">
      
      {/* ─── PART 1: 4 SERVICES ARCHITECTURAL CARDS (AB TOP PAR) ─── */}
      <section id="services" className="pt-16 pb-16 bg-[#F8FAFC] text-slate-900 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="text-left max-w-4xl space-y-2.5"
          >
            <span className="text-xs sm:text-[13px] font-black uppercase tracking-[0.22em] text-[#f3c251] block">
              OUR SERVICES
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-black uppercase tracking-tight text-[#0F1E11] leading-[1.08]">
              FINANCIAL GUIDANCE, <br />
              STRUCTURED AROUND YOU.
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide max-w-2xl leading-relaxed pt-0.5">
              One integrated service structure for financial readiness and property compliance.
            </p>
          </motion.div>

          {/* 4 Cards Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
          >
            {services.map((item) => (
              <motion.div
                key={item.number}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(33,112,68,0.12)] hover:border-[#217044] transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle Accent Tint */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#217044]/5 rounded-bl-full pointer-events-none group-hover:bg-[#217044]/10 transition-colors" />

                <div className="space-y-5">
                  {/* Icon & Number Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#217044]/10 text-[#217044] group-hover:bg-[#217044] group-hover:text-white transition-all flex items-center justify-center shadow-xs">
                      {item.icon}
                    </div>
                    <span className="text-xs font-mono font-black text-[#f3c251] tracking-wider px-2.5 py-1 rounded-lg bg-[#f3c251]/15 border border-[#f3c251]/35">
                      {item.number}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-snug group-hover:text-[#217044] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-bold text-[#f3c251] uppercase tracking-wider mt-0.5">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Service Items List */}
                  <ul className="space-y-2.5 pt-2 border-t border-slate-100">
                    {item.items.map((subItem, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-600 leading-snug">
                        <FiCheckCircle className="text-[#217044] shrink-0 text-sm mt-0.5" />
                        <span>{subItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Button */}
                <div className="pt-6 mt-4 border-t border-slate-100">
                  <Link
                    href={item.link}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#217044] hover:bg-[#164e2e] text-white text-[11px] font-black uppercase tracking-wider rounded-xl transition-all shadow-xs active:scale-95 group/btn"
                  >
                    <span>START CONSULTATION</span>
                    <FiArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ─── PART 2: SERVICE SNAPSHOT BANNER (AB NICHE HAI + BREADCRUMB REMOVED) ─── */}
      <section className="relative w-full bg-[#032012] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-emerald-950">
        
        {/* Background Curved Aesthetics */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#07361f] rounded-full blur-2xl opacity-40 pointer-events-none translate-x-1/3 -translate-y-1/4" />
        <div className="absolute top-1/2 -right-24 w-[520px] h-[520px] rounded-full border border-emerald-500/15 pointer-events-none -translate-y-1/2" />
        <div className="absolute top-1/2 -right-48 w-[680px] h-[680px] rounded-full border border-emerald-500/10 pointer-events-none -translate-y-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Headline & Tags (Home/Services path removed) */}
            <div className="lg:col-span-8 flex flex-col items-start space-y-6">
              <span className="text-xs sm:text-[13px] font-black uppercase tracking-[0.24em] text-[#f3c251] block">
                LOAN READINESS CONSULTING
              </span>

              <h2 className="text-4xl sm:text-6xl lg:text-[68px] font-black uppercase tracking-tight text-white leading-[1.02]">
                PREPARE BEFORE <br />
                YOU APPLY.
              </h2>

              <p className="text-sm sm:text-base text-emerald-100/75 font-medium max-w-xl leading-relaxed">
                Assess eligibility, organize documents and address readiness gaps before approaching a lender.
              </p>

              <div className="flex flex-wrap gap-2.5 pt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-[#0a331f]/80 border border-emerald-500/25 text-[11px] font-mono font-bold tracking-wider text-emerald-100/90 shadow-inner"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#f3c251] hover:bg-[#e5b33d] text-[#052516] font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 text-center"
                >
                  REQUEST ASSESSMENT
                </Link>
              </div>
            </div>

            {/* Right White Snapshot Card */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="w-full max-w-[340px] bg-white text-slate-900 rounded-3xl p-8 sm:p-9 shadow-2xl space-y-6">
                <span className="text-[11px] font-mono font-black uppercase tracking-[0.22em] text-[#f3c251] block">
                  SERVICE SNAPSHOT
                </span>

                <ul className="space-y-4">
                  {snapshotPoints.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-bold text-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-slate-100">
                  <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                    No approval guarantee.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}