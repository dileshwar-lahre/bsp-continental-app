"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiArrowUpRight, 
  FiArrowRight 
} from "react-icons/fi";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";

export default function FooterSection() {
  const whatsappUrl = "https://wa.me/919575059137?text=Hello%20BSP%20Continental,%20I%20need%20consulting%20support.";
  const instagramUrl = "https://www.instagram.com/bspccontinental.in?utm_source=qr";
  const facebookUrl = "https://www.facebook.com/profile.php?id=61593305856131";

  const coreServices = [
    { title: "Financial Consulting", link: "/dashboard/finance" },
    { title: "Loan Readiness", link: "/dashboard/finance" },
    { title: "CIBIL Score Management", link: "/dashboard/credit-score-management" },
    { title: "Property Compliance", link: "/dashboard/property-compliance" },
  ];

  return (
    <footer id="contact" className="bg-[#0A2615] text-slate-200 pt-14 pb-10 border-t border-emerald-900/60 select-none antialiased relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#217044]/15 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#f3c251]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Main Grid Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-10 border-b border-emerald-900/80 items-start">
          
          {/* Brand Presentation & Clean Fitted Logo */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block group">
              
              {/* Perfectly Balanced White Badge (No Cutoff, Sharp View) */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl shadow-md border border-white/40 inline-flex items-center justify-center px-3.5 py-1.5 w-auto max-w-[280px]"
              >
                <Image
                  src="/images/Bsp Ccontinental financial logo PNG (1).png"
                  alt="BSP Continental Logo"
                  width={340}
                  height={90}
                  className="w-auto h-11 sm:h-12 object-contain select-none"
                  priority
                />
              </motion.div>

              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-[#f3c251] transition-colors leading-tight pt-3">
                BSP CONTINENTAL
              </h2>
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-[#f3c251] block">
                PRIVATE LIMITED
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-emerald-100/75 font-medium leading-relaxed max-w-sm">
              Registered corporate consultancy delivering specialized loan guidance, property legal compliance, and CIBIL score management across Chhattisgarh.
            </p>

            {/* Social Channels */}
            <div className="flex items-center gap-3 pt-1">
              <motion.a
                whileHover={{ scale: 1.1, rotate: 6 }}
                whileTap={{ scale: 0.92 }}
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[#113a22] border border-emerald-700/50 text-slate-300 hover:text-white hover:bg-[#E4405F] hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <FaInstagram className="text-base" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, rotate: -6 }}
                whileTap={{ scale: 0.92 }}
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-[#113a22] border border-emerald-700/50 text-slate-300 hover:text-white hover:bg-[#1877F2] hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <FaFacebookF className="text-sm" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, rotate: 6 }}
                whileTap={{ scale: 0.92 }}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-[#113a22] border border-emerald-700/50 text-slate-300 hover:text-white hover:bg-[#25D366] hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <FaWhatsapp className="text-base" />
              </motion.a>
            </div>
          </div>

          {/* 4 Core Services */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-mono font-black uppercase tracking-[0.2em] text-[#f3c251] block">
              SERVICES
            </span>
            <ul className="space-y-3 text-sm font-bold text-slate-200">
              {coreServices.map((service, idx) => (
                <li key={idx}>
                  <Link 
                    href={service.link} 
                    className="flex items-center gap-2 group hover:text-[#f3c251] transition-colors py-0.5"
                  >
                    <FiArrowRight className="text-xs text-emerald-500 group-hover:text-[#f3c251] group-hover:translate-x-1 transition-all" />
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bilaspur Desk */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-mono font-black uppercase tracking-[0.2em] text-[#f3c251] block">
              BILASPUR OFFICE
            </span>

            <div className="space-y-3.5 text-xs sm:text-[13px] text-slate-300">
              <div className="p-4 rounded-2xl bg-[#0e351f]/70 border border-emerald-800/40 flex items-start gap-3 leading-relaxed">
                <FiMapPin className="text-[#f3c251] shrink-0 text-base mt-0.5" />
                <span className="font-medium text-emerald-50 leading-snug">
                  Shop No OAS 4, Super Market Complex, 2nd Floor, Agrasen Chowk, Bilaspur (C.G.) 495001
                </span>
              </div>

              <div className="space-y-2.5 pt-1">
                <div>
                  <a 
                    href="tel:9575059137" 
                    className="inline-flex items-center gap-2.5 text-white hover:text-[#f3c251] font-bold transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#f3c251] group-hover:bg-[#f3c251] group-hover:text-[#0A2615] transition-colors">
                      <FiPhone className="text-xs" />
                    </div>
                    <span>+91 95750 59137</span>
                  </a>
                </div>

                <div>
                  <a 
                    href="mailto:bspccontinental@gmail.com" 
                    className="inline-flex items-center gap-2.5 text-emerald-200/90 hover:text-[#f3c251] font-semibold transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#f3c251] group-hover:bg-[#f3c251] group-hover:text-[#0A2615] transition-colors">
                      <FiMail className="text-xs" />
                    </div>
                    <span className="truncate">bspccontinental@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Micro-Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-emerald-200/60">
          <p>© {new Date().getFullYear()} BSP Continental Pvt. Ltd. All rights reserved.</p>
          
          <div className="flex items-center gap-6 font-semibold">
            <Link href="/privacy" className="hover:text-white transition-colors flex items-center gap-1">
              <span>Privacy Policy</span>
              <FiArrowUpRight className="text-xs" />
            </Link>
            <span className="text-emerald-800">•</span>
            <Link href="/terms" className="hover:text-white transition-colors flex items-center gap-1">
              <span>Terms of Service</span>
              <FiArrowUpRight className="text-xs" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}