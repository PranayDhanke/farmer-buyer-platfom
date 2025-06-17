"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import HomeProductSkeleton from "../skeleton/HomeProductSkeleton";
import ProductDisplay from "../extra/ProductDisplay";

const List_Product = () => {
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
      quantity: 0,
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

  return (
    <div>
      {loading ? (
        <HomeProductSkeleton />
      ) : (
        <ProductDisplay item={products} displayFilter={false} />
      )}
    </div>
  );
};

export default List_Product;
