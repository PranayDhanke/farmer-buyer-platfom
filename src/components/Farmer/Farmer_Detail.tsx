"use client";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosFunnel } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import farmerData from "../../../public/data/farmer.json";
import products from "../../../public/data/product.json";
import Image from "next/image";

const Farmer_Detail = ({ farmer_name }: { farmer_name: string }) => {
  interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    farmer: string;
    image: string;
    category: string;
    rating: number;
  }

  interface Address {
    taluka: string;
    district: string;
    city: string;
    state: string;
  }

  interface Farmer {
    id: number;
    name: string;
    image: string | null;
    rating: number;
    address: Address;
    mainCrop: string;
    farmType: string;
  }

  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cart, setCart] = useState<Product[]>([]); // Cart state

  const decoded_name = decodeURIComponent(farmer_name);

  // Filter the farmer data based on farmer name
  useEffect(() => {
    const filteredFarmer = farmerData.filter((uname) =>
      uname.name.toLowerCase().includes(decoded_name.toLowerCase())
    );

    if (filteredFarmer.length > 0) {
      setSelectedFarmer(filteredFarmer[0]);
    } else {
      setSelectedFarmer(null); // No farmer found
    }
  }, [farmer_name, decoded_name]);

  const filteredProducts = products.filter(
    (product) => {
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

      const isFarmers = product.farmer
        .toLowerCase()
        .includes(decoded_name.toLowerCase());

      return isCategoryMatch && isPriceMatch && isSearchMatch && isFarmers;
    },
    [decoded_name]
  );

  // Add product to cart
  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  // Buy all products in the cart (clears the cart)

  // If no farmer is found, show a message
  if (!selectedFarmer) {
    return (
      <div className="font-sans bg-gray-50">
        <main className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center text-xl font-semibold text-gray-600">
              Farmer not found
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-50">
      <main className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          {/* Farmer Details */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md p-6 mb-8">
            <div className="flex items-center mb-6">
              <Image
                src={selectedFarmer.image}
                alt={selectedFarmer.name}
                width={96} // 24 * 4 = 96px
                height={96}
                className="rounded-full mr-6"
                style={{ objectFit: "cover" }}
              />
              <div>
                <h2 className="font-bold text-2xl">{selectedFarmer.name}</h2>
                <div className="flex items-center text-yellow-500 mb-2">
                  {[...Array(Math.floor(selectedFarmer.rating))].map(
                    (_, index) => (
                      <FaStar key={index} />
                    )
                  )}
                  {selectedFarmer.rating % 1 > 0 && (
                    <FaStar className="text-gray-400" />
                  )}
                  <span className="ml-2 text-gray-600">
                    Rating: {selectedFarmer.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Address and Farming Details */}
            <div className="mb-4">
              <h3 className="font-bold text-lg text-gray-700">Address</h3>
              <p className="text-gray-600 text-sm">
                {selectedFarmer.address.taluka},{" "}
                {selectedFarmer.address.district}, {selectedFarmer.address.city}
                , {selectedFarmer.address.state}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-lg text-gray-700">
                Farming Details
              </h3>
              <p className="text-gray-600 text-sm">
                Main Crop: {selectedFarmer.mainCrop}
              </p>
              <p className="text-gray-600 text-sm">
                Farm Type : {selectedFarmer.farmType}
              </p>
              <p className="text-gray-600 text-sm">
                Farmer Rating: {selectedFarmer.rating}
              </p>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors duration-200">
              Contact Farmer
            </button>
          </div>

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
                      width={400}
                      height={192} // roughly matches h-48 (12rem = 192px)
                      className="object-cover w-full"
                      priority
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
                    <div className="flex items-center gap-4">
                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="p-2 px-4 bg-blue-600 text-white rounded-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
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

export default Farmer_Detail;
