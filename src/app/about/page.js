"use client";

import Link from "next/link";
import { 
  FiShield, 
  FiCheckCircle, 
  FiFileText, 
  FiDollarSign, 
  FiHome, 
  FiArrowUpRight,
  FiZap
} from "react-icons/fi";

export default function AboutPage() {
  const coreServices = [
    {
      number: "01",
      icon: <FiDollarSign className="text-xl text-black" />,
      title: "Credit Score Management",
      desc: "Comprehensive credit reporting, score restoration, and financial health optimization to boost overall loan eligibility."
    },
    {
      number: "02",
      icon: <FiHome className="text-xl text-black" />,
      title: "Home & Business Loan Advisory",
      desc: "End-to-end guidance for securing competitive home, business, and commercial property loans effortlessly."
    },
    {
      number: "03",
      icon: <FiShield className="text-xl text-black" />,
      title: "Property Due Diligence",
      desc: "Deep legal vetting and title verification to protect real estate buyers and investors from fraudulent transactions."
    },
    {
      number: "04",
      icon: <FiFileText className="text-xl text-black" />,
      title: "Legal & Financial Compliance",
      desc: "Integrated solutions ensuring full regulatory compliance, dispute minimization, and transparent property deals."
    }
  ];

  const highlights = [
    "FinTech & PropTech Integrated Ecosystem",
    "Chhattisgarh-based Financial & Property Platform",
    "Risk Mitigation & Loan Rejection Prevention",
    "Strategic Partnerships with Banks & NBFCs"
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-black selection:text-white pb-20">
      
      {/* 🚀 Perfectly Centered Modern Hero Section */}
      <section className="pt-20 pb-16 px-4 md:px-8 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-200 bg-neutral-50 text-neutral-800 text-[11px] font-mono uppercase tracking-widest shadow-sm">
          <FiZap className="text-black" /> FinTech & PropTech Ecosystem
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] uppercase max-w-4xl mx-auto">
          Secure Finance. <br />
          Compliant Properties. <br />
          <span className="text-neutral-400">Sustainable Growth.</span>
        </h1>

        <p className="text-neutral-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-normal">
          BSP Continental Pvt. Ltd. is a next-generation Financial Consultancy and Property Compliance company dedicated to helping individuals, businesses, and investors make secure financial and real estate decisions[cite: 1].
        </p>

        {/* Redirects to /contact */}
        <div className="pt-2 flex justify-center">
          <Link
            href="/contact"
            className="bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all flex items-center gap-2 shadow-xl active:scale-95"
          >
            <span>Explore Ecosystem</span>
            <FiArrowUpRight className="text-lg" />
          </Link>
        </div>
      </section>

      {/* 📊 Stats / Badges Grid (Centered) */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-neutral-50 rounded-3xl border border-neutral-200/80">
          <div className="space-y-1 text-center md:text-left border-r border-neutral-200/60 last:border-none pr-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">MODEL</span>
            <span className="text-sm font-black uppercase text-black">PropTech & FinTech[cite: 1]</span>
          </div>
          <div className="space-y-1 text-center md:text-left border-r border-neutral-200/60 last:border-none pr-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">LOCATION</span>
            <span className="text-sm font-black uppercase text-black">Chhattisgarh, India[cite: 1]</span>
          </div>
          <div className="space-y-1 text-center md:text-left border-r border-neutral-200/60 last:border-none pr-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">FOCUS</span>
            <span className="text-sm font-black uppercase text-black">Legal Compliance[cite: 1]</span>
          </div>
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">TRUST</span>
            <span className="text-sm font-black uppercase text-black">Bank Vetted[cite: 1]</span>
          </div>
        </div>
      </section>

      {/* 🏛️ Executive Summary & Founder Card */}
      <section className="py-16 bg-neutral-50 border-y border-neutral-200/80 px-4 md:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          
          <div className="md:col-span-7 space-y-5">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold block">
              Executive Summary
            </span>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-black leading-tight">
              Transforming Financial Eligibility & Legal Vetting
            </h2>
            <p className="text-neutral-700 text-xs md:text-sm leading-relaxed">
              Founded by <strong className="text-black font-extrabold">Mr. Krisna Gedaam</strong>, BSP Continental addresses two of India’s most critical challenges—financial eligibility and property compliance—through a single integrated advisory ecosystem[cite: 1].
            </p>
            <p className="text-neutral-500 text-xs md:text-sm leading-relaxed">
              By combining financial expertise with legal due diligence, BSP Continental minimizes risks associated with loan rejections, property disputes, fraudulent transactions, and regulatory non-compliance[cite: 1].
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-neutral-200">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                  <FiCheckCircle className="text-black shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Founder Card */}
          <div className="md:col-span-5">
            <div className="bg-white p-8 rounded-3xl border border-neutral-200 space-y-6 shadow-xl relative">
              <div className="flex items-center gap-4 border-b border-neutral-100 pb-5">
                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black text-sm shadow-md">
                  KG
                </div>
                <div>
                  <h3 className="font-black text-base text-black uppercase tracking-wide">Mr. Krisna Gedaam</h3>
                  <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider font-bold">Founder & Managing Director[cite: 1]</p>
                </div>
              </div>

              <blockquote className="text-xs text-neutral-600 italic leading-relaxed">
                "Our long-term vision is to build India's first Integrated Financial & Property Compliance Ecosystem supported by digital platforms, strategic bank partnerships, and scalable SaaS solutions[cite: 1]."
              </blockquote>

              <div className="pt-3 text-[9px] text-neutral-400 font-mono font-bold flex items-center justify-between border-t border-neutral-100 uppercase tracking-widest">
                <span>BSP CONTINENTAL PVT. LTD.</span>
                <span>EST. FINTECH[cite: 1]</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 💼 Core Services Section - All Cards Redirect to /contact */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">SOLUTIONS</span>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black">Core Advisory Ecosystem</h2>
          <p className="text-xs text-neutral-500">
            Reducing risks, improving loan eligibility, and creating confidence in every property transaction[cite: 1].
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreServices.map((srv, idx) => (
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
                <h3 className="font-black text-base text-black uppercase tracking-wide group-hover:underline">
                  {srv.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-normal">{srv.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 🌐 Vision Section */}
      <section className="py-16 bg-neutral-900 text-white rounded-3xl max-w-5xl mx-4 md:mx-auto px-6 md:px-12 text-center space-y-4 shadow-2xl">
        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">OUR VISION</span>
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight max-w-2xl mx-auto leading-tight">
          India's Most Trusted Financial & Property Ecosystem
        </h2>
        <p className="text-xs md:text-sm text-neutral-300 leading-relaxed max-w-xl mx-auto font-normal">
          Empowering individuals and businesses with smarter financial decisions, legally secure real estate investments, and sustainable wealth creation[cite: 1].
        </p>
      </section>

    </div>
  );
}