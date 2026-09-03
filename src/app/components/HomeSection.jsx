"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  FiArrowRight, 
  FiShield, 
  FiTrendingUp,
  FiLock,
  FiCheckCircle
} from "react-icons/fi";

export default function HomeSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[85vh] flex items-center justify-center bg-[#FAFAFA] text-black overflow-hidden py-14 px-4 sm:px-6 lg:px-8 border-b border-zinc-200"
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT CONTENT */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Clean 2-Line Headline for Both Mobile & Desktop */}
            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-black leading-[1.12] mb-5"
            >
              Loan & Property Compliance <br />
              <span className="bg-gradient-to-r from-black via-zinc-800 to-zinc-600 bg-clip-text text-transparent">
                in Bilaspur, Chhattisgarh.
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p 
              variants={itemVariants} 
              className="text-sm sm:text-base lg:text-lg text-zinc-600 font-medium max-w-2xl mb-8 leading-relaxed"
            >
              Premier financial consulting, land title verification, and strategic CIBIL score management across Bilaspur and Chhattisgarh. We ensure your business, personal, or mortgage loan approvals are smooth, compliant, and completely dispute-free.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-6"
            >
              <Link
                href="/dashboard/property-compliance"
                className="flex items-center justify-center gap-2.5 px-8 py-4 bg-black text-white font-bold rounded-2xl shadow-xl hover:bg-zinc-800 active:scale-95 transition-all text-sm uppercase tracking-wide group"
              >
                <FiShield className="text-base text-zinc-300" />
                <span>Property Compliance</span>
                <FiArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/dashboard/credit-score-management"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-2xl border-2 border-zinc-200 hover:border-black active:scale-95 transition-all text-sm uppercase tracking-wide shadow-sm"
              >
                <FiTrendingUp className="text-base text-black" />
                <span>CIBIL Score Management</span>
              </Link>
            </motion.div>

            {/* Compact Trust Badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 pt-2 text-xs font-bold text-zinc-600">
              <div className="flex items-center gap-2">
                <FiLock className="text-emerald-600 text-sm" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-emerald-600 text-sm" />
                <span>Zero Hidden Cost</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT: Desktop-Only Local PNG Showcase */}
          <motion.div 
            className="hidden lg:flex lg:col-span-5 relative w-full items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full max-w-md rounded-3xl border border-zinc-200/90 bg-white p-8 shadow-2xl flex flex-col items-center justify-center text-center">
              <div className="relative w-full h-56 flex items-center justify-center">
                <Image
                  src="/images/Bsp Ccontinental financial logo PNG (1).png"
                  alt="BSP Continental Bilaspur"
                  width={340}
                  height={180}
                  className="w-auto h-40 object-contain drop-shadow-md select-none"
                  priority
                />
              </div>

              <div className="w-full mt-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-left">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E5A812] block">
                  BILASPUR HEADQUARTERS
                </span>
                <p className="text-xs font-bold text-zinc-900 mt-0.5">
                  Institutional consulting for secure finance, land title search & CIBIL dispute handling.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}