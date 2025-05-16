import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FarmerDetailListSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex items-center mb-6">
        <Skeleton circle width={70} height={70} className="mr-4" />
        <div className="flex-1">
          <Skeleton height={20} width={150} className="mb-2" />
          <Skeleton height={14} width={100} />
        </div>
      </div>

      <div className="mb-4">
        <Skeleton height={16} width={100} className="mb-2" />
        <Skeleton height={14} width={`80%`} />
      </div>

      <div className="mb-4">
        <Skeleton height={16} width={130} className="mb-2" />
        <Skeleton height={14} width={`60%`} className="mb-1" />
        <Skeleton height={14} width={`60%`} className="mb-1" />
        <Skeleton height={14} width={`60%`} />
      </div>

      <Skeleton height={40} width={`100%`} />
    </div>
  );
};

export default FarmerDetailListSkeleton;
