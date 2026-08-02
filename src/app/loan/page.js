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
  Phone
} from 'lucide-react';

const WHATSAPP_NUMBER = "919131460470";

const loanServices = [
  {
    id: "personal-loan",
    title: "Personal Loan",
    subtitle: "Instant Digital Sanction",
    icon: UserCheck,
    badge: "Fast Approval",
    color: "from-blue-600 to-indigo-600",
    bgHover: "hover:border-blue-300",
    waMessage: "Hello BSP Continental, mujhe Personal Loan ke baare me inquiry karni hai.",
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
    color: "from-indigo-600 to-violet-600",
    bgHover: "hover:border-indigo-300",
    waMessage: "Hello BSP Continental, mujhe MSME / Business Loan ke liye consultant support chahiye.",
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
    color: "from-sky-600 to-blue-700",
    bgHover: "hover:border-sky-300",
    waMessage: "Hello BSP Continental, mujhe Property Backed Loan (LAP) ki details chahiye.",
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
    color: "from-blue-700 to-indigo-800",
    bgHover: "hover:border-indigo-400",
    waMessage: "Hello BSP Continental, mera loan eligibility check aur debt restructuring karna hai.",
    points: [
      "Loan Eligibility Check",
      "Loan Restructuring",
      "Debt Consolidation"
    ]
  }
];

export default function LoanPage() {
  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 antialiased pt-4 md:pt-6 pb-24 md:pb-12 px-4 md:px-8">
      <div className="w-full max-w-7xl mx-auto space-y-8 md:pl-[310px] transition-all duration-300">
        
        {/* Top Header */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-black rounded-full uppercase tracking-wider mb-2">
              <ShieldCheck size={14} /> Direct Loan Support
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">
              Loan Solutions & Direct Assistance
            </h1>
            <p className="text-xs md:text-sm text-slate-500 font-semibold mt-1">
              Kisi bhi card par click karke direct WhatsApp support par connect karein ya request submit karein.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={`tel:+919131460470`} 
              className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs px-4 py-3 rounded-2xl transition-colors"
            >
              <Phone size={16} /> Call Now
            </a>
            {/* Direct Contact Page Redirect */}
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-md transition-colors"
            >
              Submit Request
            </Link>
          </div>
        </div>

        {/* Loan Cards Grid */}
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
                <div className={`bg-white p-6 md:p-7 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between ${loan.bgHover}`}>
                  <div>
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-gradient-to-br ${loan.color} text-white rounded-2xl shadow-md group-hover:scale-105 transition-transform`}>
                        <IconComp size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                        💬 WhatsApp Connect
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-black text-slate-950 group-hover:text-blue-600 transition-colors">
                      {loan.title}
                    </h3>
                    <p className="text-xs font-bold text-blue-600 mt-0.5 mb-4">
                      {loan.subtitle}
                    </p>

                    {/* Points */}
                    <ul className="space-y-2 border-t border-slate-100 pt-4">
                      {loan.points.map((pt, idx) => (
                        <li key={idx} className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                          <CheckCircle2 size={15} className="text-blue-600 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* WhatsApp CTA Bar */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-600 group-hover:text-emerald-700">
                    <span className="flex items-center gap-1.5">
                      <MessageSquare size={16} /> Chat on WhatsApp (+91 9131460470)
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