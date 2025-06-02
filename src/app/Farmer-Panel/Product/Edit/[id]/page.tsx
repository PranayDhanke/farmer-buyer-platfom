"use client";

import Farmer_Prod_AddEdit from "@/components/Farmer/Farmer_Prod_AddEdit";

import { useParams } from "next/navigation";

const Page = () => {
  const param = useParams<{ id: string }>();
  const { id } = param;

  return (
    <div>
      <Farmer_Prod_AddEdit isEdit={true} id={id} />
    </div>
  );
};

export default Page;
