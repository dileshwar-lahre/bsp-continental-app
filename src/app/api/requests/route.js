import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Request from "@/model/Request";

let Notification;
try {
  Notification = require("@/model/Notification").default;
} catch (e) {
  // Graceful fallback
}

// 1. GET: Fetch Requests
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    let filter = {};
    if (email && email !== "null" && email !== "undefined") {
      filter.userEmail = email;
    }

    const requests = await Request.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: requests });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// 2. POST: Submit New Request
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { userName, userEmail, userPhone, serviceType, details, documentsList, status } = body;

    const newRequest = await Request.create({
      userName: userName || "Anonymous User",
      userEmail: userEmail || "user@cginfrax.com",
      userPhone: userPhone || "",
      serviceType: serviceType || "CIBIL Audit",
      details: details || {},
      documentsList: documentsList || [],
      status: status || "Pending",
    });

    if (Notification) {
      try {
        await Notification.create({
          recipientEmail: "ADMIN",
          senderName: userName || "Client Application",
          title: `New ${serviceType || "Service"} Request Received!`,
          message: `${userName || "A Client"} has submitted a new ${serviceType || "Service"} application.`,
          serviceType: serviceType || "General",
          requestId: newRequest._id,
          targetUrl: "/admin/dashboard/requests",
        });
      } catch (notifErr) {
        console.warn("Notification skipped safely:", notifErr.message);
      }
    }

    return NextResponse.json(
      { success: true, message: "Request saved in database!", data: newRequest },
      { status: 201 }
    );
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// 3. PATCH: Admin Decision Dispatch
export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { requestId, status, adminMessage, adminDocument } = body;

    if (!requestId) {
      return NextResponse.json(
        { success: false, message: "requestId is required for update." },
        { status: 400 }
      );
    }

    const updateFields = { status };

    if (adminMessage !== undefined || adminDocument !== undefined) {
      updateFields.adminReply = {
        message: adminMessage || "",
        document: adminDocument || { name: "", url: "" },
        updatedAt: new Date(),
      };
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      updateFields,
      { new: true }
    );

    if (Notification && updatedRequest?.userEmail) {
      try {
        await Notification.create({
          recipientEmail: updatedRequest.userEmail,
          senderName: "Admin Legal Team",
          title: `Request Status Updated: ${status}`,
          message: adminMessage ? `Admin Note: "${adminMessage}"` : `Your request status is now ${status}.`,
          serviceType: updatedRequest.serviceType || "General",
          requestId: updatedRequest._id,
          targetUrl: "/my-requests",
        });
      } catch (notifErr) {
        console.warn("User Notification skipped safely:", notifErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Client status and reply updated successfully!",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("API PATCH Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}