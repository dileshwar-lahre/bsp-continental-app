import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Notification from "@/model/Notification";

// 1. GET Notifications (Filtered by recipientEmail query param or ADMIN)
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

// 2. PATCH: Mark Notification as Read
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