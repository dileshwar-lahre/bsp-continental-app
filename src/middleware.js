import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // 🛡️ 1. ADMIN ROUTE PROTECTION
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const adminToken = request.cookies.get("bsp_admin_token")?.value;
    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // 🔒 2. USER AUTHENTICATION & DASHBOARD GUARDS
  const isHttps = request.nextUrl.protocol === "https:" || process.env.NODE_ENV === "production";

  const userToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: isHttps,
  });

  // CASE A: User logged-in hai (Redirect to Dashboard)
  if (userToken) {
    if (pathname === "/" || pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // CASE B: User logged-in nahi hai (Redirect to Login)
  if (!userToken) {
    if (pathname.startsWith("/dashboard")) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/",
    "/login",
    "/register",
    "/dashboard/:path*",
  ],
};