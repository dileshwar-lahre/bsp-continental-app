"use client";

import Link from "next/link";
import { 
  FiDollarSign, 
  FiHome, 
  FiShield, 
  FiFileText, 
  FiAlertTriangle, 
  FiTrendingUp, 
  FiArrowUpRight,
  FiZap,
  FiCheckCircle
} from "react-icons/fi";

export default function ServicesPage() {
  const allServices = [
    {
      number: "01",
      icon: <FiTrendingUp className="text-2xl text-black" />,
      title: "Credit Score Improvement",
      tagline: "Boost Eligibility & Health",
      desc: "Comprehensive credit reporting, score restoration, and strategic financial counseling to improve overall loan eligibility."
    },
    {
      number: "02",
      icon: <FiHome className="text-2xl text-black" />,
      title: "Loan Readiness Consulting",
      tagline: "Hassle-free Approvals",
      desc: "Pre-application evaluation, documentation alignment, and bank criteria matching for seamless loan processing."
    },
    {
      number: "03",
      icon: <FiShield className="text-2xl text-black" />,
      title: "Property Compliance Service",
      tagline: "100% Secure Real Estate",
      desc: "Deep legal vetting, property title verification, and regulatory compliance checks to protect buyers from fraud."
    },
    {
      number: "04",
      icon: <FiDollarSign className="text-2xl text-black" />,
      title: "Mortgage, MSME & Other Loans",
      tagline: "Tailored Financing Solutions",
      desc: "End-to-end advisory for securing competitive home, commercial, business, MSME, and personal financing options."
    },
    {
      number: "05",
      icon: <FiAlertTriangle className="text-2xl text-black" />,
      title: "Loan Difficulties & Solutions",
      tagline: "Rejection Resolution",
      desc: "Expert resolution for rejected applications, high-risk flags, debt restructuring, and complex banking roadblocks."
    },
    {
      number: "06",
      icon: <FiFileText className="text-2xl text-black" />,
      title: "Trusted Financial Advisory",
      tagline: "Strategic Wealth Growth",
      desc: "Integrated financial and legal consultancy designed to minimize risks and enable sustainable long-term wealth."
    }
  ];

  const highlights = [
    "End-to-End Legal Due Diligence",
    "Bank & NBFC Criteria Matching",
    "Tailored MSME & Home Financing",
    "Transparent & Compliant Process"
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-black selection:text-white pb-20">
      
      {/* 🚀 Header Section */}
      <section className="pt-20 pb-16 px-4 md:px-8 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-200 bg-neutral-50 text-neutral-800 text-[11px] font-mono uppercase tracking-widest shadow-sm">
          <FiZap className="text-black" /> Integrated Solutions
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] uppercase max-w-4xl mx-auto">
          FINANCIAL & PROPERTY <br />
          <span className="text-neutral-400">COMPLIANCE SERVICES</span>
        </h1>

        <p className="text-neutral-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-normal">
          By combining financial expertise with legal due diligence, BSP Continental reduces risks, improves loan eligibility, and creates confidence in every transaction[cite: 1].
        </p>

        {/* Redirects to /contact */}
        <div className="pt-2 flex justify-center">
          <Link
            href="/contact"
            className="bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all flex items-center gap-2 shadow-xl active:scale-95"
          >
            <span>Get Free Consultation</span>
            <FiArrowUpRight className="text-lg" />
          </Link>
        </div>
      </section>

      {/* 📊 Badges Grid */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-neutral-50 rounded-3xl border border-neutral-200/80">
          <div className="space-y-1 text-center md:text-left border-r border-neutral-200/60 last:border-none pr-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">MODEL</span>
            <span className="text-sm font-black uppercase text-black">PropTech & FinTech[cite: 1]</span>
          </div>
          <div className="space-y-1 text-center md:text-left border-r border-neutral-200/60 last:border-none pr-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">EXPERTISE</span>
            <span className="text-sm font-black uppercase text-black">Legal & Credit[cite: 1]</span>
          </div>
          <div className="space-y-1 text-center md:text-left border-r border-neutral-200/60 last:border-none pr-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">NETWORK</span>
            <span className="text-sm font-black uppercase text-black">Banks & NBFCs[cite: 1]</span>
          </div>
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">GUARANTEE</span>
            <span className="text-sm font-black uppercase text-black">100% Compliant[cite: 1]</span>
          </div>
        </div>
      </section>

      {/* 💼 Services Grid (6 Core Cards -> Redirects to /contact) */}
      <section className="py-8 px-4 md:px-8 max-w-5xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allServices.map((srv, idx) => (
            <Link 
              key={idx}
              href="/contact"
              className="bg-neutral-50 p-8 rounded-3xl border border-neutral-200/80 hover:border-black transition-all group flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl cursor-pointer hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-white border border-neutral-200 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-black group-hover:text-white transition-all">
                  {srv.icon}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black text-neutral-300 group-hover:text-black transition-colors">{srv.number}</span>
                  <FiArrowUpRight className="text-lg text-neutral-400 group-hover:text-black transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">
                  {srv.tagline}
                </span>
                <h3 className="font-black text-lg text-black uppercase tracking-wide group-hover:underline">
                  {srv.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-normal">{srv.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 🏛️ Value Proposition Block */}
      <section className="py-16 my-12 bg-neutral-50 border-y border-neutral-200/80 px-4 md:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          
          <div className="md:col-span-7 space-y-5">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold block">
              WHY CHOOSE BSP CONTINENTAL
            </span>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-black leading-tight">
              Integrated Expertise, Absolute Transparency
            </h2>
            <p className="text-neutral-700 text-xs md:text-sm leading-relaxed">
              India's rapidly growing real estate and lending sectors continue to face significant challenges, including inadequate property verification and inaccurate credit reporting[cite: 1].
            </p>
            <p className="text-neutral-500 text-xs md:text-sm leading-relaxed">
              BSP Continental bridges these gaps through a technology-enabled, client-centric approach that simplifies complex financial and legal processes[cite: 1].
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-neutral-200">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                  <FiCheckCircle className="text-black shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="bg-white p-8 rounded-3xl border border-neutral-200 space-y-6 shadow-xl text-center">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold block">
                GET IN TOUCH
              </span>
              <h3 className="text-xl font-black uppercase text-black">
                Ready to optimize your financial journey?
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Connect with our advisory team to resolve loan difficulties or ensure property compliance today[cite: 1].
              </p>
              <Link
                href="/contact"
                className="w-full bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-widest py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <span>Book Strategy Call</span>
                <FiArrowUpRight className="text-sm" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 🌐 Vision Banner */}
      <section className="py-16 bg-neutral-900 text-white rounded-3xl max-w-5xl mx-4 md:mx-auto px-6 md:px-12 text-center space-y-4 shadow-2xl">
        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">OUR COMMITMENT</span>
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight max-w-2xl mx-auto leading-tight">
          Better Credit Score. Better Opportunities. Better Life.
        </h2>
        <p className="text-xs md:text-sm text-neutral-300 leading-relaxed max-w-xl mx-auto font-normal">
          Empowering individuals and businesses with legally secure real estate investments and financial clarity[cite: 1].
        </p>
      </section>

    </div>
  );
}