
'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function FarmerProfileSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-10">
      {/* Left Profile Card */}
      <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center space-y-4">
        <Skeleton circle width={96} height={96} />
        <Skeleton width={120} height={28} />
        <div className="flex items-center space-x-1">
          <Skeleton width={80} height={20} />
        </div>
        <Skeleton width={140} height={20} />
        <Skeleton width={140} height={20} />
        <div className="flex space-x-4 mt-4 w-full justify-center">
          <Skeleton width={100} height={36} borderRadius={9999} />
          <Skeleton width={100} height={36} borderRadius={9999} />
        </div>
        <Skeleton width={160} height={36} borderRadius={9999} />
      </div>

      {/* Right Side Content */}
      <div className="col-span-2 grid grid-rows-3 gap-6">
        {/* Farmer Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Skeleton width={160} height={24} className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton width={`80%`} height={18} />
              <Skeleton width={`80%`} height={18} />
              <Skeleton width={`80%`} height={18} />
            </div>
            <div className="space-y-2">
              <Skeleton width={`80%`} height={18} />
              <Skeleton width={`80%`} height={18} />
              <Skeleton width={`80%`} height={18} />
            </div>
          </div>
        </div>

        {/* Address Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Skeleton width={120} height={24} className="mb-4" />
          <Skeleton width={`60%`} height={18} />
        </div>
      </div>
    </div>
  );
}
