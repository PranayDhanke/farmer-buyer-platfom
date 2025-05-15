"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosFunnel } from "react-icons/io";

import products from "../../../public/data/product.json";
import Image from "next/image";

const ProductPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const isCategoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;
    const isPriceMatch =
      selectedPriceRange === "All" ||
      (selectedPriceRange === "Under 100" && product.price < 100) ||
      (selectedPriceRange === "100-200" &&
        product.price >= 100 &&
        product.price <= 200) ||
      (selectedPriceRange === "Above 200" && product.price > 200);

    const isSearchMatch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return isCategoryMatch && isPriceMatch && isSearchMatch;
  });

  return (
    <div className="font-sans bg-gray-50">
      <main className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          {/* Search and Filter Section */}
          <div className="flex justify-between items-center mb-8">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search Products"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch
                className="absolute top-3 right-3 text-gray-500"
                size={20}
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="bg-green-600 text-white py-2 px-4 rounded-md flex items-center space-x-2"
              >
                <IoIosFunnel size={20} />
                <span>Filters</span>
              </button>

              {isFilterOpen && (
                <div className="absolute bg-white shadow-lg rounded-lg p-4 mt-2 w-48 right-0 z-10">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="All">All Categories</option>
                      <option value="Grains">Grains</option>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Fruits">Fruits</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Price Range
                    </label>
                    <select
                      value={selectedPriceRange}
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="All">All Prices</option>
                      <option value="Under 100">Under ₹100</option>
                      <option value="100-200">₹100 - ₹200</option>
                      <option value="Above 200">Above ₹200</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Listing */}
          {filteredProducts.length === 0 ? (
            <div className="text-center text-xl font-semibold text-gray-600">
              No Products Found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105"
                >
                  <div className="relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={500} // or any estimated width
                      height={192} // height equivalent to h-48 (48 × 4 = 192px)
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Best Seller
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <span className="text-green-600 font-bold">
                        ₹{product.price}/kg
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {product.description}
                    </p>
                    <div className="flex items-center mb-3">
                      <Image
                        src="https://randomuser.me/api/portraits/women/65.jpg"
                        alt="Farmer"
                        width={32}
                        height={32}
                        className="rounded-full mr-2"
                      />
                      <span className="text-sm text-gray-700">
                        {product.farmer}
                      </span>
                    </div>
                    <button className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors duration-200">
                      Add to Cart
                    </button>
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

export default ProductPage;
