"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const services = [
  {
    number: "01",
    title: "FINANCIAL CONSULTING",
    desc: "Secured business-loan and mortgage-loan assistance.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
    link: "/dashboard/finance",
  },
  {
    number: "02",
    title: "LOAN READINESS",
    desc: "Eligibility, restructuring and debt-consolidation guidance.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
    link: "/dashboard/finance",
  },
  {
    number: "03",
    title: "CIBIL SCORE MANAGEMENT",
    desc: "Analysis, improvement guidance, errors and disputes.",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
    link: "/dashboard/credit-score-management",
  },
  {
    number: "04",
    title: "PROPERTY COMPLIANCE",
    desc: "Title, search, survey and mortgage-legal support.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    link: "/dashboard/property-compliance",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ServicesSection() {
  return (
    <section id="services" className="pt-12 pb-14 bg-[#F8FAFC] text-slate-900 border-b border-slate-200/80 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="text-left max-w-4xl mb-10 space-y-2.5"
        >
          <span className="text-xs sm:text-[13px] font-black uppercase tracking-[0.22em] text-[#E5A812] block">
            OUR SERVICES
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-black uppercase tracking-tight text-[#0F1E11] leading-[1.08]">
            FINANCIAL GUIDANCE, <br />
            STRUCTURED AROUND YOU.
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide max-w-2xl leading-relaxed pt-0.5">
            One integrated service structure for financial readiness and property compliance.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((item) => (
            <motion.div
              key={item.number}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(33,112,68,0.12)] hover:border-[#217044] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Visual Unsplash Image Block */}
                <div className="relative w-full h-44 overflow-hidden bg-slate-100">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out select-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  
                  {/* Clean Corner Floating Badge */}
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 bg-white/95 backdrop-blur-md rounded-xl border border-white/40 shadow-xs">
                    <span className="text-xs font-black text-[#E5A812] tracking-wider">
                      {item.number}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-3">
                  <div className="w-9 h-1 bg-[#217044] rounded-full group-hover:w-14 transition-all duration-300" />

                  <h3 className="text-[15px] font-black text-slate-950 uppercase tracking-tight leading-snug group-hover:text-[#217044] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={item.link}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#217044] hover:bg-[#164e2e] text-white text-[11px] font-black uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95 group/btn"
                >
                  <span>LEARN MORE</span>
                  <FiArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}