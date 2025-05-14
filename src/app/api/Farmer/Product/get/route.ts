import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { uid } = await req.json();

    const productsRef = collection(fireFireStore, "Products");
    const q = query(productsRef, where("uid", "==", uid));

    try {
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return NextResponse.json(
        { products },
        { statusText: "Success", status: 201 }
      );
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 402 });
  }
}
