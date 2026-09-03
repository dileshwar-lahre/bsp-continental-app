"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FiBriefcase, 
  FiUser, 
  FiFileText, 
  FiTrendingUp, 
  FiShield,
  FiArrowUpRight,
  FiLayers
} from "react-icons/fi";

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
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function AboutSection() {
  return (
    <section className="pt-12 pb-14 bg-[#F8FAFC] text-slate-900 relative overflow-hidden select-none font-sans antialiased">
      
      {/* Precision ambient background glow */}
      <div className="absolute top-0 right-1/4 w-[420px] h-[420px] bg-[#217044]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#E5A812]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-9 relative z-10">
        
        {/* Modern Editorial Header */}
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="text-left max-w-3xl space-y-2.5"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A812]/10 border border-[#E5A812]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5A812]" />
            <span className="text-[10.5px] font-black uppercase tracking-[0.24em] text-[#E5A812]">
              ABOUT US
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black uppercase tracking-tight text-[#0F1E11] leading-[1.04]">
            BSP CONTINENTAL
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide leading-relaxed max-w-2xl">
            A premier private limited consultancy delivering structured guidance across financial readiness, verified property compliance, and strategic CIBIL management.
          </p>
        </motion.div>

        {/* 3 Modern Bento Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          
          {/* 01. The Entity */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative bg-white rounded-3xl p-7 border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(33,112,68,0.1)] hover:border-[#217044] transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#217044]/10 text-[#217044] flex items-center justify-center text-lg group-hover:bg-[#217044] group-hover:text-white transition-all duration-300 shadow-xs">
                  <FiBriefcase />
                </div>
                <span className="text-[11px] font-mono font-black text-slate-400 group-hover:text-[#E5A812] tracking-wider transition-colors">
                  01
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="w-8 h-1 bg-[#217044] rounded-full group-hover:w-12 transition-all duration-300" />
                <h3 className="text-base sm:text-lg font-black text-slate-950 uppercase tracking-tight">
                  The Enterprise
                </h3>
              </div>

              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Incorporated as <strong className="text-slate-800 font-bold">BSP Continental Pvt. Ltd.</strong>, we operate as an institutional consultancy structured to simplify debt clearance and streamline asset verification.
              </p>
            </div>

            <div className="pt-5 border-t border-slate-100 mt-6 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                Private Limited Firm
              </span>
              <FiArrowUpRight className="text-slate-300 group-hover:text-[#217044] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-sm" />
            </div>
          </motion.div>

          {/* 02. Krishna Gedam */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative bg-white rounded-3xl p-7 border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(33,112,68,0.1)] hover:border-[#217044] transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#0F1E11] text-[#E5A812] flex items-center justify-center text-lg border border-[#E5A812]/25 group-hover:scale-105 transition-all duration-300 shadow-xs">
                  <FiUser />
                </div>
                <span className="text-[11px] font-mono font-black text-slate-400 group-hover:text-[#E5A812] tracking-wider transition-colors">
                  02
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="w-8 h-1 bg-[#217044] rounded-full group-hover:w-12 transition-all duration-300" />
                <h3 className="text-base sm:text-lg font-black text-slate-950 uppercase tracking-tight">
                  Krishna Gedam
                </h3>
              </div>

              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Directing strategic consulting practice with a focus on risk mitigation, loan viability audits, and absolute legal certainty across all client portfolios.
              </p>
            </div>

            <div className="pt-5 border-t border-slate-100 mt-6 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                Direction
              </span>
              <FiArrowUpRight className="text-slate-300 group-hover:text-[#217044] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-sm" />
            </div>
          </motion.div>

          {/* 03. Consulting Domain */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative bg-white rounded-3xl p-7 border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(33,112,68,0.1)] hover:border-[#217044] transition-all flex flex-col justify-between md:col-span-2 lg:col-span-1"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#217044]/10 text-[#217044] flex items-center justify-center text-lg group-hover:bg-[#217044] group-hover:text-white transition-all duration-300 shadow-xs">
                  <FiLayers />
                </div>
                <span className="text-[11px] font-mono font-black text-slate-400 group-hover:text-[#E5A812] tracking-wider transition-colors">
                  03
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="w-8 h-1 bg-[#217044] rounded-full group-hover:w-12 transition-all duration-300" />
                <h3 className="text-base sm:text-lg font-black text-slate-950 uppercase tracking-tight">
                  Consulting Scope
                </h3>
              </div>

              {/* Exact 3 Core Practices */}
              <div className="space-y-2 pt-0.5">
                <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-2.5 group/item hover:border-[#217044]/30 hover:bg-white transition-all">
                  <FiFileText className="text-[#217044] shrink-0 text-xs" />
                  <span className="text-[11.5px] font-bold text-slate-800 uppercase tracking-tight">
                    Financial Consulting
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-2.5 group/item hover:border-[#217044]/30 hover:bg-white transition-all">
                  <FiShield className="text-[#217044] shrink-0 text-xs" />
                  <span className="text-[11.5px] font-bold text-slate-800 uppercase tracking-tight">
                    Property Compliance
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-2.5 group/item hover:border-[#217044]/30 hover:bg-white transition-all">
                  <FiTrendingUp className="text-[#217044] shrink-0 text-xs" />
                  <span className="text-[11.5px] font-bold text-slate-800 uppercase tracking-tight">
                    CIBIL Score Management
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100 mt-6 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                Practice Areas
              </span>
              <FiArrowUpRight className="text-slate-300 group-hover:text-[#217044] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-sm" />
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}