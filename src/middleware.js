import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // 🛡️ 1. ADMIN ROUTE PROTECTION
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const adminToken = request.cookies.get("bsp_admin_token")?.value;

    if (!adminToken) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Agar admin already logged-in hai aur login page khol raha hai
  if (pathname === "/admin/login") {
    const adminToken = request.cookies.get("bsp_admin_token")?.value;
    if (adminToken) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // 🔒 2. USER AUTHENTICATION & DASHBOARD GUARDS
  const isHttps = request.nextUrl.protocol === "https:" || process.env.NODE_ENV === "production";

  const userToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: isHttps,
  }).catch(() => null);

  if (userToken) {
    if (pathname === "/" || pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (!userToken) {
    if (pathname.startsWith("/dashboard")) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname + search); 
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();

  // 🚫 CRITICAL: Prevent browser caching on all admin pages so logout hides dashboard instantly
  if (pathname.startsWith("/admin")) {
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  return response;
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