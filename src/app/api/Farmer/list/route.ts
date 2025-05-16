import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const productsRef = collection(fireFireStore, "farmers");

    const querySnapshot = await getDocs(productsRef);
    const farmers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ farmers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}
