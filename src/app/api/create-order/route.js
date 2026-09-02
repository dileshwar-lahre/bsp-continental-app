import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const keyId = (process.env.RAZORPAY_KEY_ID || "").trim();
    const keySecret = (process.env.RAZORPAY_KEY_SECRET || "").trim();

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay credentials not configured in environment" },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const body = await req.json().catch(() => ({}));
    const amountInINR = Number(body.amount) || 1; // Default ₹1
    const amountInPaise = Math.round(amountInINR * 100);

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    console.log("✅ ORDER CREATED SUCCESSFULLY ON CLOUD:", order.id);

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId,
    });
  } catch (error) {
    console.error("❌ Order Creation Error:", error?.error?.description || error.message);
    return NextResponse.json(
      { error: error?.error?.description || error.message || "Failed to create order" },
      { status: error?.statusCode || 500 }
    );
  }
}