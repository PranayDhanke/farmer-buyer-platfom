import { fireAuth } from "@/app/lib/Firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const userCred = await signInWithEmailAndPassword(
      fireAuth,
      email,
      password
    );

    const idToken = await userCred.user.getIdToken();

    return NextResponse.json( { idToken, authenticated: true });
  } catch (error) {
    console.log("ERROR IS HEERE");
    return NextResponse.json({
      error: error || "Something went wrong",
    });
  }
}
