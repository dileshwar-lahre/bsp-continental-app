"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    tag: "FINANCIAL CONSULTING",
    title: "FINANCIAL CLARITY.\nSTRONGER DECISIONS.",
    description:
      "Strategic guidance for loans, compliance and financial readiness—built for businesses and individuals across Chhattisgarh.",
    primaryBtn: { text: "EXPLORE OUR SERVICES", href: "#services-grid" },
    secondaryBtn: { text: "TALK TO AN ADVISOR", href: "#contact" },
    image: "/images/Strategic Financial Guidance for Indian Businesses.png",
    number: "01 / 04",
  },
  {
    tag: "LOAN READINESS",
    title: "BE LOAN-READY\nBEFORE YOU APPLY.",
    description:
      "Eligibility guidance, document preparedness, restructuring and debt-consolidation support—before your application reaches the lender.",
    primaryBtn: { text: "CHECK LOAN READINESS", href: "/dashboard/finance" },
    secondaryBtn: { text: "START CONSULTATION", href: "#contact" },
    image: "/images/ReadywithaStrongLoanApplication.png",
    number: "02 / 04",
  },
  {
    tag: "PROPERTY COMPLIANCE",
    title: "PROTECT THE PROPERTY\nBEHIND YOUR LOAN.",
    description:
      "Title verification, search and survey reports, mortgage legal assistance and dispute-resolution support.",
    primaryBtn: { text: "VIEW PROPERTY SERVICES", href: "/dashboard/property-compliance" },
    secondaryBtn: { text: "REQUEST CONSULTATION", href: "#contact" },
    image: "/images/Premiumproperty.png",
    number: "03 / 04",
  },
  {
    tag: "CIBIL SCORE MANAGEMENT",
    title: "IMPROVE YOUR CREDIT\nPROFILE WITH A CLEAR PLAN.",
    description:
      "CIBIL analysis, error and dispute support, and structured guidance for long-term credit-profile improvement.",
    primaryBtn: { text: "EXPLORE CIBIL SERVICES", href: "/dashboard/credit-score-management" },
    secondaryBtn: { text: "START A CONSULTATION", href: "#contact" },
    image: "/images/Structured credit planning with expert guidance.png",
    number: "04 / 04",
  },
];

export default function HomeSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[current];

  return (
    <section 
      id="home" 
      className="relative w-full h-[88vh] min-h-[660px] max-h-[860px] bg-[#062415] text-white overflow-hidden select-none m-0 p-0"
    >
      {/* ─── BACKGROUND SLIDING IMAGES ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.image}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover object-center lg:object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#051f12] via-[#051f12]/90 via-40% to-transparent lg:to-black/35" />
        </motion.div>
      </AnimatePresence>

      {/* ─── TOP-RIGHT INDICATOR (PAGE NUMBER & DOTS - DESKTOP ONLY) ─── */}
      <div className="hidden md:flex absolute top-8 right-8 lg:right-16 z-20 items-center gap-4 bg-black/25 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-sm">
        <span className="text-xs font-mono font-bold tracking-widest text-emerald-200/90">
          {slide.number}
        </span>
        <div className="flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                current === idx ? "w-6 bg-[#f3c251]" : "w-2 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ─── MANUAL NAVIGATION ARROWS ─── */}
      <div className="absolute inset-y-0 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/25 hover:bg-[#f3c251] text-white hover:text-[#062415] backdrop-blur-md border border-white/15 hover:border-[#f3c251] flex items-center justify-center text-xl transition-all duration-300 active:scale-90 shadow-lg cursor-pointer"
        >
          <FiChevronLeft />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/25 hover:bg-[#f3c251] text-white hover:text-[#062415] backdrop-blur-md border border-white/15 hover:border-[#f3c251] flex items-center justify-center text-xl transition-all duration-300 active:scale-90 shadow-lg cursor-pointer"
        >
          <FiChevronRight />
        </button>
      </div>

      {/* ─── FOREGROUND CONTENT ─── */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 sm:px-12 lg:px-16 flex flex-col justify-center">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Category Subtitle */}
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-[2px] bg-[#f3c251]" />
                <span className="text-xs font-mono font-black uppercase tracking-[0.24em] text-[#f3c251]">
                  {slide.tag}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black uppercase tracking-tight text-white leading-[1.08] whitespace-pre-line drop-shadow-sm">
                {slide.title}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-emerald-100/80 font-medium max-w-xl leading-relaxed">
                {slide.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={slide.primaryBtn.href}
                  className="px-8 py-3.5 bg-[#f3c251] hover:bg-[#e4b443] text-[#062415] text-xs font-black uppercase tracking-wider rounded-md transition-all shadow-md active:scale-95 text-center"
                >
                  {slide.primaryBtn.text}
                </Link>

                <Link
                  href={slide.secondaryBtn.href}
                  className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-white border border-white/60 hover:border-white text-xs font-black uppercase tracking-wider rounded-md transition-all active:scale-95 text-center"
                >
                  {slide.secondaryBtn.text}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}