import Image from "next/image";
import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import imaes from "@/../public/images/image.png";
import { VscLoading } from "react-icons/vsc";
import { MdDone } from "react-icons/md";

interface Product {
  id: string;
  prodID: string;
  prod_name: string;
  price: number;
  name: string;
  category: string;
  description: string;
  image: string;
  quantity: number;
  createdAt: Date;
  TransMode: string;
  isDelivered: boolean;
  confirmId: string;
}

const DisplayOrdered = ({ product }: { product: Product }) => {
  const [confirmIds, setConfirmIds] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [delivered, setDelivered] = useState(product.isDelivered);

  const handleConfirm = async (id: string, productId: string) => {
    const confirmId = confirmIds[productId];
    if (!confirmId) {
      toast.error("Please enter a Confirm ID");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/Product/confirm", {
      method: "POST",
      body: JSON.stringify({ id, productId, confirmId }),
    });

    if (res.ok) {
      toast.success("Order Confirmed");
      setDelivered(true);
      setDone(true);
    } else {
      toast.error("Failed to confirm order");
    }

    setLoading(false);
  };

  return (
    <div
      key={`${product.id}-${product.prodID}-${product.confirmId}`}
      className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md mx-auto hover:shadow-lg transition-all duration-300"
    >
      <div className="flex flex-col items-center">
        <Image
          src={product.image || imaes}
          alt={product.prod_name}
          width={150}
          height={150}
          className="rounded-xl object-cover shadow border"
        />
        <h3 className="text-xl font-semibold text-gray-800 mt-4">
          {product.prod_name}
        </h3>
        <p className="text-sm text-gray-500 text-center mt-1">
          {product.description}
        </p>
      </div>

      <div className="mt-4 text-sm text-gray-700 space-y-1">
        <p><span className="font-medium">Farmer:</span> {product.name}</p>
        <p><span className="font-medium">Category:</span> {product.category}</p>
        <p><span className="font-medium">Price:</span> ₹{product.price}</p>
        <p><span className="font-medium">Quantity:</span> {product.quantity}</p>
        <p><span className="font-medium">Order Type:</span> {product.TransMode === "buyerTrans" ? "By Buyer" : "By Farmer"}</p>
        <p><span className="font-medium">Ordered At:</span> {new Date(product.createdAt).toLocaleString()}</p>
      </div>

      {/* Confirm Section */}
      <div className="mt-6 w-full">
        {delivered ? (
          <div className="text-green-700 text-sm font-medium text-center bg-green-100 px-3 py-2 rounded-lg">
            ✅ Order Received
          </div>
        ) : product.TransMode !== "buyerTrans" ? (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-800 mt-2">
            <span className="font-medium">Confirm ID:</span> {product.confirmId}
            <FaCopy
              onClick={() => {
                navigator.clipboard.writeText(product.confirmId);
                toast.success("Copied to clipboard");
              }}
              className="cursor-pointer text-yellow-600 hover:text-yellow-800"
            />
          </div>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter Confirm ID"
              className="mt-2 border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={confirmIds[product.prodID] || ""}
              onChange={(e) =>
                setConfirmIds({
                  ...confirmIds,
                  [product.prodID]: e.target.value,
                })
              }
            />
            <button
              onClick={() => handleConfirm(product.id, product.prodID)}
              className="mt-3 w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition flex items-center justify-center"
            >
              {loading ? (
                <VscLoading className="animate-spin text-xl" />
              ) : done ? (
                <MdDone className="text-xl" />
              ) : (
                "Confirm Order"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayOrdered;
