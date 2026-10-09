import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // ✅ Yahan ADMIN_USERNAME ya ADMIN_EMAIL dono check honge taaki env mismatch na ho
    const ENV_ADMIN_USER = process.env.ADMIN_USERNAME || process.env.ADMIN_EMAIL || "admin@bspcontinental.com";
    const ENV_ADMIN_PASS = process.env.ADMIN_PASSWORD || "admin123";
    const SECRET_KEY = process.env.JWT_SECRET || "bsp_absolute_fixed_secret_2026";

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Please provide both Email and Password!" },
        { status: 400 }
      );
    }

    // ✅ Email ko lowercase aur trim karke match karenge
    if (username.trim().toLowerCase() === ENV_ADMIN_USER.trim().toLowerCase() && password === ENV_ADMIN_PASS) {
      const token = jwt.sign(
        { role: "super_admin", user: ENV_ADMIN_USER }, 
        SECRET_KEY, 
        { expiresIn: "24h" }
      );

      const response = NextResponse.json({
        success: true,
        message: "Logged in successfully",
      });

      // ✅ Localhost ke liye secure: false taaki cookie block na ho
      response.cookies.set("bsp_admin_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 Hours
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Invalid Email or Master Password!" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500 }
    );
  }
}