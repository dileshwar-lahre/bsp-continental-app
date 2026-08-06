"use client";

import Link from "next/link";
import { 
  FiHome, 
  FiShield, 
  FiTrendingUp, 
  FiArrowRight,
  FiZap,
  FiCheckCircle,
  FiArrowUpRight,
  FiGrid,
  FiChevronRight
} from "react-icons/fi";

export default function ServicesPage() {
  const primaryServices = [
    {
      id: "credit-score-management",
      number: "01",
      icon: <FiTrendingUp className="text-2xl" />,
      title: "Credit Score Management & Advisory",
      subtitle: "CIBIL Restructuring & Dispute Bureau Advisory",
      desc: "Hum CIBIL aur Credit Report ki deep technical audit karte hain taaki aapke loan rejection ke risks khatam ho sakein aur bank eligibility maximize ho.",
      link: "/credit-score-management",
      badge: "Credit Advisory",
      subServices: [
        "CIBIL & CRIF Report Technical Audit",
        "Dispute Filing & Error Rectification",
        "Loan Rejection Analysis & Bureau Cleanup",
        "Credit Score Restoration Strategy"
      ]
    },
    {
      id: "loan-advisory",
      number: "02",
      icon: <FiHome className="text-2xl" />,
      title: "Home, MSME & Business Loan Advisory",
      subtitle: "Loan Readiness, DPR & Corporate Debt Structuring",
      desc: "Bank application se pehle file audit aur Loan Readiness Solution ke dwara MSME, Business, Term Loan aur Property Loans fast approve karwane me advisory support.",
      link: "/finance",
      badge: "Financial Consultancy",
      subServices: [
        "Loan Readiness File Audit & Pre-Check",
        "Detailed Project Report (DPR) & CMA Data",
        "Business, MSME & Working Capital (CC/OD)",
        "Mortgage Loan (LAP) & Project Finance"
      ]
    },
    {
      id: "property-vetting",
      number: "03",
      icon: <FiShield className="text-2xl" />,
      title: "Property Due Diligence & Legal Vetting",
      desc: "Property khareedne ya invest karne se pehle Registry, Khasra, B-1 aur Title verification dwara legal disputes aur property frauds se bachat.",
      link: "/property-vetting",
      badge: "Legal Verification",
      subServices: [
        "Registry & Sale Deed Copy Legal Audit",
        "Khasra, Khatauni & B-1 Land Verification",
        "Encumbrance & Ownership Search Report",
        "Fake Property & Dispute Detection"
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 antialiased font-sans select-none lg:pl-64 transition-all duration-300 pb-16">
      
      {/* 🎯 SIDEBAR CLEARANCE & MATCHED CONTAINER (max-w-6xl) */}
      <div className="w-full max-w-6xl mx-auto space-y-6 pt-8 px-4 sm:px-6 md:px-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-slate-600 hover:text-[#217044] uppercase tracking-wider transition-all">
            <FiHome size={15} className="text-[#217044]" /> Back to Home
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-[#217044] text-white text-[10px] font-black uppercase tracking-widest shadow-2xs">
            <FiZap size={12} /> BSP CCONTINENTAL PVT LTD
          </span>
        </div>

        {/* 🚀 Top Header Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#217044]/10 text-[#217044] text-[10px] font-black uppercase tracking-wider border border-[#217044]/20">
                <FiZap size={12} /> Core Advisory Portfolio
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950">
                Financial & Property <span className="text-[#217044]">Advisory Solutions</span>
              </h1>
            </div>

            <Link
              href="/contact"
              className="bg-[#217044] hover:bg-[#185332] text-white font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all flex items-center gap-2 shadow-sm active:scale-95 shrink-0"
            >
              <span>Get Free Advisory</span>
              <FiArrowUpRight className="text-sm" />
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed max-w-3xl">
            BSP CCONTINENTAL PVT LTD aapko Credit Score Restoration, Business & Project Loans, aur Legal Property Verification ki complete advisory support online aur offline provide karti hai.
          </p>
        </section>

        {/* 💼 3 Core Services Detailed Breakdown */}
        <section className="space-y-4">
          <div className="px-1">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <FiGrid size={16} className="text-[#217044]" /> Detailed Service Breakdown
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {primaryServices.map((srv) => (
              <div 
                key={srv.id}
                className="group bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm hover:border-[#217044] hover:shadow-xl transition-all duration-300 space-y-6 relative overflow-hidden"
              >
                {/* Top Title & Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3.5 bg-[#217044]/10 text-[#217044] border border-[#217044]/20 rounded-2xl shrink-0 group-hover:bg-[#217044] group-hover:text-white transition-all duration-300">
                      {srv.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#217044] block">
                        {srv.badge}
                      </span>
                      <h2 className="text-lg sm:text-xl font-black text-slate-950 uppercase tracking-tight group-hover:text-[#217044] transition-colors">
                        {srv.title}
                      </h2>
                    </div>
                  </div>

                  <span className="text-xs font-black text-[#217044] bg-[#217044]/10 px-3 py-1 rounded-xl border border-[#217044]/20 self-start sm:self-auto">
                    {srv.number}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                  {srv.desc}
                </p>

                {/* Sub-Services Breakdown Grid */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                    Key Sub-Services Included:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {srv.subServices.map((sub, idx) => (
                      <div key={idx} className="bg-slate-50/80 border border-slate-200/80 p-3 rounded-xl flex items-center gap-2 text-xs font-extrabold text-slate-800 group-hover:bg-emerald-50/40 group-hover:border-[#217044]/30 transition-all">
                        <FiCheckCircle className="text-[#217044] shrink-0" size={15} />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 🚀 MODERN ULTRA-CLEAN CTA BAR */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider hidden sm:block">
                    Verified Advisory Desk
                  </span>

                  <Link
                    href={srv.link}
                    className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-4 bg-slate-900 hover:bg-[#217044] text-white font-black text-xs px-6 py-3.5 rounded-2xl transition-all duration-300 shadow-md active:scale-[0.98] group/btn"
                  >
                    <span className="uppercase tracking-wider">Access {srv.badge}</span>
                    <div className="w-6 h-6 rounded-xl bg-white/20 group-hover/btn:bg-white text-white group-hover/btn:text-[#217044] flex items-center justify-center transition-all duration-300 shrink-0">
                      <FiChevronRight size={16} />
                    </div>
                  </Link>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* 🏆 Benefits Banner */}
        <section className="bg-[#217044] text-white p-6 sm:p-8 rounded-3xl shadow-md border border-emerald-700/50 text-center space-y-2">
          <span className="text-[10px] font-black text-emerald-100 uppercase tracking-widest block">GUARANTEED ADVANTAGE</span>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white max-w-2xl mx-auto leading-tight">
            100% Legal Verification & Financial Risk Elimination
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 font-medium max-w-xl mx-auto leading-relaxed">
            BSP CCONTINENTAL PVT LTD ke sath apne financial aur property decisions ko secure karein.
          </p>
        </section>

      </div>
    </div>
  );
}