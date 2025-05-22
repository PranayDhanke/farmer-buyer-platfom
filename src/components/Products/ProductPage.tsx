"use client";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosFunnel } from "react-icons/io";
import lims from "@/../public/images/image.png";
import bgims from "@/../public/images/dan-meyers-0AgtPoAARtE-unsplash.jpg";
import Image from "next/image";
import FarmerListSkeleton from "../skeleton/FarmerListSkeleton";
import { BiCartAdd } from "react-icons/bi";
import { LuHandshake } from "react-icons/lu";
import Negotiate from "../Farmer/extra/Negotiate";
import { CartProvider, useCart } from "../extra/CartContext";

const ProductPage = () => {
  const {  addToCart } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [isNegotiateOpen, setIsNegotiateOpen] = useState(false);
  const [loading, setloading] = useState(true);
  const [products, setProducts] = useState([
    {
      name: "",
      id: "",
      prod_name: "",
      price: 0,
      category: "",
      description: "",
      imageUrl: "",
      profilePhoto: "",
    },
  ]);

  useEffect(() => {
    const getDocs = async () => {
      const res = await fetch("/api/Farmer/Product/list", {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        const prodData = await data.products;
        setProducts(prodData);
        setloading(false);
      }
    };
    getDocs();
  }, []);

  const addCartProd = (
    id: string,
    name: string,
    price: number,
    quantity: number,
    image: string
  ) => {
    addToCart({
      id,
      name,
      price,
      quantity,
      image,
    });
  
  };

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
      product.prod_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return isCategoryMatch && isPriceMatch && isSearchMatch;
  });

  const [id, setId] = useState("");
  const setNegotiate = (id: string) => {
    setIsNegotiateOpen(true);
    setId(id);
  };

  return (
    <CartProvider>
      <div className="font-sans bg-gray-50">
        <main className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            {/* Search and Filter Section */}
            <div className="flex justify-between items-center mb-8">
              <div className="relative w-max md:w-1/3">
                <input
                  type="text"
                  placeholder="Search Products"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch
                  className="absolute top-4 right-3 text-gray-500"
                  size={20}
                />
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="bg-green-600 text-white py-2 px-4 rounded-md flex items-center space-x-2"
                >
                  <IoIosFunnel size={20} />
                  <span className="hidden md:block">Filters</span>
                </button>

                {isFilterOpen && (
                  <div className="absolute bg-white shadow-lg rounded-lg p-4 mt-2 w-48 right-0 z-10">
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Category
                      </label>
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
              <div>
                {loading ? (
                  <>
                    <FarmerListSkeleton />
                  </>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105"
                      >
                        <div className="relative">
                          <Image
                            src={product.imageUrl || bgims}
                            alt={product.prod_name}
                            width={500} // or any estimated width
                            height={192} // height equivalent to h-48 (48 × 4 = 192px)
                            className="object-cover"
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
                          <p className="text-gray-600 text-sm mb-3">
                            {product.description}
                          </p>
                          <div className="flex items-center mb-3">
                            <div className="relative w-8 h-8 mr-2">
                              <Image
                                src={product.profilePhoto || lims}
                                alt="Farmer"
                                fill
                                sizes="200px"
                                className="rounded-full object-cover"
                              />
                            </div>
                            <span className="text-sm text-gray-700">
                              {product.name}
                            </span>
                          </div>
                          <div className="flex items-center  gap-5">
                            <button
                              onClick={() =>
                                addCartProd(
                                  product.id,
                                  product.prod_name,
                                  product.price,
                                  1,
                                  product.imageUrl
                                )
                              }
                              className="flex items-center  justify-center gap-1 w-fit px-3 cursor-pointer bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors duration-200"
                            >
                              <BiCartAdd size={20} />
                              Add to Cart
                            </button>
                            <button
                              onClick={() => setNegotiate(product.id)}
                              className=" flex items-center  justify-center gap-1 w-fit px-3 cursor-pointer bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-colors duration-200"
                            >
                              <LuHandshake size={17} />
                              Negotiate
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
        <div>
          {isNegotiateOpen && (
            <>
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-opacity-50 z-40"
                onClick={() => setIsNegotiateOpen(false)}
              />

              {/* Side Panel */}
              <div className="fixed top-[20%] right-[40%] h-96 w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 rounded-2xl ">
                <div className="p-4 flex justify-between items-center border-b">
                  <h2 className="text-xl font-bold">Negotiate</h2>
                  <button
                    onClick={() => setIsNegotiateOpen(false)}
                    className="text-gray-600 hover:text-red-600 text-xl"
                  >
                    &times;
                  </button>
                </div>

                <div className="p-4">
                  {/* Pass product info to Negotiate component */}
                  <Negotiate id={id} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </CartProvider>
  );
};

export default ProductPage;
