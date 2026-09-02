"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FiArrowRight, 
  FiShield, 
  FiCheckCircle, 
  FiTrendingUp, 
  FiZap, 
  FiPercent, 
  FiLock 
} from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

export default function HomeSection() {
  // Animation Variants for staggered scroll effect
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
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] flex items-center justify-center bg-[#FAFAFA] text-black overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-200"
    >
      {/* Background Decorative Grid Subtle Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT CONTENT: Heading, CTA & Trust Points */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Top Pill / Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-300 shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                Fast & Secure Fintech Solution
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-black leading-[1.1] mb-6"
            >
              Loan & Property Verification <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-black via-zinc-800 to-zinc-600 bg-clip-text text-transparent">
                Made Fast & Transparent.
              </span>
            </motion.h1>

            {/* Sub-headline / Description */}
            <motion.p 
              variants={itemVariants} 
              className="text-base sm:text-lg text-zinc-600 font-medium max-w-2xl mb-8 leading-relaxed"
            >
              Apne personal, business ya property loan ko approve karayein bina kisi hidden charge ke. Instant CIBIL analysis aur safe document verification ka all-in-one platform.
            </motion.p>

            {/* Action Buttons (CTA) */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10"
            >
              <Link
                href="/login"
                className="flex items-center justify-center gap-2.5 px-8 py-4 bg-black text-white font-bold rounded-2xl shadow-xl hover:bg-zinc-800 active:scale-95 transition-all text-sm uppercase tracking-wide group"
              >
                <span>Apply Instant Loan</span>
                <FiArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#services"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-2xl border-2 border-zinc-200 hover:border-black active:scale-95 transition-all text-sm uppercase tracking-wide shadow-sm"
              >
                Check Free CIBIL
              </Link>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-200 w-full max-w-xl"
            >
              <div>
                <p className="text-2xl sm:text-3xl font-black text-black tracking-tight">₹500Cr+</p>
                <p className="text-xs font-semibold text-zinc-500 uppercase mt-0.5">Disbursed</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-black tracking-tight">99.2%</p>
                <p className="text-xs font-semibold text-zinc-500 uppercase mt-0.5">Approval Rate</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-black tracking-tight">24 Hrs</p>
                <p className="text-xs font-semibold text-zinc-500 uppercase mt-0.5">Quick Payout</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT: Interactive Fintech Visual Showcase */}
          <motion.div 
            className="lg:col-span-5 relative w-full flex justify-center"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-zinc-300 to-zinc-100 rounded-3xl blur-2xl opacity-70 -z-10" />

            {/* Main Interactive Container Card */}
            <div className="w-full max-w-md bg-white border border-zinc-300/80 rounded-3xl p-6 sm:p-7 shadow-2xl relative">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white">
                    <FiTrendingUp className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-black">Instant Loan Calculator</h3>
                    <p className="text-xs text-zinc-500">Low EMI Guarantee</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-extrabold rounded-lg border border-emerald-200">
                  Active 8.5%
                </span>
              </div>

              {/* Metric Breakdown Box */}
              <div className="my-6 space-y-4">
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80">
                  <div className="flex justify-between items-center text-xs font-semibold text-zinc-500 uppercase mb-1">
                    <span>Selected Loan Amount</span>
                    <span className="text-black font-bold">Max ₹25,00,000</span>
                  </div>
                  <div className="flex items-center gap-1 text-2xl sm:text-3xl font-black text-black">
                    <FaRupeeSign className="text-lg text-zinc-400" />
                    <span>10,00,000</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                    <span className="text-[11px] font-semibold text-zinc-500 uppercase block">Monthly EMI</span>
                    <span className="text-base font-black text-black mt-0.5 block">₹12,450/mo</span>
                  </div>
                  <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                    <span className="text-[11px] font-semibold text-zinc-500 uppercase block">Tenure Plan</span>
                    <span className="text-base font-black text-black mt-0.5 block">5 Years</span>
                  </div>
                </div>
              </div>

              {/* Feature Highlights inside Card */}
              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-zinc-700">
                  <FiCheckCircle className="text-emerald-600 text-sm flex-shrink-0" />
                  <span>100% Paperless & Zero Visit Process</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-zinc-700">
                  <FiLock className="text-emerald-600 text-sm flex-shrink-0" />
                  <span>Bank-Grade 256-Bit SSL Data Security</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-zinc-700">
                  <FiZap className="text-emerald-600 text-sm flex-shrink-0" />
                  <span>Instant Disbursal Directly to Bank</span>
                </div>
              </div>

              {/* Sub CTA Button */}
              <Link 
                href="/login" 
                className="w-full block text-center py-3.5 bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow hover:bg-zinc-800 active:scale-98 transition-all"
              >
                Proceed to Verification
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}