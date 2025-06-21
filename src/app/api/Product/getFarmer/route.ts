import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
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
  uid: string;
  createdAt: Date | null;
  TransMode: string | null;
  conformId: string | null;
  buyerId: string;
}

interface OrderData {
  cart: Product[];
  createdAt: { toDate: () => Date };
  TransMode: string;
  conformId: string;
  id: string;
  buyerId: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { farmerId } = body;

    if (!farmerId) {
      return NextResponse.json({ error: "Missing buyerId" }, { status: 400 });
    }

    const ordersSnapshot = await getDocs(collection(fireFireStore, "Orders"));
    const products: Product[] = [];

    ordersSnapshot.forEach((doc) => {
      const data = doc.data() as OrderData;

      if (Array.isArray(data.cart)) {
        data.cart.forEach((product) => {
          if (product.uid === farmerId) {
            products.push({
              ...product,
              id: doc.id,
              createdAt: data.createdAt?.toDate?.() || null,
              TransMode: data.TransMode || null,
              conformId: data.conformId || null,
              buyerId: data.buyerId || "",
            });
          }
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
