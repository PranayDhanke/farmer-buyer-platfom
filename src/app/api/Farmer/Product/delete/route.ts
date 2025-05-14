import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { uid } = await req.json();

    const docRef = doc(fireFireStore, "Products", uid);
    
    await deleteDoc(docRef);

    return NextResponse.json({ "Success" : "Deleted"  }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ Error: error }, { status: 401 });
  }
}
