import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Missing verification fields." },
        { status: 400 }
      );
    }

    const key_secret = (process.env.RAZORPAY_KEY_SECRET || "").trim();
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      return NextResponse.json({
        success: true,
        message: "Payment verified successfully!",
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Signature verification failed." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("❌ Verification Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}