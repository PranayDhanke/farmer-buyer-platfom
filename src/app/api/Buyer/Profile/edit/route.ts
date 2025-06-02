import { fireFireStore } from "@/app/lib/Firebase/Firebase";
import { supabase } from "@/app/lib/superbase/supabaseClient";
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// Helper function for image upload
async function uploadAndGetUrl(
  file: File,
  path: string
): Promise<string | null> {
  const { error } = await supabase.storage
    .from("buyer")
    .upload(path, file, { upsert: true });
  if (error) {
    console.error(`Upload error at ${path}:`, error);
    return error.name;
  }

  const { data } = supabase.storage.from("buyer").getPublicUrl(path);
  return data?.publicUrl;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Type-safe field parsing
    const uid = formData.get("uid")?.toString() ?? "";
    const name = formData.get("name")?.toString() ?? "";
    const phone = formData.get("phone")?.toString() ?? "";
    const district = formData.get("district")?.toString() ?? "";
    const taluka = formData.get("taluka")?.toString() ?? "";
    const city = formData.get("city")?.toString() ?? "";
    const aadhar = formData.get("aadhar")?.toString() ?? "";
    const profilePhoto = formData.get("profilePhoto") as File | null;
    const aadharPhoto = formData.get("aadharPhoto") as File | null;

    const userDocRef = doc(fireFireStore, `buyer/${uid}`);

    // Dynamically build Firestore fields
    const fields: Record<string, string> = {
      name,
      phone,
      district,
      taluka,
      city,
      aadhar,
    };

    // Upload profile photo if present
    if (profilePhoto && profilePhoto.size > 0) {
      const profileUrl = await uploadAndGetUrl(
        profilePhoto,
        `${uid}/profile.jpg`
      );
      if (profileUrl) fields["profilePhoto"] = profileUrl;
    }

    // Upload aadhar photo if present
    if (aadharPhoto && aadharPhoto.size > 0) {
      const aadharUrl = await uploadAndGetUrl(aadharPhoto, `${uid}/aadhar.jpg`);
      if (aadharUrl) fields["aadharPhoto"] = aadharUrl;
    }

    await updateDoc(userDocRef, fields);

    return NextResponse.json(
      { Message: "Updated Successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Update failed:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 401 }
    );
  }
}
