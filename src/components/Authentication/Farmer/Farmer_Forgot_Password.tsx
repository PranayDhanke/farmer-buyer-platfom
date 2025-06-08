"use client";
import React, { useState } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { fireAuth } from "@/app/lib/Firebase/Firebase";
import { toast, ToastContainer } from "react-toastify";

const Farmer_Forgot_Password = () => {
  const [email, setEmail] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendPasswordResetEmail(fireAuth , email);
   
    
    toast.success("Password reset link sended on your mailbox");
  };

  return (
    <div id="farmer-forgot-password" className="font-sans bg-white">
      <ToastContainer />
      <main>
        <section className="bg-gradient-to-b from-green-50 to-white py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                  Forgot Password{" "}
                  <span className="text-green-600">Farmer</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Please enter your email address to receive password reset instructions.
                </p>
              </div>
              <div className="md:w-1/2">
                <form
                  onSubmit={handleSubmit}
                  className="bg-white p-8 rounded-lg shadow-xl"
                >
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
                      value={email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                    >
                      Send Reset Link
                    </button>
                  </div>
                  <p className="text-center text-sm text-gray-600">
                    Remembered your password?{" "}
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

export default Farmer_Forgot_Password;
