// components/HomeProductSkeleton.tsx
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomeProductSkeleton = () => {
  return (
    <div className="container mx-auto px-4 md:px-6">
    
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <Skeleton height={200}
                  width={400}
                />

                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Skeleton width={120} height={24} />
                    <Skeleton width={60} height={24} />
                  </div>

                  <Skeleton width="100%" height={20} className="mb-2" />
                  <Skeleton width="90%" height={20} className="mb-3" />

                  <div className="flex items-center mb-4">
                    <Skeleton circle width={35} height={35} />
                    <Skeleton width={100} height={20} className="ml-3" />
                  </div>

                  <Skeleton width="100%" height={36} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeProductSkeleton;
