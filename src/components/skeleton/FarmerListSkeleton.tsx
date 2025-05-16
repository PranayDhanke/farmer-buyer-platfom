
const FarmerCardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
    <div className="relative w-full h-48 bg-gray-300" />
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-center mb-2">
        <div className="h-6 w-40 bg-gray-300 rounded" />
        <div className="h-6 w-12 bg-yellow-300 rounded" />
      </div>
      <div className="h-4 w-32 bg-gray-300 rounded" />
      <div className="flex space-x-1 text-gray-600 text-sm mb-5">
        <div className="h-4 w-10 bg-gray-300 rounded" />
        <div className="h-4 w-10 bg-gray-300 rounded" />
        <div className="h-4 w-10 bg-gray-300 rounded" />
        <div className="h-4 w-10 bg-gray-300 rounded" />
      </div>
      <div className="h-10 bg-green-600 rounded animate-pulse" />
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
