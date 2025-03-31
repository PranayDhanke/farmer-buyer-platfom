import React from "react";
import Link from "next/link";

// Example Product Data (replace with actual data or state)
const products = [
  {
    id: 1,
    name: "Organic Basmati Rice",
    price: "₹1200",
    image: "https://via.placeholder.com/150",
    description: "High-quality organic basmati rice grown with love and care.",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Fresh Mangoes",
    price: "₹700",
    image: "https://via.placeholder.com/150",
    description: "Sweet and juicy fresh mangoes, straight from the farm.",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Organic Wheat Flour",
    price: "₹350",
    image: "https://via.placeholder.com/150",
    description: "Pure organic wheat flour for healthy baking.",
    rating: 4.2,
  },
];

const Buyer_Main = () => {
  return (
    <div className="p-10">
      <div className="flex justify-between mb-8">
        {/* Profile Page Button */}
        <Link href="/Buyer-Panel/Profile">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200">
            View Profile
          </button>
        </Link>

        {/* Optionally, you can also add other actions here */}
      </div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">My Purchased Products</h2>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center space-y-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600">Price: {product.price}</p>
            <p className="text-gray-600">{product.description}</p>

            <div className="flex items-center text-yellow-500 mb-2">
              {[...Array(Math.floor(product.rating))].map((_, index) => (
                <span key={index}>&#9733;</span> // Star character for rating
              ))}
              {product.rating % 1 > 0 && <span>&#9733;</span>} {/* Half Star */}
              <span className="ml-2 text-gray-600">Rating: {product.rating}</span>
            </div>

            <div className="w-full mt-4">
              <Link href={`/Buyer-Panel/Products/Review/${product.id}`}>
                <button className="bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700 transition-colors duration-200 w-full">
                  Write a Review
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buyer_Main;
