import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { supabase } from "@/app/lib/superbase/supabaseClient";
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const uid = formData.get("uid") as string;
    const prod_name = formData.get("prod_name") as string;
    const price = Number(formData.get("price"));
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const prod_image = formData.get("prod_image") as File | null;

    if (prod_image) {
      //Superbase Image Upload
      const { error: imageUploadError } = await supabase.storage
        .from("products")
        .upload(
          `${uid}/${prod_name + prod_image.name}/${prod_image.name}`,
          prod_image,
          {
            upsert: true,
          }
        );

      if (imageUploadError) throw imageUploadError;

      // Get the public URL for the profile photo
      const { data: imageData } = supabase.storage
        .from("products")
        .getPublicUrl(
          `${uid}/${prod_name + prod_image.name}/${prod_image.name}`
        );
      const imageUrl = imageData.publicUrl;

      const docRef = doc(fireFireStore, "Products", uid);
      await updateDoc(docRef, {
        prod_name,
        price,
        category,
        description,
        imageUrl,
      });
      return NextResponse.json(
        { success: "Product Updated Successfully" },
        { status: 201 }
      );
    } else {
      const docRef = doc(fireFireStore, "Products", uid);
      await updateDoc(docRef, {
        prod_name,
        price,
        category,
        description,
      });
      return NextResponse.json(
        { success: "Product Updated Successfully" },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json({ Error: error }, { status: 401 });
  }
}
