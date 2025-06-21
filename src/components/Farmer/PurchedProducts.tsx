"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "@/app/lib/Firebase/Firebase";
import { VscLoading } from "react-icons/vsc";
import DisplaySold from "./extra/DisplaySold";


const PurchasedProducts = () => {
  interface Product {
    id: string;
    prodID: string;
    prod_name: string;
    price: number;
    name: string;
    category: string;
    description: string;
    image: string;
    quantity: number;
    createdAt: Date;
    TransMode: string;
    isDelivered: boolean;
    confirmId: string;
    hasConformed: boolean;
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [prodData, setProdData] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
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
            setLoading(false);
          }
        }
      });
    };
    getData();
  }, []);

  const filteredProducts = prodData.filter((product) => {
    const isCategoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;

    const isPriceMatch =
      selectedPriceRange === "All" ||
      (selectedPriceRange === "Under 100" && product.price < 100) ||
      (selectedPriceRange === "100-200" &&
        product.price >= 100 &&
        product.price <= 200) ||
      (selectedPriceRange === "Above 200" && product.price > 200);

    const setFilter =
      product.TransMode === "buyerTrans" ||
      (product.TransMode !== "BuyerTrans" && product.hasConformed === true);

    const isSearchMatch =
      product.prod_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return isCategoryMatch && isPriceMatch && isSearchMatch && setFilter;
  });


  return (
    <div className="p-4 md:p-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        My Sold Products
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
      {loading ? (
        <>
          <VscLoading className="text-center animate-spin text-2xl w-full" />
        </>
      ) : (
        <div className="grid bg-gray-50 rounded-2xl p-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center text-lg">
              No products found.
            </p>
          ) : (
           <>
              {filteredProducts.map((product) => (
                <DisplaySold
                  key={`${product.id}-${product.prodID}+${product.confirmId}`}
                  product={product}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PurchasedProducts;
