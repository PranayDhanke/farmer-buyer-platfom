"use client";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosFunnel } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import image from "@/../public/images/image.png";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ProductDetailSkeleton from "../skeleton/ProductDetailSkeleton";
import FarmerDetailListSkeleton from "../skeleton/FarmerDetailListSkeleton";

const Farmer_Detail = () => {
  const pathname = usePathname();
  const [selectedFarmers, setSelectedFarmers] = useState([
    {
      id: "",
      name: "",
      taluka: "",
      district: "",
      city: "",
      state: "",
      profilePhoto: "",
      rating: 0,
      mainCrops: "",
      farmType: "",
    },
  ]);

  const [productList, setProductList] = useState([
    {
      id: "",
      prod_name: "",
      description: "",
      price: 0,
      imageUrl: "",
      category: "",
      rating: 0,
    },
  ]);

  const [famerload, setfarmerLoad] = useState(true);
  const [prodload, setProdLoad] = useState(true);

  useEffect(() => {
    const path = pathname.replace("/farmers/", "");

    const loadData = async () => {
      const profileRes = await fetch("/api/Farmer/profile/get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: path }),
      });

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        const mainData = await profileData.data;
        if (mainData) {
          setSelectedFarmers([mainData]);
          setfarmerLoad(false);
        }
      }

      const prodRes = await fetch(`/api/Farmer/Product/get`, {
        method: "POST",
        body: JSON.stringify({ id: path }),
      });

      if (prodRes.ok) {
        const productData = await prodRes.json();
        const mainData = await productData.products;
        if (mainData) {
          setProductList(mainData);
          setProdLoad(false);
        }
      }
    };

    loadData();
  }, [pathname]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = productList.filter((product) => {
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
      product.prod_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return isCategoryMatch && isPriceMatch && isSearchMatch;
  });


  return (
    <div className="font-sans bg-gray-50">
      <main className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          {selectedFarmers.length === 0 ? (
            <div className="text-center text-xl font-semibold text-gray-600">
              Farmer not found
            </div>
          ) : (
            <div>
              {famerload ? (
                <div>
                  <FarmerDetailListSkeleton />
                </div>
              ) : (
                selectedFarmers.map((selectedFarmer) => (
                  <div
                    key={selectedFarmer.id}
                    className="bg-white rounded-xl overflow-hidden shadow-md p-6 mb-8"
                  >
                    <div className="flex items-center mb-6 ">
                      <div className="relative w-[70px] h-[70px] mr-2 rounded-full ">
                        <Image
                          src={selectedFarmer.profilePhoto || image}
                          alt={selectedFarmer.name}
                          fill
                          priority
                          sizes="800px"
                        />
                      </div>
                      <div>
                        <h2 className="font-bold text-2xl">
                          {selectedFarmer.name}
                        </h2>
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

                    <div className="mb-4">
                      <h3 className="font-bold text-lg text-gray-700">
                        Address
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {selectedFarmer.taluka}, {selectedFarmer.district},{" "}
                        {selectedFarmer.city}, {selectedFarmer.state}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h3 className="font-bold text-lg text-gray-700">
                        Farming Details
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Main Crop: {selectedFarmer.mainCrops}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Farm Type : {selectedFarmer.farmType}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Farmer Rating: {selectedFarmer.rating}
                      </p>
                    </div>

                    <Link
                      href={`/${selectedFarmer.id}`}
                      className="w-full px-5 bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors duration-200"
                    >
                      Contact Farmer
                    </Link>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Search & Filter UI */}
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

          {/* Product List */}
          {filteredProducts.length === 0 ? (
            <div className="text-center text-xl font-semibold text-gray-600">
              No Products Found
            </div>
          ) : (
            <div>
              {prodload ? (
                <div>
                  <ProductDetailSkeleton />
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105"
                    >
                      <div className="relative  w-[400px] h-[192px]">
                        <Image
                          src={product.imageUrl || image}
                          alt={product.prod_name}
                          fill
                          className="object-cover p-3"
                          priority
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-bold text-lg">
                            {product.prod_name}
                          </h3>
                          <span className="text-green-600 font-bold">
                            ₹{product.price}/kg
                          </span>
                        </div>
                        <div className="flex items-center mb-3">
                          <span className="text-sm text-gray-700">
                            Category : {product.category}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          {product.description}
                        </p>
                        <button className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors duration-200">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Farmer_Detail;
