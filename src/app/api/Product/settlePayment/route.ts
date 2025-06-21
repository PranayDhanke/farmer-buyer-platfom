import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      id, 
      prodID,
      farmerId,
      paymentPrice,
    } = await req.json();

    const orderRef = doc(fireFireStore, "Orders", id);
    const orderSnap = await getDoc(orderRef);

    if (!orderSnap.exists()) {
      return NextResponse.json({ Error: "Order not found" }, { status: 404 });
    }

    const orderData = orderSnap.data();

    if (!Array.isArray(orderData.cart)) {
      return NextResponse.json({ Error: "Invalid cart data" }, { status: 400 });
    }

    let updated = false;

    const updatedCart = orderData.cart.map((item) => {
      if (
        item.prodID === prodID &&
        item.uid === farmerId &&
        item.hasPayment !== true
      ) {
        updated = true;
        return { ...item, hasPayment: true };
      }
      return item;
    });

    if (updated) {
      await updateDoc(orderRef, { cart: updatedCart });

      // Update farmer's wallet
      const farmerRef = doc(fireFireStore, "farmers", farmerId);
      const farmerSnap = await getDoc(farmerRef);

      if (farmerSnap.exists()) {
        const farmerData = farmerSnap.data();
        const currentWallet = farmerData.wallet || 0;

        await updateDoc(farmerRef, {
          wallet: currentWallet + paymentPrice,
        });
      }

      return NextResponse.json({ Message: "Payment marked as done" });
    } else {
      return NextResponse.json(
        { Error: "Product already paid or not found in cart" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Payment update error:", error);
    return NextResponse.json(
      { Error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
