import connectDB from "@/lib/db";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const conn = await connectDB();
    const db = conn.connection.db;

    const body = await req.json();
    const { action, name, email, phone, otp, password } = body;

    if (!phone) {
      return NextResponse.json({ error: "Mobile number is required." }, { status: 400 });
    }
    const targetPhone = phone.trim();
    const targetEmail = email ? email.toLowerCase().trim() : `${targetPhone}@bspcontinental.local`;

    // ==========================================
    // ⚡ ACTION 1: INITIALIZE REGISTRATION & DISPATCH WHATSAPP OTP
    // ==========================================
    if (action === "INIT") {
      const existingUser = await User.findOne({ $or: [{ phone: targetPhone }, { email: targetEmail }] });
      if (existingUser) {
        return NextResponse.json(
          { error: "This mobile number or email is already registered. Please sign in." },
          { status: 400 }
        );
      }

      // Flush existing OTPs for clean state
      await db.collection("otps").deleteMany({ phone: targetPhone });

      // Generate 6-digit secure token
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

      // Store in database with creation timestamp
      await db.collection("otps").insertOne({
        phone: targetPhone,
        email: targetEmail,
        code: otpCode,
        createdAt: new Date(),
      });

      // 🔐 Strictly Secure Environment Variable Check (No hardcoded fallback token)
      const apiToken = process.env.RESILIO_API_TOKEN;
      if (!apiToken) {
        console.error("❌ RESILIO_API_TOKEN is missing in environment variables.");
        return NextResponse.json(
          { error: "Server configuration error: WhatsApp gateway token is missing." },
          { status: 500 }
        );
      }

      try {
        const response = await fetch('https://resiliohub.com/api/v1/send_templet', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sendTo: targetPhone,
            templetName: 'auth',
            exampleArr: [otpCode],
          }),
        });

        const resData = await response.json();

        if (!response.ok) {
          console.error("Resiliohub API Error Response:", resData);
          return NextResponse.json({ error: "Failed to dispatch WhatsApp OTP. Please check the mobile number format." }, { status: 400 });
        }
      } catch (fetchErr) {
        console.error("Fetch Network Error to Resiliohub:", fetchErr);
        return NextResponse.json({ error: "Network error while connecting to WhatsApp gateway." }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: "WhatsApp verification code sent successfully." });
    }

    // ==========================================
    // ⚡ ACTION 2: VERIFY OTP CODE
    // ==========================================
    if (action === "VERIFY") {
      const otpRecord = await db.collection("otps").findOne({ phone: targetPhone });

      if (!otpRecord || otpRecord.code !== otp?.trim()) {
        return NextResponse.json({ error: "Invalid or expired verification code." }, { status: 400 });
      }

      // Check 10-Minute Expiry Window (600,000 ms)
      const timeElapsed = new Date() - new Date(otpRecord.createdAt);
      if (timeElapsed > 600000) {
        await db.collection("otps").deleteOne({ phone: targetPhone });
        return NextResponse.json({ error: "Verification code has expired. Please request a new one." }, { status: 400 });
      }

      return NextResponse.json({ success: true, message: "Verification code confirmed." });
    }

    // ==========================================
    // ⚡ ACTION 3: COMMIT REGISTRATION (PASSWORD SETUP & SAVE)
    // ==========================================
    if (action === "FINAL") {
      const otpRecord = await db.collection("otps").findOne({ phone: targetPhone });

      if (!otpRecord || otpRecord.code !== otp?.trim()) {
        return NextResponse.json(
          { error: "Security session expired. Please restart the registration process." },
          { status: 400 }
        );
      }

      const existingUser = await User.findOne({ phone: targetPhone });
      if (existingUser) {
        return NextResponse.json(
          { error: "This mobile number is already registered. Please sign in." },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        name,
        email: otpRecord.email || targetEmail,
        phone: targetPhone,
        password: hashedPassword,
        role: "user",
        hasReceivedTermsPdf: false,
      });

      // Clear OTP record after successful registration
      await db.collection("otps").deleteMany({ phone: targetPhone });

      return NextResponse.json({
        success: true,
        message: "Registration successful. You can now log in.",
        userId: newUser._id,
      });
    }

    return NextResponse.json({ error: "Invalid registration action requested." }, { status: 400 });
  } catch (err) {
    console.error("❌ Registration API Error:", err);
    return NextResponse.json({ error: err.message || "Internal server error occurred." }, { status: 500 });
  }
}