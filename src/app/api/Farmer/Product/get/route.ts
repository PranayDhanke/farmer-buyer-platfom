import { NextRequest, NextResponse } from "next/server";
import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const { id } =await req.json();

    const productsRef = collection(fireFireStore, "Products");
    const q = query(productsRef, where("uid", "==", id));

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
