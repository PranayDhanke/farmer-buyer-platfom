import React from 'react';
import Farmer_Product from './Farmer_Product';
import Link from 'next/link';

const Farmer_Main = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with buttons */}
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-4">
          {/* Add Product button */}
          <Link href="/Farmer-Panel/Product/Add">
            <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-200">
              Add Product
            </button>
          </Link>

          {/* My Profile button */}
          <Link href="/Farmer-Panel/Profile">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200">
              My Profile
            </button>
          </Link>
        </div>
      </div>

      {/* Farmer Products Section */}
      <Farmer_Product />
    </div>
  );
}

export default Farmer_Main;
