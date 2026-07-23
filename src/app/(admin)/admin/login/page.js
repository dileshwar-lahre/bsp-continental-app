"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiLock, FiMail, FiArrowRight, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const brandColor = "#4933e6";

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg("Access Granted! Authenticating Terminal...");
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 500);
      } else {
        setErrorMsg(data.message || "Invalid Email or Master Password!");
      }
    } catch (err) {
      setErrorMsg("Network Connection Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 font-sans select-none">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
      >
        {/* Terminal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4933e6]/10 border border-[#4933e6]/20 text-[#4933e6] text-xs font-black uppercase tracking-widest">
            <FiLock size={12} /> Restricted Terminal
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            BSP <span className="text-slate-400 font-light">Admin Console</span>
          </h1>
          <p className="text-xs text-slate-400">
            Secure admin clearance required.
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-semibold flex items-center gap-2"
          >
            <FiAlertCircle size={16} className="shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}

        {/* Success Alert Box */}
        {successMsg && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-semibold flex items-center gap-2"
          >
            <FiCheckCircle size={16} className="shrink-0" />
            <span>{successMsg}</span>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleAdminLogin} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@bspcontinental.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-10 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#4933e6] transition-all font-mono"
              />
              <FiMail className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Master Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-10 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#4933e6] transition-all font-mono"
              />
              <FiLock className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-lg mt-2"
            style={{ backgroundColor: brandColor }}
          >
            {loading ? (
              <span>Verifying ENV Credentials...</span>
            ) : (
              <>
                <span>Authorize & Login</span>
                <FiArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800/80">
          <p className="text-[10px] text-slate-500 font-mono">
            BSP Admin Terminal • Production Security
          </p>
        </div>
      </motion.div>
    </div>
  );
}