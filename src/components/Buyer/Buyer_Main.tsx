"use client";

import Link from "next/link";

import OrderedProduct from "./OrderedProduct";

// Example Product Data (replace with actual data or state)

const Buyer_Main = () => {
  return (
    <div className="p-10">
      <div className="flex justify-between mb-8">
        {/* Profile Page Button */}
        <div className="flex items-center gap-5">
          <Link href="/Buyer-Panel/Profile">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200">
              View Profile
            </button>
          </Link>
          <Link href="/Products">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200">
              Order Products
            </button>
          </Link>
        </div>
        {/* Optionally, you can also add other actions here */}
      </div>
      <OrderedProduct />
    </div>
  );
};

export default Buyer_Main;
