'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CircleDollarSign, 
  Briefcase, 
  Building, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare,
  PhoneCall
} from 'lucide-react';

const WHATSAPP_NUMBER = "919131460470";

const financeServices = [
  {
    id: "financial-consulting",
    title: "Financial Consulting",
    subtitle: "Secured & Mortgage Support",
    icon: CircleDollarSign,
    badge: "Consultation",
    color: "from-emerald-600 to-teal-700",
    bgHover: "hover:border-emerald-300",
    waMessage: "Hello BSP Continental, mujhe Financial Consulting ke baare me discussion karna hai.",
    points: [
      "Secured Business Loan Assistance",
      "Mortgage Loan Assistance",
      "Expert Debt Advisory"
    ]
  },
  {
    id: "business-consulting",
    title: "Corporate Advisory",
    subtitle: "Growth & Capital Strategy",
    icon: Briefcase,
    badge: "Enterprise",
    color: "from-teal-600 to-emerald-800",
    bgHover: "hover:border-teal-300",
    waMessage: "Hello BSP Continental, mujhe Corporate Business Advisory ke liye appointment chahiye.",
    points: [
      "Capital Structure Optimization",
      "Institutional Tie-up Guidance",
      "Cashflow & Working Capital Planning"
    ]
  },
  {
    id: "mortgage-assistance",
    title: "Mortgage Special Assistance",
    subtitle: "Property Loan Advisory",
    icon: Building,
    badge: "Asset Backed",
    color: "from-emerald-700 to-green-800",
    bgHover: "hover:border-green-300",
    waMessage: "Hello BSP Continental, mujhe Mortgage Special Assistance support ki zaroorat hai.",
    points: [
      "Commercial Mortgage Advisory",
      "Property Legal Deed Assistance",
      "High LTV Processing Support"
    ]
  }
];

export default function FinancePage() {
  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 antialiased pt-4 md:pt-6 pb-24 md:pb-12 px-4 md:px-8">
      <div className="w-full max-w-7xl mx-auto space-y-8 md:pl-[310px] transition-all duration-300">
        
        {/* Top Header */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-full uppercase tracking-wider mb-2">
              <CircleDollarSign size={14} /> Financial Advisory Hub
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">
              Financial Consulting Support
            </h1>
            <p className="text-xs md:text-sm text-slate-500 font-semibold mt-1">
              Select any consultation area to connect directly on WhatsApp with our team.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello BSP Continental, mujhe Financial Consultation support chahiye.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-md transition-colors"
            >
              <MessageSquare size={16} /> WhatsApp
            </a>
            {/* Direct Contact Page Link */}
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-2xl transition-colors"
            >
              <PhoneCall size={16} /> Contact Page
            </Link>
          </div>
        </div>

        {/* Finance Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {financeServices.map((service) => {
            const IconComp = service.icon;
            const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(service.waMessage)}`;

            return (
              <a 
                key={service.id} 
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className={`bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between ${service.bgHover}`}>
                  <div>
                    {/* Top Bar */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-gradient-to-br ${service.color} text-white rounded-2xl shadow-md group-hover:scale-105 transition-transform`}>
                        <IconComp size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                        💬 WhatsApp
                      </span>
                    </div>

                    <h3 className="text-base md:text-lg font-black text-slate-950 group-hover:text-emerald-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-bold text-emerald-600 mt-0.5 mb-4">
                      {service.subtitle}
                    </p>

                    <ul className="space-y-2.5 border-t border-slate-100 pt-4">
                      {service.points.map((pt, idx) => (
                        <li key={idx} className="text-xs font-semibold text-slate-600 flex items-start gap-2">
                          <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-600 group-hover:text-emerald-700">
                    <span>Direct WhatsApp Inquiry</span>
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