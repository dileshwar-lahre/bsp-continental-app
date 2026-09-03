import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // ==========================================
  // 🛡️ 1. ADMIN ROUTE PROTECTION (Aapka Purana Logic)
  // ==========================================
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const adminToken = request.cookies.get("bsp_admin_token")?.value;

    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // ==========================================
  // 🔒 2. USER AUTHENTICATION & DASHBOARD GUARDS
  // ==========================================
  const userToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // CASE A: User Logged In HAI (Cookie zinda hai)
  // Agar logged-in user '/' (Landing Page), '/login', ya '/register' par jaye,
  // toh use turant seedhe '/dashboard' phek do!
  if (userToken) {
    if (pathname === "/" || pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // CASE B: User Logged In NAHI HAI
  // Agar bina login koi '/dashboard' kholne ki koshish kare,
  // toh use seedhe '/login' par bhej do!
  if (!userToken) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// 🎯 Dono rules ke matching paths
export const config = {
  matcher: [
    "/admin/:path*",
    "/",
    "/login",
    "/register",
    "/dashboard/:path*",
  ],
};