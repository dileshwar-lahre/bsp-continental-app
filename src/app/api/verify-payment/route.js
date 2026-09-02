import { NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Missing verification parameters" },
        { status: 400 }
      );
    }

    const keySecret = (process.env.RAZORPAY_KEY_SECRET || "298R72x76JMbToS75CZ9D2iX").trim();

    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(payload)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      console.log("✅ PAYMENT VERIFIED SUCCESSFULLY ON CLOUD:", razorpay_payment_id);
      return NextResponse.json({
        success: true,
        message: "Payment successfully verified",
        paymentId: razorpay_payment_id,
      });
    } else {
      console.error("❌ Signature Mismatch");
      return NextResponse.json(
        { success: false, message: "Signature verification failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}