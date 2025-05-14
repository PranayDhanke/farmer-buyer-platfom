import Farmer_Prod_AddEdit from "@/components/Farmer/Farmer_Prod_AddEdit";
import Header from "@/components/Home/Header";
import React from "react";

const  page = async ({ params}: { params: { id: any } }) => {

  const prd = await params ;

  const docId = await prd.id;
  return (
    <div>
      <Header />
      <Farmer_Prod_AddEdit isEdit={true} id={docId} />
    </div>
  );
};

export default page;
