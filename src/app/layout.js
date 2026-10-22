
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NextAuthProvider from "../providers/NextAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Website Suspended | Pending Developer Payment",
  description:
    "Website services are temporarily suspended due to outstanding developer payments.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }) {
  // Website remains locked until the outstanding payment issue is resolved.
  const isSiteLocked = true;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased`}
    >
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased">
        <NextAuthProvider>
          {isSiteLocked ? (
            <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
              <section className="w-full max-w-2xl text-center">
                <p className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-red-600">
                  Website Temporarily Suspended
                </p>

                <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                  Outstanding Developer Payment
                </h1>

                <div className="mx-auto mb-8 h-1 w-20 bg-red-600" />

                <p className="mb-5 text-base leading-8 text-slate-700 sm:text-lg">
                  This website has been temporarily suspended
                  because the developer's payment has remained
                  outstanding for the past two months.
                </p>

                <p className="mb-8 text-base leading-8 text-slate-700 sm:text-lg">
                  The website will remain unavailable until the
                  pending development dues are settled in
                  accordance with the agreed terms.
                </p>

                <div className="border-y border-slate-200 py-5">
                  <p className="text-sm font-bold uppercase tracking-wider text-red-600">
                    Payment Pending
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Please contact the developer and clear the
                    outstanding payment to initiate the
                    restoration process.
                  </p>
                </div>

                <p className="mt-8 text-xs text-slate-400">
                  Website access is currently restricted.
                </p>
              </section>
            </main>
          ) : (
            children
          )}
        </NextAuthProvider>
      </body>
    </html>
  );
}
