import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // `.env.local` file se dynamic reading
    const ENV_ADMIN_USER = process.env.ADMIN_USERNAME;
    const ENV_ADMIN_PASS = process.env.ADMIN_PASSWORD;
    const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Please provide both Email and Password!" },
        { status: 400 }
      );
    }

    // Exact Match with ENV File
    if (username.trim() === ENV_ADMIN_USER && password === ENV_ADMIN_PASS) {

      // Encrypted Session Token Payload
      const tokenPayload = {
        role: "super_admin",
        user: ENV_ADMIN_USER,
        loginTime: Date.now(),
      };

      const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "24h" });

      const response = NextResponse.json({
        success: true,
        message: "Production Session Authenticated",
      });

      // Secure HTTP-Only Cookie Setting
      response.cookies.set("bsp_admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
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
      { success: false, message: "Server auth error." },
      { status: 500 }
    );
  }
}