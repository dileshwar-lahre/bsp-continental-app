"use client";

import Link from "next/link";
import { 
  FiShield, 
  FiCheckCircle, 
  FiDollarSign, 
  FiHome, 
  FiArrowRight,
  FiUser,
  FiGlobe,
  FiLock,
  FiClock,
  FiZap
} from "react-icons/fi";

export default function AboutPage() {
  const coreServices = [
    {
      id: "credit-management",
      number: "01",
      icon: <FiDollarSign className="text-2xl" />,
      title: "Credit Score Management",
      desc: "CIBIL report audit, bureau dispute filing, and credit score restoration to build strong loan eligibility.",
      link: "/credit-score-management",
      badge: "Credit Advisory"
    },
    {
      id: "loan-advisory",
      number: "02",
      icon: <FiHome className="text-2xl" />,
      title: "Home & Business Loan Advisory",
      desc: "End-to-end support for business financing, MSME loans, project finance, and mortgage loan processing.",
      link: "/finance",
      badge: "Financial Consultancy"
    },
    {
      id: "property-vetting",
      number: "03",
      icon: <FiShield className="text-2xl" />,
      title: "Property Due Diligence & Vetting",
      desc: "Legal title verification, land registry checks, and Khasra document audits to avoid real estate disputes.",
      link: "/property-vetting",
      badge: "Legal Verification"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 antialiased font-sans select-none lg:pl-64 transition-all duration-300 pb-16">
      
      {/* 🎯 SIDEBAR CLEARANCE & MATCHED CONTAINER SIZE (max-w-6xl) */}
      <div className="w-full max-w-6xl mx-auto space-y-6 pt-8 px-4 sm:px-6 md:px-8">
        
        {/* Navigation / Top Header Bar */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-slate-600 hover:text-[#217044] uppercase tracking-wider transition-all">
            <FiHome size={15} className="text-[#217044]" /> Back to Home
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-[#217044] text-white text-[10px] font-black uppercase tracking-widest shadow-2xs">
            <FiZap size={12} /> BSP CCONTINENTAL PVT LTD
          </span>
        </div>

        {/* 1. TOP HEADER CARD: BSP CCONTINENTAL PVT LTD */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950">
            BSP CCONTINENTAL PVT LTD
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed max-w-3xl">
            BSP CCONTINENTAL PVT LTD ek dedicated Financial Consultancy aur Property Compliance company hai. Hum individuals aur businesses ko secure loans, clean credit profiles, aur legally verified real estate property deals lene me madad karte hain.
          </p>
        </section>

        {/* 2. KRISNA GEDAAM SECTION */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#217044] text-white flex items-center justify-center font-black text-xs shadow-2xs">
              <FiUser size={18} />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-950 uppercase tracking-tight">
                Krishna Gedam
              </h2>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
            Krishna Gedam is company ke founder hain. Unke vision ke sath BSP CCONTINENTAL PVT LTD ko establish kiya gaya hai taaki log bina kisi loan rejection ya legal property fraud ke risk ke financial aur real estate services le sakein. Hum legal due diligence aur strategic banking knowledge ko ek jagah late hain.
          </p>
        </section>

        {/* 3. CORE 3 ADVISORY SERVICES */}
        <section className="space-y-4">
          <div className="px-1">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <FiShield size={16} className="text-[#217044]" /> Our Core Advisory Services
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreServices.map((srv) => (
              <Link 
                key={srv.id}
                href={srv.link}
                className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 hover:border-[#217044] hover:shadow-xl transition-all duration-300 group flex flex-col justify-between space-y-5 h-full active:scale-[0.99]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 bg-[#217044]/10 text-[#217044] border border-[#217044]/20 rounded-2xl group-hover:bg-[#217044] group-hover:text-white transition-all">
                      {srv.icon}
                    </div>
                    <span className="text-xs font-black text-[#217044] bg-[#217044]/10 px-2.5 py-1 rounded-xl border border-[#217044]/20">
                      {srv.number}
                    </span>
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-wider text-[#217044] block">
                    {srv.badge}
                  </span>

                  <div className="space-y-1.5">
                    <h4 className="font-black text-base text-slate-950 uppercase tracking-tight group-hover:text-[#217044] transition-colors leading-snug">
                      {srv.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#217044] group-hover:text-[#185332]">
                  <span>Explore Service</span>
                  <div className="p-2 bg-[#217044]/10 group-hover:bg-[#217044] group-hover:text-white rounded-xl transition-all">
                    <FiArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. WHY CHOOSE OUR ONLINE PLATFORM */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-black text-slate-950 uppercase tracking-tight flex items-center gap-2">
              <FiGlobe className="text-[#217044]" size={18} /> Why Choose Our Online Advisory Platform?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-[#217044] font-black text-xs uppercase">
                <FiClock size={16} /> Fast Processing
              </div>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                Online document upload aur quick evaluation se aapka time bachta hai aur immediate updates milte hain.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-[#217044] font-black text-xs uppercase">
                <FiLock size={16} /> 100% Confidential
              </div>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                Aapke CIBIL, Financial, aur Property papers secure cloud storage par 100% Safe aur Private rehte hain.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-[#217044] font-black text-xs uppercase">
                <FiCheckCircle size={16} /> Expert Vetted
              </div>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                Experienced legal consultants aur financial advisors har file ki detailed review karte hain.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}