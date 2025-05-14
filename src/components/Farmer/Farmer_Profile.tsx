"use client";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import FarmerProfileSkeleton from "../skeleton/FarmerProfileSkeleton";
import CryptoJS from "crypto-js";
import Image from "next/image";

const Farmer_Profile = () => {
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
  });

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
    const encdata = Cookies.get("Uid")
    const idToken = Cookies.get("firebase_token");

    if (!idToken) {
      setisUser(false);
      return;
    }
    const verifyAndLoad = async () => {
      try {
        if (key && encdata) {
          const decUID = CryptoJS.AES.decrypt(encdata, key).toString(CryptoJS.enc.Utf8);  
          const tempUid = decUID.toString();      
          if (idToken && tempUid) {
            setisUser(true);
          }
          const profileRes = await fetch("/api/Farmer/profile/get", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid: tempUid }),
          });
  
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            const mainData = profileData.data;
  
            if (mainData) {
              setFarmer({
                id: mainData.id || "",
                name: mainData.name || "",
                email: mainData.email || "",
                phone: mainData.phone || "",
                aadhar: mainData.aadhar || "",
                mainCrop: mainData.mainCrops || "",
                farmType: mainData.farmType || "",
                district: mainData.district || "",
                taluka: mainData.taluka || "",
                city: mainData.city || "",
                profilePhoto: mainData.profilePhoto || null,
                aadharPhoto: mainData.aadharPhoto || "",
                state: "Maharashtra",
                rating: mainData.rating || 0,
              });
  
              const userdata = {
                name: mainData.name || "",
                profilePhoto: mainData.profilePhoto || null,
                district: mainData.district || "",
                taluka: mainData.taluka || "",
                city: mainData.city || "",
                state: "Maharashtra",
              };
  
              Cookies.set("userSession", JSON.stringify(userdata), {
                secure: true,
                sameSite: "lax",
              });
  
              setloading(false);
            } else {
              toast.error("Farmer profile not found.");
            }
          } else {
            toast.error("Failed to load profile.");
          }
        }
      } catch (err) {
        toast.error("Something went wrong while loading profile.");
        console.error(err);
      }

    };

    verifyAndLoad();
  }, []);

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
                  src={farmer.profilePhoto}
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
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1 className="mx-auto text-center text-xl my-20">Login First . . .</h1>
        </div>
      )}
    </div>
  );
};

export default Farmer_Profile;
