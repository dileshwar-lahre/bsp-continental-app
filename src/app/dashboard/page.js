'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FiTrendingUp, 
  FiArrowRight, 
  FiArrowLeft, 
  FiMessageSquare, 
  FiX, 
  FiShield, 
  FiSend,
  FiZap, 
  FiBriefcase, 
  FiGrid
} from 'react-icons/fi';

export default function DashboardPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [placeholderText, setPlaceholderText] = useState('★ Ask Customer Support...');
  const clickTimeoutRef = useRef(null);

  // 3 EXACT SLIDES USING LANDING PAGE (/) PREMIUM ASSETS & CONTENT
  const slides = [
    { 
      tag: "CIBIL SCORE MANAGEMENT",
      title: "IMPROVE YOUR CREDIT PROFILE",
      desc: "CIBIL analysis, dispute support, and structured guidance.",
      img: "/images/Structured credit planning with expert guidance.png",
      link: "/dashboard/credit-score-management"
    },
    { 
      tag: "PROPERTY COMPLIANCE",
      title: "PROTECT THE PROPERTY BEHIND YOUR LOAN",
      desc: "Title verification, search & survey reports, and dispute audit.",
      img: "/images/Premiumproperty.png",
      link: "/dashboard/property-compliance"
    },
    { 
      tag: "FINANCIAL CONSULTING",
      title: "FINANCIAL CLARITY & STRONGER DECISIONS",
      desc: "Strategic guidance for secured loans, MSME capital, and DPR/CMA files.",
      img: "/images/Strategic Financial Guidance for Indian Businesses.png",
      link: "/dashboard/finance"
    }
  ];

  useEffect(() => {
    const placeholders = [
      '★ Ask Customer Support...',
      '⚡ Need Credit Audit Help?',
      '★ Query Property Vetting...'
    ];
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % placeholders.length;
      setPlaceholderText(placeholders[currentIndex]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const nextSlide = (e) => {
    e?.preventDefault();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = (e) => {
    e?.preventDefault();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const sendMessage = async (textToSend) => {
    const currentQuery = textToSend || input;
    if (!currentQuery.trim() || isLoading) return;

    const userMessage = { id: Date.now().toString(), role: 'user', content: currentQuery };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    const queryLower = currentQuery.toLowerCase();
    if (
      queryLower.includes('contact') || 
      queryLower.includes('number') || 
      queryLower.includes('phone') || 
      queryLower.includes('call') || 
      queryLower.includes('mobile') ||
      queryLower.includes('sampark')
    ) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev, 
          { 
            id: (Date.now() + 1).toString(), 
            role: 'assistant', 
            content: '📞 AAP HUMSE SEEDHE CONTACT KAR SAKTE HAIN:\n\n• Phone: +91 9575959137\n• Email: bspccontinental@gmail.com\n• Office: Shop No OAS 4, Super Market Complex, 2nd Floor, Agrasen Chowk, Bilaspur (C.G.)' 
          }
        ]);
        setIsLoading(false);
      }, 400);
      return;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) throw new Error('API Request Failed');

      const data = await response.json();
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev, 
        { 
          id: (Date.now() + 1).toString(), 
          role: 'assistant', 
          content: 'Aap direct call kar sakte hain: +91 9575959137 par support team se baat karne ke liye.' 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleChatbotClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      router.push('/admin');
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        setIsOpen((prev) => !prev);
        clickTimeoutRef.current = null;
      }, 250);
    }
  };

  const quickActions = [
    { label: '🏢 Services Overview', text: 'Aap log kaun-kaun si services provide karte hain?' },
    { label: '🛡️ Property Vetting Details', text: 'Property legal verification ke baare me bataiye.' },
    { label: '❌ CIBIL & Credit Support', text: 'Credit Score Management ke baare me batao.' },
    { label: '📞 Contact Support', text: 'Official contact details aur mobile number share karein.' }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 antialiased py-6 px-4 sm:px-6 md:px-8 font-sans select-none lg:pl-64 transition-all duration-300">
      
      {/* Centered Max Container */}
      <div className="w-full max-w-6xl mx-auto space-y-5">
        
        {/* Top Header Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-[#217044]/10 text-[#217044] border border-[#217044]/20">
                <FiZap size={16} />
              </span>
              <h1 className="text-lg sm:text-xl font-black text-slate-950 uppercase tracking-tight">
                BSP CCONTINENTAL PVT LTD
              </h1>
            </div>
            
            <p className="text-[11px] text-slate-500 font-bold pl-0.5">
              Property Verification, Credit Score Advisory & Financial Consultant
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#217044]/10 border border-[#217044]/20 px-3 py-1.5 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-[#217044] animate-pulse" />
            <span className="text-[10px] font-black text-[#217044] uppercase tracking-wider">
              Online Support
            </span>
          </div>
        </div>

        {/* ─── 1. HERO SLIDER (USES EXACT LANDING PAGE IMAGES FOR MOBILE & DESKTOP) ─── */}
        <section className="space-y-2 relative group/slider">
          <div className="relative overflow-hidden rounded-2xl shadow-sm bg-[#062415]">
            <div 
              className="flex transition-transform duration-500 ease-out" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0 relative aspect-[16/9] md:aspect-[980/230] overflow-hidden">
                  
                  {/* Background Hero Image */}
                  <img 
                    src={slide.img} 
                    alt={slide.title} 
                    className="w-full h-full object-cover object-center" 
                  />

                  {/* Gradient Overlay for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051f12] via-[#051f12]/80 to-transparent sm:bg-gradient-to-r sm:from-[#051f12] sm:via-[#051f12]/85 sm:to-transparent" />

                  {/* Slide Content Overlay */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-end sm:justify-center p-4 sm:p-7 max-w-xl space-y-1.5 sm:space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-[2px] bg-[#f3c251]" />
                      <span className="text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-[0.2em] text-[#f3c251]">
                        {slide.tag}
                      </span>
                    </div>

                    <h2 className="text-sm sm:text-xl md:text-2xl font-black uppercase tracking-tight text-white leading-tight drop-shadow-sm">
                      {slide.title}
                    </h2>

                    <p className="hidden sm:block text-xs text-emerald-100/85 font-medium line-clamp-2 leading-relaxed">
                      {slide.desc}
                    </p>

                    <div className="pt-1">
                      <Link 
                        href={slide.link} 
                        className="inline-flex items-center gap-1.5 bg-[#f3c251] hover:bg-[#e4b443] text-[#062415] font-black px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-[11px] uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        Explore Module <FiArrowRight size={12} />
                      </Link>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Slider Arrows */}
            <button 
              type="button"
              onClick={prevSlide} 
              className="absolute left-2.5 top-1/2 -translate-y-1/2 h-8 w-8 bg-black/40 hover:bg-black/70 text-white rounded-xl flex items-center justify-center backdrop-blur-xs transition-all opacity-0 group-hover/slider:opacity-100 z-20 cursor-pointer"
            >
              <FiArrowLeft size={14} />
            </button>
            <button 
              type="button"
              onClick={nextSlide} 
              className="absolute right-2.5 top-1/2 -translate-y-1/2 h-8 w-8 bg-black/40 hover:bg-black/70 text-white rounded-xl flex items-center justify-center backdrop-blur-xs transition-all opacity-0 group-hover/slider:opacity-100 z-20 cursor-pointer"
            >
              <FiArrowRight size={14} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-1.5 pt-0.5">
            {slides.map((_, index) => (
              <button 
                key={index} 
                type="button"
                onClick={() => setCurrentSlide(index)} 
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === index ? 'w-6 h-1.5 bg-[#217044]' : 'w-1.5 h-1.5 bg-slate-300'
                }`} 
              />
            ))}
          </div>
        </section>

        {/* ─── 2. CORE SERVICES GRID ─── */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <FiGrid className="text-[#217044]" /> Core Advisory Solutions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            
            {/* 1. Property Compliance */}
            <Link href="/dashboard/property-compliance" className="block group h-full">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:border-[#217044] hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full min-h-[170px] active:scale-[0.99]">
                <div className="flex items-center justify-between">
                  <span className="p-3 rounded-xl bg-[#217044]/10 text-[#217044] border border-[#217044]/20 group-hover:bg-[#217044] group-hover:text-white transition-all">
                    <FiShield size={20} />
                  </span>
                  <span className="text-[10px] font-black text-[#217044] bg-[#217044]/10 px-2.5 py-0.5 rounded-lg">
                    01
                  </span>
                </div>
                
                <div className="space-y-1 pt-3">
                  <h4 className="text-sm font-black text-slate-950 uppercase tracking-tight group-hover:text-[#217044] transition-colors leading-snug">
                    Property Compliance
                  </h4>
                  <p className="text-[11px] font-bold text-slate-400 leading-normal">
                    Legal Verification & Document Registry Audit
                  </p>
                </div>

                <div className="pt-3 flex items-center gap-1.5 text-[11px] font-extrabold text-[#217044] group-hover:translate-x-1 transition-transform">
                  <span>Learn More</span>
                  <FiArrowRight size={12} />
                </div>
              </div>
            </Link>

            {/* 2. Credit Score Management */}
            <Link href="/dashboard/credit-score-management" className="block group h-full">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:border-[#217044] hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full min-h-[170px] active:scale-[0.99]">
                <div className="flex items-center justify-between">
                  <span className="p-3 rounded-xl bg-[#217044]/10 text-[#217044] border border-[#217044]/20 group-hover:bg-[#217044] group-hover:text-white transition-all">
                    <FiTrendingUp size={20} />
                  </span>
                  <span className="text-[10px] font-black text-[#217044] bg-[#217044]/10 px-2.5 py-0.5 rounded-lg">
                    02
                  </span>
                </div>
                
                <div className="space-y-1 pt-3">
                  <h4 className="text-sm font-black text-slate-950 uppercase tracking-tight group-hover:text-[#217044] transition-colors leading-snug">
                    Credit Score Management
                  </h4>
                  <p className="text-[11px] font-bold text-slate-400 leading-normal">
                    CIBIL Fix & Dispute Bureau Advisory
                  </p>
                </div>

                <div className="pt-3 flex items-center gap-1.5 text-[11px] font-extrabold text-[#217044] group-hover:translate-x-1 transition-transform">
                  <span>Learn More</span>
                  <FiArrowRight size={12} />
                </div>
              </div>
            </Link>

            {/* 3. Financial Consultancy */}
            <Link href="/dashboard/finance" className="block group h-full">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:border-[#217044] hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full min-h-[170px] active:scale-[0.99]">
                <div className="flex items-center justify-between">
                  <span className="p-3 rounded-xl bg-[#217044]/10 text-[#217044] border border-[#217044]/20 group-hover:bg-[#217044] group-hover:text-white transition-all">
                    <FiBriefcase size={20} />
                  </span>
                  <span className="text-[10px] font-black text-[#217044] bg-[#217044]/10 px-2.5 py-0.5 rounded-lg">
                    03
                  </span>
                </div>
                
                <div className="space-y-1 pt-3">
                  <h4 className="text-sm font-black text-slate-950 uppercase tracking-tight group-hover:text-[#217044] transition-colors leading-snug">
                    Financial Consultancy
                  </h4>
                  <p className="text-[11px] font-bold text-slate-400 leading-normal">
                    Strategic Business Advisory & Planning
                  </p>
                </div>

                <div className="pt-3 flex items-center gap-1.5 text-[11px] font-extrabold text-[#217044] group-hover:translate-x-1 transition-transform">
                  <span>Learn More</span>
                  <FiArrowRight size={12} />
                </div>
              </div>
            </Link>

          </div>
        </section>

        {/* ─── 3. BOTTOM CTA BANNER ─── */}
        <section className="relative overflow-hidden bg-[#052516] text-white p-6 sm:p-7 rounded-3xl border border-emerald-950 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full border border-[#217044]/20 pointer-events-none -translate-y-1/2" />
          <div className="absolute top-0 right-0 w-60 h-60 bg-[#217044]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#f3c251]">
              NEED ASSISTANCE?
            </span>
            <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white">
              Start With Clarity.
            </h3>
            <p className="text-xs text-emerald-100/75 max-w-xl">
              Connect with our Bilaspur consulting team for title checks, pre-underwriting dossiers, and institutional debt consulting.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2.5 shrink-0">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-[#f3c251] hover:bg-[#e4b443] text-[#052516] font-black text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95"
            >
              Contact Desk
            </Link>
          </div>
        </section>

      </div>

      {/* Floating Support Chatbot */}
      <div className="fixed md:right-8 md:bottom-8 right-4 bottom-20 z-50 font-sans flex flex-col items-end">
        {isOpen && (
          <div className="w-[320px] md:w-[360px] h-[430px] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-3 transform transition-all duration-300 ease-in-out scale-100 origin-bottom-right">
            <div className="bg-[#217044] p-3 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse"></span>
                <h4 className="font-black text-xs tracking-wide uppercase">BSP CCONTINENTAL SUPPORT</h4>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 bg-black/10 hover:bg-black/20 rounded-lg text-white transition-all cursor-pointer active:scale-90">
                <FiX className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-50/50">
              {messages.length === 0 && (
                <div className="h-full flex flex-col justify-end pb-1 space-y-3">
                  <div className="px-1"><p className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Select a query route</p></div>
                  <div className="flex flex-col gap-1.5">
                    {quickActions.map((action, index) => (
                      <button key={index} type="button" onClick={() => sendMessage(action.text)} className="w-full text-left px-3 py-2.5 bg-white border border-slate-200/80 rounded-xl text-[11px] font-bold text-slate-700 hover:border-[#217044] hover:text-[#217044] shadow-2xs transition-all duration-200 active:scale-[0.99]">{action.label}</button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-xl px-3 py-2 text-[11px] leading-relaxed whitespace-pre-line ${m.role === 'user' ? 'bg-[#217044] text-white rounded-br-none shadow-2xs font-medium' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-2xs font-semibold'}`}>{m.content}</div>
                </div>
              ))}
              {isLoading && <div className="flex justify-start"><div className="bg-white border border-slate-200 text-slate-400 px-3 py-1.5 rounded-lg text-[10px] font-bold animate-pulse">⚡ Checking details...</div></div>}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="p-2.5 bg-white border-t border-slate-100 flex gap-2 items-center">
              <input className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 outline-none focus:bg-white focus:border-[#217044] transition-all duration-200" value={input} placeholder={placeholderText} onChange={(e) => setInput(e.target.value)} />
              <button type="submit" disabled={isLoading || !input.trim()} className="bg-[#217044] hover:bg-[#185332] disabled:bg-slate-100 disabled:text-slate-400 text-white h-8 px-3 rounded-lg text-xs font-black shadow-2xs active:scale-95 transition-all cursor-pointer flex items-center justify-center">
                <FiSend className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
        
        {/* Floating Chat Toggle */}
        <button 
          onClick={handleChatbotClick} 
          title="Single click for Chat | Double click for Admin"
          className="h-12 w-12 bg-[#217044] hover:bg-[#185332] text-white rounded-full flex items-center justify-center shadow-lg border border-emerald-400/40 transform active:scale-90 transition-all cursor-pointer group"
        >
          {isOpen ? <FiX className="w-5 h-5 transition-transform duration-200 rotate-90" /> : (
            <div className="relative">
              <FiMessageSquare className="w-5 h-5 transition-transform duration-200 group-hover:scale-105" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
            </div>
          )}
        </button>
      </div>

    </div>
  );
}