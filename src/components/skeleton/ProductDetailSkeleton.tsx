import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetailSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md w-[400px]">
      <Skeleton height={192} className="rounded-t-xl" />
      <div className="p-4">
        <Skeleton height={20} width={`60%`} className="mb-2" />
        <Skeleton height={14} width={`40%`} className="mb-2" />
        <Skeleton height={14} width={`100%`} className="mb-3" />
        <Skeleton height={40} width={`100%`} />
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
