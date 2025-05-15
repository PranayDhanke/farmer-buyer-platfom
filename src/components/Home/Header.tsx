"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "../../../public/images/image.png";
import { FaUserCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import Buyer_Cart from "../Buyer/Buyer_Cart";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";

const Header = () => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");

  const logoutuser = () => {
    if (Cookies.get("firebase_token")) Cookies.remove("firebase_token");
    if (Cookies.get("Uid")) Cookies.remove("Uid");
    if (Cookies.get("userSession")) Cookies.remove("userSession");

    toast.success("Logged Out");

    router.push("/login/farmer-login");
  };

  // Adding useEffect that will check for token on mount
  useEffect(() => {
    const idToken = Cookies.get("firebase_token");
    const encKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

    const verifyUser = async () => {
      if (idToken) {
        // This will trigger a re-render once token is found
        const res = await fetch("/api/Farmer/Authentication/check-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: idToken }),
        });
        const data = await res.json();
        if (data.uid) {
          if (encKey) {
            const encUID = CryptoJS.AES.encrypt(data.uid, encKey).toString();
            Cookies.set("Uid", encUID, { secure: true, sameSite: "strict" });
            setUserType("farmer");
            setIsLoggedIn(true);
          }
        } else {
          setIsLoggedIn(false);
          setUserType("");
          if (Cookies.get("firebase_token")) Cookies.remove("firebase_token");
          if (Cookies.get("Uid")) Cookies.remove("Uid");
          if (Cookies.get("userSession")) Cookies.remove("userSession");
          toast.error("Token Verification failed please login again");
        }
      } else {
        setIsLoggedIn(false);
        setUserType("");
      }
    };

    verifyUser(); // Calling the function to verify user on mount
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <div>
      <ToastContainer />
      <header className="bg-gradient-to-r from-green-600 to-green-800 text-white py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <Link href={"/"}>
            <div className="flex items-center mb-4 md:mb-0">
              <Image
                className="w-8 h-8 mr-3 fill-current"
                src={Logo}
                alt="Logo"
              />
              <h1 className="text-2xl font-bold">Argocart</h1>
            </div>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/">
              <span className="hover:text-green-200 transition-colors duration-200">
                Home
              </span>
            </Link>
            <Link href="/Products">
              <span className="hover:text-green-200 transition-colors duration-200">
                Products
              </span>
            </Link>
            <Link href="/farmers">
              <span className="hover:text-green-200 transition-colors duration-200">
                Farmers
              </span>
            </Link>
            <Link href="/about-us">
              <span className="hover:text-green-200 transition-colors duration-200">
                About
              </span>
            </Link>
            <Link href="/contact-us">
              <span className="hover:text-green-200 transition-colors duration-200">
                Contact
              </span>
            </Link>
          </nav>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {!isLoggedIn ? (
              <details className="relative">
                <summary className="flex items-center justify-center cursor-pointer hover:text-green-200 transition-colors duration-200">
                  <FaUserCircle className="mr-1 text-xl" />
                  Login
                  <FiChevronDown className="text-sm ml-1" />
                </summary>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-gray-700">
                  <Link href="/login/farmer-login">
                    <span className="block px-4 py-2 hover:bg-green-100 transition-colors duration-200">
                      Farmer Login
                    </span>
                  </Link>
                  <Link href="/login/buyer-login">
                    <span className="block px-4 py-2 hover:bg-green-100 transition-colors duration-200">
                      Buyer Login
                    </span>
                  </Link>
                </div>
              </details>
            ) : userType === "farmer" ? (
              <details className="relative">
                <summary className="flex items-center cursor-pointer hover:text-green-200 transition-colors duration-200">
                  <FaUserCircle className="mr-1" />
                  Farmer Profile
                  <FiChevronDown className="text-sm ml-1" />
                </summary>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-gray-700">
                  <Link href="/Farmer-Panel/Profile">
                    <span className="block px-4 py-2 hover:bg-green-100 transition-colors duration-200">
                      Profile
                    </span>
                  </Link>
                  <Link href="/Farmer-Panel">
                    <span className="block px-4 py-2 hover:bg-green-100 transition-colors duration-200">
                      My Products
                    </span>
                  </Link>
                  <span
                    onClick={logoutuser}
                    className="block px-4 py-2 hover:bg-green-100 transition-colors duration-200"
                  >
                    Logout
                  </span>
                </div>
              </details>
            ) : userType === "buyer" ? (
              <div>
                <details className="relative">
                  <summary className="flex items-center cursor-pointer hover:text-green-200 transition-colors duration-200">
                    <FaUserCircle className="mr-1" />
                    Buyer Profile
                    <FiChevronDown className="text-sm ml-1" />
                  </summary>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-gray-700">
                    <Link href="/buyer/profile">
                      <span className="block px-4 py-2 hover:bg-green-100 transition-colors duration-200">
                        Profile
                      </span>
                    </Link>
                    <Link href="/buyer/my-products">
                      <span className="block px-4 py-2 hover:bg-green-100 transition-colors duration-200">
                        My Bought Products
                      </span>
                    </Link>
                  </div>
                </details>
              </div>
            ) : null}
          </div>
        </div>
      </header>
      {userType === "buyer" ? <Buyer_Cart /> : null}
    </div>
  );
};

export default Header;
