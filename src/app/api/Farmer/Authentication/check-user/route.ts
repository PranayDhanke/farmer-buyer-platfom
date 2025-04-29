import { NextRequest, NextResponse } from "next/server";
import cookie from 'cookie';
import { adminAuth } from "@/app/lib/Firebase/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const {token} = await req.json();

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;

  
    return NextResponse.json({ uid, authenticated: true });
    
  } catch (error) {
    console.log("error" + error);
    return NextResponse.json({ error: error || "Invalid or expired token" }, { status: 402 });
  }
}
