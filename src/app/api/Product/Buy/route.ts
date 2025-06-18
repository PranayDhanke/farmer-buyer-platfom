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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cart, state, result, walletAmount, buyerId, buyername } = body;

    if (!cart || cart.length === 0 || !buyerId) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const conformId = result;
    const TransMode = state;
    const isDelivered = false;
    const createdAt = Timestamp.now();

    // 1. Loop through each item in the cart
    for (const item of cart) {
      const { id, quantity } = item;

      if (!id || typeof quantity !== "number") continue;

      // 2. Reference to the product document
      const productRef = doc(fireFireStore, "Products", id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const currentData = productSnap.data();
        const currentAvailable = currentData.quantity || 0;

        // 3. Update the product quantity
        const newAvailable = Math.max(currentAvailable - quantity, 0); // Avoid negative

        await updateDoc(productRef, {
          quantity: newAvailable,
        });
      }
    }

    // 4. Add the order
    const ordersRef = collection(fireFireStore, "Orders");
    await addDoc(ordersRef, {
      cart,
      conformId,
      TransMode,
      walletAmount,
      buyerId,
      buyername,
      createdAt,
      isDelivered,
    });

    return NextResponse.json({ Message: "Success" });
  } catch (err) {
    console.error("Error creating order:", err);
    return NextResponse.json(
      { Error: "Something went wrong" },
      { status: 500 }
    );
  }
}
