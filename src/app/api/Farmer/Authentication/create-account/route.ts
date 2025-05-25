import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/superbase/supabaseClient";
import { fireAuth, fireFireStore } from "@/app/lib/Firebase/Firebase";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const uid = formData.get("uid") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;
    const phone = formData.get("phone") as string | null;
    const district = formData.get("district") as string | null;
    const taluka = formData.get("taluka") as string | null;
    const city = formData.get("city") as string | null;
    const aadhar = formData.get("aadhar") as string | null;
    const mainCrops = formData.get("mainCrops") as string | null;
    const farmType = formData.get("farmType") as string | null;

    // These will be File or Blob
    const profilePhoto = formData.get("profilePhoto") as File;
    const aadharPhoto = formData.get("aadharPhoto") as File;
    if (!(profilePhoto instanceof File) || !(aadharPhoto instanceof File)) {
      return NextResponse.json({ error: "Invalid file upload." });
    }

    // Basic validation
    if (!name || !email || !password || !profilePhoto || !aadharPhoto) {
      return NextResponse.json({
        error:
          "Required fields are missing: name, email, password, profilePhoto, or aadharPhoto.",
      });
    }

    // Step 1: Create Firebase Auth user

    // Step 2: Upload profile photo to Supabase Storage
    const { error: profileUploadError } = await supabase.storage
      .from("farmer")
      .upload(`${uid}/profile.jpg`, profilePhoto);

    if (profileUploadError) throw profileUploadError;

    // Get the public URL for the profile photo
    const { data: profileData } = supabase.storage
      .from("farmer")
      .getPublicUrl(`${uid}/profile.jpg`);
    const profilePhotoUrl = profileData.publicUrl;

    // Step 3: Upload aadhar photo to Supabase Storage
    const { error: aadharUploadError } = await supabase.storage
      .from("farmer")
      .upload(`${uid}/aadhar.jpg`, aadharPhoto);

    if (aadharUploadError) throw aadharUploadError;

    // Get the public URL for the aadhar photo
    const { data: aadharData } = supabase.storage
      .from("farmer")
      .getPublicUrl(`${uid}/aadhar.jpg`);
    const aadharPhotoUrl = aadharData.publicUrl;

    // Step 4: Save user data to Firestore
    const userRef = doc(fireFireStore, "farmers", uid);
    await setDoc(userRef, {
      name,
      email,
      phone,
      aadhar,
      mainCrops,
      farmType,
      district,
      taluka,
      city,
      profilePhoto: profilePhotoUrl,
      aadharPhoto: aadharPhotoUrl,
      state: "Maharashtra",
      rating: "0",
    });

    return NextResponse.json({ Message: "success", authenticated: true });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({
      error: error || "Something went wrong",
    });
  }
}
