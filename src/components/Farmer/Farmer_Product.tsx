"use client";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosFunnel } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import Link from "next/link";
import { toast } from "react-toastify";
import FarmerProductSkeleton from "../skeleton/FarmerProductSkeleton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "@/app/lib/Firebase/Firebase";

const Farmer_Product = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setloading] = useState(true);
  const [count, setCount] = useState(1);
  const [isuser, setisUser] = useState(true);
  const [products, setProduct] = useState([
    {
      id: "",
      uid: "",
      prod_name: "",
      category: "",
      price: 0,
      description: "",
      imageUrl: "",
    },
  ]);
  const deleteProduct = async (docId: string) => {
    const response = window.confirm("Are you sure you Want to delete Product");

    if (response) {
      try {
        const deleteRes = await fetch("/api/Farmer/Product/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid: docId }),
        });

        if (deleteRes.ok) {
          toast.success("Product Deleted Successfully");
          router.push("/Farmer-Panel");
        }
      } catch {
        toast.error("Error while Deleting the Product");
      }
    }
  };
  useEffect(() => {
    const verifyAndLoad = async () => {
      try {
        onAuthStateChanged(fireAuth, async (user) => {
          if (user?.uid) {
            setisUser(true);
            const profileRes = await fetch(`/api/Farmer/Product/get`, {
              method: "POST",
              body: JSON.stringify({ id: user.uid }),
            });

            if (profileRes.ok) {
              const productData = await profileRes.json();

              const mainData = productData.products;

              if (mainData) {
                setCount(mainData.length); // set count first
                setProduct(mainData);
                setloading(false);
              } else {
                toast.error("Farmer Products not found.");
              }
            } else {
              toast.error("Failed to load Products.");
            }
          } else {
            router.push("/login/farmer-login");
          }
        });
      } catch {
        toast.error("Something went wrong while loading Product.");
      }
    };

    verifyAndLoad();
  }, [router]);

  const filteredProducts = products.filter((product) => {
    const name = product?.prod_name || "";
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
    <div className="font-sans bg-gray-50">
      {isuser ? (
        <main className="py-10">
          <div className="container mx-auto px-4 md:px-6">
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
                        <option value="Fruits">Fruits</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Grains">Grains</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Herbs">Herbs</option>
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

            {filteredProducts.length === 0 ? (
              <div className="text-center text-xl font-semibold text-gray-600">
                No Products Found
              </div>
            ) : (
              <div>
                {loading ? (
                  <div>
                    <FarmerProductSkeleton count={count} />
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
                            src={product.imageUrl}
                            alt={product.prod_name}
                            width={800} // You can adjust width based on layout needs
                            height={192} // Matches h-48 (12rem = 192px)
                            className="w-full object-cover"
                            sizes="500px"
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
                          <div className="flex items-center gap-4">
                            <Link
                              href={`/Farmer-Panel/Product/Edit/${product.id}`}
                              className="p-2 flex justify-center items-center px-4 rounded-sm bg-green-300 hover:bg-green-500 gap-1 text-white"
                            >
                              <MdEdit />
                              <span>Edit</span>
                            </Link>
                            <Link
                              href=""
                              className="p-2 px-4 flex justify-center items-center rounded-sm bg-red-300 hover:bg-red-500 text-white gap-1"
                            >
                              <MdDelete />
                              <span onClick={() => deleteProduct(product.id)}>
                                Delete
                              </span>
                            </Link>
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
      ) : (
        <div className="mx-auto textce">
          <h1>Login First</h1>
        </div>
      )}
    </div>
  );
};

export default Farmer_Product;
