import { useState } from "react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";

const Buyer_Cart = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  
  // Sample cart data (you should replace this with actual data, possibly passed in as props or fetched)
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Product 1",
      farmer: "Farmer A",
      price: 100,
      quantity: 2,
      image: "/path/to/image.jpg"
    },
    {
      id: 2,
      name: "Product 2",
      farmer: "Farmer B",
      price: 200,
      quantity: 1,
      image: "/path/to/image2.jpg"
    }
  ]);

  const removeFromCart = (productId: number) => {
    // Remove item from the cart
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleQuantityChange = (productId: number, action: "increase" | "decrease") => {
    setCart(cart.map(item => 
      item.id === productId ? {
        ...item,
        quantity: action === "increase" ? item.quantity + 1 : item.quantity > 1 ? item.quantity - 1 : 1
      } : item
    ));
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="font-sans bg-gray-50 relative z-10">
      <main className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110"
          >
            <FaShoppingCart className="text-xl" />
          </button>
        </div>
      </main>

      {/* Side Cart Drawer */}
      <div
        className={`fixed z-10 top-0 right-0 min-w-min h-screen bg-white shadow-lg overflow-y-auto scrollbar-hide p-6 transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-600">
            <FaTrash />
          </button>
        </div>

        {cart.length > 0 ? (
          <>
            {/* Cart items area with scrolling */}
            <div className="space-y-4 overflow-y-auto max-h-[400px]">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-50 p-5 rounded-lg shadow-sm"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-gray-600">Farmer: {item.farmer}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(item.id, "decrease")}
                      className="bg-gray-300 px-2 py-1 rounded text-lg"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, "increase")}
                      className="bg-gray-300 px-2 py-1 rounded text-lg"
                    >
                      +
                    </button>
                    <span className="ml-4 text-gray-700">₹{item.price * item.quantity}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <span className="text-lg font-bold">Total: ₹{totalAmount}</span>
            </div>

            {/* Payment Method */}
            <div className="mt-6">
              <label htmlFor="payment-method" className="block text-gray-700 mb-2">
                Select Payment Method
              </label>
              <select
                id="payment-method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select Payment Method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="UPI">UPI</option>
                <option value="Net Banking">Net Banking</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </div>

            <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors duration-200">
              Proceed to Payment
            </button>
          </>
        ) : (
          <div className="text-center text-gray-500">Your cart is empty</div>
        )}
      </div>
    </div>
  );
};

export default Buyer_Cart;
