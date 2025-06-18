"use client";

import Image from "next/image";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import images from "@/../public/images/image.png";
import { useCart } from "../extra/CartContext";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/superbase/supabaseClient";

const Buyer_Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectState, setSelectState] = useState("none");
  const [buyerId, setBuyerId] = useState("");
  const [buyername, setBuyerName] = useState("");

  useEffect(() => {
    const getBuyerUser = async () => {
      const {
        data: { user: supabaseUser },
      } = await supabase.auth.getUser();
      if (supabaseUser?.id) {
        setBuyerId(supabaseUser.id);
        const buyerName = supabaseUser?.user_metadata?.full_name || "Buyer";
        setBuyerName(buyerName);
      }
    };
    getBuyerUser();
  }, []);

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const changeQuantity = (val: number, itemId: string, maxQty: number) => {
    if (!isNaN(val) && val >= 1 && val <= maxQty) {
      updateQuantity(itemId, val);
    }
  };

  const proceedToPayment = async (state: string) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    if (state == "buyerTrans") {
      const walletAmount = totalAmount;
      const res = await fetch("/api/Product/Buy", {
        method: "POST",
        body: JSON.stringify({
          cart,
          state,
          result,
          walletAmount,
          buyerId,
          buyername,
        }),
      });

      if (res.ok) {
        alert("Success");
      }
    } else {
    }
  };

  return (
    <div className="relative font-sans">
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
      >
        <FaShoppingCart className="text-xl" />
      </button>

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 z-40 w-full sm:w-[90%] md:w-[80%] lg:w-[65%] h-full bg-gray-100 transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            <RxCross1 />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 p-6 overflow-y-auto h-[calc(100%-80px)]">
          {/* Items Section */}
          <div className="w-full md:w-2/3 bg-white rounded-xl shadow p-4 overflow-y-auto max-h-[calc(100vh-150px)]">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">
                Your cart is empty.
              </p>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => {
                  const maxQty = item.availableQuantity || 1;
                  return (
                    <div
                      key={item.id}
                      className="flex flex-wrap sm:flex-nowrap items-center gap-4 border-b pb-4"
                    >
                      <div className="flex items-center gap-4 w-full sm:w-1/2">
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
                      <div className="flex items-center gap-2 w-full sm:w-1/3 mt-3 sm:mt-0">
                        <button
                          onClick={() =>
                            item.quantity > 1 &&
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className={`px-2 py-1 rounded ${
                            item.quantity <= 1
                              ? "bg-gray-200 cursor-not-allowed"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                        >
                          −
                        </button>
                        <div className="border px-2 py-1 rounded flex items-center gap-1">
                          <input
                            type="number"
                            min={1}
                            max={maxQty}
                            value={item.quantity}
                            className="w-14 text-center border-none outline-none"
                            onChange={(e) =>
                              changeQuantity(
                                parseInt(e.target.value),
                                item.id,
                                maxQty
                              )
                            }
                          />
                          <span className="text-sm">KG</span>
                        </div>
                        <button
                          onClick={() =>
                            item.quantity < maxQty &&
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= maxQty}
                          className={`px-2 py-1 rounded ${
                            item.quantity >= maxQty
                              ? "bg-gray-200 cursor-not-allowed"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                        >
                          +
                        </button>
                      </div>

                      <div className="flex flex-col items-end w-full sm:w-1/6 mt-3 sm:mt-0">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                        <p className="mt-2 font-medium text-right">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Checkout Section */}
          <div className="w-full md:w-1/3 bg-white rounded-xl shadow p-6 h-fit md:sticky top-28">
            <h3 className="text-xl font-semibold mb-4">Payout</h3>
            <div className="flex justify-between text-lg font-medium mb-6">
              <span>Total:</span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="mb-6">
              <select
                value={selectState}
                onChange={(e) => setSelectState(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="none">Select Transport Type</option>
                <option value="farmerTrans">Transport by Farmer</option>
                <option value="buyerTrans">Transport by Buyer</option>
              </select>
            </div>

            <button
              onClick={() => proceedToPayment(selectState)}
              disabled={selectState === "none"}
              className={`w-full py-2 rounded text-lg text-white transition ${
                selectState === "none"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {selectState === "buyerTrans" ? "Proceed to Pay" : "Order Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buyer_Cart;
