
import React from "react";
import { FaGithubSquare, FaInstagramSquare, FaLinkedin,  FaTwitterSquare,} from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between gap-5 items-center">
            <div className="flex gap-3 text-2xl">
              <FaInstagramSquare className="cursor-pointer rounded-xl" />
              <FaTwitterSquare className="cursor-pointer rounded-xl" />
              <FaGithubSquare className="cursor-pointer rounded-xl" />
              <FaLinkedin className="cursor-pointer rounded-xl" />
            </div>
            <div className="text-center  text-sm">
              <p>&copy; 2025 Argocart. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
