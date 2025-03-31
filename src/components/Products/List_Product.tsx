import React from "react";

const List_Product = () => {
  return (
    <div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Fresh from farms across the country, directly to your table
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Featured Product Card 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1566842600175-97dca3c1e8cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3JnYW5pYyUyMGZydWl0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                  alt="Organic Apples"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                  Organic
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">Organic Apples</h3>
                  <span className="text-green-600 font-bold">₹120/kg</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Fresh organic apples from Himachal farms
                </p>
                <div className="flex items-center mb-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Farmer"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-700">Farmer Mahesh</span>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors duration-200">
                  Add to Cart
                </button>
              </div>
            </div>
            {/* Featured Product Card 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt="Basmati Rice"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                  Best Seller
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">Basmati Rice</h3>
                  <span className="text-green-600 font-bold">₹90/kg</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Premium quality basmati rice from Punjab
                </p>
                <div className="flex items-center mb-3">
                  <img
                    src="https://randomuser.me/api/portraits/women/65.jpg"
                    alt="Farmer"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-700">Farmer Priya</span>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors duration-200">
                  Add to Cart
                </button>
              </div>
            </div>
            {/* Featured Product Card 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1594535075770-cd9c99bb94c1?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjY0OXwwfDF8c2VhcmNofDF8fGhvc2V8ZW58MHx8fHx8fA%3D%3D&ixlib=rb-1.2.1&q=80&w=400"
                  alt="Fresh Tomatoes"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">Fresh Tomatoes</h3>
                  <span className="text-green-600 font-bold">₹40/kg</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Fresh tomatoes from local farms
                </p>
                <div className="flex items-center mb-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/36.jpg"
                    alt="Farmer"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-700">Farmer Arvind</span>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors duration-200">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default List_Product;
