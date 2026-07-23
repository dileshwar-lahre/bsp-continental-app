"use client"; // ⚠️ YEH SABSE UPAR HONA MANDATORY HAI BC!

import { SessionProvider } from "next-auth/react";

export default function NextAuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}