/*
 farmer name , prod name , original price , nego price ,  buyer name
 prod image , accept , reject , buyer id , prod id , farmer id  
*/

import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { addDoc, collection } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { newProduct, buyerid, buyerName, id, priceValue } = await req.json();

    const FarmerName = newProduct.name;
    const FarmerUid = newProduct.uid;
    const prod_name = newProduct.prod_name;
    const imageUrl = newProduct.imageUrl;
    const Origprice = newProduct.price;
    const NegoPrice = priceValue;
    const prodId = id;
    const BuyerId = buyerid;
    const BuyerName = buyerName;
    const accept = false;
    const reject = false;

    await addDoc(collection(fireFireStore, "Negotions"), {
      FarmerName,
      FarmerUid,
      prodId,
      prod_name,
      imageUrl,
      Origprice,
      NegoPrice,
      BuyerId,
      BuyerName,
      accept,
      reject,
    });

    return NextResponse.json({ Message: "Success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ ERROR: error }, { status: 401 });
  }
}
