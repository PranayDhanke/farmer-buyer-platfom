import Farmer_Prod_AddEdit from "@/components/Farmer/Farmer_Prod_AddEdit";
import Header from "@/components/Home/Header";
import React from "react";

const page = () => {
  return (
    <div>
      <Header />
      <Farmer_Prod_AddEdit isEdit={false} id={""} />
    </div>
  );
};

export default page;
