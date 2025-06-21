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

const DisplaySold = ({ product }: { product: Product }) => {
  const [confirmIds, setConfirmIds] = useState<Record<string, string>>({});

  const [loading, setloading] = useState(false);
  const [done, setDone] = useState(false);

  const [delivered, setDelivered] = useState(product.isDelivered);
  const handleConfirm = async (productId: string) => {
    setloading(true);
    const confirmId = confirmIds[productId];
    if (!confirmId) {
      toast.error("Please enter a Confirm ID");
      setloading(false);
      return;
    }

    const res = await fetch("/api/Product/confirm", {
      method: "POST",
      body: JSON.stringify({ productId, confirmId }),
    });

    if (res.ok) {
      toast.success("Order Conformed");
      setDelivered(true);
      setloading(false);
      setDone(true);
    } else {
      toast.error("Failed To conform Order");
      setloading(false);
    }
  };
  return (
    <div
      key={`${product.id}-${product.prodID}+${product.confirmId}`}
      className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition duration-300"
    >
      <Image
        src={product.image || imaes}
        alt={product.prod_name}
        width={150}
        height={150}
        className="rounded-xl object-cover shadow-sm border"
      />
      <h3 className="text-xl font-semibold text-gray-800 mt-4">
        {product.prod_name}
      </h3>
      <p className="text-gray-500 text-center text-sm mt-1">
        {product.description}
      </p>

      <div className="mt-4 w-full text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-medium">Farmer:</span> {product.name}
        </p>
        <p>
          <span className="font-medium">Category:</span> {product.category}
        </p>
        <p>
          <span className="font-medium">Price:</span> ₹{product.price}
        </p>
        <p>
          <span className="font-medium">Quantity:</span> {product.quantity}
        </p>
        <p>
          <span className="font-medium">Order Type:</span>{" "}
          {product.TransMode === "buyerTrans"
            ? "Transport by Buyer"
            : "Transport by Farmer"}
        </p>
        <p>
          <span className="font-medium">Ordered At:</span>{" "}
          {new Date(product.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Confirm Section */}
      {product.TransMode !== "buyerTrans" ? (
        <p className="mt-5 flex items-center gap-2 text-sm text-gray-800">
          <span className="font-medium">Confirm ID:</span> {product.confirmId}
          <FaCopy
            onClick={() => {
              navigator.clipboard.writeText(product.confirmId);
              toast.success("Copied to clipboard");
            }}
            className="ml-2 cursor-pointer text-yellow-600 hover:text-yellow-800"
          />
        </p>
      ) : delivered ? (
        <>
          <p className="mt-5 text-sm text-gray-800">
            <span className="font-medium">Order is Received by Buyer</span>
          </p>
        </>
      ) : (
        <div className="mt-4 w-full">
          <input
            type="text"
            placeholder="Enter Confirm ID"
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={confirmIds[product.prodID] || ""}
            onChange={(e) =>
              setConfirmIds({
                ...confirmIds,
                [product.prodID]: e.target.value,
              })
            }
          />
          <button
            onClick={() => handleConfirm(product.prodID)}
            className={`mt-2 w-full py-2 rounded-lg transition 
                      confirmIds[product.id]
                        bg-yellow-600 text-white hover:bg-yellow-700
                        
                    `}
          >
            {loading ? (
              <VscLoading className="animate-spin w-full text-xl text-center" />
            ) : done ? (
              <MdDone className="text-xl w-full text-center" />
            ) : (
              "Confirm Order"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default DisplaySold;
