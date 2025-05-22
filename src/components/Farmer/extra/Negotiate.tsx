import React, { ChangeEvent, useState } from "react";

const Negotiate = ({ id }: { id: string }) => {
  const [price, setPrice] = useState("");

  const [disable, setDisable] = useState(false);

  const SendRequest = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const priceValue = parseFloat(price);
    if (priceValue > 0) {
      alert(id + priceValue);
      setDisable(true);
    }
  };
  return (
    <div className=" mx-auto  p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Negotiate Price
      </h2>
      <form onSubmit={SendRequest}>
        <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
          Enter the amount you want per <span className="font-bold">kg</span>:
        </label>
        <input
          type="number"
          id="price"
          name="price"
          required
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          className="border border-gray-300 w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="Enter amount in ₹"
        />
        <button
          type="submit"
          disabled={disable}
          className={`w-full mt-5 bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 rounded-lg transition-colors duration-300 ${disable ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {disable ? "Sended" : "Send Request"}
        </button>
      </form>
    </div>
  );
};

export default Negotiate;
