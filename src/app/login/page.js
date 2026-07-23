"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FiMail, FiLock, FiArrowRight, FiX } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 📋 MANUAL LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: email.toLowerCase(),
        password,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🌐 GOOGLE OAUTH HANDLER
  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      setError("Google Authentication failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-black flex items-center justify-center pb-28 font-sans antialiased select-none px-4 relative overflow-hidden">
      
      {/* 🌟 PREMIUM 3D WHITE CARD CONTAINER (Tailwind Transition & Shadows Handled) */}
      <div className="w-full max-w-[400px] bg-white rounded-[2.5rem] p-8 md:p-10 relative z-50 shadow-[0_20px_50px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.05)] border border-neutral-100 transition-all duration-300 transform scale-100 hover:scale-[1.01]">
        
        {/* Floating Mini Close Cross */}
        <Link 
          href="/"
          className="absolute top-6 right-6 w-8 h-8 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400 hover:text-black hover:bg-neutral-100 transition-all active:scale-90"
        >
          <FiX className="text-sm" />
        </Link>

        {/* Header */}
        <div className="text-center space-y-1 mb-8 pt-2">
          <h1 className="text-3xl font-black tracking-widest text-black uppercase">
            LOGIN
          </h1>
          <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
            stonenox Secure Node
          </p>
        </div>

        {/* 🚨 ERROR BANNER */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-[11px] font-bold text-center uppercase tracking-wider">
            {error}
          </div>
        )}

        {/* 📋 MANUAL FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Email Address Input */}
          <div className="relative flex items-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full bg-[#F3F4F6] border border-neutral-200/40 rounded-full py-4 pl-6 pr-12 text-xs font-bold text-black placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-black transition-all shadow-inner"
            />
            <FiMail className="absolute right-5 text-neutral-400 text-sm pointer-events-none" />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="relative flex items-center">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-[#F3F4F6] border border-neutral-200/40 rounded-full py-4 pl-6 pr-12 text-xs font-bold text-black placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-black transition-all shadow-inner"
              />
              <FiLock className="absolute right-5 text-neutral-400 text-sm pointer-events-none" />
            </div>

            {/* 🔗 FORGET PASSWORD SECURE LINK LINKED */}
            <div className="text-right pr-2">
              <Link 
                href="/forget-password" 
                className="text-[10px] font-bold text-neutral-400 tracking-tight hover:text-black transition-colors"
              >
                Forget Your Password ?
              </Link>
            </div>
          </div>

          {/* 💥 ORANGE BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-black text-xs uppercase tracking-widest py-4.5 rounded-full transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-md mt-6 hover:brightness-110 disabled:opacity-50"
            style={{ backgroundColor: "#FF9900", boxShadow: "0 4px 14px rgba(255, 153, 0, 0.4)" }}
          >
            <span>{loading ? "PROCESSING..." : "LOGIN"}</span>
            {!loading && <FiArrowRight className="text-sm" />}
          </button>
        </form>

        {/* ─── OR DIVIDER ─── */}
        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-neutral-100"></div>
          <span className="flex-shrink mx-4 text-[9px] font-mono text-neutral-300 uppercase tracking-widest">OR</span>
          <div className="flex-grow border-t border-neutral-100"></div>
        </div>

        {/* 🌐 GOOGLE OAUTH */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-neutral-50 border border-neutral-200/60 text-black font-black text-xs uppercase tracking-widest py-4 rounded-full transition-all flex items-center justify-center gap-3 active:scale-[0.98] hover:bg-neutral-100 shadow-sm"
        >
          <FcGoogle className="text-lg" />
          <span>Continue with Google</span>
        </button>

        {/* Footer */}
        <div className="text-center pt-6 mt-6 border-t border-neutral-100">
          <Link 
            href="/register" 
            className="text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all"
            style={{ color: "#FF9900" }}
          >
            Sign Up
          </Link>
        </div>

      </div>

      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-neutral-900/[0.02] rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}