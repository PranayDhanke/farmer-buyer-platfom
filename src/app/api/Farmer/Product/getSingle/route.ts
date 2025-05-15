import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    const docRef = doc(fireFireStore, "Products", id);
    const docDs = await getDoc(docRef);

    if (docDs.exists()) {
      return NextResponse.json({ product: docDs.data() }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}
