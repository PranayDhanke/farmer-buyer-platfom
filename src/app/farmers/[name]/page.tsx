'use client';
import Farmer_Detail from "@/components/Farmer/Farmer_Detail";
import Header from "@/components/Home/Header";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const param = useParams<{ name: string }>();

  const { name } = param;
  return (
    <div>
      <Header />
      <Farmer_Detail farmer_name={name} />
    </div>
  );
};

export default Page;
