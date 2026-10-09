import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();
    if (typeof cookieStore.delete === "function") {
      cookieStore.delete("bsp_admin_token");
    }

    const response = NextResponse.json({ success: true, message: "Logged out successfully" });
    
    // Cookie ko response level par bhi zero-out karo
    response.cookies.set({
      name: "bsp_admin_token",
      value: "",
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, message: "Logout failed" }, { status: 500 });
  }
}