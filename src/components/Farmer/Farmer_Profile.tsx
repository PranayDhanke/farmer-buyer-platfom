"use client";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import FarmerProfileSkeleton from "../skeleton/FarmerProfileSkeleton";
import Image from "next/image";
import image from "@/../public/images/image.png";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "@/app/lib/Firebase/Firebase";
import { useRouter } from "next/navigation";

const Farmer_Profile = () => {
  const router = useRouter();
  const [isUser, setisUser] = useState(false);
  const [loading, setloading] = useState(true);
  const [farmer, setFarmer] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    aadhar: "",
    mainCrop: "",
    farmType: "",
    district: "",
    taluka: "",
    city: "",
    profilePhoto: null,
    aadharPhoto: "",
    state: "Maharashtra",
    rating: 0,
    wallet: 0,
  });

  useEffect(() => {
    const verifyAndLoad = async () => {
      try {
        onAuthStateChanged(fireAuth, async (user) => {
          if (user?.uid) {
            setisUser(true);
            const profileRes = await fetch("/api/Farmer/profile/get", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ uid: user.uid }),
            });

            if (profileRes.ok) {
              const profileData = await profileRes.json();
              const mainData = profileData.data;

              if (mainData) {
                setFarmer(mainData);

                setloading(false);
                return;
              } else {
                toast.error("Farmer profile not found.");
                return;
              }
            } else {
              toast.error("Failed to load profile.");
            }
          } else {
            router.push("/login/farmer-login");
          }
        });
      } catch {}
    };

    verifyAndLoad();
  }, [isUser , router]);

  return (
    <div>
      <ToastContainer />
      {isUser ? (
        <div>
          {loading ? (
            <div>
              <FarmerProfileSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-10">
              <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center space-y-4">
                <Image
                  src={farmer.profilePhoto || image}
                  alt={farmer.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover"
                  priority
                />
                <h2 className="text-xl font-bold text-gray-800">
                  {farmer.name}
                </h2>

                <div className="flex items-center text-yellow-500 mb-2">
                  {[...Array(Math.floor(farmer.rating))].map((_, index) => (
                    <FaStar key={index} />
                  ))}
                  {farmer.rating % 1 > 0 && (
                    <FaStar className="text-gray-400" />
                  )}
                  <span className="ml-2 text-gray-600">
                    Rating: {farmer.rating}
                  </span>
                </div>

                <p className="text-gray-600">Main Crop: {farmer.mainCrop}</p>
                <p className="text-gray-600">Farm Type: {farmer.farmType}</p>

                <div className="flex space-x-4 mt-4">
                  <Link href="/Farmer-Panel/Profile/Edit">
                    <button className="bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700 transition-colors duration-200">
                      Edit Profile
                    </button>
                  </Link>
                  <Link href="/Farmer-Panel/">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200">
                      My Products
                    </button>
                  </Link>
                </div>
                <div>
                  <Link
                    href={farmer.aadharPhoto}
                    target="_blank"
                    className="bg-cyan-600 rounded-2xl px-6 py-2 text-white hover:bg-cyan-700 transition-colors duration-200"
                  >
                    My Aadhar download
                  </Link>
                </div>
              </div>

              <div className="col-span-2 grid grid-rows-3 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Farmer Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">
                        <span className="font-semibold">Phone:</span>{" "}
                        {farmer.phone}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Email:</span>{" "}
                        {farmer.email}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Aadhar Card No:</span>{" "}
                        {farmer.aadhar}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">
                        <span className="font-semibold">Farm Type:</span>{" "}
                        {farmer.farmType}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Main Crop:</span>{" "}
                        {farmer.mainCrop}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Rating:</span>{" "}
                        {farmer.rating}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Address
                  </h3>
                  <p className="text-gray-600">
                    {farmer.taluka}, {farmer.district}, {farmer.city},{" "}
                    {farmer.state}
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Wallet
                  </h3>
                  <div className="flex gap-5 items-center">
                    <p className="text-gray-600">
                      Total Amount : {farmer.wallet}
                    </p>
                    <button className="bg-blue-600 text-white p-2 text-xs cursor-pointer rounded-full hover:bg-blue-700 transition-colors duration-200">
                      Withdraw Amount
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1 className="mx-auto text-center text-xl my-20">
            Login First . . .
          </h1>
        </div>
      )}
    </div>
  );
};

export default Farmer_Profile;
