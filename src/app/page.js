"use client";

import Navbar from "./components/Navbar";
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";
import ContactFooterSection from "./components/ContactFooterSection";
import { FaWhatsapp } from "react-icons/fa";

export default function LandingPage() {
  const whatsappUrl = "https://wa.me/919575059137?text=Hello%20BSP%20Continental,%20I%20need%20consulting%20support.";

  return (
    <div className="min-h-screen bg-white selection:bg-[#217044] selection:text-white flex flex-col justify-between m-0 p-0 overflow-x-hidden relative">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 w-full m-0 p-0">
        <HomeSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>

      {/* Zero Gap Clean Footer */}
      <ContactFooterSection />

      {/* Floating Bottom-Right WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center text-2xl sm:text-3xl shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-white/30"
        >
          <FaWhatsapp />
        </a>
      </div>
    </div>
  );
}