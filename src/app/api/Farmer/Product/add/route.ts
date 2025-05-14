import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { supabase } from "@/app/lib/superbase/supabaseClient";
import { addDoc, collection } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const profilePhoto = formData.get("profilePhoto") as string;
    const district = formData.get("district") as string;
    const taluka = formData.get("taluka") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;

    const uid = formData.get("uid") as string;
    const prod_name = formData.get("prod_name") as string;
    const price = Number(formData.get("price"));   ;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const prod_image = formData.get("prod_image") as File | null;

    if (
      !prod_name ||
      !price ||
      !category ||
      !description ||
      !prod_image ||
      !name ||
      !profilePhoto ||
      !district ||
      !taluka ||
      !city ||
      !state
    ) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    //Superbase Image Upload
    const { error: imageUploadError } = await supabase.storage
      .from("products")
      .upload(`${uid}/${prod_name+prod_image.name}/${prod_image.name}`, prod_image);

    if (imageUploadError) throw imageUploadError;

    // Get the public URL for the profile photo
    const { data: imageData } = supabase.storage
      .from("products")
      .getPublicUrl(`${uid}/${prod_name+prod_image.name}/${prod_image.name}`);
    const imageUrl = imageData.publicUrl;

    //firestore data storage
    await addDoc(
      collection(fireFireStore, "Products"),
      {
        prod_name,
        uid,
        price,
        category,
        description,
        imageUrl,
        name,
        profilePhoto,
        district,
        taluka,
        city,
        state,
      }
    );

    return NextResponse.json({"meaage" : "success"} , {status:201})
  } catch (error) {
    return NextResponse.json({ "error ": error }, { status: 402 });
  }
}
