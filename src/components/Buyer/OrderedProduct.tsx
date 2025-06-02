import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import imaes from "@/../public/images/image.png";

const OrderedProduct = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");

  const [products ] = useState([
    {
      id: "",
      name: "",
      price: 0,
      image: "",
      description: "",
      category: "",
      rating: 0,
    }
    
  ]);

  const filteredProducts = products.filter((product) => {
    const name = product?.name || "";
    const desc = product?.description || "";

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
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase());

    return isCategoryMatch && isPriceMatch && isSearchMatch;
  });

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">
        My Purchased Products
      </h2>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4"
        >
          <option value="All">All Categories</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Grains">Grains</option>
          <option value="Dairy">Dairy</option>
        </select>

        <select
          value={selectedPriceRange}
          onChange={(e) => setSelectedPriceRange(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4"
        >
          <option value="All">All Prices</option>
          <option value="Under 100">Under ₹100</option>
          <option value="100-200">₹100 - ₹200</option>
          <option value="Above 200">Above ₹200</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500 col-span-3">No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center space-y-4"
            >
              <Image
                src={product.image || imaes}
                alt={product.name}
                width={128}
                height={128}
                className="object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600">Price: ₹{product.price}</p>
              <p className="text-gray-600">{product.description}</p>

              <div className="flex items-center text-yellow-500 mb-2">
                {[...Array(Math.floor(product.rating))].map((_, index) => (
                  <span key={index}>&#9733;</span>
                ))}
                {product.rating % 1 > 0 && <span>&#9733;</span>}
                <span className="ml-2 text-gray-600">
                  Rating: {product.rating}
                </span>
              </div>

              <div className="w-full mt-4">
                <Link href={`/Buyer-Panel/Products/Review/${product.id}`}>
                  <button className="bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700 transition-colors duration-200 w-full">
                    Write a Review
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderedProduct;
