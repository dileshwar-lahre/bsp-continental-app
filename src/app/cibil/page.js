'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  User, 
  CreditCard, 
  Phone, 
  Calendar, 
  MapPin, 
  ArrowLeft, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  Zap,
  Lock
} from 'lucide-react';

export default function CibilPage() {
  const [formData, setFormData] = useState({
    name: '',
    pan: '',
    mobile: '',
    dob: '',
    pincode: '',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/cibil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong while fetching report');
      }

      setResult(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 antialiased py-6 md:py-10 px-4 sm:px-6 md:px-10 lg:pl-64 font-sans flex flex-col transition-all duration-300 select-none">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-blue-600 uppercase tracking-wider transition-all">
            <ArrowLeft size={16} /> Back
          </Link>
          <span className="text-xs font-black text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-xl">
            Real CIBIL Bureau Engine
          </span>
        </div>

        {/* Header Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-xl uppercase tracking-wider">
              <ShieldCheck size={14} /> Official Bureau Check
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-950 uppercase tracking-tight">
              Real CIBIL Score Checker
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
              Enter real identity details to fetch official live credit bureau score and report directly.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl shrink-0">
            <Lock size={14} className="text-blue-600" />
            <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
              256-Bit Encrypted
            </span>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
          
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-slate-950 uppercase tracking-tight flex items-center gap-2">
              <Zap className="text-blue-600" size={20} /> Identity & Bureau Form
            </h2>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Instant Sync
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <User size={13} className="text-blue-600" /> Full Name (As per PAN Card)
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Rahul Sharma"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all"
              />
            </div>

            {/* Grid 1: PAN & Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <CreditCard size={13} className="text-blue-600" /> PAN Card Number
                </label>
                <input
                  type="text"
                  name="pan"
                  required
                  maxLength={10}
                  value={formData.pan}
                  onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                  placeholder="ABCDE1234F"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 uppercase font-mono outline-none focus:border-blue-600 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Phone size={13} className="text-blue-600" /> Mobile Number
                </label>
                <input
                  type="text"
                  name="mobile"
                  required
                  maxLength={10}
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 font-mono outline-none focus:border-blue-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Grid 2: DOB & Pincode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Calendar size={13} className="text-blue-600" /> Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <MapPin size={13} className="text-blue-600" /> Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  required
                  maxLength={6}
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="492001"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 font-mono outline-none focus:border-blue-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-black text-xs py-4 rounded-2xl uppercase tracking-wider transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" /> Fetching Live Bureau Score...
                </>
              ) : (
                <>
                  <Zap size={16} /> Get Real CIBIL Score
                </>
              )}
            </button>
          </form>

          {/* Error Message Display */}
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle size={18} className="shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Fetched Result Display */}
          {result && (
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase tracking-wider">
                <CheckCircle2 size={18} className="text-emerald-600" /> Real Bureau Data Fetched Successfully!
              </div>
              <pre className="text-[11px] font-mono font-bold text-slate-800 overflow-x-auto p-4 bg-white border border-emerald-100 rounded-xl max-h-[300px]">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}