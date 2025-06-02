"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import mahaADD from "@/../public/data/mahaAddress.json"; // Make sure the path is correct
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { VscLoading } from "react-icons/vsc";
import { LiaCheckCircle } from "react-icons/lia";
import { supabase } from "@/app/lib/superbase/supabaseClient";

const Buyer_Profile_Edit = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dataload, setDataLoad] = useState(true);
  const [loading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  interface FormData {
    name: string;
    phone: string;
    profilePhoto: File | null;
    district: string;
    taluka: string;
    city: string;
    aadhar: string;
    aadharPhoto: File | null;
  }

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    profilePhoto: null,
    district: "",
    taluka: "",
    city: "",
    aadhar: "",
    aadharPhoto: null,
  });

  const [uuid, setuid] = useState("");

  const [currentStep, setCurrentStep] = useState(1);
  const [districts, setDistricts] = useState<string[]>([]);
  const [talukas, setTalukas] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setuid(session.user.id);
          const profileRes = await fetch("/api/Buyer/Profile/get", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid: session.user.id }),
          });

          if (profileRes.ok) {
            const profileData = await profileRes.json();
            const mainData = profileData.data;

            if (mainData) {
              setFormData(mainData);
              setDataLoad(false);
              return;
            } else {
              toast.error("Buyer profile not found.");
              return;
            }
          } else {
            toast.error("Failed to load profile.");
          }
        } else {
          router.push("/login/buyer-login");
        }
      }
    );

    listener?.subscription?.unsubscribe();
  }, [router]);

  // Load the districts from the JSON data
  useEffect(() => {
    const data = mahaADD;

    const districtNames = data.Maharashtra.districts.map(
      (district) => district.districtNameEnglish
    );

    setDistricts(districtNames);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (file && file.size > 500 * 1024) {
      toast.warn("File size must be less than 500 KB");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setFormData({
      ...formData,
      profilePhoto: file,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > 500 * 1024) {
      toast.warn("File size must be less than 500 kb");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }
    setFormData({
      ...formData,
      aadharPhoto: file,
    });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("uid", uuid);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("aadhar", formData.aadhar);
    formDataToSend.append("district", formData.district);
    formDataToSend.append("taluka", formData.taluka);
    formDataToSend.append("city", formData.city);

    // Append files if they exist
    if (formData.profilePhoto?.size) {
      formDataToSend.append("profilePhoto", formData.profilePhoto);
    }
    if (formData.aadharPhoto?.size) {
      formDataToSend.append("aadharPhoto", formData.aadharPhoto);
    }

    if (formData.profilePhoto?.size && formData.aadharPhoto?.size) {
      toast.loading("Uploading both images...");
    } else if (formData.profilePhoto?.size) {
      toast.loading("Uploading profile photo...");
    } else if (formData.aadharPhoto?.size) {
      toast.loading("Uploading Aadhar photo...");
    }

    setIsLoading(true);
    try {
      const profileRes = await fetch("/api/Buyer/Profile/edit", {
        method: "POST",
        body: formDataToSend,
      });

      if (profileRes.ok) {
        setIsSuccess(true);
        toast.success("Profile Updated Successfully");
        router.push("/Buyer-Panel/Profile");
      }
    } catch {}
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Fetch talukas and cities when the district is selected
  useEffect(() => {
    const mahaData = mahaADD;
    const selectedDistrict = mahaData.Maharashtra.districts.find(
      (district) => district.districtNameEnglish === formData.district
    );

    if (selectedDistrict) {
      const talukaNames = Object.keys(selectedDistrict.talukas);
      setTalukas(talukaNames);

      const selectedCities =
        selectedDistrict.talukas[
          formData.taluka as keyof typeof selectedDistrict.talukas
        ] || [];
      setCities(selectedCities);
    }
  }, [formData.district, formData.taluka]);

  return (
    <div id="buyer-profile-edit" className="font-sans bg-white">
      <ToastContainer />
      {dataload ? (
        <>
          <VscLoading className="animate-spin  text-2xl mx-auto my-5" />
        </>
      ) : (
        <main>
          <section className="bg-gradient-to-b from-green-50 to-white py-12 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2  md:mb-0 md:pr-10">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold  mb-4">
                    Update Your Buyer Profile
                  </h2>
                </div>
                <div className="md:w-1/2">
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-lg shadow-xl"
                  >
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                      <>
                        <h3 className="text-xl font-bold text-teal-500 mb-4">
                          Step 1: Personal Details
                        </h3>
                        <div className="mb-4">
                          <label
                            htmlFor="Name"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="mobile"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Mobile Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="Enter your Mobile Number"
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="profilePhoto"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Profile Photo (File size must be less than 500kb)
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            id="profilePhoto"
                            name="profilePhoto"
                            onChange={handleFileChanges}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <button
                            type="button"
                            onClick={nextStep}
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                          >
                            Next
                          </button>
                        </div>
                      </>
                    )}

                    {/* Step 2: Aadhar Card & Main Crops */}
                    {currentStep === 2 && (
                      <>
                        <h3 className="text-xl font-bold text-teal-500 mb-4">
                          Step 2: Aadhar & Farm Details
                        </h3>
                        <div className="mb-4">
                          <label
                            htmlFor="mainCrops"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Aadhar card number
                          </label>
                          <input
                            type="text"
                            id="aadhar"
                            name="aadhar"
                            value={formData.aadhar}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="Enter the Aadhar card number"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="aadharPhoto"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Aadhar Card Photo (image must be less than 500KB)
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            id="aadharPhoto"
                            name="aadharPhoto"
                            onChange={handleFileChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          />
                        </div>

                        <div className="flex gap-2 justify-between items-center mb-4">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="w-full bg-gray-400 text-white py-3 rounded-lg font-medium hover:bg-gray-500 transition-colors duration-200"
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            onClick={nextStep}
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                          >
                            Next
                          </button>
                        </div>
                      </>
                    )}

                    {/* Step 3: Address Details */}
                    {currentStep === 3 && (
                      <>
                        <h3 className="text-xl font-bold text-teal-500 mb-4">
                          Step 3: Address Details
                        </h3>
                        <div className="mb-4">
                          <label
                            htmlFor="district"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            District
                          </label>
                          <select
                            id="district"
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            required
                            className="w-full overflow-y-scroll p-3 border border-gray-300 rounded-lg"
                          >
                            <option className="overflow-scroll" value="">
                              Select District
                            </option>
                            {districts.map((district) => (
                              <option key={district} value={district}>
                                {district}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="taluka"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Taluka
                          </label>
                          <select
                            id="taluka"
                            name="taluka"
                            value={formData.taluka}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          >
                            <option value="">Select Taluka</option>
                            {talukas.map((taluka) => (
                              <option key={taluka} value={taluka}>
                                {taluka}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="city"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            City
                          </label>
                          <select
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex justify-between gap-2 items-center mb-4">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="w-full bg-gray-400 text-white py-3 rounded-lg font-medium hover:bg-gray-500 transition-colors duration-200"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                          >
                            {loading ? (
                              <VscLoading className="animate-spin text-center mx-auto text-xl" />
                            ) : isSuccess ? (
                              <LiaCheckCircle className="text-center mx-auto text-xl" />
                            ) : (
                              "Update"
                            )}
                          </button>
                        </div>
                      </>
                    )}

                    <p className="text-center text-sm text-gray-600 mt-6">
                      Dont want top edit
                      <Link
                        href="/Buyer-Panel"
                        className="text-green-600 hover:text-green-800"
                      >
                        Dashborad
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

export default Buyer_Profile_Edit;
