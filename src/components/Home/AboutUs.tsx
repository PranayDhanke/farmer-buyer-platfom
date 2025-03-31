"use client";
import React from "react";
import ContactFarmerPage from "../Farmer/ContactFarmerPage";

const AboutUs = () => {
  return (
    <div className="font-sans bg-gray-100 m-10 p-10 rounded-2xl">
        <div className="container mx-auto px-4 md:px-6">
          <div>
            <h1 className="text-2xl my-2">Project Overview</h1>
            <p>
              This project is an e-commerce platform where farmers can list
              their products, buyers can purchase or negotiate prices, and an
              admin manages the operations. The platform will provide
              transparency and efficiency in direct farmer-to-consumer sales.
            </p>
          </div>
          <ContactFarmerPage />
        </div>
    </div>
  );
};

export default AboutUs;
