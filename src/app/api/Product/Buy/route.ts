import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

interface Product {
  price: number;
  quantity: number;
  uid: string;
  id: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cart, state, walletAmount, buyerId, buyername } = body;

    if (!cart || cart.length === 0 || !buyerId) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const TransMode = state;
    const createdAt = Timestamp.now();

    // 1. Update product quantities
    for (const item of cart) {
      const { id, quantity } = item;

      if (!id || typeof quantity !== "number") continue;

      const productRef = doc(fireFireStore, "Products", id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const currentData = productSnap.data();
        const currentAvailable = currentData.quantity || 0;

        const newAvailable = Math.max(currentAvailable - quantity, 0);

        await updateDoc(productRef, {
          quantity: newAvailable,
        });
      }
    }

    // 2. Create order
    const ordersRef = collection(fireFireStore, "Orders");
    await addDoc(ordersRef, {
      cart,
      TransMode,
      walletAmount,
      buyerId,
      buyername,
      createdAt,
    });

    if (TransMode == "buyerTrans") {
      // 3. Update each farmer's wallet
      for (const prod of cart as Product[]) {
        const farmId = prod.uid;
        const amountToAdd = prod.quantity * prod.price;
        const farmerRef = doc(fireFireStore, "farmers", farmId);
        const farmerSnap = await getDoc(farmerRef);

        if (farmerSnap.exists()) {
          const currentData = farmerSnap.data();
          const currentWallet = currentData.wallet;

          await updateDoc(farmerRef, {
            wallet: currentWallet + amountToAdd,
          });
        }
      }
    }

    return NextResponse.json({ Message: "Success" });
  } catch (err) {
    console.error("Error creating order:", err);
    return NextResponse.json(
      { Error: "Something went wrong" },
      { status: 500 }
    );
  }
}
