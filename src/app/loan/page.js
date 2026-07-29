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
  HelpCircle 
} from 'lucide-react';

const loanServices = [
  {
    id: "personal-loan",
    title: "Personal Loan",
    subtitle: "Instant Digital Sanction",
    icon: UserCheck,
    badge: "Fast Approval",
    color: "from-blue-600 to-indigo-600",
    bgHover: "hover:border-blue-300",
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
    subtitle: "Image Core Specification",
    icon: Landmark,
    badge: "Expert Assistance",
    color: "from-blue-700 to-indigo-800",
    bgHover: "hover:border-indigo-400",
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
      {/* Container aligned with Desktop Sidebar Offset */}
      <div className="w-full max-w-7xl mx-auto space-y-8 md:pl-[300px] transition-all duration-300">
        
        {/* Header Section */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-black rounded-full uppercase tracking-wider mb-2">
              <ShieldCheck size={14} /> Institutional Credit Hub
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">
              Loan Solutions & Financing
            </h1>
            <p className="text-xs md:text-sm text-slate-500 font-semibold mt-1">
              Select your required loan category to get in touch with our expert advisors.
            </p>
          </div>

          <Link 
            href="/my-request" 
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-md hover:bg-blue-600 transition-colors"
          >
            <HelpCircle size={16} /> Track My Request
          </Link>
        </div>

        {/* Loan Cards Grid (Mobile 1 Col, Desktop 2 Cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loanServices.map((loan) => {
            const IconComp = loan.icon;
            return (
              <Link 
                key={loan.id} 
                href={`/my-request?service=${loan.id}`}
                className="block group"
              >
                <div className={`bg-white p-6 md:p-7 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between ${loan.bgHover}`}>
                  <div>
                    {/* Card Top Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-gradient-to-br ${loan.color} text-white rounded-2xl shadow-md shadow-blue-500/10 group-hover:scale-105 transition-transform`}>
                        <IconComp size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200/60">
                        {loan.badge}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-lg md:text-xl font-black text-slate-950 group-hover:text-blue-600 transition-colors">
                      {loan.title}
                    </h3>
                    <p className="text-xs font-bold text-blue-600 mt-0.5 mb-4">
                      {loan.subtitle}
                    </p>

                    {/* Points Bullet List */}
                    <ul className="space-y-2 border-t border-slate-100 pt-4">
                      {loan.points.map((pt, idx) => (
                        <li key={idx} className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                          <CheckCircle2 size={15} className="text-blue-600 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Bottom Bar */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-slate-900 group-hover:text-blue-600">
                    <span>Contact Advisor / Apply Now</span>
                    <div className="p-2 bg-slate-50 group-hover:bg-blue-600 group-hover:text-white rounded-xl transition-all">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}