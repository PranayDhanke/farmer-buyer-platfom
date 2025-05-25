"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import mahaADD from "@/../public/data/mahaAddress.json"; // Make sure the path is correct
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { VscLoading } from "react-icons/vsc";
import { LiaCheckCircle } from "react-icons/lia";

const Farmer_Register = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setloading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  interface FormData {
    name: string;
    email: string;
    password: string;
    phone: string;
    profilePhoto: File | null;
    district: string;
    taluka: string;
    city: string;
    aadhar: string;
    mainCrops: string;
    aadharPhoto: File | null;
    farmType: string;
  }

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    profilePhoto: null,
    district: "",
    taluka: "",
    city: "",
    aadhar: "",
    mainCrops: "",
    aadharPhoto: null,
    farmType: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [districts, setDistricts] = useState<string[]>([]);
  const [talukas, setTalukas] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const farmTypes = ["Organic", "Non-Organic", "Hydroponics", "Agroforestry"];

  // Load the districts from the JSON data
useEffect(() => {
  const data = mahaADD;

  const districtNames = data.Maharashtra.districts.map(
    (district) => district.districtNameEnglish
  );

  setDistricts(districtNames);
}, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    // Append regular form data
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("aadhar", formData.aadhar);
    formDataToSend.append("mainCrops", formData.mainCrops);
    formDataToSend.append("farmType", formData.farmType);
    formDataToSend.append("district", formData.district);
    formDataToSend.append("taluka", formData.taluka);
    formDataToSend.append("city", formData.city);

    // Append files if they exist
    if (formData.profilePhoto) {
      formDataToSend.append("profilePhoto", formData.profilePhoto);
    }
    if (formData.aadharPhoto) {
      formDataToSend.append("aadharPhoto", formData.aadharPhoto);
    }

    try {
      setloading(true);

      toast.loading("Wait Files are Uploading");

      const response = await fetch(
        "/api/Farmer/Authentication/create-account",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        toast.success("Account created successfully");
        const data = await response.json();

        const idToken = data.idToken;

        Cookies.set("firebase_token", idToken, { expires: 7, secure: true });

        setloading(false);
        setSuccess(true);
        router.push("/Farmer-Panel/Profile");
      } else {
        toast.error("Error While Register");
        // Handle error (e.g., show an error message)
      }
    } catch {
      toast.error("Registration Error");
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Fetch talukas and cities when the district is selected
  useEffect(() => {

    const mahaData = mahaADD ;
  const selectedDistrict = mahaData.Maharashtra.districts.find(
    (district) => district.districtNameEnglish === formData.district
  );

  if (selectedDistrict) {
    const talukaNames = Object.keys(selectedDistrict.talukas);
    setTalukas(talukaNames);

    const selectedCities =
      selectedDistrict.talukas[formData.taluka as keyof typeof selectedDistrict.talukas] || [];
    setCities(selectedCities);
  }
}, [formData.district, formData.taluka]);

  return (
    <div id="farmer-register" className="font-sans bg-white">
      <ToastContainer />
      <main>
        <section className="bg-gradient-to-b from-green-50 to-white py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold  mb-4">
                  Register as a Farmer{" "}
                  <span className="text-green-600">Join Our Community</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Create your account to start selling your farm products and
                  connect with buyers directly.
                </p>
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
                          htmlFor="email"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          placeholder="Enter your email"
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
                          htmlFor="password"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          placeholder="Enter your password"
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
                      <div className="mb-4">
                        <label
                          htmlFor="mainCrops"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Main Crops Grown
                        </label>
                        <input
                          type="text"
                          id="mainCrops"
                          name="mainCrops"
                          value={formData.mainCrops}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          placeholder="Enter the main crops grown on your farm"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="farmType"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Farm Type
                        </label>
                        <select
                          id="farmType"
                          name="farmType"
                          value={formData.farmType}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                          <option value="">Select Farm Type</option>
                          {farmTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
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
                            "Register"
                          )}
                        </button>
                      </div>
                    </>
                  )}

                  <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link
                      href="/login/farmer-login"
                      className="text-green-600 hover:text-green-800"
                    >
                      Login here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Farmer_Register;