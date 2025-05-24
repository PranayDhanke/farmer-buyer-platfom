import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const productRef = collection(fireFireStore, "Products");
    const q = query(productRef, limit(3));
    const snapshot = await getDocs(q);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ Error: error }, { status: 401 });
  }
}
