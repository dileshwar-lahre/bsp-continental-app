'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FiTrendingUp, FiCheckCircle, 
  FiArrowRight, FiArrowLeft, FiMessageSquare, FiX, FiShield, FiSend,
  FiZap, FiBriefcase, FiStar, FiGrid
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

  // Double-Click Detector for Admin Redirection
  const clickTimeoutRef = useRef(null);

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
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

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

  // DESKTOP & MOBILE SLIDES CONFIGURATION
  const slides = [
    { 
      desktopImg: "/images/property.png",
      mobileImg: "/images/phone1.png",
      link: "/property-vetting"
    },
    { 
      desktopImg: "/images/creditscore.png",
      mobileImg: "/images/phone2.png",
      link: "/credit-score-management"
    },
    { 
      desktopImg: "/images/financial.png",
      mobileImg: "/images/phone3.png",
      link: "/finance"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 antialiased py-8 px-4 sm:px-6 md:px-8 font-sans flex flex-col justify-start items-center select-none lg:pl-64 transition-all duration-300">
      
      {/* 🎯 SIDEBAR CLEARANCE & MATCHED WIDTH CONTAINER (max-w-6xl) */}
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

        {/* 1. HERO SLIDER: RESPONSIVE (DESKTOP USES 980x190 | MOBILE USES PHONE IMAGES WITH YELLOW BORDER & RIGHT EXPLORE BUTTON) */}
        <section className="space-y-2 relative group/slider">
          <div className="relative overflow-hidden rounded-2xl shadow-sm bg-transparent">
            <div 
              className="flex transition-transform duration-500 ease-out" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0 relative">
                  
                  {/* DESKTOP VIEW: Exact 980x190 image ratio */}
                  <div className="hidden md:block relative w-full aspect-[980/190] overflow-hidden rounded-2xl bg-white shadow-xs">
                    <img 
                      src={slide.desktopImg} 
                      alt="Desktop Banner" 
                      className="w-full h-full object-fill" 
                    />
                    <div className="absolute bottom-4 right-4 z-20">
                      <Link 
                        href={slide.link} 
                        className="bg-[#217044] hover:bg-[#185332] text-white font-black px-4 py-2 rounded-xl text-[11px] uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
                      >
                        Explore <FiArrowRight size={12} />
                      </Link>
                    </div>
                  </div>

                  {/* MOBILE VIEW: phone1.png, phone2.png, phone3.png with yellow border, full clean background & right-aligned explore button */}
                  <div className="md:hidden relative w-full aspect-[16/9] overflow-hidden rounded-2xl bg-black border border-yellow-400 shadow-md flex items-center justify-center">
                    <img 
                      src={slide.mobileImg} 
                      alt="Mobile Banner" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute bottom-3 right-3 z-20">
                      <Link 
                        href={slide.link} 
                        className="bg-[#217044] hover:bg-[#185332] text-white font-black px-3.5 py-1.5 rounded-xl text-[10px] uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center gap-1 cursor-pointer border border-yellow-400/50"
                      >
                        Explore <FiArrowRight size={10} />
                      </Link>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Controls */}
            <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 bg-black/50 hover:bg-black/70 text-white rounded-lg flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover/slider:opacity-100 z-20 cursor-pointer">
              <FiArrowLeft size={14} />
            </button>
            <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 bg-black/50 hover:bg-black/70 text-white rounded-xl flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover/slider:opacity-100 z-20 cursor-pointer">
              <FiArrowRight size={14} />
            </button>
          </div>

          <div className="flex justify-center items-center gap-1.5 pt-0.5">
            {slides.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentSlide(index)} 
                className={`transition-all duration-300 rounded-full cursor-pointer ${currentSlide === index ? 'w-6 h-1.5 bg-[#217044]' : 'w-1.5 h-1.5 bg-slate-300'}`} 
              />
            ))}
          </div>
        </section>

        {/* 2. CORE SERVICES GRID */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <FiGrid className="text-[#217044]" /> Core Advisory Solutions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            
            {/* 1️⃣ Property Compliance Services */}
            <Link href="/property-vetting" className="block group h-full">
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

            {/* 2️⃣ Credit Score Management */}
            <Link href="/credit-score-management" className="block group h-full">
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

            {/* 3️⃣ Financial Consultancy */}
            <Link href="/finance" className="block group h-full">
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

      </div>

      {/* FLOATING AI CHATBOT */}
      <div className="fixed md:right-8 md:bottom-8 right-4 bottom-20 z-50 font-sans flex flex-col items-end">
        {isOpen && (
          <div className="w-[320px] md:w-[360px] h-[430px] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-3 transform transition-all duration-300 ease-in-out scale-100 origin-bottom-right">
            <div className="bg-[#217044] p-3 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse"></span>
                <h4 className="font-black text-xs tracking-wide uppercase">BSP CCONTINENTAL SUPPORT</h4>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 bg-black/10 hover:bg-black/20 rounded-lg text-white transition-all cursor-pointer active:scale-90"><FiX className="w-3.5 h-3.5" /></button>
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
              <button type="submit" disabled={isLoading || !input.trim()} className="bg-[#217044] hover:bg-[#185332] disabled:bg-slate-100 disabled:text-slate-400 text-white h-8 px-3 rounded-lg text-xs font-black shadow-2xs active:scale-95 transition-all cursor-pointer flex items-center justify-center"><FiSend className="w-3.5 h-3.5" /></button>
            </form>
          </div>
        )}
        
        {/* Floating Toggle Button */}
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