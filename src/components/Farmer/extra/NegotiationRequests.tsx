"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import imgs from "@/../public/images/image.png";
import { VscLoading } from "react-icons/vsc";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "@/app/lib/Firebase/Firebase";

const NegotiationRequests = () => {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([
    {
      id: "",
      BuyerName: "",
      prodId: "",
      prod_name: "",
      imageUrl: "",
      Origprice: 0,
      NegoPrice: 0,
      accept: false,
      reject: false,
    },
  ]);

  useEffect(() => {
    const getNegotiations = () => {
      try {
        onAuthStateChanged(fireAuth, async (user) => {
          if (user?.uid) {
            const res = await fetch("/api/Negotiation/getFarmer", {
              method: "POST",
              body: JSON.stringify({ uid: user.uid }),
            });

            if (res.ok) {
              const data = await res.json();
              setRequests(data.requests);
            }
            setLoading(false);
          }
        });
      } catch {
        alert("Error fetching negotiation requests.");
      }
    };

    getNegotiations();
  }, []);

  const setRequested = async (id: string, check: "Accept" | "Reject") => {
    const res = await fetch("/api/Negotiation/setStatus", {
      method: "POST",
      body: JSON.stringify({ id, status: check }),
    });

    if (res.ok) {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === id
            ? {
                ...req,
                accept: check === "Accept",
                reject: check === "Reject",
              }
            : req
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Negotiation Requests
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <VscLoading className="text-3xl animate-spin text-gray-500" />
        </div>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No negotiation requests available.
        </p>
      ) : (
        <div className="grid gap-6">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-xl shadow-sm p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              {/* Product Image */}
              <div className="w-24 h-24 relative flex-shrink-0">
                <Image
                  src={req.imageUrl || imgs}
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
                  Buyer:{" "}
                  <span className="text-gray-900 font-medium">
                    {req.BuyerName}
                  </span>
                </p>
                <div className="flex flex-wrap gap-6 mt-3 text-gray-700 text-sm md:text-base">
                  <p>
                    Original Price:{" "}
                    <span className="text-black font-medium">
                      ₹{req.Origprice}
                    </span>
                  </p>
                  <p>
                    Negotiated Price:{" "}
                    <span className="text-black font-medium">
                      ₹{req.NegoPrice}
                    </span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:items-end items-start gap-3">
                {req.accept ? (
                  <span className="bg-green-100 text-green-700 font-semibold text-sm px-4 py-1.5 rounded-md">
                    Accepted
                  </span>
                ) : req.reject ? (
                  <span className="bg-red-100 text-red-700 font-semibold text-sm px-4 py-1.5 rounded-md">
                    Rejected
                  </span>
                ) : (
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => setRequested(req.id, "Accept")}
                      className="bg-green-100 hover:bg-green-300 text-green-800 font-semibold text-sm px-4 py-2 rounded-md transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => setRequested(req.id, "Reject")}
                      className="bg-red-100 hover:bg-red-300 text-red-700 font-semibold text-sm px-4 py-2 rounded-md transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NegotiationRequests;
