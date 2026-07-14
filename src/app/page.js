// app/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FiTrendingUp, FiFileText, FiAlertTriangle, FiCheckCircle, 
  FiArrowRight, FiRefreshCw, FiSearch
} from 'react-icons/fi';

export default function PremiumBalancedDashboard() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      tag: "★ Personal Loan",
      title: "Apply Without Any Rejections",
      sub: "100% Digital Workflow"
    },
    {
      tag: "⚡ MSME Credit Line",
      title: "Got A Fast Growing Startup? Need Funding Now?",
      sub: "Collateral-Free Institutional Capital"
    },
    {
      tag: "🏠 Property Backed",
      title: "Unlock Instant Wealth Against Real Estate Assets",
      sub: "Lowest Interest Rates Guaranteed"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 antialiased pt-10 pb-8 px-4 md:px-6 flex flex-col justify-start">
      <div className="w-full max-w-md mx-auto space-y-5">
        
        {/* ==================== 1. CIBIL SCORE CONTAINER ==================== */}
        <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#121829] to-indigo-950 text-white p-5 border border-slate-800 shadow-[0_10px_25px_rgba(15,23,42,0.12)]">
          <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500/[0.06] rounded-bl-full pointer-events-none"></div>
          
          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black tracking-widest text-indigo-300 uppercase block">
                CIBIL SCORE
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tight text-white">785</span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-0.5 rounded-lg tracking-wide">
                  EXCELLENT
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 pt-0.5">
                <FiRefreshCw className="w-3 h-3 text-indigo-400" />
                <span>Updated 2 days ago</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2.5">
              <button className="bg-white text-indigo-950 hover:bg-indigo-50 font-black text-xs px-3.5 py-2 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5 group">
                Check Now <FiSearch className="w-3.5 h-3.5 text-indigo-900" />
              </button>
              
              <div className="flex items-end gap-1 h-5 w-14 px-0.5 opacity-70">
                <div className="bg-slate-700 w-2 h-[40%] rounded-t-xs"></div>
                <div className="bg-slate-600 w-2 h-[55%] rounded-t-xs"></div>
                <div className="bg-indigo-500 w-2 h-[75%] rounded-t-xs"></div>
                <div className="bg-emerald-400 w-2 h-[95%] rounded-t-xs shadow-[0_0_6px_rgba(52,211,153,0.4)]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 2. INTERACTIVE LOAN HERO SLIDER CARD ==================== */}
        <section className="space-y-2">
          {/* Dynamic Window Container */}
          <div className="relative overflow-hidden rounded-2xl shadow-[0_12px_30px_rgba(79,70,229,0.18)]">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Link href="/loan" className="block transform active:scale-[0.99] transition-all duration-150 group">
                    <div className="relative bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 text-white min-h-[125px] flex flex-col justify-between p-5 border-b-2 border-indigo-900">
                      
                      {/* Textured Unsplash Layer */}
                      <div className="absolute inset-0 z-0 opacity-25 mix-blend-overlay pointer-events-none">
                        <img 
                          src="https://images.unsplash.com/photo-1591605503774-82ab8184f092?auto=format&fit=crop&q=80&w=600" 
                          alt="Financial Growth" 
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      <div className="relative z-10 flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <div className="inline-flex bg-white/20 text-white text-[9px] font-black tracking-widest px-3 py-0.5 rounded-full backdrop-blur-md border border-white/10 uppercase">
                            {slide.tag}
                          </div>
                          <h2 className="text-xl font-black leading-tight tracking-tight drop-shadow-xs line-clamp-2">
                            {slide.title}
                          </h2>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20 shadow-xs flex-shrink-0 group-hover:bg-white/20 transition-colors">
                          <FiArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      <div className="relative z-10 flex justify-between items-center pt-2 mt-2 border-t border-white/10 text-[11px]">
                        <span className="text-indigo-100 font-semibold tracking-wide flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          {slide.sub}
                        </span>
                        <span className="font-black bg-white text-indigo-700 px-3.5 py-1 rounded-lg shadow-sm">
                          Apply Now
                        </span>
                      </div>

                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Paginated Slide Dots Indicator */}
          <div className="flex justify-center items-center gap-2 pt-1">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index 
                    ? 'w-5 h-1.5 bg-indigo-600 shadow-xs' 
                    : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* ==================== 3. REQUEST OTHER SERVICES GRID ==================== */}
        <section className="space-y-2">
          <div className="px-0.5">
            <h3 className="text-xs font-black tracking-wider text-slate-400 uppercase">
              Request Other Services
            </h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3.5">
            
            {/* Box 1: Property Check */}
            <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100 flex flex-col justify-between min-h-[120px] transform active:scale-[0.97] transition-all cursor-pointer shadow-sm hover:shadow-md hover:bg-blue-50 group">
              <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm shadow-blue-200 group-hover:scale-105 transition-transform">
                <FiTrendingUp className="w-5 h-5" />
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-black text-slate-950 tracking-wide">Property Check</h4>
                <p className="text-[11px] text-slate-500 font-bold mt-0.5 leading-tight">Instant valuation status</p>
              </div>
            </div>

            {/* Box 2: Paper Check */}
            <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-100 flex flex-col justify-between min-h-[120px] transform active:scale-[0.97] transition-all cursor-pointer shadow-sm hover:shadow-md hover:bg-amber-50 group">
              <div className="h-10 w-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-sm shadow-amber-200 group-hover:scale-105 transition-transform">
                <FiFileText className="w-5 h-5" />
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-black text-slate-950 tracking-wide">Paper Checker</h4>
                <p className="text-[11px] text-slate-500 font-bold mt-0.5 leading-tight">AI document validation</p>
              </div>
            </div>

            {/* Box 3: Avoid Rejections */}
            <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-100 flex flex-col justify-between min-h-[120px] transform active:scale-[0.97] transition-all cursor-pointer shadow-sm hover:shadow-md hover:bg-rose-50 group">
              <div className="h-10 w-10 bg-rose-500 rounded-xl flex items-center justify-center text-white shadow-sm shadow-rose-200 group-hover:scale-105 transition-transform">
                <FiAlertTriangle className="w-5 h-5" />
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-black text-slate-950 tracking-wide">Avoid Rejection</h4>
                <p className="text-[11px] text-slate-500 font-bold mt-0.5 leading-tight">Profile risk mitigation</p>
              </div>
            </div>

            {/* Box 4: Best Approval Guide */}
            <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100 flex flex-col justify-between min-h-[120px] transform active:scale-[0.97] transition-all cursor-pointer shadow-sm hover:shadow-md hover:bg-emerald-50 group">
              <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-sm shadow-emerald-200 group-hover:scale-105 transition-transform">
                <FiCheckCircle className="w-5 h-5" />
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-black text-slate-950 tracking-wide">Guaranteed Pass</h4>
                <p className="text-[11px] text-slate-500 font-bold mt-0.5 leading-tight">High-pass processing</p>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}