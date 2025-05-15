'use client';

import Farmer_Prod_AddEdit from "@/components/Farmer/Farmer_Prod_AddEdit";
import Header from "@/components/Home/Header";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const param = useParams<{ id: string }>();
  const { id } = param;

  return (
    <div>
      <Header />
      <Farmer_Prod_AddEdit isEdit={true} id={id} />
    </div>
  );
};

export default Page;
