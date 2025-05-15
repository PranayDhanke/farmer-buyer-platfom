import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { uid } = await req.json();
    
    const userDocRef = doc(fireFireStore, `farmers/${uid}`);

    const snapshot = await getDoc(userDocRef);

    if (!snapshot.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data = { id: snapshot.id, ...snapshot.data() };

    return NextResponse.json({ data }, { statusText: "Success", status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 402 });
  }
}
