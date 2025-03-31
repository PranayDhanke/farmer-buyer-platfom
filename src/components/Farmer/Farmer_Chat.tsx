"use client"
import { useState } from "react";
import { FaSearch, FaPaperPlane, FaTrash } from "react-icons/fa";

interface Contact {
  id: number;
  name: string;
  image: string;
}

interface Message {
  id: number;
  sender: "user" | "contact";
  text: string;
}

const ChatApp = () => {
  // States for contacts and chat messages
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: "John Doe", image: "/path/to/image.jpg" },
    { id: 2, name: "Jane Smith", image: "/path/to/image.jpg" },
    { id: 3, name: "Michael", image: "/path/to/image.jpg" },
  ]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  // Select a contact and load the chat messages
  const selectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setMessages([]); // Clear the chat for the new contact (for demo purposes)
  };

  // Send a new message
  const sendMessage = () => {
    if (newMessage.trim() !== "" && selectedContact) {
      const newMessageObj: Message = {
        id: Date.now(),
        sender: "user",
        text: newMessage,
      };
      setMessages((prevMessages) => [...prevMessages, newMessageObj]);
      setNewMessage(""); // Clear input field after sending
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Contacts List */}
      <div className="w-1/3 bg-gray-100 p-4">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search contacts"
            className="w-full p-2 border border-gray-300 rounded-l-md"
          />
          <button className="bg-green-600 text-white p-2 rounded-r-md">
            <FaSearch />
          </button>
        </div>

        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer"
              onClick={() => selectContact(contact)}
            >
              <img
                src={contact.image}
                alt={contact.name}
                className="w-12 h-12 object-cover rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold">{contact.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Chat Window */}
      <div className="w-2/3 bg-white p-6 flex flex-col">
        {selectedContact ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{selectedContact.name}</h2>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg shadow-sm ${
                      message.sender === "user"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mr-3"
                placeholder="Type a message"
              />
              <button
                onClick={sendMessage}
                className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <FaPaperPlane />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">Select a contact to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
