"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  FiArrowRight, 
  FiCheckCircle, 
  FiFileText, 
  FiTrendingUp, 
  FiShield, 
  FiPieChart, 
  FiHelpCircle, 
  FiPhone 
} from "react-icons/fi";

/* ─── REUSABLE CLARITY CTA BANNER (EXACT SCREENSHOT MATCH) ─── */
function ClarityCtaBanner() {
  return (
    <div className="relative w-full bg-[#052313] text-white py-14 sm:py-20 px-6 sm:px-12 lg:px-16 select-none antialiased overflow-hidden rounded-3xl border border-emerald-950/60 shadow-xl">
      {/* Background Concentric Curves */}
      <div className="absolute top-1/2 -right-32 w-[520px] h-[520px] rounded-full border border-emerald-500/15 pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 -right-56 w-[700px] h-[700px] rounded-full border border-emerald-500/10 pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 -right-80 w-[880px] h-[880px] rounded-full border border-emerald-500/5 pointer-events-none -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#0c4427]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl space-y-6 text-left">
        <span className="text-xs sm:text-[13px] font-black uppercase tracking-[0.24em] text-[#f3c251] block">
          READY FOR THE NEXT STEP?
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-black uppercase tracking-tight text-white leading-[1.04]">
          START WITH CLARITY.
        </h2>

        <p className="text-sm sm:text-base text-emerald-100/80 font-medium max-w-xl leading-relaxed">
          Discuss your financial, loan-readiness or property-compliance requirement with our advisory team.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/contact"
            className="px-8 py-3.5 bg-[#f3c251] hover:bg-[#e4b443] text-[#052313] text-xs font-black uppercase tracking-wider rounded-lg transition-all shadow-md active:scale-95 text-center cursor-pointer"
          >
            REQUEST A CONSULTATION
          </Link>

          <a
            href="tel:9575059137"
            className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-white border border-white/60 hover:border-white text-xs font-black uppercase tracking-wider rounded-lg transition-all active:scale-95 text-center cursor-pointer"
          >
            CALL NOW
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
  );
}

const tags = ["ELIGIBILITY REVIEW", "DOCUMENT READINESS", "FILE STRUCTURING"];

const snapshotPoints = [
  "Eligibility assessment",
  "Document checklist",
  "Application readiness",
  "Guided next steps",
];

const services = [
  {
    id: "financial-consulting",
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
    overviewPara1:
      "Specialized financial guidance engineered for MSMEs, corporate entities, and entrepreneurs across Chhattisgarh looking to structure institutional debt effectively.",
    overviewPara2:
      "We prepare thorough institutional documentation, align operational cash flows, and manage DPR/CMA preparations before your application reaches underwriting channels.",
    scopeItems: [
      "Secured Business Loan Assistance",
      "Mortgage Loan Assistance",
      "MSME and Business Finance",
      "Project Finance",
      "DPR and CMA Preparation",
    ],
    documents: [
      "3 Years Audited Financial Statements & ITRs",
      "Last 12 Months Operating Bank Statements",
      "Business Registration (GST, Udyam, MOA/AOA)",
      "Existing Sanction Letters & Loan Repayment Tracks",
      "Proposed Collateral / Property Documents",
    ],
    processSteps: [
      "Requirement Intake",
      "Financial Review & Ratios Assessment",
      "CMA / DPR Preparation",
      "Guided Next Steps to Banking Desk",
    ],
    deliverables:
      "Complete loan preparation docket, professionally vetted CMA data report, debt eligibility summary, and a step-by-step submission checklist.",
    faqs: [
      {
        q: "What is the typical turnaround time for CMA & DPR preparation?",
        a: "Standard CMA and project report formulations are delivered within 4 to 6 business days after receiving clean, reconciled accounting data.",
      },
      {
        q: "Does BSP Continental guarantee loan sanctions?",
        a: "No. As per strict compliance, we guarantee documentation accuracy, eligibility assessment, and file readiness. Bank sanction depends solely on lender underwriting.",
      },
    ],
  },
  {
    id: "loan-readiness",
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
    overviewPara1:
      "Comprehensive diagnostic screening for retail, MSME, and mortgage loan applicants who want to eliminate rejection risks beforehand.",
    overviewPara2:
      "We audit eligibility metrics, assess past rejection reasons, and provide practical debt-consolidation frameworks before approaching any institutional lender.",
    scopeItems: [
      "Loan Eligibility Assessment",
      "Pre-Application File Review",
      "Loan Restructuring",
      "Debt Consolidation",
      "Loan Difficulties and Rejection Resolution",
    ],
    documents: [
      "Applicant & Co-applicant KYC (PAN, Aadhaar)",
      "Income Proof (Salary Slips / 3-Year ITR Computations)",
      "Detailed Statements for All Active Debt Lines",
      "Previous Rejection or Inquiry Letters (if any)",
    ],
    processSteps: [
      "Requirement Analysis",
      "FOIR & Burden Assessment",
      "Debt Optimization Preparation",
      "Guided Submission Readiness",
    ],
    deliverables:
      "An executive Loan Readiness Audit Report identifying credit friction points, debt-to-income benchmarks, and recommended file structuring steps.",
    faqs: [
      {
        q: "How do you help with past loan rejections?",
        a: "We perform a forensic file review to locate technical mismatches, high inquiries, or banking transaction anomalies that triggered the rejection, providing actionable correction steps.",
      },
      {
        q: "Is this service suitable for home loans and LAP?",
        a: "Yes. It covers secured retail home loans, loan against property, and unsecured commercial debt structures.",
      },
    ],
  },
  {
    id: "cibil-management",
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
    overviewPara1:
      "Targeted credit profile assessment and dispute facilitation across all four major credit bureaus in India (CIBIL, CRIF, Experian, Equifax).",
    overviewPara2:
      "We help identify erroneous defaults, outdated settled remarks, and identity mismatches, structuring a viable path toward long-term credit health.",
    scopeItems: [
      "CIBIL Score Analysis",
      "Credit Report Audit",
      "Credit Score Improvement",
      "Credit Report Error Identification",
      "CIBIL, CRIF and Experian Dispute Assistance",
    ],
    documents: [
      "Updated Full Credit Bureau Reports (CIBIL/CRIF)",
      "Government KYC Documents",
      "Loan Closure NOCs / Settlement Certificates (if disputed)",
      "Bank Account Statements reflecting disputed payments",
    ],
    processSteps: [
      "Report Intake",
      "Dispute & DPD Assessment",
      "Dispute Dossier Preparation",
      "Bureau Follow-up Guidance",
    ],
    deliverables:
      "Line-by-line Bureau Discrepancy Audit, error-correction escalation templates, and a 6-month score enhancement roadmap.",
    faqs: [
      {
        q: "Can you remove genuine default entries from CIBIL?",
        a: "No advisory can alter legitimate payment histories. We challenge inaccurate data, uncredited payments, duplicate accounts, and missing closure NOCs.",
      },
      {
        q: "How soon do dispute resolutions reflect in scores?",
        a: "Bureau disputes typically process within 30 to 45 days after the lender confirms reconciliation.",
      },
    ],
  },
  {
    id: "property-compliance",
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
    overviewPara1:
      "Institutional-grade property title vetting, legal chain search, and revenue documentation verification across Bilaspur and Chhattisgarh.",
    overviewPara2:
      "Designed for property buyers, builders, and mortgage borrowers seeking complete clarity on ownership authenticity, municipal diversions, and encumbrances.",
    scopeItems: [
      "Title Deed Verification",
      "Ownership Verification",
      "Search and Survey Reports",
      "Registry, Khasra and B-1 Verification",
      "Mortgage Legal Assistance",
      "Property Risk Assessment",
      "Property Dispute Resolution",
    ],
    documents: [
      "Registered Sale Deed / Title Deed Copy",
      "Chain Documents (Prior 13–30 Years Deeds)",
      "Updated Khasra, B-1, and Kishtabandi Khatauni",
      "Nazul Lease / Diversion Records (if applicable)",
      "Municipal Approved Map & Current Tax Receipts",
    ],
    processSteps: [
      "Document Intake",
      "Sub-Registrar & Revenue Assessment",
      "Title Chain Verification",
      "Search Report Delivery",
    ],
    deliverables:
      "Certified 13–30 Year Search and Survey Legal Opinion Report detailing ownership continuity, encumbrance findings, and compliance status.",
    faqs: [
      {
        q: "What areas of Chhattisgarh are covered?",
        a: "We provide comprehensive land record and sub-registrar verification across Bilaspur, Raipur, Durg, Korba, and surrounding districts.",
      },
      {
        q: "Does this cover agricultural land diversion checks?",
        a: "Yes. We verify agricultural diversion status, Nazul clearance, and SDM/Collector approval records.",
      },
    ],
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
  const [activeTab, setActiveTab] = useState(services[0].id);
  const currentService = services.find((s) => s.id === activeTab) || services[0];

  const handleCardClick = (id) => {
    setActiveTab(id);
    const element = document.getElementById("detailed-breakdown");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full select-none antialiased bg-[#F8FAFC]">
      
      {/* ─── PART 1: TOP SERVICE HERO / SNAPSHOT BANNER ─── */}
      <section className="relative w-full bg-[#032012] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-emerald-950">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#07361f] rounded-full blur-2xl opacity-40 pointer-events-none translate-x-1/3 -translate-y-1/4" />
        <div className="absolute top-1/2 -right-24 w-[520px] h-[520px] rounded-full border border-emerald-500/15 pointer-events-none -translate-y-1/2" />
        <div className="absolute top-1/2 -right-48 w-[680px] h-[680px] rounded-full border border-emerald-500/10 pointer-events-none -translate-y-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Headline & Tags */}
            <div className="lg:col-span-8 flex flex-col items-start space-y-6">
              <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-emerald-200/50 uppercase">
                <Link href="/" className="hover:text-white transition-colors">HOME</Link>
                <span>/</span>
                <Link href="/services" className="hover:text-white transition-colors">SERVICES</Link>
                <span>/</span>
                <span className="text-emerald-300/80">LOAN READINESS</span>
              </div>

              <span className="text-xs sm:text-[13px] font-black uppercase tracking-[0.24em] text-[#f3c251] block">
                LOAN READINESS CONSULTING
              </span>

              <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-black uppercase tracking-tight text-white leading-[1.02]">
                PREPARE BEFORE <br />
                YOU APPLY.
              </h1>

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
                <a
                  href="#detailed-breakdown"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#f3c251] hover:bg-[#e5b33d] text-[#052516] font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 text-center cursor-pointer"
                >
                  REQUEST ASSESSMENT
                </a>
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

      {/* ─── PART 2: THE 4 SERVICES ARCHITECTURAL CARDS ─── */}
      <section id="services" className="pt-14 pb-16 bg-[#F8FAFC] text-slate-900 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
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
                onClick={() => handleCardClick(item.id)}
                className={`bg-white rounded-3xl p-6 border shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(33,112,68,0.12)] hover:border-[#217044] transition-all flex flex-col justify-between group relative overflow-hidden cursor-pointer ${
                  activeTab === item.id ? "border-[#217044] ring-2 ring-[#217044]/20" : "border-slate-200/90"
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#217044]/5 rounded-bl-full pointer-events-none group-hover:bg-[#217044]/10 transition-colors" />

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#217044]/10 text-[#217044] group-hover:bg-[#217044] group-hover:text-white transition-all flex items-center justify-center shadow-xs">
                      {item.icon}
                    </div>
                    <span className="text-xs font-mono font-black text-[#f3c251] tracking-wider px-2.5 py-1 rounded-lg bg-[#f3c251]/15 border border-[#f3c251]/35">
                      {item.number}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-snug group-hover:text-[#217044] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-bold text-[#f3c251] uppercase tracking-wider mt-0.5">
                      {item.tagline}
                    </p>
                  </div>

                  <ul className="space-y-2.5 pt-2 border-t border-slate-100">
                    {item.items.map((subItem, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-600 leading-snug">
                        <FiCheckCircle className="text-[#217044] shrink-0 text-sm mt-0.5" />
                        <span>{subItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <div className="w-full flex items-center justify-center gap-2 py-3 bg-[#217044] hover:bg-[#164e2e] text-white text-[11px] font-black uppercase tracking-wider rounded-xl transition-all shadow-xs active:scale-95 group/btn">
                    <span>VIEW DETAILS</span>
                    <FiArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ─── PART 3: DETAILED BENTO BREAKDOWN SYSTEM ─── */}
      <section id="detailed-breakdown" className="py-16 sm:py-20 bg-white border-b border-slate-200 scroll-mt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="space-y-2">
            <span className="text-xs font-mono font-black uppercase tracking-[0.24em] text-[#f3c251] block">
              DETAILED BREAKDOWN
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0F1E11] leading-tight">
              {currentService.title} SPECIFICATIONS.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Select any card above to view documentation checklist, deliverables and execution steps.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Bento Cards */}
            <div className="lg:col-span-8 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* CARD 01: OVERVIEW */}
                  <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
                    <span className="text-[11px] font-mono font-black uppercase tracking-[0.2em] text-[#f3c251] block">
                      01 OVERVIEW
                    </span>
                    <h3 className="text-2xl font-black tracking-tight text-[#0F1E11]">
                      Explain the service
                    </h3>
                    <div className="space-y-3 text-sm text-slate-600 font-medium leading-relaxed">
                      <p>{currentService.overviewPara1}</p>
                      <p>{currentService.overviewPara2}</p>
                    </div>
                  </div>

                  {/* CARD 02: WHAT WE REVIEW */}
                  <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
                    <span className="text-[11px] font-mono font-black uppercase tracking-[0.2em] text-[#f3c251] block">
                      02 WHAT WE REVIEW
                    </span>
                    <h3 className="text-2xl font-black tracking-tight text-[#0F1E11]">
                      Scope and documents
                    </h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Detailed checklist of items reviewed. Avoid promising approval, score increase, legal outcome or dispute resolution.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200/80">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 block">
                          Service Scope
                        </span>
                        <ul className="space-y-2">
                          {currentService.scopeItems.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-700">
                              <FiCheckCircle className="text-[#217044] shrink-0 text-sm mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200/80">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 block">
                          Required Documents
                        </span>
                        <ul className="space-y-2">
                          {currentService.documents.map((doc, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#f3c251] shrink-0 mt-1.5" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* SPLIT ROW: PROCESS & DELIVERABLES */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
                      <span className="text-[11px] font-mono font-black uppercase tracking-[0.2em] text-[#f3c251] block">
                        03 PROCESS
                      </span>
                      <h3 className="text-xl font-black tracking-tight text-[#0F1E11]">
                        Four clear steps
                      </h3>
                      <p className="text-xs font-mono text-emerald-800 font-bold">
                        Requirement → Assessment → Preparation → Guided next step.
                      </p>
                      
                      <div className="space-y-3 pt-2 border-t border-slate-200">
                        {currentService.processSteps.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-xs font-bold text-slate-700">
                            <span className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center font-mono text-[10px] text-slate-600 shrink-0">
                              0{idx + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
                      <span className="text-[11px] font-mono font-black uppercase tracking-[0.2em] text-[#f3c251] block">
                        04 DELIVERABLES
                      </span>
                      <h3 className="text-xl font-black tracking-tight text-[#0F1E11]">
                        What the client receives
                      </h3>
                      <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-900/10 text-xs sm:text-sm font-semibold text-[#062415] leading-relaxed">
                        {currentService.deliverables}
                      </div>
                    </div>
                  </div>

                  {/* CARD 05: FAQS */}
                  <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
                    <span className="text-[11px] font-mono font-black uppercase tracking-[0.2em] text-[#f3c251] block">
                      05 FREQUENTLY ASKED QUESTIONS
                    </span>
                    <h3 className="text-2xl font-black tracking-tight text-[#0F1E11]">
                      Answer before the inquiry
                    </h3>

                    <div className="space-y-3 pt-1">
                      {currentService.faqs.map((faq, idx) => (
                        <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 space-y-1.5">
                          <div className="flex items-center gap-2 font-black text-sm text-[#0F1E11]">
                            <FiHelpCircle className="text-[#217044] shrink-0 text-base" />
                            <span>{faq.q}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed pl-6">
                            {faq.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Sticky Advisory Card */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
              <div className="bg-[#062415] text-white rounded-3xl p-7 sm:p-8 space-y-5 shadow-xl border border-emerald-950">
                <span className="text-[11px] font-mono font-black uppercase tracking-[0.22em] text-[#f3c251] block">
                  NEED GUIDANCE?
                </span>

                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                  Speak with the advisory team.
                </h3>

                <div className="space-y-2 text-sm sm:text-base font-semibold text-emerald-200 pt-1">
                  <a href="tel:9575059137" className="flex items-center gap-2.5 hover:text-[#f3c251] transition-colors">
                    <FiPhone className="text-xs text-[#f3c251]" />
                    <span>+91 95750 59137</span>
                  </a>
                  <a href="tel:9575959137" className="flex items-center gap-2.5 hover:text-[#f3c251] transition-colors">
                    <FiPhone className="text-xs text-[#f3c251]" />
                    <span>+91 95759 59137</span>
                  </a>
                </div>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="w-full py-4 bg-[#f3c251] hover:bg-[#e4b443] text-[#052516] text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>REQUEST A CALL BACK</span>
                    <FiArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>

              {/* Service Disclaimer Box */}
              <div className="bg-[#F8FAFC] rounded-3xl p-6 border border-slate-200/90 space-y-3">
                <span className="text-[11px] font-mono font-black uppercase tracking-[0.2em] text-slate-400 block">
                  SERVICE NOTICE
                </span>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  BSP Continental Pvt Ltd provides independent pre-application consultation, revenue compliance verification, and bureau analysis. We do not provide credit guarantees or issue loans directly.
                </p>
                <div className="pt-2 flex items-center gap-2 text-[11px] font-bold text-[#217044]">
                  <FiCheckCircle />
                  <span>Bilaspur (C.G.) Registered Advisory</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── PART 4: BOTTOM CLARITY CTA BANNER ─── */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClarityCtaBanner />
      </section>

    </div>
  );
}