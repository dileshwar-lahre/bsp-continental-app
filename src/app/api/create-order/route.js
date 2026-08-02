import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { amount = 2, currency = "INR" } = await req.json();

    // Direct active key configuration
    const key_id = "rzp_test_TL0KarblP7ow0X";
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_secret) {
      console.error("❌ RAZORPAY_KEY_SECRET environment variable me nahi mila!");
      return NextResponse.json(
        { error: "Key Secret missing in .env.local" },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: key_id.trim(),
      key_secret: key_secret.trim(),
    });

    const amountInPaise = Math.round(Number(amount) * 100);

    const options = {
      amount: amountInPaise,
      currency: currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(
      {
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Razorpay Order Creation Error:", error);
    return NextResponse.json(
      { error: error?.error?.description || error.message || "Authentication Failed" },
      { status: 500 }
    );
  }
}