"use client";
import React, { useState } from "react";
import Link from "next/link";

const Buyer_Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    profilePhoto: null,
    location: "",
    district: "",
    taluka: "",
    city: "",
    aadhar: "",
    aadharPhoto: null, // Added aadhar photo field
  });

  const [currentStep, setCurrentStep] = useState(1);

  // Address data for district, taluka, and city (can be dynamically populated)
  const districts = ["District 1", "District 2", "District 3"];
  const talukas = ["Taluka 1", "Taluka 2", "Taluka 3"];
  const cities = ["City 1", "City 2", "City 3"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData({
      ...formData,
      [e.target.name]: file,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div id="buyer-register" className="font-sans bg-white">
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
                  Create your account to start buying farm products directly from the farmers.
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
                      <h3 className="text-xl font-bold text-teal-500 mb-4">Step 1: Personal Details</h3>
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

                  {/* Step 2: Aadhar Card & Address Details */}
                  {currentStep === 2 && (
                    <>
                      <h3 className="text-xl font-bold text-teal-500 mb-4">Step 2: Aadhar & Address Details</h3>
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
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                          <option value="">Select District</option>
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
