import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Notification from "@/model/Notification";

// 📌 Admin ka WhatsApp Number (Bilaspur office / personal number)
const ADMIN_PHONE = "919575959137";

// 🚀 Real WhatsApp Sender Function (Using CallMeBot Free API or Webhook)
async function sendRealWhatsApp(title, message) {
  try {
    const text = encodeURIComponent(`🚨 *BSP ADMIN ALERT*\n\n*${title}*\n${message}`);
    // CallMeBot free API link (Aap chaho toh UltraMsg ya Twilio bhi laga sakte ho)
    const url = `https://api.callmebot.com/whatsapp.php?phone=${ADMIN_PHONE}&text=${text}&apikey=YOUR_API_KEY`;
    
    // Background me request bhejenge taaki response slow na ho
    fetch(url).catch(e => console.log("WA Error:", e));
  } catch (err) {
    console.error("WhatsApp dispatch error:", err);
  }
}

// 1. GET Notifications
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    let filter = {};
    if (email) {
      filter.recipientEmail = email;
    }

    const notifications = await Notification.find(filter).sort({ createdAt: -1 }).limit(50);
    return NextResponse.json({ success: true, data: notifications });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// 2. POST: Create Notification & Fire WhatsApp
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { title, message, serviceType, recipientEmail, targetUrl } = body;

    const newNotification = await Notification.create({
      title: title || "New Client Application",
      message: message || "A new submission requires your review.",
      serviceType: serviceType || "General",
      recipientEmail: recipientEmail || "ADMIN",
      targetUrl: targetUrl || "/admin/dashboard/requests",
      isRead: false,
    });

    // Fire WhatsApp Alert
    await sendRealWhatsApp(title, message);

    return NextResponse.json({ success: true, data: newNotification }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// 3. PATCH: Mark as Read
export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { notificationId } = body;

    if (!notificationId) {
      return NextResponse.json({ success: false, message: "notificationId required" }, { status: 400 });
    }

    const updatedNotif = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updatedNotif });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}