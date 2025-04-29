import FarmerPanel from "@/components/Farmer/FarmerPanel";
import Header from "@/components/Home/Header";
import React from "react";

const page = () => {
  return (
    <div>
      <Header />
      <FarmerPanel isEdit={false} id={""} />
    </div>
  );
};

export default page;
