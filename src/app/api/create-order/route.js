import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const keyId = (process.env.RAZORPAY_KEY_ID || "rzp_test_TX2POaWxuExOi7").trim();
    const keySecret = (process.env.RAZORPAY_KEY_SECRET || "298R72x76JMbToS75CZ9D2iX").trim();

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const body = await req.json().catch(() => ({}));
    const amountInINR = Number(body.amount) || 10;
    const amountInPaise = Math.round(amountInINR * 100);

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    console.log("✅ ORDER CREATED SUCCESSFULLY ON RAZORPAY CLOUD:", order.id);

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId,
    });
  } catch (error) {
    console.error("❌ RAZORPAY ERROR:", error?.error?.description || error.message);
    return NextResponse.json(
      { error: error?.error?.description || error.message || "Failed to create order" },
      { status: error?.statusCode || 500 }
    );
  }
}