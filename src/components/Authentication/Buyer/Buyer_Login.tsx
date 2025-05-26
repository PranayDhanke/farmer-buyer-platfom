"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/superbase/supabaseClient";
import { toast, ToastContainer } from "react-toastify";

const Buyer_Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (data.user) {
        toast.success("Login Successfull");
        router.push("/Buyer-Panel/Profile");
      }

      if (error) {
        toast.error("Buyer Authentication Failed");
      }
    } catch {
      toast.error("Buyer Authentication Failed");
    }
  };

  return (
    <div id="buyer-login" className="font-sans bg-white">
      <ToastContainer />
      <main>
        <section className="bg-gradient-to-b from-green-50 to-white py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                  Login as a Buyer{" "}
                  <span className="text-green-600">Welcome Back!</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Please enter your credentials to access your account.
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
                  <div className="flex justify-between items-center mb-4">
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                    >
                      Login
                    </button>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <Link
                      href="/Forgot-Password/Buyer"
                      className="text-green-600 text-sm hover:text-green-800"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <p className="text-center text-sm text-gray-600">
                    Don&apos;t have an account?
                    <Link
                      href="/create_account/Buyer"
                      className="text-green-600 hover:text-green-800"
                    >
                      Register here
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

export default Buyer_Login;
