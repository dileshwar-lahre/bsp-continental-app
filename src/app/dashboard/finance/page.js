'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Home, 
  PhoneCall, 
  MessageSquare, 
  Target, 
  Briefcase, 
  FileSpreadsheet, 
  Building, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

const PHONE_NUMBER = "+919575059137";
const WHATSAPP_NUMBER = "919575059137";

const financeServices = [
  {
    id: "loan-readiness-solution",
    title: "Loan Readiness Solution",
    subtitle: "Pre-Approval & File Audit",
    icon: Target,
    waMessage: "Hello BSP CCONTINENTAL PVT LTD, I would like to make an inquiry regarding the Loan Readiness Solution.",
    points: [
      "File Health & CIBIL Pre-Audit",
      "Gap & Rejection Risk Elimination",
      "Banking Ratio Optimization (FOIR/DSCR)"
    ]
  },
  {
    id: "msme-business-finance",
    title: "MSME & Business Finance",
    subtitle: "Secured Working Capital & Term Loans",
    icon: Briefcase,
    waMessage: "Hello BSP CCONTINENTAL PVT LTD, I would like to make an inquiry regarding MSME & Business Finance.",
    points: [
      "CC / OD / Trade Credit Limits",
      "Business Expansion Advisory",
      "Lender Rate Negotiation"
    ]
  },
  {
    id: "project-finance",
    title: "Project Finance (DPR & CMA)",
    subtitle: "Industrial & Plant Funding",
    icon: FileSpreadsheet,
    waMessage: "Hello BSP CCONTINENTAL PVT LTD, I would like to make an inquiry regarding Project Finance (DPR & CMA Report).",
    points: [
      "Detailed Project Report (DPR) Preparation",
      "CMA Data & Cashflow Financials",
      "Equipment & Plant Machinery Loans"
    ]
  },
  {
    id: "mortgage-loan",
    title: "Mortgage Loan (LAP)",
    subtitle: "Asset Backed Property Funding",
    icon: Building,
    waMessage: "Hello BSP CCONTINENTAL PVT LTD, I would like to make an inquiry regarding Mortgage Loans (LAP).",
    points: [
      "Loan Against Commercial / Residential Property",
      "High LTV Processing Support",
      "Title Check & Fast Disbursement"
    ]
  }
];

export default function FinancePage() {
  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 antialiased py-8 px-4 sm:px-6 md:px-8 font-sans flex flex-col justify-start items-center select-none lg:pl-64 transition-all duration-300">
      
      {/* 🎯 SIDEBAR CLEARANCE & CENTERED CONTAINER */}
      <div className="w-full max-w-5xl mx-auto space-y-6">
        
        {/* 1. TOP NAVIGATION - BACK TO HOME ONLY */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-slate-600 hover:text-[#217044] uppercase tracking-wider transition-all">
            <Home size={15} className="text-[#217044]" /> Back to Home
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-[#217044] text-white text-[10px] font-black uppercase tracking-widest shadow-2xs">
            <Zap size={12} /> BSP CCONTINENTAL PVT LTD
          </span>
        </div>

        {/* 2. FINANCIAL ASSISTANT DIRECT CONTACT CARD */}
        <div className="bg-[#217044] text-white p-6 sm:p-7 rounded-3xl shadow-md flex flex-col md:flex-row items-center justify-between gap-5 border border-emerald-700/50">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg bg-white/15 text-emerald-100 inline-block border border-white/20">
              Financial Advisory Desk
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              Speak To Our Financial Assistant
            </h2>
            <p className="text-xs text-emerald-100 font-medium max-w-xl">
              Call or WhatsApp directly for Loan Readiness Audit, MSME Loans, Project DPR & CMA Data Preparation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a 
              href={`tel:${PHONE_NUMBER}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#217044] hover:bg-emerald-50 font-black text-xs px-6 py-3.5 rounded-2xl shadow-sm transition-all cursor-pointer uppercase tracking-wider active:scale-95"
            >
              <PhoneCall size={16} /> Call +91 95750 59137
            </a>

            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello BSP CCONTINENTAL PVT LTD, I would like to make an inquiry regarding financial assistance.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#125330] hover:bg-[#0c3c21] text-white font-black text-xs px-6 py-3.5 rounded-2xl shadow-sm border border-emerald-400/30 transition-all cursor-pointer uppercase tracking-wider active:scale-95"
            >
              <MessageSquare size={16} /> WhatsApp Us
            </a>
          </div>
        </div>

        {/* 3. CORE FINANCIAL SERVICES GRID */}
        <div className="space-y-4">
          <div className="px-1">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-[#217044]" /> Core Financial Solutions & Services
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {financeServices.map((service) => {
              const IconComp = service.icon;
              const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(service.waMessage)}`;

              return (
                <a 
                  key={service.id} 
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group h-full"
                >
                  <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:border-[#217044] hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between active:scale-[0.99]">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3.5 bg-[#217044]/10 text-[#217044] border border-[#217044]/20 rounded-2xl group-hover:bg-[#217044] group-hover:text-white transition-all">
                          <IconComp size={22} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-[#217044]/10 text-[#217044] rounded-xl border border-[#217044]/20 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#217044] animate-pulse" />
                          Consult Solution
                        </span>
                      </div>

                      <h4 className="text-base font-black text-slate-950 uppercase tracking-tight group-hover:text-[#217044] transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-xs font-bold text-[#217044] mt-0.5 mb-3">
                        {service.subtitle}
                      </p>

                      <ul className="space-y-2 border-t border-slate-100 pt-3">
                        {service.points.map((pt, idx) => (
                          <li key={idx} className="text-xs font-bold text-slate-700 flex items-start gap-2">
                            <CheckCircle2 size={14} className="text-[#217044] shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#217044]">
                      <span>WhatsApp Inquiry</span>
                      <div className="p-1.5 bg-[#217044]/10 group-hover:bg-[#217044] group-hover:text-white rounded-lg transition-all">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* 4. BOTTOM CONSULTANCY OVERVIEW */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-2xs space-y-1.5">
          <h5 className="text-xs font-black text-slate-950 uppercase tracking-tight">
            About BSP CCONTINENTAL Financial Consultancy
          </h5>
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">
            BSP CCONTINENTAL PVT LTD provides financial consulting, DPR preparation, CMA data structuring, and Loan Readiness File Audits for corporate enterprises, MSMEs, and individual applicants.
          </p>
        </div>

      </div>
    </div>
  );
}