import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
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

    const createdAt = Timestamp.now()
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
    console.log(err);
    return NextResponse.json({ Error: err }, { status: 401 });
  }
}
