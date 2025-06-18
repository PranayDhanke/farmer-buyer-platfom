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
import { FiMenu, FiX } from "react-icons/fi";
import Buyer_Cart from "../Buyer/Buyer_Cart";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/app/lib/superbase/supabaseClient";
import { AiOutlineProduct, AiOutlineStock } from "react-icons/ai";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { fireAuth } from "@/app/lib/Firebase/Firebase";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const logoutBuyer = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Error logging out");
    } else {
      toast.success("Logged out successfully");
      setIsLoggedIn(false);
      setUserType("");
      setUserName("");
      router.push("/login/buyer-login");
    }
  };

  const logoutuser = () => {
    signOut(fireAuth);
    toast.success("Logged Out");
    router.push("/login/farmer-login");
    setIsLoggedIn(false);
    setUserType("");
    setUserName("");
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    // Initial check
    const getInitialUser = async () => {
      const {
        data: { user: supabaseUser },
      } = await supabase.auth.getUser();

      if (supabaseUser?.id) {
        setIsLoggedIn(true);
        setUserType("buyer");
        setUserName(supabaseUser.email || "Buyer");
      }
    };

    getInitialUser();

    // Listen to auth changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setIsLoggedIn(true);
          setUserType("buyer");
          setUserName(session.user.email || "Buyer");
        } else {
          setIsLoggedIn(false);
          setUserType("");
          setUserName("");
        }
      }
    );

    // Firebase Listener (for Farmer)
    const unsubscribeFirebase = onAuthStateChanged(fireAuth, (user) => {
      if (user?.uid) {
        setIsLoggedIn(true);
        setUserType("farmer");
        setUserName(user.displayName || user.email || "Farmer");
      }
    });

    return () => {
      listener?.subscription?.unsubscribe(); // Clean up Supabase
      unsubscribeFirebase(); // Clean up Firebase
    };
  }, []);

  const menuItems = [
    { href: "/", icon: <FaHome />, label: "Home" },
    { href: "/Products", icon: <AiOutlineProduct />, label: "Products" },
    { href: "/farmers", icon: <FaUsers />, label: "Farmers" },
    { href: "/market-price", icon: <AiOutlineStock />, label: "Market Prices" },
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
        {
          href: "/Farmer-Panel",
          icon: <FaShoppingCart />,
          label: "Dashboard",
        },
        { href: "/Farmer-Panel", icon: <FaBoxOpen />, label: "My Products" },
        { icon: <FaSignOutAlt />, label: "Logout", action: logoutuser },
      ]
    : [
        {
          href: "/Buyer-Panel/Profile",
          icon: <FaUserCheck />,
          label: "Profile",
        },
        {
          href: "/Buyer-Panel",
          icon: <FaShoppingCart />,
          label: "Dashboard",
        },
        {
          href: "/Buyer-Panel",
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
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={Logo} alt="Logo" className="w-8 h-8" />
              <h1 className="text-2xl font-bold tracking-wider">Agrocart</h1>
            </Link>
          </div>

          {/* Nav Links - Large Screen */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-1 text-white hover:text-yellow-300"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Auth Links - Large Screen */}
          <div className="hidden md:flex items-center gap-4 relative">
            {!isLoggedIn ? (
              // Login Dropdown (Before Login)
              <div className="group">
                {/* Trigger */}
                <button className="flex items-center gap-1 hover:text-yellow-300">
                  <FaSignInAlt />
                  <span>Login</span>
                </button>

                {/* Dropdown */}
                <div className="fixed  right-1 top-9 mt-2 hidden group-hover:flex flex-col bg-white text-black rounded shadow-lg min-w-[160px] z-50">
                  <Link
                    href="/login/farmer-login"
                    className="px-4 py-2 hover:bg-green-100 whitespace-nowrap"
                  >
                    Farmer Login
                  </Link>
                  <Link
                    href="/login/buyer-login"
                    className="px-4 py-2 hover:bg-green-100 whitespace-nowrap"
                  >
                    Buyer Login
                  </Link>
                </div>
              </div>
            ) : (
              // Profile Dropdown (After Login)
              <div className="group">
                <button className="flex items-center gap-2 hover:text-yellow-300">
                  <span>Welcome, {userName?.split("@")[0]}</span>
                  <FaUserCircle className="text-xl" />
                </button>
                <div className="fixed top-9 right-1 hidden group-hover:block bg-white text-black mt-2 rounded shadow-md z-50 min-w-[180px]">
                  {userType === "farmer" ? (
                    <>
                      <Link
                        href="/Farmer-Panel/Profile"
                        className="block px-4 py-2 hover:bg-green-100"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/Farmer-Panel"
                        className="block px-4 py-2 hover:bg-green-100"
                      >
                        My Products
                      </Link>
                      <hr />
                      <button
                        onClick={logoutuser}
                        className="w-full text-left px-4 py-2 hover:bg-green-100"
                      >
                        <FaSignOutAlt className="inline mr-1" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/Buyer-Panel/Profile"
                        className="block px-4 py-2 hover:bg-green-100"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/Buyer-Panel"
                        className="block px-4 py-2 hover:bg-green-100"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/Buyer-Panel"
                        className="block px-4 py-2 hover:bg-green-100"
                      >
                        My Bought Products
                      </Link>
                      <hr />
                      <button
                        onClick={logoutBuyer}
                        className="w-full text-left px-4 py-2 hover:bg-green-100"
                      >
                        <FaSignOutAlt className="inline mr-1" />
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Toggle - Small Screen */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden text-white text-2xl"
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
            className="fixed top-0 left-0 h-full w-xs p-4 bg-white text-gray-800 z-40 shadow-xl"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <h2 className="text-2xl font-bold">Menu</h2>
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
