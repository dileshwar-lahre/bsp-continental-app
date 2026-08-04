'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Landmark, 
  Building2, 
  UserCheck, 
  Home, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  MessageSquare,
  Phone,
  ArrowLeft
} from 'lucide-react';

const WHATSAPP_NUMBER = "919575059137";

const loanServices = [
  {
    id: "personal-loan",
    title: "Personal Loan",
    subtitle: "Instant Digital Sanction",
    icon: UserCheck,
    badge: "Fast Approval",
    waMessage: "Hello BSP Continental Pvt Ltd, mujhe Personal Loan ke baare me inquiry karni hai.",
    points: [
      "100% Paperless Realtime Workflow",
      "No Rejections Policy Assistance",
      "Flexible Repayment Tenure",
      "Competitive Interest Rates"
    ]
  },
  {
    id: "msme-loan",
    title: "MSME & Business Loan",
    subtitle: "Collateral-Free Capital",
    icon: Building2,
    badge: "Startup Friendly",
    waMessage: "Hello BSP Continental Pvt Ltd, mujhe MSME / Business Loan ke liye consultant support chahiye.",
    points: [
      "Working Capital Funding",
      "Secured & Unsecured Business Lines",
      "Quick Institutional Disversal",
      "GST & Turnover Based Processing"
    ]
  },
  {
    id: "property-loan",
    title: "Loan Against Property",
    subtitle: "Unlock Asset Value",
    icon: Home,
    badge: "Lowest ROI",
    waMessage: "Hello BSP Continental Pvt Ltd, mujhe Property Backed Loan (LAP) ki details chahiye.",
    points: [
      "High LTV Loan Against Assets",
      "Residential & Commercial Property",
      "Longer Repayment Duration",
      "Simple & Legal Document Verification"
    ]
  },
  {
    id: "loan-readiness",
    title: "Loan Readiness & Structuring",
    subtitle: "Eligibility & Debt Fix",
    icon: Landmark,
    badge: "Expert Support",
    waMessage: "Hello BSP Continental Pvt Ltd, mera loan eligibility check aur debt restructuring karna hai.",
    points: [
      "Loan Eligibility Check",
      "Loan Restructuring & Debt Fix",
      "Debt Consolidation Advisory"
    ]
  }
];

export default function LoanPage() {
  return (
    <div className="w-full min-h-screen bg-white text-slate-900 antialiased py-6 md:py-10 px-4 sm:px-6 md:px-10 lg:pl-64 font-sans flex flex-col transition-all duration-300 select-none">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-blue-600 uppercase tracking-wider transition-all">
            <ArrowLeft size={16} /> Back
          </Link>
          <span className="text-xs font-black text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-xl">
            Loan Solutions Desk
          </span>
        </div>

        {/* Top Header Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-xl uppercase tracking-wider">
              <ShieldCheck size={14} /> Direct Loan Support Engine
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-950 uppercase tracking-tight">
              Loan Solutions & Direct Assistance
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
              At BSP Continental Pvt Ltd, kisi bhi loan card par click karke direct WhatsApp support (+91 95750 59137) par connect karein ya request submit karein.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a 
              href={`tel:+919575059137`} 
              className="inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-900 font-black text-xs px-4 py-3.5 rounded-2xl border border-slate-200 transition-all cursor-pointer"
            >
              <Phone size={15} className="text-blue-600" /> Call Support
            </a>
            
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-5 py-3.5 rounded-2xl shadow-sm transition-all cursor-pointer uppercase tracking-wider active:scale-95"
            >
              Submit Request
            </Link>
          </div>
        </div>

        {/* Loan Cards Grid (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loanServices.map((loan) => {
            const IconComp = loan.icon;
            const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(loan.waMessage)}`;

            return (
              <a 
                key={loan.id} 
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/90 shadow-2xs hover:border-blue-600 hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between active:scale-[0.99]">
                  <div>
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-3.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <IconComp size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        WhatsApp Connect
                      </span>
                    </div>

                    {/* Titles */}
                    <h3 className="text-lg md:text-xl font-black text-slate-950 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                      {loan.title}
                    </h3>
                    <p className="text-xs font-bold text-blue-600 mt-0.5 mb-4">
                      {loan.subtitle}
                    </p>

                    {/* Points Checklist */}
                    <ul className="space-y-2.5 border-t border-slate-100 pt-4">
                      {loan.points.map((pt, idx) => (
                        <li key={idx} className="text-xs font-bold text-slate-700 flex items-center gap-2">
                          <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* WhatsApp CTA Bar */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-600 group-hover:text-emerald-700">
                    <span className="flex items-center gap-2">
                      <MessageSquare size={16} /> Chat on WhatsApp (+91 95750 59137)
                    </span>
                    <div className="p-2 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white rounded-xl transition-all">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </div>
  );
}