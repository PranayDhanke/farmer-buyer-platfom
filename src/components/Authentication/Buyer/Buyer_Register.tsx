"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import mahaAdd from "@/../public/data/mahaAddress.json"; // adjust path as per your project
import { supabase } from "@/app/lib/superbase/supabaseClient";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const Buyer_Register = () => {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePhoto: null,
    district: "",
    phone:"",
    taluka: "",
    city: "",
    aadhar: "",
    aadharPhoto: null,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [districts, setDistricts] = useState<string[]>([]);
  const [talukas, setTalukas] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const data = mahaAdd;

    const districtNames = data.Maharashtra.districts.map(
      (district) => district.districtNameEnglish
    );

    setDistricts(districtNames);
  }, []);

  useEffect(() => {
    const mahaData = mahaAdd;
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData((prev) => ({ ...prev, [e.target.name]: file }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
            formDataToSend.append("phone", formData.phone);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("aadhar", formData.aadhar);
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

      const uid = data.user?.id;

      if (uid) formDataToSend.append("uid" , uid);

      toast.loading("Wait Images are Uploading")
      const res = await fetch("/api/Buyer/Authentication/create-account", {
        method: "POST",
        body: formDataToSend
      });

      if (res.ok) {
        toast.success("Register Successfull")
        router.push("/Buyer-Panel/Profile")
      }
    } catch {
      toast.error("Error while Register");
    }
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  return (
    <div id="buyer-register" className="font-sans bg-white">
      <ToastContainer />
      <main>
        <section className="bg-gradient-to-b from-green-50 to-white py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                  Register as a Buyer{" "}
                  <span className="text-green-600">Join Our Community</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Create your account to start buying farm products directly
                  from the farmers.
                </p>
              </div>
              <div className="md:w-1/2">
                <form
                  onSubmit={handleSubmit}
                  className="bg-white p-8 rounded-lg shadow-xl"
                >
                  {currentStep === 1 && (
                    <>
                      <h3 className="text-xl font-bold text-teal-500 mb-4">
                        Step 1: Personal Details
                      </h3>
                      <div className="mb-4">
                        <label
                          htmlFor="name"
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
                          Profile Photo
                        </label>
                        <input
                          type="file"
                          id="profilePhoto"
                          name="profilePhoto"
                          onChange={handleFileChange}
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

                  {currentStep === 2 && (
                    <>
                      <h3 className="text-xl font-bold text-teal-500 mb-4">
                        Step 2: Aadhar & Address Details
                      </h3>
                      <div className="mb-4">
                        <label
                          htmlFor="aadhar"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Aadhar Number
                        </label>
                        <input
                          type="text"
                          id="aadhar"
                          name="aadhar"
                          value={formData.aadhar}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          placeholder="Enter your Aadhar Number"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="phone"
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
                          placeholder="Enter your Aadhar Number"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="aadharPhoto"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Aadhar Card Photo
                        </label>
                        <input
                          type="file"
                          id="aadharPhoto"
                          name="aadharPhoto"
                          onChange={handleFileChange}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                      {/* District Dropdown */}
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
                          Register
                        </button>
                      </div>
                    </>
                  )}

                  <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link
                      href="/login/buyer-login"
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

export default Buyer_Register;
