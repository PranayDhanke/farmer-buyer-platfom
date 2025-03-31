"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Logo from "../../../public/images/image.png"
import { FaUserCircle } from 'react-icons/fa' // Importing user circle icon from React Icons
import { FiChevronDown } from 'react-icons/fi' // Importing Chevron down icon
import Buyer_Cart from '../Buyer/Buyer_Cart'

const Header = () => {
  // Simulating login state for demonstration (This can be replaced with context or Redux for real use)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // true if logged in, false otherwise
  const [userType, setUserType] = useState(''); // 'farmer' or 'buyer', empty for not logged in

  return (
    <div>
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
              <span className="hover:text-green-200 transition-colors duration-200">Home</span>
            </Link>
            <Link href="/Products">
              <span className="hover:text-green-200 transition-colors duration-200">Products</span>
            </Link>
            <Link href="/farmers">
              <span className="hover:text-green-200 transition-colors duration-200">Farmers</span>
            </Link>
            <Link href="/about-us">
              <span className="hover:text-green-200 transition-colors duration-200">About</span>
            </Link>
            <Link href="/contact-us">
              <span className="hover:text-green-200 transition-colors duration-200">Contact</span>
            </Link>
          </nav>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {!isLoggedIn ? (
              // Not logged in
              <details className="relative">
                <summary className="flex items-center justify-center cursor-pointer hover:text-green-200 transition-colors duration-200">
                  <FaUserCircle className="mr-1 text-xl" /> {/* React Icon for user */}
                  Login
                  <FiChevronDown className="text-sm ml-1" /> {/* React Icon for Chevron Down */}
                </summary>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-gray-700">
                  <Link href="/login/farmer-login">
                    <span className="block px-4 py-2 hover:bg-green-100 transition-colors duration-200">Farmer Login</span>
                  </Link>
                  <Link href="/login/buyer-login">
                    <span className="block px-4 py-2 hover:bg-green-100 transition-colors duration-200">Buyer Login</span>
                  </Link>
                </div>
              </details>
            ) : userType === 'farmer' ? (
              // Farmer logged in
              <details className="relative">
                <summary className="flex items-center cursor-pointer hover:text-green-200 transition-colors duration-200">
                  <FaUserCircle className="mr-1" /> {/* React Icon for user */}
                  Farmer Profile
                  <FiChevronDown className="text-sm ml-1" /> {/* React Icon for Chevron Down */}
                </summary>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-gray-700">
                  <Link href="/Farmer-Panel/Profile">
                    <span className="block px-4 py-2 hover:bg-green-100 transition-colors duration-200">Profile</span>
                  </Link>
                  <Link href="/Farmer-Panel">
                    <span className="block px-4 py-2 hover:bg-green-100 transition-colors duration-200">My Products</span>
                  </Link>
                </div>
              </details>
            ) : userType === 'buyer' ? (
              // Buyer logged in
              <div>
                <details className="relative">
                  <summary className="flex items-center cursor-pointer hover:text-green-200 transition-colors duration-200">
                    <FaUserCircle className="mr-1" /> {/* React Icon for user */}
                    Buyer Profile
                    <FiChevronDown className="text-sm ml-1" /> {/* React Icon for Chevron Down */}
                  </summary>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-gray-700">
                    <Link href="/buyer/profile">
                      <span className="block px-4 py-2 hover:bg-green-100 transition-colors duration-200">Profile</span>
                    </Link>
                    <Link href="/buyer/my-products">
                      <span className="block px-4 py-2 hover:bg-green-100 transition-colors duration-200">My Bought Products</span>
                    </Link>
                  </div>
                </details>
              </div>
            ) : null}

            <button className="text-white border border-white rounded-full p-2 hover:bg-white hover:text-green-700 transition-colors duration-200 md:hidden">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>
      {userType == "buyer" ? <Buyer_Cart /> : null}
    </div>
  );
}

export default Header;
