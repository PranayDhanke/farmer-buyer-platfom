import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    if (!id || (status !== "Accept" && status !== "Reject")) {
      return NextResponse.json({ error: "Invalid request fields" }, { status: 400 });
    }

    const docRef = doc(fireFireStore, "Negotions", id);

    const updateFields =
      status === "Accept"
        ? { accept: true, reject: false }
        : { accept: false, reject: true };

    await updateDoc(docRef, updateFields); 

    return NextResponse.json(
      { message: `Request ${status.toLowerCase()}ed successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating negotiation request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
