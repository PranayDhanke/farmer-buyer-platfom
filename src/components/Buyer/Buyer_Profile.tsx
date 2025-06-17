"use client";
import Image from "next/image";
import Link from "next/link";

import imags from "@/../public/images/image.png";
import { supabase } from "@/app/lib/superbase/supabaseClient";
import { useEffect, useState } from "react";
import FarmerProfileSkeleton from "../skeleton/FarmerProfileSkeleton";

const Buyer_Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, isUser] = useState(false);
  useEffect(() => {
    const supabaseUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user?.id) {
        const uid = user.id;

        const res = await fetch("/api/Buyer/Profile/get", {
          method: "POST",
          body: JSON.stringify({ uid }),
        });

        if (res.ok) {
          const buyerData = await res.json();

          const OrgData = await buyerData.data;

          setBuyer(OrgData);
          setLoading(false);
          isUser(true);
        }
      }
      if (error) {
        setLoading(false);
        isUser(false);
      }
    };

    supabaseUser();
  }, []);
  // Example Buyer Data (replace with actual data or state)
  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    phone: "",
    profilePhoto: "", // Example photo URL
    location: "",
    district: "",
    taluka: "",
    city: "",
    aadhar: "",
    aadharPhoto: "", // Example photo URL
  });

  return (
    <>
      {loading ? (
        <FarmerProfileSkeleton />
      ) : (
        <>
          {user ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-10">
              {/* Profile Header */}
              <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center space-y-4">
                <Image
                  src={buyer.profilePhoto || imags}
                  alt={buyer.name}
                  width={96}
                  height={96}
                  className="rounded-full object-cover"
                />
                <h2 className="text-2xl font-bold text-gray-800">
                  {buyer.name}
                </h2>

                <p className="text-gray-600">Email: {buyer.email}</p>
                <p className="text-gray-600">Phone: {buyer.phone}</p>

                {/* Action Section (Edit Profile & View Orders) */}
                <div className="flex space-x-4 mt-4">
                  <Link href="/Buyer-Panel/Profile/Edit">
                    <button className="bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700 transition-colors duration-200">
                      Edit Profile
                    </button>
                  </Link>
                  <Link href="/Buyer-Panel">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200">
                      My Orders
                    </button>
                  </Link>
                </div>
                <div>
                  <Link
                    href={buyer.aadharPhoto}
                    target="_blank"
                    className="bg-cyan-600 rounded-2xl px-6 py-2 text-white hover:bg-cyan-700 transition-colors duration-200"
                  >
                    My Aadhar download
                  </Link>
                </div>
              </div>

              {/* Buyer Details Section */}
              <div className="col-span-2 grid grid-rows-3 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Buyer Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">
                        <span className="font-semibold">Name:</span>{" "}
                        {buyer.name}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Aadhar Card No:</span>{" "}
                        {buyer.aadhar}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">
                        <span className="font-semibold">Email:</span>{" "}
                        {buyer.email}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Phone:</span>{" "}
                        {buyer.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Address
                  </h3>
                  <p className="text-gray-600">
                    {buyer.taluka}, {buyer.district}, {buyer.city},{" "}
                    {buyer.location}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <span className="text-center text-2xl">Please Login First</span>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Buyer_Profile;
