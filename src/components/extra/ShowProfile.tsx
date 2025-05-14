"use client";
import React, { useEffect, useState } from "react";
import Farmer_Profile from "../Farmer/Farmer_Profile";
import { VscLoading } from "react-icons/vsc";

const ShowProfile = () => {
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    // Simulate a delay before showing the profile
    const timer = setTimeout(() => {
      setShowProfile(true);
    }, 2000); // 2000ms = 2 seconds delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showProfile ? <Farmer_Profile /> : <div><VscLoading className="animate-spin text-2xl mx-auto text-center my-20"/></div>}
    </div>
  );
};

export default ShowProfile;
