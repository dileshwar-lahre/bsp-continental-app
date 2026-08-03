'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FiTrendingUp, FiFileText, FiCheckCircle, 
  FiArrowRight, FiArrowLeft, FiMessageSquare, FiX, FiShield, FiSend,
  FiZap, FiBriefcase, FiDollarSign, FiStar, FiGrid
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
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Connection error. Please try again.' }]);
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
    { label: '📞 Contact Support', text: 'Official contact details share karein.' }
  ];

  const slides = [
    { 
      tag: "Property Compliance", 
      title: "Certified Property Legal Verification", 
      sub: "Complete Registry Verification & Document Audit",
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200",
      link: "/property-vetting"
    },
    { 
      tag: "Credit Advisory", 
      title: "Credit Score Fix & Dispute Resolution", 
      sub: "Correct Bureau Errors & Improve Loan Approval Rates",
      img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200",
      link: "/credit-score-management"
    },
    { 
      tag: "Financial Consulting", 
      title: "Business Loan & Mortgage Advisory", 
      sub: "Professional Financial Guidance & Structured Approvals",
      img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1200",
      link: "/finance"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 antialiased py-6 md:py-10 px-4 sm:px-6 md:px-10 font-sans flex flex-col justify-start relative select-none">
      
      {/* 🎯 Sidebar Spacing Offset */}
      <div className="w-full max-w-7xl lg:pl-64 transition-all duration-300 mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
                <FiZap size={20} />
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
                Client Dashboard
              </h1>
            </div>
            <p className="text-xs text-slate-500 font-bold pl-1">
              Property Verification, Credit Score Advisory & Loan Solutions
            </p>
          </div>

          <div className="flex items-center gap-2 bg-blue-50/80 border border-blue-100 px-4 py-2 rounded-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-black text-blue-700 uppercase tracking-wider">
              Online Support
            </span>
          </div>
        </div>

        {/* 1. HERO SLIDER */}
        <section className="space-y-3 relative group/slider">
          <div className="relative overflow-hidden rounded-3xl border border-blue-200/80 bg-blue-600 shadow-sm text-white">
            <div 
              className="flex transition-transform duration-500 ease-out" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="relative h-[230px] sm:h-[270px] md:h-[290px] flex flex-col justify-between p-6 sm:p-8 md:p-10 overflow-hidden">
                    
                    {/* Background Overlay */}
                    <div className="absolute inset-0 z-0">
                      <img src={slide.img} alt={slide.title} className="w-full h-full object-cover opacity-20" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 opacity-95" />
                    </div>

                    <div className="relative z-10 space-y-2.5 max-w-2xl">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-md border border-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-white">
                        <FiStar size={12} /> {slide.tag}
                      </span>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight drop-shadow-xs">
                        {slide.title}
                      </h2>
                    </div>

                    <div className="relative z-10 flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-white/20">
                      <p className="text-xs font-bold text-blue-100 flex items-center gap-2">
                        <FiCheckCircle className="text-emerald-300 shrink-0" size={16} />
                        {slide.sub}
                      </p>
                      <Link 
                        href={slide.link} 
                        className="bg-white hover:bg-slate-100 text-blue-700 font-black px-5 py-2.5 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                      >
                        Explore Service <FiArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Controls */}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/20 hover:bg-white/30 text-white rounded-xl flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover/slider:opacity-100 z-20 cursor-pointer">
              <FiArrowLeft size={16} />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/20 hover:bg-white/30 text-white rounded-xl flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover/slider:opacity-100 z-20 cursor-pointer">
              <FiArrowRight size={16} />
            </button>
          </div>

          <div className="flex justify-center items-center gap-2 pt-2">
            {slides.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentSlide(index)} 
                className={`transition-all duration-300 rounded-full cursor-pointer ${currentSlide === index ? 'w-8 h-2 bg-blue-600' : 'w-2 h-2 bg-slate-300'}`} 
              />
            ))}
          </div>
        </section>

        {/* 2. CORE SERVICES GRID */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <FiGrid className="text-blue-600" /> Core Advisory Solutions
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1️⃣ Property Compliance Services */}
            <Link href="/property-vetting" className="block group">
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs hover:border-blue-600 hover:shadow-md transition-all flex flex-col justify-between min-h-[180px] active:scale-[0.98]">
                <div className="flex items-center justify-between">
                  <span className="p-3.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <FiShield size={22} />
                  </span>
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">01</span>
                </div>
                <div className="space-y-1 pt-4">
                  <h4 className="text-base font-black text-slate-950 uppercase tracking-tight group-hover:text-blue-600 transition-colors leading-snug">
                    Property Compliance
                  </h4>
                  <p className="text-xs font-bold text-slate-400">Legal Verification & Registry Audit</p>
                </div>
              </div>
            </Link>

            {/* 2️⃣ Credit Score Management */}
            <Link href="/credit-score-management" className="block group">
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs hover:border-blue-600 hover:shadow-md transition-all flex flex-col justify-between min-h-[180px] active:scale-[0.98]">
                <div className="flex items-center justify-between">
                  <span className="p-3.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <FiTrendingUp size={22} />
                  </span>
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">02</span>
                </div>
                <div className="space-y-1 pt-4">
                  <h4 className="text-base font-black text-slate-950 uppercase tracking-tight group-hover:text-blue-600 transition-colors leading-snug">
                    Credit Score Management
                  </h4>
                  <p className="text-xs font-bold text-slate-400">CIBIL Fix & Dispute Advisory</p>
                </div>
              </div>
            </Link>

            {/* 3️⃣ Financial Consultancy */}
            <Link href="/finance" className="block group">
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs hover:border-blue-600 hover:shadow-md transition-all flex flex-col justify-between min-h-[180px] active:scale-[0.98]">
                <div className="flex items-center justify-between">
                  <span className="p-3.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <FiBriefcase size={22} />
                  </span>
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">03</span>
                </div>
                <div className="space-y-1 pt-4">
                  <h4 className="text-base font-black text-slate-950 uppercase tracking-tight group-hover:text-blue-600 transition-colors leading-snug">
                    Financial Consultancy
                  </h4>
                  <p className="text-xs font-bold text-slate-400">Strategic Business Advisory</p>
                </div>
              </div>
            </Link>

            {/* 4️⃣ Loan Eligibility Check */}
            <Link href="/loan" className="block group">
              <div className="bg-white border border-slate-200/90 hover:border-blue-600 rounded-3xl p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between min-h-[180px] active:scale-[0.98]">
                <div className="flex items-center justify-between">
                  <span className="p-3.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <FiDollarSign size={22} />
                  </span>
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">04</span>
                </div>
                <div className="space-y-1 pt-4">
                  <h4 className="text-base font-black text-slate-950 uppercase tracking-tight group-hover:text-blue-600 transition-colors leading-snug">
                    Loan Eligibility Check
                  </h4>
                  <p className="text-xs font-bold text-slate-400">Pre-Approval & Rejection Resolution</p>
                </div>
              </div>
            </Link>

          </div>
        </section>

      </div>

      {/* FLOATING AI CHATBOT */}
      <div className="fixed md:right-8 md:bottom-8 right-4 bottom-24 z-50 font-sans flex flex-col items-end">
        {isOpen && (
          <div className="w-[340px] md:w-[380px] h-[460px] bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col mb-4 transform transition-all duration-300 ease-in-out scale-100 origin-bottom-right">
            <div className="bg-blue-600 p-4 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <h4 className="font-black text-sm tracking-wide uppercase">Customer Support AI</h4>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all cursor-pointer active:scale-90"><FiX className="w-4 h-4" /></button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
              {messages.length === 0 && (
                <div className="h-full flex flex-col justify-end pb-1 space-y-4">
                  <div className="px-1"><p className="text-xs font-black text-slate-400 tracking-wider uppercase">Select a query route</p></div>
                  <div className="flex flex-col gap-2">
                    {quickActions.map((action, index) => (
                      <button key={index} type="button" onClick={() => sendMessage(action.text)} className="w-full text-left px-4 py-3 bg-white border border-slate-200/80 rounded-2xl text-xs font-bold text-slate-700 hover:border-blue-600 hover:text-blue-600 shadow-2xs transition-all duration-200 active:scale-[0.99]">{action.label}</button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none shadow-2xs font-medium' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-2xs'}`}>{m.content}</div>
                </div>
              ))}
              {isLoading && <div className="flex justify-start"><div className="bg-white border border-slate-200 text-slate-400 px-3 py-2 rounded-xl text-[10px] font-bold animate-pulse">⚡ Checking details...</div></div>}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center">
              <input className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700 outline-none focus:bg-white focus:border-blue-600 transition-all duration-200" value={input} placeholder={placeholderText} onChange={(e) => setInput(e.target.value)} />
              <button type="submit" disabled={isLoading || !input.trim()} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white h-9 px-4 rounded-xl text-xs font-black shadow-2xs active:scale-95 transition-all cursor-pointer flex items-center justify-center"><FiSend className="w-3.5 h-3.5" /></button>
            </form>
          </div>
        )}
        
        {/* Floating Toggle Button */}
        <button 
          onClick={handleChatbotClick} 
          title="Single click for Chat | Double click for Admin"
          className="h-14 w-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-xl border border-blue-400/40 transform active:scale-90 transition-all cursor-pointer group"
        >
          {isOpen ? <FiX className="w-6 h-6 transition-transform duration-200 rotate-90" /> : (
            <div className="relative">
              <FiMessageSquare className="w-6 h-6 transition-transform duration-200 group-hover:scale-105" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
          )}
        </button>
      </div>

    </div>
  );
}