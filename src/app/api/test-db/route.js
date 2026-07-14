import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

export async function GET() {
  try {
    console.log('=== Test API Hit Status: Start ===');
    await dbConnect();
    return NextResponse.json({ 
      success: true, 
      message: "Database team ready! Fresh connection is alive.",
      cluster: "bspsaas"
    }, { status: 200 });
  } catch (error) {
    console.error('=== Test API Hit Status: Fail ===', error.message);
    return NextResponse.json({ 
      success: false, 
      message: "Database connection failed inside execution logic!",
      error: error.message 
    }, { status: 500 });
  }
}