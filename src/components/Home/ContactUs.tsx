"use client";
import React, { ChangeEvent, useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Your message has been submitted!");
  };

  return (
    <div className="font-sans bg-gray-50">
      <main className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          {/* Contact Us Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
            <p className="mt-4 text-gray-600 text-lg">
              {
                "We'd love to hear from you! Please fill out the form below to get in touch with us."
              }
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Write your message here"
                  rows={4}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors duration-200"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Address Section */}
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              Our Address
            </h2>
            <p className="mt-4 text-gray-600">
              123 Farm Lane, Rural Town, State, 123456
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
