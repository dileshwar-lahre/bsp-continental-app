import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { sendTo } = await request.json();

    if (!sendTo) {
      return NextResponse.json({ success: false, message: 'Mobile number is required' }, { status: 400 });
    }

    // 6 digit ka random OTP generate karna
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    const apiPayload = {
      sendTo: sendTo,
      templetName: 'auth',
      exampleArr: [otpCode],
    };

    // Environment variable ya direct fallback token (agar env load na ho toh ye chalega)
    const apiToken = process.env.RESILIO_API_TOKEN || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJwVmF3cHRnZzNGT1V2OVVNUzNhSWhwU1lDTU1VQ1pRZiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzkwMjQ1ODMxfQ.4a-kvLQGcyqP2KywxUaXgKGcoQsyNnIX4zh3w600lDQ";

    const response = await fetch('https://resiliohub.com/api/v1/send_templet', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ success: false, error: data }, { status: response.status });
    }

    return NextResponse.json({ success: true, data, otpCode });
  } catch (error) {
    console.error('OTP Send Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}