import Link from "next/link";
import React from "react";
import { BiMobile } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

const ContactOpenPanel = ({
  email,
  mobile,
}: {
  email: string;
  mobile: string;
}) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Farmer</h2>

      <div className="bg-gray-100 rounded-lg p-4 hover:shadow transition duration-200 mb-4">
        <Link
          href={`mailto:${email}`}
          className="flex items-center justify-center gap-3 text-blue-600 hover:text-blue-800 font-medium"
        >
          <MdEmail size={24} />
          <span className="text-base">Email: {email}</span>
        </Link>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 hover:shadow transition duration-200">
        <Link
          href={`tel:${mobile}`}
          className="flex items-center justify-center gap-3 text-blue-600 hover:text-blue-800 font-medium"
        >
          <BiMobile size={24} />
          <span className="text-base">Mobile: {mobile}</span>
        </Link>
      </div>
    </div>
  );
};

export default ContactOpenPanel;
