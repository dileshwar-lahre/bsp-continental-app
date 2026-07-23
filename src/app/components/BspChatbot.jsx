'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { FiSend, FiCornerDownLeft } from 'react-icons/fi';

export default function BspChatbot() {
  const { messages, input, setInput, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef(null);
  
  // Custom Dynamic Placeholder text animation
  const [placeholderText, setPlaceholderText] = useState('★ Ask anything...');

  useEffect(() => {
    const placeholders = [
      '★ Ask anything...',
      '⚡ Need loan expert support?',
      '★ Type your financial query...'
    ];
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % placeholders.length;
      setPlaceholderText(placeholders[currentIndex]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Smooth auto-scroll logic
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Quick Action Options configuration
  const quickActions = [
    { label: '🏢 BSP Continental kya hai?', text: 'BSP Continental kya hai? Mujhe details chahiye.' },
    { label: '🛠️ Hamari Services', text: 'Aap log kaun-kaun si services provide karte hain?' },
    { label: '❌ Loan nahi mila, kya karein?', text: 'Mera loan reject ho gaya hai, ab mujhe kya karna chahiye?' },
    { label: '📞 Contact / Support Number', text: 'BSP Continental ka official contact aur support number share karein.' }
  ];

  // Direct Option Click handler to set text for immediate send
  const handleOptionClick = (actionText) => {
    setInput(actionText);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white border-2 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col h-[580px] transition-all duration-300">
      
      {/* ==================== 1. ULTRA-MINIMALIST BLACK & WHITE HEADER ==================== */}
      <div className="bg-white p-5 border-b-2 border-black flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-black animate-pulse"></span>
          <h3 className="font-black text-xl tracking-tighter text-black uppercase">
            BSP Chat
          </h3>
        </div>
        <span className="text-[10px] font-black tracking-widest uppercase bg-black text-white px-2.5 py-1 rounded">
          Online
        </span>
      </div>

      {/* ==================== 2. MESSAGES FLOW AREA ==================== */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-white scrollbar-thin">
        {messages.length === 0 && (
          <div className="h-full flex flex-col justify-end pb-4 space-y-5">
            {/* Minimal Initial Welcome Message */}
            <div className="space-y-1">
              <p className="text-xl font-black text-black">Namaste!</p>
              <p className="text-sm text-neutral-600 font-medium leading-relaxed">
                Welcome to BSP Continental support. Niche diye gaye options par click karein ya apna sawal direct type karein:
              </p>
            </div>

            {/* INTERACTIVE QUICK OPTIONS MATRIX */}
            <div className="flex flex-col gap-2 pt-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleOptionClick(action.text)}
                  className="w-full text-left px-4 py-3 border-2 border-black rounded-xl text-sm font-bold text-black bg-white hover:bg-black hover:text-white transition-all duration-200 active:translate-y-0.5"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Render Live Conversation Stack */}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed border-2 border-black ${
                m.role === 'user'
                  ? 'bg-black text-white rounded-br-none font-bold'
                  : 'bg-neutral-50 text-black rounded-bl-none font-medium'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        
        {/* Loading Spinner Component */}
        {isLoading && (
          <div className="flex justify-start items-center">
            <div className="bg-white text-black border-2 border-black max-w-[80%] rounded-xl px-4 py-2 text-xs font-black tracking-widest uppercase animate-pulse flex items-center gap-1">
              Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ==================== 3. BOTTOM BLACK & WHITE ACTION INPUT BAR ==================== */}
      <form 
        onSubmit={handleSubmit} 
        className="p-4 bg-white border-t-2 border-black flex gap-3 items-center"
      >
        <div className="flex-1 relative flex items-center">
          <input
            className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl text-sm text-black font-bold placeholder-neutral-400 focus:outline-none focus:bg-neutral-50 transition-all"
            value={input}
            placeholder={placeholderText}
            onChange={handleInputChange}
          />
          {input.trim() && (
            <span className="absolute right-3 text-[10px] font-bold text-neutral-400 hidden sm:flex items-center gap-0.5 bg-neutral-100 border border-neutral-200 px-1 rounded">
              Enter <FiCornerDownLeft className="w-2.5 h-2.5" />
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-black hover:bg-neutral-800 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:border-neutral-200 text-white h-11 px-5 border-2 border-black rounded-xl text-sm font-black tracking-wider transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:shadow-none"
        >
          Send <FiSend className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}