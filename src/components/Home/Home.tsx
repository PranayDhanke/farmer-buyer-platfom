import React from "react";
import Image from "next/image";
import Link from "next/link";
import List_Product from "../Products/List_Product";
import {
  FaShoppingBasket,
  FaHandshake,
  FaUserShield,
  FaCartPlus,
  FaRegHandshake,
  FaArrowRight,
} from "react-icons/fa"; // Importing specific icons from react-icons
import images from "@/../public/images/dan-meyers-0AgtPoAARtE-unsplash.jpg"
const Home = () => {
  return (
    <div>
      <div className="w-full font-sans bg-white">
        <main>
          <section className="bg-gradient-to-b from-green-50 to-white py-12 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                    Farm Fresh Products{" "}
                    <span className="text-green-600">Direct From Farmers</span>
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Connect directly with local farmers, negotiate prices, and
                    get fresh produce delivered to your doorstep.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={"/Products"}
                      className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-full transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                    >
                      <FaShoppingBasket className="mr-2" />
                      Shop Now
                    </Link>
                    <Link
                      href={"/Farmer-Panel"}
                      className="border border-green-600 text-green-600 hover:bg-green-50 font-medium px-6 py-3 rounded-full transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                    >
                      <FaHandshake className="mr-2" />
                      Sell as Farmer
                    </Link>
                  </div>
                </div>
                <div className="md:w-1/2 relative">
                  <Image
                    src={images}
                    alt="Farmers with fresh produce"
                    width={600} // Width from URL (or choose based on layout)
                    height={400} // You can adjust to match aspect ratio
                    className="rounded-lg shadow-xl w-full transform transition-transform duration-500 hover:scale-[1.02]"
                    sizes="100vw"
                  />
                  <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg hidden md:flex items-center transform transition-transform duration-500 hover:scale-105">
                    <FaUserShield className="text-green-500 text-3xl mr-3" />
                    <div>
                      <p className="font-bold text-gray-800">100% Verified</p>
                      <p className="text-sm text-gray-600">
                        Quality Assured Products
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  How Agrocart Works
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Our platform connects farmers directly with buyers,
                  eliminating middlemen and ensuring fair prices for everyone.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-green-50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <FaRegHandshake className="text-green-600 text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                    For Farmers
                  </h3>
                  <p className="text-gray-600 text-center">
                    Register, list your products, set prices, and connect with
                    buyers directly. Manage orders and track deliveries all in
                    one place.
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <FaCartPlus className="text-green-600 text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                    For Buyers
                  </h3>
                  <p className="text-gray-600 text-center">
                    Browse products from local farmers, negotiate prices through
                    our real-time chat, and get fresh produce delivered to your
                    doorstep.
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <FaUserShield className="text-green-600 text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                    Admin Support
                  </h3>
                  <p className="text-gray-600 text-center">
                    Our admin team ensures smooth operations, manages users,
                    products, and transactions, and provides support when
                    needed.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Products Section */}
          <section className="py-12 md:py-16   bg-green-50">
            <div className="">
              <List_Product />
            </div>
            <div className="text-center mt-10">
              <Link
                href={"/Products"}
                className="bg-white border border-green-600 text-green-600 hover:bg-green-50 font-medium px-6 py-3 rounded-full transition-all duration-200 transform hover:scale-105 inline-flex items-center"
              >
                View All Products
                <span className="material-symbols-outlined ml-2">
                  <FaArrowRight />
                </span>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
