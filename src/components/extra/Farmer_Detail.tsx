"use client";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import image from "@/../public/images/image.png";
import { usePathname } from "next/navigation";
import FarmerDetailListSkeleton from "../skeleton/FarmerDetailListSkeleton";
import ProductDisplay from "./ProductDisplay";
import { VscLoading } from "react-icons/vsc";
import ContactOpenPanel from "./ContactOpenPanel";

const Farmer_Detail = () => {
  const pathname = usePathname();

  const [openPanel, setOpenPanel] = useState(false);

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const setTriggerOpen = (email: string, mobile: string) => {
    setOpenPanel(true);
    setEmail(email);
    setMobile(mobile);
  };
  const [selectedFarmers, setSelectedFarmers] = useState([
    {
      id: "",
      name: "",
      taluka: "",
      district: "",
      phone: "",
      email: "",
      city: "",
      state: "",
      profilePhoto: "",
      rating: 0,
      mainCrops: "",
      farmType: "",
    },
  ]);

  const [products, setProducts] = useState([
    {
      name: "",
      id: "",
      prod_name: "",
      price: 0,
      category: "",
      description: "",
      imageUrl: "",
      profilePhoto: "",
      quantity: 0,
      uid: "",
    },
  ]);

  const [famerload, setfarmerLoad] = useState(true);
  const [prodload, setProdLoad] = useState(true);

  useEffect(() => {
    const path = pathname.replace("/farmers/", "");

    const loadData = async () => {
      const profileRes = await fetch("/api/Farmer/profile/get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: path }),
      });

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        const mainData = await profileData.data;
        if (mainData) {
          setSelectedFarmers([mainData]);
          setfarmerLoad(false);
        }
      }

      const prodRes = await fetch(`/api/Farmer/Product/get`, {
        method: "POST",
        body: JSON.stringify({ id: path }),
      });

      if (prodRes.ok) {
        const productData = await prodRes.json();
        const mainData = await productData.products;
        if (mainData) {
          setProducts(mainData);
          setProdLoad(false);
        }
      }
    };

    loadData();
  }, [pathname]);

  return (
    <div className="font-sans bg-gray-50">
      <main className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          {selectedFarmers.length === 0 ? (
            <div className="text-center text-xl font-semibold text-gray-600">
              Farmer not found
            </div>
          ) : (
            <div>
              {famerload ? (
                <div>
                  <FarmerDetailListSkeleton />
                </div>
              ) : (
                selectedFarmers.map((selectedFarmer) => (
                  <div
                    key={selectedFarmer.id}
                    className="bg-white rounded-xl overflow-hidden shadow-md p-6 mb-8"
                  >
                    <div className="flex items-center mb-6 ">
                      <div className="relative w-[70px] h-[70px] mr-2 ">
                        <Image
                          src={selectedFarmer.profilePhoto || image}
                          alt={selectedFarmer.name}
                          fill
                          priority
                          className="rounded-full"
                          sizes="800px"
                        />
                      </div>
                      <div>
                        <h2 className="font-bold text-2xl">
                          {selectedFarmer.name}
                        </h2>
                        <div className="flex items-center text-yellow-500 mb-2">
                          {[...Array(Math.floor(selectedFarmer.rating))].map(
                            (_, index) => (
                              <FaStar key={index} />
                            )
                          )}
                          {selectedFarmer.rating % 1 > 0 && (
                            <FaStar className="text-gray-400" />
                          )}
                          <span className="ml-2 text-gray-600">
                            Rating: {selectedFarmer.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="font-bold text-lg text-gray-700">
                        Address
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {selectedFarmer.taluka}, {selectedFarmer.district},{" "}
                        {selectedFarmer.city}, {selectedFarmer.state}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h3 className="font-bold text-lg text-gray-700">
                        Farming Details
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Main Crop: {selectedFarmer.mainCrops}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Farm Type : {selectedFarmer.farmType}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Farmer Rating: {selectedFarmer.rating}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setTriggerOpen(
                          selectedFarmer.email,
                          selectedFarmer.phone
                        )
                      }
                      className="w-full px-5 bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors duration-200"
                    >
                      Contact Farmer
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          <section>
            <h1 className="text-2xl ml-5 font-bold">Products</h1>
            <div>
              {prodload ? (
                <VscLoading className="animate-spin text-2xl text-center w-full" />
              ) : (
                <ProductDisplay item={products} displayFilter={true} />
              )}
            </div>
          </section>
        </div>
      </main>

      <section>
        {openPanel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
              <ContactOpenPanel email={email} mobile={mobile} />
              <div className="mt-4 text-center">
                <button
                  onClick={() => setOpenPanel(false)}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Farmer_Detail;
