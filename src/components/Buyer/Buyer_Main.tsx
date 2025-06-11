"use client";

import Link from "next/link";
import OrderedProduct from "./OrderedProduct";
import { FaUserCircle, FaStore, FaHandshake } from "react-icons/fa";

const Buyer_Main = () => {
  return (
    <div className="px-4 sm:px-6 md:px-10 py-8 bg-gray-50 min-h-screen">
      {/* Top Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10">
        <h1 className="text-2xl font-bold text-gray-800 text-center sm:text-left">Welcome, Buyer</h1>

        <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
          <Link href="/Buyer-Panel/Profile">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
              <FaUserCircle />
              Profile
            </button>
          </Link>
          <Link href="/Products">
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300">
              <FaStore />
              Order Products
            </button>
          </Link>
          <Link href="/Buyer-Panel/Negotiation-Requests">
            <button className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-full hover:bg-amber-600 transition duration-300">
              <FaHandshake />
              Negotiation Requests
            </button>
          </Link>
        </div>
      </div>

      {/* Ordered Products Section */}
      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Your Ordered Products</h2>
        <OrderedProduct />
      </section>
    </div>
  );
};

export default Buyer_Main;
