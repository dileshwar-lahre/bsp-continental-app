"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiShield, FiUser, FiCheckCircle, FiLock, FiClock, FiAward } from "react-icons/fi";

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="py-20 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <FiShield className="text-emerald-700" /> About BSP Continental
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 uppercase">
              Financial Compliance & Property Advisory
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 font-medium leading-relaxed">
              BSP Continental Pvt. Ltd. is a dedicated financial consultancy and property compliance company providing secure loans, dispute-free property verification, and clean credit profiles[cite: 1].
            </p>
          </motion.div>

          {/* Founder & Highlights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Founder Card */}
            <motion.div 
              variants={itemVariants} 
              className="lg:col-span-5 bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#217044] text-white flex items-center justify-center font-black shadow-sm">
                    <FiUser size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">
                      Krishna Gedam[cite: 1]
                    </h3>
                    <p className="text-xs font-bold text-[#217044] uppercase tracking-wider">
                      Founder & Managing Director
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Established with a vision to help clients access institutional credit and verified properties without risks of rejections or legal disputes[cite: 1].
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200 mt-6 flex items-center gap-2 text-xs font-bold text-slate-700">
                <FiAward className="text-[#217044] text-base shrink-0" />
                <span>Strategic Banking & Legal Due Diligence</span>
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div variants={itemVariants} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#217044] flex items-center justify-center font-bold">
                  <FiClock size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 mb-1">
                    Fast Processing[cite: 1]
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Digital document intake and prompt file evaluation ensure rapid turnaround times[cite: 1].
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#217044] flex items-center justify-center font-bold">
                  <FiLock size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 mb-1">
                    100% Confidential[cite: 1]
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Credit files and property deeds are safeguarded with strict enterprise privacy standards[cite: 1].
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#217044] flex items-center justify-center font-bold">
                  <FiCheckCircle size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 mb-1">
                    Expert Vetted[cite: 1]
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Every transaction is audited by experienced legal and financial consultants[cite: 1].
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}