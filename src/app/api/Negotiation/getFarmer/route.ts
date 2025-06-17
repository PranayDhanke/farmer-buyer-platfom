import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { uid } = await req.json();
    const ReqCollection = collection(fireFireStore, "Negotions");
    const q = query(ReqCollection, where("FarmerUid", "==", uid));

    const querySnapshot = await getDocs(q);
    const requests = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ requests }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ Error: error }, { status: 401 });
  }
}
