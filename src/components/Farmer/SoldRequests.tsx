"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import imgs from "@/../public/images/image.png";
import { VscLoading } from "react-icons/vsc";
import { toast, ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "@/app/lib/Firebase/Firebase";
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
  hasConformed: boolean;
  hasPayment: boolean;
  uid: string;
  buyerId: string;
  hasReject: boolean;
}

const SoldRequests = () => {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<Product[]>([]);

  useEffect(() => {
    const getData = async () => {
      onAuthStateChanged(fireAuth, async (user) => {
        if (user?.uid) {
          const farmerId = user.uid;
          const res = await fetch("/api/Product/getFarmer", {
            method: "POST",
            body: JSON.stringify({ farmerId }),
          });

          if (res.ok) {
            const data = await res.json();
            setRequests(data.products);
            setLoading(false);
          }
        }
      });
    };
    getData();
  }, []);

  const filteredRequests = requests.filter(
    (product) => product.TransMode === "farmerTrans"
  );

  const setConform = async (
    id: string,
    prodID: string,
    confirmId: string,
    farmerId: string,
    check: "Accept" | "Reject"
  ) => {
    try {
      const res = await fetch("/api/Product/OrderRequest", {
        method: "POST",
        body: JSON.stringify({
          id,
          prodID,
          farmerId,
          check,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);

        // Update UI locally
        const isAccepted = check === "Accept";
        setRequests((prev) =>
          prev.map((req) =>
            req.id === id && req.prodID === prodID
              ? {
                  ...req,
                  hasConformed: isAccepted,
                  hasReject: !isAccepted,
                }
              : req
          )
        );
      } else {
        toast.error(data.error || "Failed to update status");
      }
    } catch {
      toast.error("Error while updating status");
    }
  };

  const [confirmIds, setConfirmIds] = useState<Record<string, string>>({});

  const [loadings, setloading] = useState(false);
  const [done, setDone] = useState(false);
  const handleConfirm = async (id: string, productId: string) => {
    setloading(true);
    const confirmId = confirmIds[productId];
    if (!confirmId) {
      toast.error("Please enter a Confirm ID");
      setloading(false);
      return;
    }

    const res = await fetch("/api/Product/confirm", {
      method: "POST",
      body: JSON.stringify({ id, productId, confirmId }),
    });

    if (res.ok) {
      toast.success("Order Conformed");
      setloading(false);
      setDone(true);
      setRequests((prev) =>
        prev.map((req) =>
          req.id + req.prodID === id + productId
            ? { ...req, isDelivered: true }
            : req
        )
      );
    } else {
      toast.error("Failed To conform Order");
      setloading(false);
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
              key={req.id + req.prodID}
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
                    <span className="bg-yellow-100 text-yellow-600 font-semibold text-sm px-4 py-1.5 rounded-md">
                      Order has Been delivered{" "}
                    </span>
                  </>
                ) : req.hasReject ? (
                  // ❌ Case 2: Rejected
                  <span className="bg-red-100 text-red-700 font-semibold text-sm px-4 py-1.5 rounded-md">
                    Rejected
                  </span>
                ) : !req.hasConformed ? (
                  // ✅ Case 1: Not confirmed
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() =>
                        setConform(
                          req.id,
                          req.prodID,
                          req.confirmId,
                          req.uid,
                          "Accept"
                        )
                      }
                      className="bg-yellow-100 hover:bg-green-300 text-green-800 font-semibold text-sm px-4 py-2 rounded-md transition"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() =>
                        setConform(
                          req.id,
                          req.prodID,
                          req.confirmId,
                          req.uid,
                          "Reject"
                        )
                      }
                      className="bg-yellow-100 hover:bg-red-300 text-red-800 font-semibold text-sm px-4 py-2 rounded-md transition"
                    >
                      Reject
                    </button>
                  </div>
                ) : !req.hasPayment ? (
                  // ⚠️ Case 3: Confirmed but payment not done
                  <span className="bg-green-100 text-red-700 font-semibold text-sm px-4 py-1.5 rounded-md">
                    Payment has to be done
                  </span>
                ) : (
                  // ✅ Case 4: Confirmed and payment done
                  <div className="flex items-center gap-2 text-sm text-gray-800">
                    <label className="font-medium">Enter Confirm ID:</label>
                    <input
                      type="text"
                      className="border border-gray-300 px-3 py-1 rounded-md focus:ring focus:ring-yellow-400"
                      value={confirmIds[req.prodID] || ""}
                      onChange={(e) =>
                        setConfirmIds({
                          ...confirmIds,
                          [req.prodID]: e.target.value,
                        })
                      }
                    />
                    <button
                      onClick={() => handleConfirm(req.id, req.prodID)}
                      className="bg-yellow-600 text-white px-4 py-1.5 rounded-md hover:bg-yellow-700"
                    >
                      {loadings ? (
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
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default SoldRequests;
