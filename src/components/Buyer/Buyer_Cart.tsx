"use client";

import Image from "next/image";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import images from "@/../public/images/image.png";
import { useCart } from "../extra/CartContext";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const Buyer_Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [selectState, setSelectState] = useState("none");

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const changeQunatity = (numVal: number, itemId: string) => {
    updateQuantity(itemId, numVal);
  };

  const procedToPayment = () => {};
  return (
    <div className="font-sans bg-gray-50 relative">
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
      >
        <FaShoppingCart className="text-xl" />
      </button>

      {/* Cart Drawer */}
      <div
        className={`fixed z-40 top-0 right-0 w-screen h-screen bg-gray-100 transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 hover:text-red-500 transition-colors text-xl"
          >
            <RxCross1 />
          </button>
        </div>

        {/* Cart Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-6 h-[calc(100%-80px)]">
          {/* Cart Items Section */}
          <div className="md:col-span-2 bg-white rounded-xl shadow p-4 overflow-y-auto max-h-[calc(100vh-150px)]">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">
                Your cart is empty.
              </p>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-4 items-center gap-6 border-b pb-4"
                  >
                    {/* Product Image + Name */}
                    <div className="col-span-2 flex items-center gap-4">
                      <Image
                        src={item.image || images}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                      >
                        −
                      </button>
                      <div className="w-35 border px-3 rounded p-1 flex items-center gap-2 justify-items-start ">
                        <input
                          className="w-20 border-none outline-none"
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            changeQunatity(e.target.valueAsNumber, item.id)
                          }
                        />
                        <span>KG</span>
                      </div>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>

                    {/* Price + Remove + transport */}

                    <div className="text-right">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                      <p className="mt-2 font-medium">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout Summary */}
          <div className="md:col-span-1 bg-white rounded-xl shadow p-6 h-fit sticky top-28">
            <h3 className="text-xl font-semibold mb-4">Payout</h3>
            <div className="flex justify-between text-lg font-medium mb-6">
              <span>Total:</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="mb-6">
              <select
                value={selectState}
                onChange={(e) => setSelectState(e.target.value)}
                className="w-full border p-2"
              >
                <option value="none">Select Transport Type</option>
                <option value="farmerTrans">Transport by Farmer</option>
                <option value="buyerTrans">Transport by Buyer</option>
              </select>
            </div>
            
            {selectState == "buyerTrans" ? (
              <button
                onClick={() => procedToPayment()}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-lg"
              >
                Proceed to Pay
              </button>
            ) : (
              <button
                onClick={() => procedToPayment()}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-lg"
              >
                Order Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buyer_Cart;
