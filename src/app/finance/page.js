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
  PhoneCall,
  ArrowLeft,
  ShieldCheck,
  TrendingUp,
  Award
} from 'lucide-react';

const WHATSAPP_NUMBER = "919575059137";

const financeServices = [
  {
    id: "business-loan-assistance",
    title: "Business Loan Assistance",
    subtitle: "Secured Business Financing",
    icon: CircleDollarSign,
    badge: "High Approval",
    waMessage: "Hello BSP Continental Pvt Ltd, mujhe Business Loan Assistance ke baare me inquiry karni hai.",
    points: [
      "Lender Selection & Comparison",
      "Competitive Interest Rate Negotiation",
      "Working Capital & Capital Growth Support"
    ]
  },
  {
    id: "mortgage-loan-consultation",
    title: "Mortgage Loan Consultation",
    subtitle: "Asset Backed Funding",
    icon: Building,
    badge: "Asset Backed",
    waMessage: "Hello BSP Continental Pvt Ltd, mujhe Mortgage Loan Consultation ke liye assistance chahiye.",
    points: [
      "Property Loan Structuring",
      "High LTV Processing Support",
      "Commercial & Residential Property Advisory"
    ]
  },
  {
    id: "loan-structuring-doc",
    title: "Loan Structuring & Documentation",
    subtitle: "End-to-End Advisory",
    icon: Briefcase,
    badge: "Financial Advisory",
    waMessage: "Hello BSP Continental Pvt Ltd, mujhe Financial Documentation Support & Loan Structuring ke liye consultant chahiye.",
    points: [
      "End-to-End Loan Processing",
      "Financial Documentation Support",
      "Expert Debt & Risk Advisory"
    ]
  }
];

export default function FinancePage() {
  return (
    <div className="w-full min-h-screen bg-white text-slate-900 antialiased py-6 md:py-10 px-4 sm:px-6 md:px-10 lg:pl-64 font-sans flex flex-col transition-all duration-300 select-none">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-blue-600 uppercase tracking-wider transition-all">
            <ArrowLeft size={16} /> Back
          </Link>
          <span className="text-xs font-black text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-xl">
            Financial Consultancy Desk
          </span>
        </div>

        {/* Top Header Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-xl uppercase tracking-wider">
              <ShieldCheck size={14} /> Secured Business Loan & Mortgage Advisory
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-950 uppercase tracking-tight">
              Financial Consultancy Support
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
              At BSP Continental Pvt Ltd, we assist businesses and property owners in obtaining secured financing from Banks, NBFCs, and Financial Institutions with competitive terms.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello BSP Continental Pvt Ltd, mujhe Financial Consultation support chahiye.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-4 py-3.5 rounded-2xl shadow-sm transition-all cursor-pointer uppercase tracking-wider active:scale-95"
            >
              <MessageSquare size={16} /> WhatsApp (+91 95750 59137)
            </a>
            
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white font-black text-xs px-5 py-3.5 rounded-2xl shadow-sm transition-all cursor-pointer uppercase tracking-wider active:scale-95"
            >
              <PhoneCall size={15} /> Contact Page
            </Link>
          </div>
        </div>

        {/* Key Benefits Matrix */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 shadow-2xs space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-1.5">
            <Award size={14} /> Key Benefits You Gain
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "Higher Loan Approval Rate",
              "Better Interest Rates",
              "Faster Processing",
              "Professional Financial Guidance"
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white p-3.5 rounded-2xl border border-slate-200/80 flex items-center gap-2 text-xs font-black text-slate-800">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
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
                <div className="bg-white p-6 md:p-7 rounded-3xl border border-slate-200/90 shadow-2xs hover:border-blue-600 hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between active:scale-[0.99]">
                  <div>
                    {/* Top Bar */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-3.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <IconComp size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        WhatsApp
                      </span>
                    </div>

                    <h3 className="text-base md:text-lg font-black text-slate-950 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-bold text-blue-600 mt-0.5 mb-4">
                      {service.subtitle}
                    </p>

                    <ul className="space-y-2.5 border-t border-slate-100 pt-4">
                      {service.points.map((pt, idx) => (
                        <li key={idx} className="text-xs font-bold text-slate-700 flex items-start gap-2">
                          <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
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