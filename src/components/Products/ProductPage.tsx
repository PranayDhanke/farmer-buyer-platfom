"use client";
import { useEffect, useState } from "react";
import ProductDisplay from "../extra/ProductDisplay";
import { VscLoading } from "react-icons/vsc";

const ProductPage = () => {
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
      quantity: 0,
      uid:"",
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

  return (
    <div>
      {loading ? (
        <div>
          <VscLoading className="animate-spin text-2xl text-center w-full mt-5" />
        </div>
      ) : (
        <ProductDisplay item={products} displayFilter={true} />
      )}
    </div>
  );
};

export default ProductPage;
