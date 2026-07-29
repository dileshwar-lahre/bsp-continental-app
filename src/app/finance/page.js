'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CircleDollarSign, 
  Briefcase, 
  Building, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall 
} from 'lucide-react';

const financeServices = [
  {
    id: "financial-consulting",
    title: "Financial Consulting",
    subtitle: "Core Financial Advisory",
    icon: CircleDollarSign,
    badge: "Core Service",
    color: "from-emerald-600 to-teal-700",
    bgHover: "hover:border-emerald-300",
    points: [
      "Secured Business Loan Assistance",
      "Mortgage Loan Assistance"
    ]
  },
  {
    id: "business-consulting",
    title: "Corporate Business Advisory",
    subtitle: "Institutional Growth Support",
    icon: Briefcase,
    badge: "Enterprise",
    color: "from-teal-600 to-emerald-800",
    bgHover: "hover:border-teal-300",
    points: [
      "Capital Structure Optimization",
      "Institutional Tie-up Guidance",
      "Cashflow & Working Capital Planning"
    ]
  },
  {
    id: "mortgage-assistance",
    title: "Mortgage Special Assistance",
    subtitle: "Property & Asset Backed Funding",
    icon: Building,
    badge: "Low Interest",
    color: "from-emerald-700 to-green-800",
    bgHover: "hover:border-green-300",
    points: [
      "Commercial Mortgage Advisory",
      "Residential Title & Value Matching",
      "End-to-End Legal Assistance"
    ]
  }
];

export default function FinancePage() {
  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 antialiased pt-4 md:pt-6 pb-24 md:pb-12 px-4 md:px-8">
      {/* Container aligned with Desktop Sidebar Offset */}
      <div className="w-full max-w-7xl mx-auto space-y-8 md:pl-[300px] transition-all duration-300">
        
        {/* Header Section */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-full uppercase tracking-wider mb-2">
              <CircleDollarSign size={14} /> Advisory & Consulting
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">
              Financial Consulting Services
            </h1>
            <p className="text-xs md:text-sm text-slate-500 font-semibold mt-1">
              Get professional consultation for business loans, mortgages, and capital planning.
            </p>
          </div>

          <Link 
            href="/my-request?type=consultation" 
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-md transition-colors"
          >
            <PhoneCall size={16} /> Book Consultant Call
          </Link>
        </div>

        {/* Finance Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {financeServices.map((service) => {
            const IconComp = service.icon;
            return (
              <Link 
                key={service.id} 
                href={`/my-request?service=${service.id}`}
                className="block group"
              >
                <div className={`bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between ${service.bgHover}`}>
                  <div>
                    {/* Card Top Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-gradient-to-br ${service.color} text-white rounded-2xl shadow-md group-hover:scale-105 transition-transform`}>
                        <IconComp size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                        {service.badge}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-base md:text-lg font-black text-slate-950 group-hover:text-emerald-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-bold text-emerald-600 mt-0.5 mb-4">
                      {service.subtitle}
                    </p>

                    {/* Points Bullet List */}
                    <ul className="space-y-2.5 border-t border-slate-100 pt-4">
                      {service.points.map((pt, idx) => (
                        <li key={idx} className="text-xs font-semibold text-slate-600 flex items-start gap-2">
                          <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Bottom Bar */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-slate-900 group-hover:text-emerald-600">
                    <span>Connect With Expert</span>
                    <div className="p-2 bg-slate-50 group-hover:bg-emerald-600 group-hover:text-white rounded-xl transition-all">
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