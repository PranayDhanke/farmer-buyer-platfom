import Image from "next/image";
import React, { useEffect, useState } from "react";
import imaes from "@/../public/images/image.png";
import { supabase } from "@/app/lib/superbase/supabaseClient";

const OrderedProduct = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [prodData, setProdData] = useState<any[]>([]);
  const [confirmIds, setConfirmIds] = useState<Record<string, string>>({});

  useEffect(() => {
    const getData = async () => {
      const {
        data: { user: supabaseUser },
      } = await supabase.auth.getUser();

      if (supabaseUser?.id) {
        const buyerId = supabaseUser.id;
        const res = await fetch("/api/Product/get", {
          method: "POST",
          body: JSON.stringify({ buyerId }),
        });
        if (res.ok) {
          const data = await res.json();
          setProdData(data.products);
        }
      }
    };
    getData();
  }, []);

  const filteredProducts =
    prodData?.filter((product) => {
      if (!product) return false;

      const name = product?.prod_name || "";
      const desc = product.description || "";

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
    }) || [];

  const handleConfirm = (productId: string) => {
    const confirmId = confirmIds[productId];
    if (!confirmId) {
      alert("Please enter a Conform ID");
      return;
    }

    // Submit the confirmId as needed (e.g., send to backend)
    console.log(`Confirmed ID for ${productId}:`, confirmId);
    alert(`Order Confirmed for product ID: ${productId} with ID: ${confirmId}`);
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        My Purchased Products
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4"
        >
          <option value="All">All Categories</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Grains">Grains</option>
          <option value="Dairy">Dairy</option>
        </select>

        <select
          value={selectedPriceRange}
          onChange={(e) => setSelectedPriceRange(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4"
        >
          <option value="All">All Prices</option>
          <option value="Under 100">Under ₹100</option>
          <option value="100-200">₹100 - ₹200</option>
          <option value="Above 200">Above ₹200</option>
        </select>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center text-lg">
            No products found.
          </p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition duration-300"
            >
              <Image
                src={product.image || imaes}
                alt={product.prod_name}
                width={150}
                height={150}
                className="rounded-xl object-cover shadow-sm border"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mt-4">
                {product.prod_name}
              </h3>
              <p className="text-gray-500 text-center text-sm mt-1">
                {product.description}
              </p>

              <div className="mt-4 w-full text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Price:</span> ₹{product.price}
                </p>
                <p>
                  <span className="font-medium">Quantity:</span>{" "}
                  {product.quantity}
                </p>
                <p>
                  <span className="font-medium">Order Type:</span>{" "}
                  {product.TransMode}
                </p>
                <p>
                  <span className="font-medium">Ordered At:</span>{" "}
                  {new Date(product.createdAt?.seconds * 1000).toLocaleString()}
                </p>
              </div>

              {/* Confirm ID Input */}
              <div className="mt-4 w-full">
                <input
                  type="text"
                  placeholder="Enter Conform ID"
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={confirmIds[product.id] || ""}
                  onChange={(e) =>
                    setConfirmIds({
                      ...confirmIds,
                      [product.id]: e.target.value,
                    })
                  }
                />
                <button
                  onClick={() => handleConfirm(product.id)}
                  className="mt-2 bg-yellow-600 text-white w-full py-2 rounded-lg hover:bg-yellow-700 transition"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderedProduct;
