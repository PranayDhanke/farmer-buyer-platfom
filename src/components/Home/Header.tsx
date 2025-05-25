"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "../../../public/images/image.png";
import {
  FaBoxOpen,
  FaEnvelope,
  FaHome,
  FaInfoCircle,
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCheck,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import Buyer_Cart from "../Buyer/Buyer_Cart";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const logoutuser = () => {
    Cookies.remove("firebase_token");
    Cookies.remove("Uid");
    Cookies.remove("userSession");
    toast.success("Logged Out");
    router.push("/login/farmer-login");
    setIsSidebarOpen(false);
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

  const menuItems = [
    { href: "/", icon: <FaHome />, label: "Home" },
    { href: "/Products", icon: <FaBoxOpen />, label: "Products" },
    { href: "/farmers", icon: <FaUsers />, label: "Farmers" },
    { href: "/market-price", icon: <FaInfoCircle />, label: "Market Prices" },
    { href: "/about-us", icon: <FaInfoCircle />, label: "About" },
    { href: "/contact-us", icon: <FaEnvelope />, label: "Contact" },
  ];

  const authLinks = !isLoggedIn
    ? [
        {
          href: "/login/farmer-login",
          icon: <FaSignInAlt />,
          label: "Farmer Login",
        },
        {
          href: "/login/buyer-login",
          icon: <FaSignInAlt />,
          label: "Buyer Login",
        },
      ]
    : userType === "farmer"
    ? [
        {
          href: "/Farmer-Panel/Profile",
          icon: <FaUserCircle />,
          label: "Profile",
        },
        { href: "/Farmer-Panel", icon: <FaBoxOpen />, label: "My Products" },
        { icon: <FaSignOutAlt />, label: "Logout", action: logoutuser },
      ]
    : [
        { href: "/buyer/profile", icon: <FaUserCheck />, label: "Profile" },
        {
          href: "/buyer/my-products",
          icon: <FaShoppingCart />,
          label: "My Bought Products",
        },
      ];

  return (
    <div>
      <ToastContainer />
      <header className="bg-gradient-to-r from-green-600 to-green-800 text-white shadow-md z-30">
        <div className="flex items-center justify-between px-4 py-4 container mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src={Logo} alt="Logo" className="w-8 h-8" />
            <h1 className="text-xl font-bold">Agrocart</h1>
          </Link>

          {/* Sidebar Toggle */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-white text-2xl"
            aria-label="Open Menu"
          >
            <FiMenu />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-2xs bg-white text-gray-800 z-40 shadow-xl"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <h2 className="text-xl font-semibold">Menu</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-2xl text-gray-600"
              >
                <FiX />
              </button>
            </div>

            <nav className="p-4 space-y-4">
              {menuItems.map(({ href, icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center gap-2 px-2 py-2 hover:bg-green-100 rounded"
                >
                  {icon}
                  {label}
                </Link>
              ))}

              <hr className="my-2" />

              {authLinks.map(({ href, icon, label, action }) =>
                action ? (
                  <button
                    key={label}
                    onClick={action}
                    className="w-full text-left flex items-center gap-2 px-2 py-2 hover:bg-green-100 rounded"
                  >
                    {icon}
                    {label}
                  </button>
                ) : (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center gap-2 px-2 py-2 hover:bg-green-100 rounded"
                  >
                    {icon}
                    {label}
                  </Link>
                )
              )}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30"
        />
      )}

      {/* Buyer Cart */}
      {userType === "buyer" && <Buyer_Cart />}
    </div>
  );
};

export default Header;
