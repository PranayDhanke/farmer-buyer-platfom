"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "../../../public/images/image.png";
import { FaBoxOpen, FaEnvelope, FaHome, FaInfoCircle, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaUserCheck, FaUserCircle, FaUsers } from "react-icons/fa";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import Buyer_Cart from "../Buyer/Buyer_Cart";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoutuser = () => {
    Cookies.remove("firebase_token");
    Cookies.remove("Uid");
    Cookies.remove("userSession");
    toast.success("Logged Out");
    router.push("/login/farmer-login");
  };

  useEffect(() => {
    const idToken = Cookies.get("firebase_token");
    const encKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

    const verifyUser = async () => {
      if (idToken) {
        const res = await fetch("/api/Farmer/Authentication/check-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: idToken }),
        });
        const data = await res.json();
        if (data.uid && encKey) {
          const encUID = CryptoJS.AES.encrypt(data.uid, encKey).toString();
          Cookies.set("Uid", encUID, { secure: true, sameSite: "strict" });
          setUserType("farmer");
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setUserType("");
          Cookies.remove("firebase_token");
          Cookies.remove("Uid");
          Cookies.remove("userSession");
          toast.error("Token verification failed. Please login again.");
        }
      } else {
        setIsLoggedIn(false);
        setUserType("");
      }
    };

    verifyUser();
  }, []);

  return (
    <div>
      <ToastContainer />
      <header className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center">
              <Image src={Logo} alt="Logo" className="w-8 h-8 mr-2" />
              <h1 className="text-xl font-bold">Argocart</h1>
            </div>
          </Link>

          {/* Hamburger Menu - Small screens */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white text-2xl"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/">Home</Link>
            <Link href="/Products">Products</Link>
            <Link href="/farmers">Farmers</Link>
            <Link href="/about-us">About</Link>
            <Link href="/contact-us">Contact</Link>
          </nav>

          {/* Auth/Profile Options */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <details className="relative">
                <summary className="cursor-pointer flex items-center">
                  <FaUserCircle className="mr-1" />
                  Login
                  <FiChevronDown className="ml-1 text-sm" />
                </summary>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 z-10">
                  <Link href="/login/farmer-login">
                    <span className="block px-4 py-2 hover:bg-green-100">
                      Farmer Login
                    </span>
                  </Link>
                  <Link href="/login/buyer-login">
                    <span className="block px-4 py-2 hover:bg-green-100">
                      Buyer Login
                    </span>
                  </Link>
                </div>
              </details>
            ) : userType === "farmer" ? (
              <details className="relative">
                <summary className="cursor-pointer flex items-center">
                  <FaUserCircle className="mr-1" />
                  Farmer Profile
                  <FiChevronDown className="ml-1 text-sm" />
                </summary>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 z-10">
                  <Link href="/Farmer-Panel/Profile">
                    <span className="block px-4 py-2 hover:bg-green-100">
                      Profile
                    </span>
                  </Link>
                  <Link href="/Farmer-Panel">
                    <span className="block px-4 py-2 hover:bg-green-100">
                      My Products
                    </span>
                  </Link>
                  <span
                    onClick={logoutuser}
                    className="block px-4 py-2 hover:bg-green-100 cursor-pointer"
                  >
                    Logout
                  </span>
                </div>
              </details>
            ) : userType === "buyer" ? (
              <details className="relative">
                <summary className="cursor-pointer flex items-center">
                  <FaUserCircle className="mr-1" />
                  Buyer Profile
                  <FiChevronDown className="ml-1 text-sm" />
                </summary>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 z-10">
                  <Link href="/buyer/profile">
                    <span className="block px-4 py-2 hover:bg-green-100">
                      Profile
                    </span>
                  </Link>
                  <Link href="/buyer/my-products">
                    <span className="block px-4 py-2 hover:bg-green-100">
                      My Bought Products
                    </span>
                  </Link>
                </div>
              </details>
            ) : null}
          </div>
        </div>

        {/* Mobile Menu Content */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden px-10 absolute text-white bg-green-500 z-10 h-fit mx-auto w-screen rounded-b-lg shadow-md"
            >
              <ul className="space-y-4 py-5">
                <li className="flex items-center gap-2">
                  <FaHome />
                  <Link href="/">Home</Link>
                </li>
                <li className="flex items-center gap-2">
                  <FaBoxOpen />
                  <Link href="/Products">Products</Link>
                </li>
                <li className="flex items-center gap-2">
                  <FaUsers />
                  <Link href="/farmers">Farmers</Link>
                </li>
                <li className="flex items-center gap-2">
                  <FaInfoCircle />
                  <Link href="/about-us">About</Link>
                </li>
                <li className="flex items-center gap-2">
                  <FaEnvelope />
                  <Link href="/contact-us">Contact</Link>
                </li>

                {!isLoggedIn ? (
                  <>
                    <li className="flex items-center gap-2">
                      <FaSignInAlt />
                      <Link href="/login/farmer-login">Farmer Login</Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaSignInAlt />
                      <Link href="/login/buyer-login">Buyer Login</Link>
                    </li>
                  </>
                ) : userType === "farmer" ? (
                  <>
                    <li className="flex items-center gap-2">
                      <FaUserCircle />
                      <Link href="/Farmer-Panel/Profile">Profile</Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaBoxOpen />
                      <Link href="/Farmer-Panel">My Products</Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaSignOutAlt />
                      <button onClick={logoutuser}>Logout</button>
                    </li>
                  </>
                ) : userType === "buyer" ? (
                  <>
                    <li className="flex items-center gap-2">
                      <FaUserCheck />
                      <Link href="/buyer/profile">Profile</Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaShoppingCart />
                      <Link href="/buyer/my-products">My Bought Products</Link>
                    </li>
                  </>
                ) : null}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Buyer Cart */}
      {userType === "buyer" && <Buyer_Cart />}
    </div>
  );
};

export default Header;
