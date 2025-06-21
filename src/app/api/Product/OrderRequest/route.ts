import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, prodID, farmerId, check } = await req.json();

    const orderRef = doc(fireFireStore, "Orders", id);
    const orderSnap = await getDoc(orderRef);

    if (!orderSnap.exists()) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const orderData = orderSnap.data();

    if (!Array.isArray(orderData.cart)) {
      return NextResponse.json({ error: "Invalid cart format" }, { status: 400 });
    }

    const isAccepted = check === "Accept";
    let updated = false;

    const updatedCart = orderData.cart.map((product) => {
      if (product.prodID === prodID && product.uid === farmerId) {
        updated = true;
        return {
          ...product,
          hasConformed: isAccepted,
          hasReject: !isAccepted,
        };
      }
      return product;
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Product not found in order" },
        { status: 404 }
      );
    }

    await updateDoc(orderRef, { cart: updatedCart });

    return NextResponse.json({
      message: `Order successfully ${check === "Accept" ? "confirmed" : "rejected"}`,
    });
  } catch (error) {
    console.error("Error updating confirmation status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
