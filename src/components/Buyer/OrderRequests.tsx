"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import imgs from "@/../public/images/image.png";
import { VscLoading } from "react-icons/vsc";
import { toast, ToastContainer } from "react-toastify";
import { supabase } from "@/app/lib/superbase/supabaseClient";
import { FaCopy } from "react-icons/fa";

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
  hasConformed: boolean;
  hasPayment: boolean;
  hasReject: boolean;
  uid: string;
  buyerId: string;
}

const OrderRequests = () => {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<Product[]>([]);

  useEffect(() => {
    const getData = async () => {
      const {
        data: { user: supabaseUser },
      } = await supabase.auth.getUser();

      if (supabaseUser?.id) {
        const buyerId = supabaseUser.id;
        const res = await fetch("/api/Product/get", {
          method: "POST",
          body: JSON.stringify({ buyerId }),
        });

        if (res.ok) {
          const data = await res.json();
          setRequests(data.products);
          setLoading(false);
        }
      }
    };
    getData();
  }, []);

  const filteredRequests = requests.filter((product) => {
    const setFilter = product.TransMode === "farmerTrans";
    return setFilter;
  });

  const hadPayment = async (
    price: number,
    quantity: number,
    id: string,
    prodID: string,
    confirmId: string,
    farmerId: string
  ) => {
    const paymentPrice = price * quantity;
    const res = await fetch("/api/Product/settlePayment", {
      method: "POST",
      body: JSON.stringify({
        id,
        prodID,
        farmerId,
        paymentPrice,
      }),
    });

    if (res.ok) {
      toast.success("Payment has been done");
      setRequests((prev) =>
        prev.map((req) =>
          req.id + req.prodID + req.confirmId === id + prodID + confirmId
            ? {
                ...req,
                hasPayment: true,
              }
            : req
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Order Requests
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <VscLoading className="text-3xl animate-spin text-gray-500" />
        </div>
      ) : filteredRequests.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No Order requests available.
        </p>
      ) : (
        <div className="grid gap-6">
          {filteredRequests.map((req) => (
            <div
              key={req.id + req.prodID + req.confirmId}
              className="bg-white rounded-xl shadow-sm p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              {/* Product Image */}
              <div className="w-24 h-24 relative flex-shrink-0">
                <Image
                  src={req.image || imgs}
                  alt={req.prod_name}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              {/* Info Section */}
              <div className="flex-1 w-full">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                  {req.prod_name}
                </h2>
                <p className="text-gray-600 mt-1">
                  Farmer:{" "}
                  <span className="text-gray-900 font-medium">{req.name}</span>
                </p>
                <div className="flex flex-wrap gap-6 mt-3 text-gray-700 text-sm md:text-base">
                  <p>
                    Price:{" "}
                    <span className="text-black font-medium">₹{req.price}</span>
                  </p>
                  <p>
                    Quantity:{" "}
                    <span className="text-black font-medium">
                      {req.quantity}
                    </span>
                  </p>
                  <p>
                    Payment To Settle:{" "}
                    <span className="text-black font-medium">
                      ₹{req.price * req.quantity}
                    </span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:items-end items-start gap-3">
                {req.isDelivered ? (
                  <>
                    <span className="bg-yellow-100 text-yellow-600 font-semibold text-sm px-4 py-1.5 rounded-md">Order has Been delivered </span>
                  </>
                ) : req.hasReject ? (
                  // ❌ Rejected
                  <span className="bg-red-100 text-red-700 font-semibold text-sm px-4 py-1.5 rounded-md">
                    Rejected
                  </span>
                ) : !req.hasConformed ? (
                  // ⏳ Not Conformed
                  <span className="bg-green-100 text-red-700 font-semibold text-sm px-4 py-1.5 rounded-md">
                    Not Conformed
                  </span>
                ) : !req.hasPayment ? (
                  // 💳 Proceed for payment
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() =>
                        hadPayment(
                          req.price,
                          req.quantity,
                          req.id,
                          req.prodID,
                          req.confirmId,
                          req.uid
                        )
                      }
                      className="bg-yellow-100 hover:bg-green-300 text-green-800 font-semibold text-sm px-4 py-2 rounded-md transition"
                    >
                      Proceed For Payment
                    </button>
                  </div>
                ) : (
                  // ✅ Ready to get
                  <>
                    <span className="bg-green-100 text-green-700 font-semibold text-sm px-4 py-1.5 rounded-md">
                      Ready To Get
                    </span>
                    <p className="mt-5 flex items-center gap-2 text-sm text-gray-800">
                      <span className="font-medium">Confirm ID:</span>{" "}
                      {req.confirmId}
                      <FaCopy
                        onClick={() => {
                          navigator.clipboard.writeText(req.confirmId);
                          toast.success("Copied to clipboard");
                        }}
                        className="ml-2 cursor-pointer text-yellow-600 hover:text-yellow-800"
                      />
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default OrderRequests;
