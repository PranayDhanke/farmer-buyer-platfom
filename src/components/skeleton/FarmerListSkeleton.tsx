// components/FarmerListSkeleton.jsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FarmerCardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md">
    <div className="relative w-full h-48">
      <Skeleton height="100%" />
    </div>
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-center mb-2">
        <Skeleton width={160} height={24} />
        <Skeleton width={48} height={24} />
      </div>
      <Skeleton width={128} height={16} />
      <div className="flex space-x-2 text-sm mb-5">
        <Skeleton width={40} height={16} />
        <Skeleton width={40} height={16} />
        <Skeleton width={40} height={16} />
        <Skeleton width={40} height={16} />
      </div>
      <div className="flex gap-3">
        <Skeleton height={40} width={120} borderRadius={8} />
        <Skeleton height={40} width={120} borderRadius={8} />
      </div>
    </div>
  </div>
);

const FarmerListSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <FarmerCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export default FarmerListSkeleton;
