"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiClock, 
  FiArrowUpRight 
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactSection() {
  const phoneNumber = "+91 95750 59137";
  const whatsappUrl = "https://wa.me/919575059137?text=Hello%20BSP%20Continental,%20I%20need%20consulting%20support.";

  return (
    <section id="contact-desk" className="pt-12 pb-14 bg-[#F8FAFC] text-slate-900 select-none antialiased relative overflow-hidden">
      
      {/* Background Soft Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#217044]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#E5A812]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="text-left max-w-3xl space-y-2"
        >
          <span className="text-xs sm:text-[13px] font-black uppercase tracking-[0.22em] text-[#E5A812] block">
            DIRECT DESK
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-black uppercase tracking-tight text-[#0F1E11] leading-[1.05]">
            CONNECT WITH US
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide leading-relaxed pt-0.5">
            Schedule a direct consultation for your business loan readiness, property legal compliance, or CIBIL profile review.
          </p>
        </motion.div>

        {/* Bento Layout: Borderless Modern Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Direct Communication Blocks */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            
            {/* Direct Call Card (No Border) */}
            <a 
              href="tel:9575059137"
              className="group bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_32px_rgba(33,112,68,0.08)] transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#217044]/10 text-[#217044] group-hover:bg-[#217044] group-hover:text-white transition-all flex items-center justify-center text-lg shrink-0">
                  <FiPhone />
                </div>
                <div>
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    CALL CONSULTANT
                  </span>
                  <p className="text-base font-black text-slate-900 tracking-tight">
                    {phoneNumber}
                  </p>
                </div>
              </div>
              <FiArrowUpRight className="text-slate-300 group-hover:text-[#217044] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-lg" />
            </a>

            {/* Instant WhatsApp Action Card (No Border) */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_32px_rgba(37,211,102,0.12)] transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all flex items-center justify-center text-xl shrink-0">
                  <FaWhatsapp />
                </div>
                <div>
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    WHATSAPP DESK
                  </span>
                  <p className="text-base font-black text-slate-900 tracking-tight">
                    Chat with Consultant
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#25D366] bg-[#25D366]/10 px-3 py-1 rounded-xl">
                Online
              </span>
            </a>

            {/* Email Contact Card (No Border) */}
            <a 
              href="mailto:bspccontinental@gmail.com"
              className="group bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_32px_rgba(33,112,68,0.08)] transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-4 truncate">
                <div className="w-12 h-12 rounded-2xl bg-[#217044]/10 text-[#217044] group-hover:bg-[#217044] group-hover:text-white transition-all flex items-center justify-center text-lg shrink-0">
                  <FiMail />
                </div>
                <div className="truncate">
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    EMAIL AUDIT DESK
                  </span>
                  <p className="text-sm font-black text-slate-900 tracking-tight truncate">
                    bspccontinental@gmail.com
                  </p>
                </div>
              </div>
              <FiArrowUpRight className="text-slate-300 group-hover:text-[#217044] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-lg shrink-0" />
            </a>

            {/* Office Timing Card (No Border) */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-[#E5A812] flex items-center justify-center text-lg shrink-0">
                <FiClock />
              </div>
              <div>
                <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  WORKING HOURS
                </span>
                <p className="text-xs font-bold text-slate-800">
                  Monday – Saturday: 10:00 AM – 07:00 PM
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps & Office Location (No Border) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between gap-4">
            
            {/* Embedded Live Google Map */}
            <div className="relative w-full h-72 sm:h-80 lg:h-full min-h-[300px] rounded-2xl overflow-hidden bg-slate-100">
              <iframe
                title="BSP Continental Bilaspur Office"
                src="https://maps.google.com/maps?q=Agrasen%20Chowk,%20Bilaspur,%20Chhattisgarh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter contrast-105 opacity-95 hover:opacity-100 transition-all duration-300"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Seamless Bottom Address Display */}
            <div className="p-4 bg-slate-50/80 rounded-2xl flex items-start gap-3.5">
              <FiMapPin className="text-[#217044] text-lg shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  OFFICE LOCATION
                </span>
                <p className="text-xs font-semibold text-slate-800 leading-snug">
                  Shop No OAS 4, Super Market Complex, 2nd Floor, Agrasen Chowk, Bilaspur (C.G.) 495001
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}