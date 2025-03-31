import React from "react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

const Farmer_Profile = () => {
  // Example Farmer Data (replace with actual data or state)
  const farmer = {
    name: "Farmer Priya",
    mainCrop: "Basmati Rice",
    rating: 4.5,
    address: {
      state: "Punjab",
      city: "Amritsar",
      district: "Amritsar",
      taluka: "Tarn Taran",
    },
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    farmType: "Organic Farming",
    aadhar: "1234 5678 9101",
    farmName: "Priya Farms",
    phone: "9876543210",
    email: "farmer.priya@example.com",
    profilePhoto: "https://randomuser.me/api/portraits/women/65.jpg", // Example photo URL
    aadharPhoto: "https://randomuser.me/api/portraits/men/65.jpg", // Example photo URL
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-10">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center space-y-4">
        <img
          src={farmer.profilePhoto}
          alt={farmer.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <h2 className="text-2xl font-bold text-gray-800">{farmer.name}</h2>
        
        <div className="flex items-center text-yellow-500 mb-2">
          {[...Array(Math.floor(farmer.rating))].map((_, index) => (
            <FaStar key={index} />
          ))}
          {farmer.rating % 1 > 0 && <FaStar className="text-gray-400" />}
          <span className="ml-2 text-gray-600">Rating: {farmer.rating}</span>
        </div>

        <p className="text-gray-600">Main Crop: {farmer.mainCrop}</p>
        <p className="text-gray-600">Farm Type: {farmer.farmType}</p>

        {/* Action Section (Edit Profile & View Products) */}
        <div className="flex space-x-4 mt-4">
          <Link href="/Farmer-Panel/Profile/Edit">
            <button className="bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700 transition-colors duration-200">
              Edit Profile
            </button>
          </Link>
          <Link href="/Farmer-Panel/">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200">
              My Products
            </button>
          </Link>
        </div>
        <div>
          <button className="bg-cyan-600 rounded-2xl px-6 py-2 text-white hover:bg-cyan-700 transition-colors duration-200">
            My Aadhar download
          </button>
        </div>
      </div>

      {/* Farmer Details Section */}
      <div className="col-span-2 grid grid-rows-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Farmer Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600"><span className="font-semibold">Farm Name:</span> {farmer.farmName}</p>
              <p className="text-gray-600"><span className="font-semibold">Phone:</span> {farmer.phone}</p>
              <p className="text-gray-600"><span className="font-semibold">Email:</span> {farmer.email}</p>
              <p className="text-gray-600"><span className="font-semibold">Aadhar Card No:</span> {farmer.aadhar}</p>
            </div>
            <div>
              <p className="text-gray-600"><span className="font-semibold">Farm Type:</span> {farmer.farmType}</p>
              <p className="text-gray-600"><span className="font-semibold">Main Crop:</span> {farmer.mainCrop}</p>
              <p className="text-gray-600"><span className="font-semibold">Rating:</span> {farmer.rating}</p>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Address</h3>
          <p className="text-gray-600">
            {farmer.address.taluka}, {farmer.address.district}, {farmer.address.city}, {farmer.address.state}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Farmer_Profile;
