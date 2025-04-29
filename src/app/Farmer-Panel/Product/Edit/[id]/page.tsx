import FarmerPanel from "@/components/Farmer/FarmerPanel";
import Header from "@/components/Home/Header";
import React from "react";

const page = ({ params: id }: { params: { id: any } }) => {
  return (
    <div>
      <Header />
      <FarmerPanel isEdit={true} id={id} />
    </div>
  );
};

export default page;
