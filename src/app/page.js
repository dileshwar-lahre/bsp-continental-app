'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  FiTrendingUp, FiFileText, FiAlertTriangle, FiCheckCircle, 
  FiArrowRight, FiArrowLeft, FiRefreshCw, FiSearch, FiMessageSquare, FiX, FiShield, FiSend,
  FiUser, FiCreditCard, FiCalendar, FiPhone
} from 'react-icons/fi';

export default function PremiumBalancedDashboard() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Custom Floating Chatbot State Integrations
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // ==================== LIVE INTEGRATED CIBIL SYSTEM STATES ====================
  const [showCibilModal, setShowCibilForm] = useState(false);
  const [cibilLoading, setCibilLoading] = useState(false);
  const [cibilError, setCibilError] = useState('');
  const [cibilForm, setCibilForm] = useState({ fullName: '', panCard: '', dob: '', mobile: '' });
  const [liveReport, setLiveReport] = useState({ score: 785, rating: 'EXCELLENT', hasFetched: false });

  // Dynamic Matching Animated Placeholder state
  const [placeholderText, setPlaceholderText] = useState('★ Ask anything...');

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

  // Hero Slider Auto Scroll Setup
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

  // ==================== LIVE ACTIVE BACKEND CIBIL API CALL ====================
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
      setShowCibilForm(false); // Success hone par close form context sheet
    } catch (err) {
      setCibilError(err.message);
    } finally {
      setCibilLoading(false);
    }
  };

  // Chat Bot execution system pipeline
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

  const quickActions = [
    { label: '🏢 BSP Continental kya hai?', text: 'BSP Continental kya hai? Mujhe details chahiye.' },
    { label: '🛠️ Hamari Services', text: 'Aap log kaun-kaun si services provide karte hain?' },
    { label: '❌ Loan nahi mila, kya karein?', text: 'Mera loan reject ho gaya hai, ab mujhe kya karna chahiye?' },
    { label: '📞 Contact / Support Number', text: 'BSP Continental ka official contact aur support number share karein.' }
  ];

  const slides = [
    { tag: "★ Personal Loan", title: "Apply Without Any Rejections", sub: "100% Digital Realtime Workflow" },
    { tag: "⚡ MSME Credit Line", title: "Got A Fast Growing Startup? Need Capital?", sub: "Collateral-Free Institutional Funding" },
    { tag: "🏠 Property Backed", title: "Unlock Instant Wealth Against Assets", sub: "Lowest Interest Rates Assured" }
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 antialiased pt-8 pb-8 px-4 md:px-6 flex flex-col justify-start relative">
      <div className="w-full max-w-md mx-auto space-y-5">
        
        {/* ==================== 1. FIXED TOP HERO: CIBIL CHECKER TRIGGER SECTION ==================== */}
        <section className="pt-1">
          <div 
            onClick={() => setShowCibilForm(true)}
            className="bg-white p-4.5 rounded-2xl flex items-center justify-between shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.09)] transform active:scale-[0.99] transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 flex-1">
              <div className="h-11 w-11 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform flex-shrink-0">
                <FiShield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-black text-slate-950 tracking-wide">CIBIL Score Checker</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <p className="text-xs text-slate-500 font-bold leading-tight">
                    {liveReport.hasFetched ? 'Report Loaded Successfully' : 'Tap to Verify PAN Card Details'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Visual Mini Progress Circle Graph */}
            <div className="relative flex items-center justify-center w-12 h-12 flex-shrink-0 ml-2">
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
              <div className="absolute text-[10px] font-black text-slate-950">{liveReport.score}</div>
            </div>
          </div>
        </section>

        {/* ==================== ACTIVE CIBIL INTERFACE SHEET POPUP WINDOW ==================== */}
        {showCibilModal && (
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-4 border border-slate-100" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-950 uppercase tracking-wide flex items-center gap-1.5">
                  <FiShield className="text-indigo-600" /> Verify Identity Form
                </h3>
                <button type="button" onClick={() => setShowCibilForm(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><FiX className="w-4 h-4" /></button>
              </div>

              {cibilError && <p className="text-[11px] text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl font-bold">{cibilError}</p>}

              <form onSubmit={handleFetchCibilReport} className="space-y-3">
                <div className="relative flex items-center">
                  <FiUser className="absolute left-3 text-slate-400 w-3.5 h-3.5" />
                  <input required type="text" placeholder="Full Name (As per PAN)" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-9 py-2.5 text-xs text-slate-700 outline-none focus:border-indigo-500 font-medium" value={cibilForm.fullName} onChange={(e)=>setCibilForm({...cibilForm, fullName: e.target.value})} />
                </div>
                <div className="relative flex items-center">
                  <FiCreditCard className="absolute left-3 text-slate-400 w-3.5 h-3.5" />
                  <input required type="text" maxLength={10} placeholder="PAN Card Number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-9 py-2.5 text-xs text-slate-700 outline-none focus:border-indigo-500 uppercase font-bold tracking-wider" value={cibilForm.panCard} onChange={(e)=>setCibilForm({...cibilForm, panCard: e.target.value})} />
                </div>
                <div className="relative flex items-center">
                  <FiCalendar className="absolute left-3 text-slate-400 w-3.5 h-3.5" />
                  <input required type="text" placeholder="DOB (DD/MM/YYYY)" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-9 py-2.5 text-xs text-slate-700 outline-none focus:border-indigo-500 font-medium" value={cibilForm.dob} onChange={(e)=>setCibilForm({...cibilForm, dob: e.target.value})} />
                </div>
                <div className="relative flex items-center">
                  <FiPhone className="absolute left-3 text-slate-400 w-3.5 h-3.5" />
                  <input required type="tel" maxLength={10} placeholder="Linked Mobile Number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-9 py-2.5 text-xs text-slate-700 outline-none focus:border-indigo-500 font-medium" value={cibilForm.mobile} onChange={(e)=>setCibilForm({...cibilForm, mobile: e.target.value})} />
                </div>

                <button type="submit" disabled={cibilLoading} className="w-full bg-indigo-600 text-white font-black text-xs py-3 rounded-xl shadow-md flex items-center justify-center gap-1 cursor-pointer disabled:bg-slate-200 uppercase tracking-wider transition-all">
                  {cibilLoading ? 'Contacting Bureau Network...' : 'Fetch Active Report'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ==================== 2. INTERACTIVE LOAN HERO SLIDER CARD ==================== */}
        <section className="space-y-2 relative group/slider">
          <div className="relative overflow-hidden rounded-2xl shadow-[0_12px_30px_rgba(79,70,229,0.15)]">
            <div 
              className="flex transition-transform duration-500 ease-out" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Link href="/loan" className="block transform active:scale-[0.99] transition-all duration-150">
                    <div className="relative bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 text-white min-h-[135px] flex flex-col justify-between p-5 border-b-2 border-indigo-900/40">
                      <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none">
                        <img src="https://images.unsplash.com/photo-1591605503774-82ab8184f092?auto=format&fit=crop&q=80&w=600" alt="Financial Growth" className="w-full h-full object-cover object-center" />
                      </div>
                      <div className="relative z-10 flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <div className="inline-flex bg-white/20 text-white text-[9px] font-black tracking-widest px-3 py-0.5 rounded-full backdrop-blur-md border border-white/10 uppercase">{slide.tag}</div>
                          <h2 className="text-xl font-black leading-tight tracking-tight drop-shadow-xs line-clamp-2">{slide.title}</h2>
                        </div>
                      </div>
                      <div className="relative z-10 flex justify-between items-center pt-2 mt-2 border-t border-white/10 text-[11px]">
                        <span className="text-indigo-100 font-semibold tracking-wide flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          {slide.sub}
                        </span>
                        <span className="font-black bg-white text-indigo-700 px-3.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                          Apply Now <FiArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center backdrop-blur-xs transition-all opacity-0 group-hover/slider:opacity-100 z-20 cursor-pointer">
              <FiArrowLeft className="w-4 h-4" />
            </button>
            <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center backdrop-blur-xs transition-all opacity-0 group-hover/slider:opacity-100 z-20 cursor-pointer">
              <FiArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex justify-center items-center gap-2 pt-1">
            {slides.map((_, index) => (
              <button key={index} onClick={() => setCurrentSlide(index)} className={`transition-all duration-300 rounded-full ${currentSlide === index ? 'w-5 h-1.5 bg-indigo-600 shadow-xs' : 'w-1.5 h-1.5 bg-slate-300'}`} />
            ))}
          </div>
        </section>

        {/* ==================== 3. REQUEST OTHER SERVICES GRID ==================== */}
        <section className="space-y-2">
          <div className="px-0.5"><h3 className="text-xs font-black tracking-wider text-slate-400 uppercase">Request Other Services</h3></div>
          <div className="grid grid-cols-2 gap-3.5">
            <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100 flex flex-col justify-between min-h-[120px] transform active:scale-[0.97] transition-all cursor-pointer shadow-sm hover:shadow-md hover:bg-blue-50 group">
              <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm shadow-blue-200 group-hover:scale-105 transition-transform"><FiTrendingUp className="w-5 h-5" /></div>
              <div className="mt-4"><h4 className="text-sm font-black text-slate-950 tracking-wide">Property Check</h4><p className="text-[11px] text-slate-500 font-bold mt-0.5 leading-tight">Instant valuation status</p></div>
            </div>
            <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-100 flex flex-col justify-between min-h-[120px] transform active:scale-[0.97] transition-all cursor-pointer shadow-sm hover:shadow-md hover:bg-amber-50 group">
              <div className="h-10 w-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-sm shadow-amber-200 group-hover:scale-105 transition-transform"><FiFileText className="w-5 h-5" /></div>
              <div className="mt-4"><h4 className="text-sm font-black text-slate-950 tracking-wide">Paper Checker</h4><p className="text-[11px] text-slate-500 font-bold mt-0.5 leading-tight">AI document validation</p></div>
            </div>
            <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-100 flex flex-col justify-between min-h-[120px] transform active:scale-[0.97] transition-all cursor-pointer shadow-sm hover:shadow-md hover:bg-rose-50 group">
              <div className="h-10 w-10 bg-rose-500 rounded-xl flex items-center justify-center text-white shadow-sm shadow-rose-200 group-hover:scale-105 transition-transform"><FiAlertTriangle className="w-5 h-5" /></div>
              <div className="mt-4"><h4 className="text-sm font-black text-slate-950 tracking-wide">Avoid Rejection</h4><p className="text-[11px] text-slate-500 font-bold mt-0.5 leading-tight">Profile risk mitigation</p></div>
            </div>
            <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100 flex flex-col justify-between min-h-[120px] transform active:scale-[0.97] transition-all cursor-pointer shadow-sm hover:shadow-md hover:bg-emerald-50 group">
              <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-sm shadow-emerald-200 group-hover:scale-105 transition-transform"><FiCheckCircle className="w-5 h-5" /></div>
              <div className="mt-4"><h4 className="text-sm font-black text-slate-950 tracking-wide">Guaranteed Pass</h4><p className="text-[11px] text-slate-500 font-bold mt-0.5 leading-tight">High-pass processing</p></div>
            </div>
          </div>
        </section>

      </div>

      {/* ==================== 4. MODERNISED MATCHING AI FLOATING CHAT SYSTEM ==================== */}
      <div className="fixed md:right-6 md:bottom-6 right-4 bottom-28 z-50 font-sans flex flex-col items-end">
        {isOpen && (
          <div className="w-[340px] md:w-[380px] h-[460px] bg-white border border-slate-200 rounded-3xl shadow-[0_20px_50px_rgba(79,70,229,0.15)] overflow-hidden flex flex-col mb-4 transform transition-all duration-300 ease-in-out scale-100 origin-bottom-right">
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
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none shadow-sm shadow-indigo-600/10 font-medium' : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none shadow-xs'}`}>{m.content}</div>
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
        
        <button onClick={() => setIsOpen(!isOpen)} className="h-12 w-12 bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-violet-800 text-white rounded-full flex items-center justify-center shadow-2xl border border-indigo-500/30 transform active:scale-90 transition-all cursor-pointer group">
          {isOpen ? <FiX className="w-5 h-5 transition-transform duration-200 rotate-90" /> : (
            <div className="relative">
              <FiMessageSquare className="w-5 h-5 transition-transform duration-200 group-hover:scale-105" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
            </div>
          )}
        </button>
      </div>

    </div>
  );
}