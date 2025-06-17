import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { supabase } from "@/app/lib/superbase/supabaseClient";
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// Helper to upload file and return public URL
async function uploadProductImage(
  uid: string,
  prod_name: string,
  file: File
): Promise<string> {
  const filePath = `${uid}/${prod_name + file.name}/${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("products")
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("products").getPublicUrl(filePath);
  return data?.publicUrl ?? "";
}

type ProductUpdate = {
  prod_name: string;
  price: number;
  category: string;
  description: string;
  imageUrl?: string;
  quantity: number;
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const uid = formData.get("uid")?.toString() ?? "";
    const prod_name = formData.get("prod_name")?.toString() ?? "";
    const price = parseFloat(formData.get("price")?.toString() ?? "0");
    const quantity = parseFloat(formData.get("quantity")?.toString() ?? "0");
    const category = formData.get("category")?.toString() ?? "";
    const description = formData.get("description")?.toString() ?? "";
    const prod_image = formData.get("prod_image") as File | null;

    if (!uid || !prod_name || !category || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const docRef = doc(fireFireStore, "Products", uid);

    const updateFields: ProductUpdate = {
      prod_name,
      price,
      category,
      description,
      quantity,
    };

    if (prod_image && prod_image.size > 0) {
      const imageUrl = await uploadProductImage(uid, prod_name, prod_image);
      updateFields.imageUrl = imageUrl;
    }

    await updateDoc(docRef, updateFields);

    return NextResponse.json(
      { success: "Product Updated Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}
