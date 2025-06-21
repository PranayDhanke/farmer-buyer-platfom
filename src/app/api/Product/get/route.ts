import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

interface Product {
  id: string;
  prodID: string;
  prod_name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  quantity: number;
  // Add other fields if necessary
  createdAt: Date | null;
  TransMode: string | null;
  confirmId: string;
  isDelivered: boolean;
}

interface OrderData {
  cart: Product[];
  createdAt: { toDate: () => Date };
  TransMode: string;
  id: string;
}

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
    const products: Product[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as OrderData;
      if (Array.isArray(data.cart)) {
        data.cart.forEach((product) => {
          products.push({
            ...product,
            id: doc.id,
            createdAt: data.createdAt?.toDate?.() || null,
            TransMode: data.TransMode || null,
          });
        });
      }
    });

    return NextResponse.json({ products });
  } catch (err) {
    console.error("Error in get orders:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
