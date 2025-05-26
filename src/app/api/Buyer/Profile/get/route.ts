import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { uid } = await req.json();

    const buyerRef = doc(fireFireStore, `buyer/${uid}`);

    const buyer = await getDoc(buyerRef);

    if (!buyer.exists())
      return NextResponse.json({ Error: "user Not Found" }, { status: 401 });

    const data = { id: buyer.id, ...buyer.data() };

    return NextResponse.json({ data }, { statusText: "Success", status: 201 });
    
  } catch (error) {
    return NextResponse.json({ Error: error }, { status: 401 });
  }
}
