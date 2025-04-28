import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/superbase/supabaseClient";
import { fireAuth, fireFireStore } from "@/app/lib/Firebase/Firebase";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const phone = formData.get("phone");
    const district = formData.get("district");
    const taluka = formData.get("taluka");
    const city = formData.get("city");
    const aadhar = formData.get("aadhar");
    const mainCrops = formData.get("mainCrops");
    const farmType = formData.get("farmType");

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

    const emails = email.toString();
    const pass = password.toString();

    // Step 1: Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(
      fireAuth,
      emails,
      pass
    );
    const user = userCredential.user;

    const idToken = await userCredential.user.getIdToken();

    // Step 2: Upload profile photo to Supabase Storage
    const { error: profileUploadError } = await supabase.storage
      .from("farmer")
      .upload(`${user.uid}/profile.jpg`, profilePhoto);

    if (profileUploadError) throw profileUploadError;

    // Get the public URL for the profile photo
    const { data: profileData } = supabase.storage
      .from("farmer")
      .getPublicUrl(`${user.uid}/profile.jpg`);
    const profilePhotoUrl = profileData.publicUrl;

    // Step 3: Upload aadhar photo to Supabase Storage
    const { error: aadharUploadError } = await supabase.storage
      .from("farmer")
      .upload(`${user.uid}/aadhar.jpg`, aadharPhoto);

    if (aadharUploadError) throw aadharUploadError;

    // Get the public URL for the aadhar photo
    const { data: aadharData } = supabase.storage
      .from("farmer")
      .getPublicUrl(`${user.uid}/aadhar.jpg`);
    const aadharPhotoUrl = aadharData.publicUrl;

    // Step 4: Save user data to Firestore
    const userRef = doc(fireFireStore, "farmers", user.uid);
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
    });

    return NextResponse.json({ idToken, authenticated: true });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({
      error: error || "Something went wrong",
    });
  }
}
