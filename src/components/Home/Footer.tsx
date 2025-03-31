import Image from "next/image";
import Link from "next/link";
import React from "react";

import Logo from "../../../public/images/image.png"

const Footer = () => {
  return (
      <div>
        <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Image
                src={Logo}
                alt="Argocart Logo"
                className="w-10 h-10 mr-3"
              />
              <p className="text-lg font-semibold">Argocart</p>
            </div>
            <nav className="flex space-x-6">
              <Link href="/placeholder">
                <span className="hover:text-green-200 transition-colors duration-200">
                  Home
                </span>
              </Link>
              <Link href="/placeholder">
                <span className="hover:text-green-200 transition-colors duration-200">
                  About Us
                </span>
              </Link>
              <Link href="/placeholder">
                <span className="hover:text-green-200 transition-colors duration-200">
                  Products
                </span>
              </Link>
              <Link href="/placeholder">
                <span className="hover:text-green-200 transition-colors duration-200">
                  Contact
                </span>
              </Link>
            </nav>
          </div>
          <div className="text-center mt-6 text-sm">
            <p>&copy; 2025 Argocart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
