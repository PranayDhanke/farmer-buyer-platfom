"use client";
import Image from "next/image";
import placeholderImg from "@/../public/images/image.png";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import HomeProductSkeleton from "../skeleton/HomeProductSkeleton";
import { useCart } from "../extra/CartContext";

const List_Product = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([
    {
      id: "",
      prod_name: "",
      price: 0,
      description: "",
      name: "",
      imageUrl: "",
      profilePhoto: "",
    },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDocs = async () => {
      try {
        const res = await fetch("/api/Farmer/Product/home/get", {
          method: "GET",
        });

        if (res.ok) {
          const data = await res.json();

          const productData = data.products;

          setProducts(productData);

          setLoading(false);
        }
      } catch {
        toast.error("Failed To load Products");
      }
    };

    getDocs();
  }, []);

  const addCartItem = (
    id: string,
    name: string,
    price: number,
    quantity: number,
    imageUrl: string
  ) => {
    addToCart({
      id,
      name,
      price,
      quantity,
      image: imageUrl,
    });
  };

  return (
    <div className="py-12 bg-gray-50">
      <ToastContainer />
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fresh from farms across the country, directly to your table
          </p>
        </div>
        {loading ? (
          <HomeProductSkeleton />
        ) : (
          <div className="flex justify-center">
            <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-15 max-w-6xl">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  <div className="relative">
                    <Image
                      src={product.imageUrl || placeholderImg}
                      alt={product.name}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover"
                    />
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
                    <div className="flex items-center mb-4">
                      <Image
                        src={product.profilePhoto || placeholderImg}
                        alt="Farmer"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="text-sm text-gray-700">
                        {product.name}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        addCartItem(
                          product.id,
                          product.prod_name,
                          product.price,
                          1,
                          product.imageUrl
                        );
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-colors duration-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default List_Product;
