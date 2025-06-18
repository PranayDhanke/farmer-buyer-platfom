// /api/Product/get
import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { buyerId } = body;

    if (!buyerId) {
      return NextResponse.json({ error: "Missing buyerId" }, { status: 400 });
    }

    const q = query(
      collection(fireFireStore, "Orders"),
      where("buyerId", "==", buyerId)
    );

    const querySnapshot = await getDocs(q);
    const products: any[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.cart.forEach((product: any) => {
        products.push({
          ...product,
          createdAt: data.createdAt.toDate(),
          TransMode: data.TransMode,
          conformId: data.conformId,
        });
      });
    });

    return NextResponse.json({ products });
  } catch (err) {
    console.log("Error in get orders:", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
