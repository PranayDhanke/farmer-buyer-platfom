// app/components/RealPriceSkeleton.tsx
"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function RealPriceSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="bg-green-50 p-5 rounded-lg shadow-sm">
          <div className="flex items-center mb-3 gap-2">
            <Skeleton circle width={24} height={24} />
            <Skeleton height={20} width="70%" />
          </div>
          <div className="flex items-center mb-2 gap-2">
            <Skeleton circle width={16} height={16} />
            <Skeleton height={18} width="50%" />
          </div>
          <Skeleton height={14} width="60%" />
        </div>
      ))}
    </div>
  );
}
