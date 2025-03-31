"use client"; 
import React, { useState } from "react"; 
import { FaSearch } from "react-icons/fa"; 
import { IoIosFunnel } from "react-icons/io"; 

import farmers from "../../../public/data/farmer.json"
import Link from "next/link";

const Farmer_List = () => { 
  // State for search input and filters
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedState, setSelectedState] = useState("All"); 
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State for opening/closing filter dropdown

  // Filtering farmers based on search query and state
  const filteredFarmers = farmers.filter((farmer) => {
    const isStateMatch = selectedState === "All" || farmer.address.state === selectedState;
    const isSearchMatch = farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          farmer.mainCrop.toLowerCase().includes(searchQuery.toLowerCase());
    return isStateMatch && isSearchMatch;
  });

  return (
    <div className="font-sans bg-gray-50">
      <main className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          {/* Search and Filter Section */}
          <div className="flex justify-between items-center mb-8">
            {/* Search Bar */}
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search Farmers"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute top-3 right-3 text-gray-500" size={20} />
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)} // Toggle filter dropdown visibility
                className="bg-green-600 text-white py-2 px-4 rounded-md flex items-center space-x-2"
              >
                <IoIosFunnel size={20} />
                <span>Filters</span>
              </button>

              {/* Filter Dropdown */}
              {isFilterOpen && (
                <div className="absolute bg-white shadow-lg rounded-lg p-4 mt-2 w-48 right-0 z-10">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">State</label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="All">All States</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Farmer Listing */}
          {filteredFarmers.length === 0 ? (
            <div className="text-center text-xl font-semibold text-gray-600">
              No Farmers Found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredFarmers.map((farmer) => (
                <div
                  key={farmer.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105"
                >
                  <div className="relative">
                    <img
                      src={farmer.image}
                      alt={farmer.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-lg">{farmer.name}</h3>
                      <span className="text-yellow-500 font-bold">
                        {farmer.rating} ★
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{farmer.mainCrop}</p>
                    <div className="text-gray-600 text-sm mb-5">
                      <span>{farmer.address.taluka}, </span>
                      <span>{farmer.address.district}, </span>
                      <span>{farmer.address.city}, </span>
                      <span>{farmer.address.state}</span>
                    </div>
                    <Link href={`/farmers/${farmer.name}`} className="w-full p-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors duration-200">
                      View Detail
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Farmer_List;
