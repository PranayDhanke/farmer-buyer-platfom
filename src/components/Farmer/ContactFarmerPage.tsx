import React, { useState } from 'react';
import { FaPaperclip } from 'react-icons/fa';
import Link from 'next/link';

const ContactFarmerPage = () => {
  // State for chat messages and file upload
  const [messages, setMessages] = useState([
    { sender: 'Farmer', text: 'Hello! How can I help you with your orders?' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'Buyer', text: newMessage }]);
      setNewMessage('');
    }
  };

  const handleFileChange = (e:any) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleSendFile = () => {
    if (file) {
      setMessages([
        ...messages,
        { sender: 'Buyer', text: `Sent a file: ${file}` },
      ]);
      setFile(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Farmer</h2>

        <div className="border-b border-gray-300 pb-4 mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Farmer: Priya Farms</h3>
          <p className="text-gray-600">Main Crop: Basmati Rice</p>
          <p className="text-gray-600">Farm Type: Organic Farming</p>
        </div>

        {/* Chat Messages Section */}
        <div className="h-64 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === 'Buyer' ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg text-white ${
                  message.sender === 'Buyer' ? 'bg-blue-600' : 'bg-green-600'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input and File Upload Section */}
        <div className="flex items-center">
          {/* File Upload Button */}
          <label htmlFor="file-upload" className="cursor-pointer text-gray-600 mr-4">
            <FaPaperclip size={24} />
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Chat Input */}
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-lg mr-4"
            placeholder="Type a message"
          />

          {/* Send Message Button */}
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>

        {/* Send File Button */}
        {file && (
          <div className="mt-4 flex justify-between items-center">
            <span className="text-gray-600">{file}</span>
            <button
              onClick={handleSendFile}
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Send File
            </button>
          </div>
        )}

        {/* Additional Actions */}
        <div className="flex justify-between items-center mt-6">
          <Link href="/Farmer-Panel/Profile/Edit">
            <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors duration-200">
              Edit Profile
            </button>
          </Link>

          <Link href="/Farmer-Panel/">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              My Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactFarmerPage;
