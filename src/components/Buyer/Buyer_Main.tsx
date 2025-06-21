"use client";

import Link from "next/link";
import OrderedProduct from "./OrderedProduct";
import { FaUserCircle, FaStore, FaHandshake, FaBoxOpen } from "react-icons/fa";

const Buyer_Main = () => {
  return (
    <div className="px-4 sm:px-6 md:px-10 py-8 bg-gray-50 min-h-screen">
      {/* Top Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-10">
        <h1 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
          👋 Welcome, Buyer
        </h1>

        <div className="flex flex-wrap justify-center sm:justify-end gap-3">
          <Link href="/Buyer-Panel/Profile">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition duration-300 shadow-sm">
              <FaUserCircle className="text-white" />
              <span>Profile</span>
            </button>
          </Link>

          <Link href="/Products">
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition duration-300 shadow-sm">
              <FaStore className="text-white" />
              <span>Order Products</span>
            </button>
          </Link>

          <Link href="/Buyer-Panel/Negotiation-Requests">
            <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition duration-300 shadow-sm">
              <FaHandshake className="text-white" />
              <span>Negotiation</span>
            </button>
          </Link>

          <Link href="/Buyer-Panel/Order-Requests">
            <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition duration-300 shadow-sm">
              <FaBoxOpen className="text-white" />
              <span>Order Requests</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Ordered Products Section */}
      <section className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
          🛒 Your Ordered Products
        </h2>
        <OrderedProduct />
      </section>
    </div>
  );
};

export default Buyer_Main;
