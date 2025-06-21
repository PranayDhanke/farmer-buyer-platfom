import React from "react";
import Farmer_Product from "./Farmer_Product";
import Link from "next/link";
import { FaClipboardList, FaHandshake, FaStore, FaUserCircle } from "react-icons/fa";
import { LuPackageCheck } from "react-icons/lu";

const Farmer_Main = () => {
  return (
    <div className="px-4 sm:px-6 md:px-10 py-8 bg-gray-50 min-h-screen">
      {/* Top Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-10">
        <h1 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
          🌾 Welcome, Farmer
        </h1>

        <div className="flex flex-wrap justify-center sm:justify-end gap-3">
          <Link href="/Farmer-Panel/Profile">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition duration-300 shadow-sm">
              <FaUserCircle />
              <span>Profile</span>
            </button>
          </Link>

          <Link href="/Farmer-Panel/Product/Add">
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition duration-300 shadow-sm">
              <FaStore />
              <span>Add Products</span>
            </button>
          </Link>

          <Link href="/Farmer-Panel/Negotiation-Requests">
            <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition duration-300 shadow-sm">
              <FaHandshake />
              <span>Negotiation</span>
            </button>
          </Link>

          <Link href="/Farmer-Panel/sold-products">
            <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition duration-300 shadow-sm">
              <LuPackageCheck />
              <span>Sold Products</span>
            </button>
          </Link>

          <Link href="/Farmer-Panel/order-requests">
            <button className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full transition duration-300 shadow-sm">
              <FaClipboardList />
              <span>Order Requests</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Farmer Products Section */}
      <section className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
          📦 Your Products
        </h2>
        <Farmer_Product />
      </section>
    </div>
  );
};

export default Farmer_Main;
