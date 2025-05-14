
"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FarmerProductSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl overflow-hidden shadow-md p-4"
        >
          <Skeleton height={200} className="rounded-lg" />
          <div className="mt-4 space-y-2">
            <Skeleton width="70%" height={20} />
            <Skeleton width="50%" height={20} />
            <Skeleton count={2} height={12} />
            <div className="flex gap-4 mt-4">
              <Skeleton width={80} height={36} />
              <Skeleton width={80} height={36} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FarmerProductSkeleton;
