// app/components/RealPriceSkeleton.tsx
"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function RealPriceSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-green-50 p-5 rounded-lg shadow-sm">
          <div className="mb-3">
            <Skeleton width={190} height={20}  />
          </div>
          <div className="mb-3 ">
            <Skeleton width={90} height={20} />
          </div>
          <Skeleton  height={20} width={180} />
        </div>
      ))}
    </div>
  );
}
