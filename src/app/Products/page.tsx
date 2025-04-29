"use client";
import Buyer_Cart from "@/components/Buyer/Buyer_Cart";
import Header from "@/components/Home/Header";
import ProductPage from "@/components/Products/ProductPage";
import { useState } from "react";

const App = () => {
  return (
    <div>
      <Header />
      <ProductPage />
    </div>
  );
};

export default App;
