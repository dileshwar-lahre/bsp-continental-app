'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FiTrendingUp, FiFileText, FiAlertTriangle, FiCheckCircle, 
  FiArrowRight, FiArrowLeft, FiMessageSquare, FiX, FiShield, FiSend,
  FiUser, FiCreditCard, FiCalendar, FiPhone, FiZap
} from 'react-icons/fi';

export default function PremiumBalancedDashboard() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [showCibilModal, setShowCibilForm] = useState(false);
  const [cibilLoading, setCibilLoading] = useState(false);
  const [cibilError, setCibilError] = useState('');
  const [cibilForm, setCibilForm] = useState({ fullName: '', panCard: '', dob: '', mobile: '' });
  const [liveReport, setLiveReport] = useState({ score: 785, rating: 'EXCELLENT', hasFetched: false });

  const [placeholderText, setPlaceholderText] = useState('★ Ask anything...');

  // Double-Click Detector for Admin Redirection
  const clickTimeoutRef = useRef(null);

  useEffect(() => {
    const placeholders = [
      '★ Ask anything...',
      '⚡ Need loan expert support?',
      '★ Ask about CIBIL score...'
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
    e.preventDefault();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = (e) => {
    e.preventDefault();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleFetchCibilReport = async (e) => {
    e.preventDefault();
    setCibilLoading(true);
    setCibilError('');

    try {
      const res = await fetch('/api/cibil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cibilForm)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to sync score');

      setLiveReport({
        score: data.score,
        rating: data.rating,
        hasFetched: true
      });
      setShowCibilForm(false);
    } catch (err) {
      setCibilError(err.message);
    } finally {
      setCibilLoading(false);
    }
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

  // 🔥 Smart Single & Double Click Handler for AI Chatbot Icon
  const handleChatbotClick = () => {
    if (clickTimeoutRef.current) {
      // Double Click Detected -> Go to Admin Page
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      router.push('/admin');
    } else {
      // Single Click Handler -> Toggle Chatbot Window
      clickTimeoutRef.current = setTimeout(() => {
        setIsOpen((prev) => !prev);
        clickTimeoutRef.current = null;
      }, 250);
    }
  };

  const quickActions = [
    { label: '🏢 BSP Continental kya hai?', text: 'BSP Continental kya hai? Mujhe details chahiye.' },
    { label: '🛠️ Hamari Services', text: 'Aap log kaun-kaun si services provide karte hain?' },
    { label: '❌ Loan nahi mila, kya karein?', text: 'Mera loan reject ho gaya hai, ab mujhe kya karna chahiye?' },
    { label: '📞 Contact Support', text: 'BSP Continental ka official contact aur support number share karein.' }
  ];

  const slides = [
    { 
      tag: "★ Personal Loan", 
      title: "Apply Without Any Rejections", 
      sub: "100% Digital Realtime Workflow",
      img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1200"
    },
    { 
      tag: "⚡ MSME Credit Line", 
      title: "Got A Fast Growing Business? Need Capital?", 
      sub: "Collateral-Free Institutional Funding",
      img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200"
    },
    { 
      tag: "🏠 Property Backed", 
      title: "Unlock Instant Wealth Against Assets", 
      sub: "Lowest Interest Rates Assured",
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 antialiased pt-4 md:pt-6 pb-28 md:pb-12 px-4 md:px-6 flex flex-col justify-start relative">
      
      {/* 🎯 Adjusted Left Margin Offset to align closer to Sidebar */}
      <div className="w-full max-w-7xl space-y-6 md:pl-[200px] lg:pl-[220px] transition-all duration-200 mx-auto">
        
        {/* 1. CIBIL CHECKER BANNER */}
        <section className="pt-1">
          <div 
            onClick={() => setShowCibilForm(true)}
            className="bg-white p-5 rounded-3xl flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(79,70,229,0.08)] transform active:scale-[0.99] transition-all duration-300 cursor-pointer group border border-slate-200/90 relative overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl"></div>

            <div className="flex items-center gap-4 flex-1 z-10">
              <div className="h-12 w-12 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 rounded-2xl flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform flex-shrink-0">
                <FiShield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base md:text-lg font-black text-slate-950 tracking-wide flex items-center gap-2">
                  CIBIL Score Checker <FiZap className="text-indigo-600 text-xs animate-pulse" />
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <p className="text-xs text-slate-500 font-bold leading-tight">
                    {liveReport.hasFetched ? 'Report Loaded Successfully' : 'Tap to Verify PAN Card & Instant Credit Audit'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative flex items-center justify-center w-14 h-14 flex-shrink-0 ml-2 z-10">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path 
                  className={liveReport.score >= 750 ? 'text-emerald-500' : 'text-amber-500'} 
                  strokeDasharray={`${(liveReport.score / 900) * 100}, 100`}
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  stroke="currentColor" 
                  fill="none" 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                />
              </svg>
              <div className="absolute text-xs font-black text-slate-950">{liveReport.score}</div>
            </div>
          </div>
        </section>

        {/* CIBIL FORM MODAL */}
        {showCibilModal && (
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-100" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-950 uppercase tracking-wide flex items-center gap-2">
                  <FiShield className="text-indigo-600" /> Verify Identity Form
                </h3>
                <button type="button" onClick={() => setShowCibilForm(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-full hover:bg-slate-50"><FiX className="w-5 h-5" /></button>
              </div>

              {cibilError && <p className="text-[11px] text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl font-bold">{cibilError}</p>}

              <form onSubmit={handleFetchCibilReport} className="space-y-3">
                <div className="relative flex items-center">
                  <FiUser className="absolute left-3.5 text-slate-400 w-4 h-4" />
                  <input required type="text" placeholder="Full Name (As per PAN)" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 text-xs text-slate-800 outline-none focus:border-indigo-600 font-semibold" value={cibilForm.fullName} onChange={(e)=>setCibilForm({...cibilForm, fullName: e.target.value})} />
                </div>
                <div className="relative flex items-center">
                  <FiCreditCard className="absolute left-3.5 text-slate-400 w-4 h-4" />
                  <input required type="text" maxLength={10} placeholder="PAN Card Number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 text-xs text-slate-800 outline-none focus:border-indigo-600 uppercase font-black tracking-wider" value={cibilForm.panCard} onChange={(e)=>setCibilForm({...cibilForm, panCard: e.target.value})} />
                </div>
                <div className="relative flex items-center">
                  <FiCalendar className="absolute left-3.5 text-slate-400 w-4 h-4" />
                  <input required type="text" placeholder="DOB (DD/MM/YYYY)" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 text-xs text-slate-800 outline-none focus:border-indigo-600 font-semibold" value={cibilForm.dob} onChange={(e)=>setCibilForm({...cibilForm, dob: e.target.value})} />
                </div>
                <div className="relative flex items-center">
                  <FiPhone className="absolute left-3.5 text-slate-400 w-4 h-4" />
                  <input required type="tel" maxLength={10} placeholder="Linked Mobile Number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 text-xs text-slate-800 outline-none focus:border-indigo-600 font-semibold" value={cibilForm.mobile} onChange={(e)=>setCibilForm({...cibilForm, mobile: e.target.value})} />
                </div>

                <button type="submit" disabled={cibilLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs py-3.5 rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-1 cursor-pointer disabled:bg-slate-200 uppercase tracking-wider transition-all">
                  {cibilLoading ? 'Contacting Bureau Network...' : 'Fetch Active Report'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 2. HERO SLIDER */}
        <section className="space-y-2 relative group/slider">
          <div className="relative overflow-hidden rounded-3xl shadow-[0_12px_35px_rgba(79,70,229,0.12)] border border-slate-200/80 bg-slate-900">
            <div 
              className="flex transition-transform duration-500 ease-out" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Link href="/loan" className="block transform active:scale-[0.99] transition-all duration-150">
                    <div className="relative h-[200px] md:h-[250px] flex flex-col justify-between p-6 md:p-8 text-white overflow-hidden">
                      <div className="absolute inset-0 z-0">
                        <img src={slide.img} alt={slide.title} className="w-full h-full object-cover object-center" />
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/95 via-indigo-900/85 to-slate-900/75" />
                      </div>

                      <div className="relative z-10 space-y-2 max-w-2xl">
                        <div className="inline-flex bg-white/20 text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full backdrop-blur-md border border-white/20 uppercase">
                          {slide.tag}
                        </div>
                        <h2 className="text-xl md:text-3xl font-black leading-tight tracking-tight drop-shadow-md uppercase">
                          {slide.title}
                        </h2>
                      </div>

                      <div className="relative z-10 flex justify-between items-center pt-3 mt-2 border-t border-white/20 text-xs md:text-sm">
                        <span className="text-indigo-100 font-semibold tracking-wide flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          {slide.sub}
                        </span>
                        <span className="font-black bg-white hover:bg-slate-100 text-indigo-700 px-5 py-2 rounded-2xl shadow-md flex items-center gap-2 text-xs md:text-sm transition-all">
                          Apply Now <FiArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover/slider:opacity-100 z-20 cursor-pointer">
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover/slider:opacity-100 z-20 cursor-pointer">
              <FiArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center items-center gap-2 pt-1">
            {slides.map((_, index) => (
              <button key={index} onClick={() => setCurrentSlide(index)} className={`transition-all duration-300 rounded-full ${currentSlide === index ? 'w-6 h-1.5 bg-indigo-600 shadow-xs' : 'w-1.5 h-1.5 bg-slate-300'}`} />
            ))}
          </div>
        </section>

        {/* 3. REQUEST OTHER SERVICES (RESTRUCTURED TITLES & TARGET ROUTES) */}
        <section className="space-y-4 pt-3">
          <div className="px-0.5 flex items-center justify-between">
            <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase flex items-center gap-2">
              <FiZap className="text-indigo-600" /> Explore Core Services
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Service 1: Property Compliance -> /property-vetting */}
            <Link href="/property-vetting" className="block group">
              <div className="bg-white p-5 rounded-3xl border border-slate-200/80 hover:border-blue-500/50 flex flex-col justify-between min-h-[155px] transform active:scale-[0.98] transition-all cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 group">
                <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <FiTrendingUp className="w-6 h-6" />
                </div>
                <div className="mt-4">
                  <h4 className="text-sm md:text-base font-black text-slate-950 uppercase tracking-tight group-hover:text-blue-600 transition-colors">Property Compliance</h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-1 leading-tight">Legal Vetting & Audit</p>
                </div>
              </div>
            </Link>

            {/* Service 2: Loan Readiness Check -> /loan-solution */}
            <Link href="/loan-solution" className="block group">
              <div className="bg-white p-5 rounded-3xl border border-slate-200/80 hover:border-amber-500/50 flex flex-col justify-between min-h-[155px] transform active:scale-[0.98] transition-all cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 group">
                <div className="h-12 w-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-sm">
                  <FiFileText className="w-6 h-6" />
                </div>
                <div className="mt-4">
                  <h4 className="text-sm md:text-base font-black text-slate-950 uppercase tracking-tight group-hover:text-amber-600 transition-colors">Loan Readiness Check</h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-1 leading-tight">Document Pre-Verification</p>
                </div>
              </div>
            </Link>

            {/* Service 3: Eligible Loan Audit -> /loan */}
            <Link href="/loan" className="block group">
              <div className="bg-white p-5 rounded-3xl border border-slate-200/80 hover:border-rose-500/50 flex flex-col justify-between min-h-[155px] transform active:scale-[0.98] transition-all cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 group">
                <div className="h-12 w-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center border border-rose-100 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-sm">
                  <FiAlertTriangle className="w-6 h-6" />
                </div>
                <div className="mt-4">
                  <h4 className="text-sm md:text-base font-black text-slate-950 uppercase tracking-tight group-hover:text-rose-600 transition-colors">Eligible Loan Audit</h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-1 leading-tight">Prevent Loan Rejections</p>
                </div>
              </div>
            </Link>

            {/* Service 4: Finance Consultant -> /finance */}
            <Link href="/finance" className="block group">
              <div className="bg-white p-5 rounded-3xl border border-slate-200/80 hover:border-emerald-500/50 flex flex-col justify-between min-h-[155px] transform active:scale-[0.98] transition-all cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 group">
                <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                  <FiCheckCircle className="w-6 h-6" />
                </div>
                <div className="mt-4">
                  <h4 className="text-sm md:text-base font-black text-slate-950 uppercase tracking-tight group-hover:text-emerald-600 transition-colors">Finance Consultant</h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-1 leading-tight">Strategic Wealth Advisory</p>
                </div>
              </div>
            </Link>

          </div>
        </section>

      </div>

      {/* FLOATING AI CHATBOT (SINGLE CLICK = CHAT | DOUBLE CLICK = ADMIN) */}
      <div className="fixed md:right-8 md:bottom-8 right-4 bottom-24 z-50 font-sans flex flex-col items-end">
        {isOpen && (
          <div className="w-[340px] md:w-[380px] h-[460px] bg-white border border-slate-200/90 rounded-3xl shadow-[0_25px_60px_rgba(79,70,229,0.18)] overflow-hidden flex flex-col mb-4 transform transition-all duration-300 ease-in-out scale-100 origin-bottom-right">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-4 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <h4 className="font-black text-sm tracking-wide uppercase">BSP Continental AI</h4>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all cursor-pointer active:scale-90"><FiX className="w-4 h-4" /></button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 scrollbar-thin">
              {messages.length === 0 && (
                <div className="h-full flex flex-col justify-end pb-1 space-y-4">
                  <div className="px-1"><p className="text-xs font-black text-slate-400 tracking-wider uppercase">Select a query route</p></div>
                  <div className="flex flex-col gap-2">
                    {quickActions.map((action, index) => (
                      <button key={index} type="button" onClick={() => sendMessage(action.text)} className="w-full text-left px-4 py-3 bg-white border border-slate-200/80 rounded-2xl text-xs font-bold text-slate-700 hover:border-indigo-500 hover:text-indigo-600 shadow-xs transition-all duration-200 active:scale-[0.99]">{action.label}</button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none shadow-sm font-medium' : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none shadow-xs'}`}>{m.content}</div>
                </div>
              ))}
              {isLoading && <div className="flex justify-start"><div className="bg-white border border-slate-100 text-slate-400 px-3 py-2 rounded-xl text-[10px] font-bold animate-pulse">⚡ Checking database...</div></div>}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center">
              <input className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700 outline-none focus:bg-white focus:border-indigo-500 transition-all duration-200" value={input} placeholder={placeholderText} onChange={(e) => setInput(e.target.value)} />
              <button type="submit" disabled={isLoading || !input.trim()} className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 text-white h-9 px-4 rounded-xl text-xs font-black shadow-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center"><FiSend className="w-3.5 h-3.5" /></button>
            </form>
          </div>
        )}
        
        {/* Chatbot Button */}
        <button 
          onClick={handleChatbotClick} 
          title="Single click for Chat | Double click for Admin"
          className="h-14 w-14 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 hover:from-indigo-700 hover:to-violet-900 text-white rounded-full flex items-center justify-center shadow-2xl border border-indigo-400/30 transform active:scale-90 transition-all cursor-pointer group"
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