import Farmer_Detail from "@/components/Farmer/Farmer_Detail";
import Header from "@/components/Home/Header";
import React from "react";

const page = ({
  params: { name },
}: {
  params: {
    name: string;
  };
}) => {
  return (
    <div>
      <Header />
      <Farmer_Detail farmer_name={name} />
    </div>
  );
};

export default page;
