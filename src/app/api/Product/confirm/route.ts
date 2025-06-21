import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, productId, confirmId } = await req.json();

    const orderRef = doc(fireFireStore, "Orders", id);
    const orderSnap = await getDoc(orderRef);

    if (!orderSnap.exists()) {
      return NextResponse.json({ Error: "Order not found" }, { status: 404 });
    }

    const orderData = orderSnap.data();

    if (!Array.isArray(orderData.cart)) {
      return NextResponse.json(
        { Error: "Invalid cart format" },
        { status: 400 }
      );
    }

    let updated = false;

    const updatedCart = orderData.cart.map((product) => {
      if (
        product.prodID === productId &&
        product.confirmId === confirmId &&
        product.isDelivered !== true
      ) {
        updated = true;
        return { ...product, isDelivered: true };
      }
      return product;
    });

    if (updated) {
      await updateDoc(orderRef, { cart: updatedCart });
      return NextResponse.json({ Message: "Delivery marked as completed" });
    } else {
      return NextResponse.json(
        { Error: "Product not found or already delivered" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error updating delivery status:", error);
    return NextResponse.json(
      { Error: "Something went wrong" },
      { status: 500 }
    );
  }
}
