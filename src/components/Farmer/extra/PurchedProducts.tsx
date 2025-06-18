"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import imaes from "@/../public/images/image.png";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "@/app/lib/Firebase/Firebase";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";

const PurchasedProducts = () => {
  interface Product {
    id: string;
    prod_name: string;
    price: number;
    name: string;
    category: string;
    description: string;
    image: string;
    quantity: number;
    createdAt: Date;
    TransMode: string;
    conformId: string; // renamed for correctness
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [prodData, setProdData] = useState<Product[]>([]);
  const [confirmIds, setConfirmIds] = useState<Record<string, string>>({});

  useEffect(() => {
    const getData = async () => {
      onAuthStateChanged(fireAuth, async (user) => {
        if (user?.uid) {
          const farmerId = user.uid;
          const res = await fetch("/api/Product/getFarmer", {
            method: "POST",
            body: JSON.stringify({ farmerId }),
          });

          if (res.ok) {
            const data = await res.json();
            setProdData(data.products);
          }
        }
      });
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
      toast.error("Please enter a Confirm ID");
      return;
    }

    // submit logic here
    toast.success(`Order Confirmed for product ID: ${productId}`);
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
              key={product.id + product.conformId}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300 flex flex-col items-center"
            >
              <Image
                src={product.image || imaes}
                alt={product.prod_name}
                width={160}
                height={160}
                className="rounded-xl object-cover border shadow"
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                {product.prod_name}
              </h3>
              <p className="text-gray-500 text-center text-sm mt-1">
                {product.description}
              </p>

              <div className="mt-4 w-full text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Farmer:</span> {product.name}
                </p>
                <p>
                  <span className="font-medium">Category:</span>{" "}
                  {product.category}
                </p>
                <p>
                  <span className="font-medium">Price:</span> ₹{product.price}
                </p>
                <p>
                  <span className="font-medium">Quantity:</span>{" "}
                  {product.quantity}
                </p>
                <p>
                  <span className="font-medium">Transport Mode:</span>{" "}
                  {product.TransMode === "buyerTrans"
                    ? "By Buyer"
                    : "By Farmer"}
                </p>
                <p>
                  <span className="font-medium">Ordered At:</span>{" "}
                  {new Date(product.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Confirm Section */}
              {product.TransMode === "buyerTrans" ? (
                <p className="mt-5 flex items-center gap-2 text-sm text-gray-800">
                  <span className="font-medium">Confirm ID:</span>{" "}
                  {product.conformId}
                  <FaCopy
                    onClick={() => {
                      navigator.clipboard.writeText(product.conformId);
                      toast.success("Copied to clipboard");
                    }}
                    className="ml-2 cursor-pointer text-yellow-600 hover:text-yellow-800"
                  />
                </p>
              ) : (
                <div className="mt-4 w-full">
                  <input
                    type="text"
                    placeholder="Enter Confirm ID"
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
                    className={`mt-2 w-full py-2 rounded-lg transition 
                         bg-yellow-600 text-white hover:bg-yellow-700
                       `}
                  >
                    Confirm Order
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PurchasedProducts;
