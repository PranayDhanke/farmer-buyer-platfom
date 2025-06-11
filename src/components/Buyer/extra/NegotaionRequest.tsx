"use client";

import { useState } from "react";
import Image from "next/image";

// Sample data for negotiation requests
type Request = {
  id: string;
  productName: string;
  productImage: string;
  originalPrice: number;
  negotiatedPrice: number;
  farmerName: string;
  status: "pending" | "accepted" | "declined";
};

const sampleRequests: Request[] = [
  {
    id: "1",
    productName: "Fresh Tomatoes",
    productImage: "/images/tomato.jpg", // make sure this image exists in public/images
    originalPrice: 30,
    negotiatedPrice: 25,
    farmerName: "Farmer Ramesh",
    status: "pending",
  },
  {
    id: "2",
    productName: "Wheat Grains",
    productImage: "/images/wheat.jpg",
    originalPrice: 50,
    negotiatedPrice: 45,
    farmerName: "Farmer Sita",
    status: "pending",
  },
];

const NegotiationRequest = () => {
  const [requests] = useState(sampleRequests);

 
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Negotiation Requests
      </h1>

      <div className="grid gap-6">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-center gap-6"
          >
            {/* Product Image */}
            <div className="w-24 h-24 relative flex-shrink-0">
              <Image
                src={req.productImage}
                alt={req.productName}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>

            {/* Info */}
            <div className="flex-1 w-full">
              <h2 className="text-xl font-semibold text-gray-700">
                {req.productName}
              </h2>
              <p className="text-gray-500">
                Farmer:{" "}
                <span className="font-medium text-gray-800">
                  {req.farmerName}
                </span>
              </p>
              <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
                <p>
                  Original Price:{" "}
                  <span className="text-black font-medium">
                    ₹{req.originalPrice}
                  </span>
                </p>
                <p>
                  Negotiated Price:{" "}
                  <span className="text-black font-medium">
                    ₹{req.negotiatedPrice}
                  </span>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-center gap-2 sm:items-end">
              <p
                className={`font-semibold text-sm px-4 py-2 rounded-md ${
                  req.status === "accepted"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NegotiationRequest;
