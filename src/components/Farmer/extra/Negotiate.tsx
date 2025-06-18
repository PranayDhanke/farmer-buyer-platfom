import { supabase } from "@/app/lib/superbase/supabaseClient";
import React, { ChangeEvent, useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { toast } from "react-toastify";

const Negotiate = ({ id }: { id: string }) => {
  const [price, setPrice] = useState("");
  const [disable, setDisable] = useState(false);

  const [buyerid, setBuyerId] = useState("");
  const [buyerName, setBuyerNmae] = useState("");

  const [loader, setLoader] = useState(false);

  const [newProduct, setNewProduct] = useState({});

  useEffect(() => {
    const getBuyer = async () => {
      const {
        data: { user: supabaseUser },
      } = await supabase.auth.getUser();

      if (supabaseUser?.id) {
        setBuyerId(supabaseUser.id);
        const buyerName = supabaseUser?.user_metadata?.full_name || "Buyer";
        setBuyerNmae(buyerName);
      }
    };
    getBuyer();

    const loadEdit = async () => {
      try {
        const docId = id;
        const res = await fetch(`/api/Farmer/Product/getSingle`, {
          method: "POST",
          body: JSON.stringify({ id: docId }),
        });

        if (res.ok) {
          const data = await res.json();
          const subdata = data.product;
          setNewProduct(subdata);
        }
      } catch {
        toast.error("Error while Loading the product data");
      }
    };

    loadEdit();
  }, [id]);

  const SendRequest = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const priceValue = parseFloat(price);
    setLoader(true);
    const res = await fetch("/api/Negotiation/request", {
      method: "POST",
      body: JSON.stringify({ newProduct, buyerid, buyerName, id, priceValue }),
    });

    if (res.ok) {
      alert("SENDED");
      setLoader(false);
      setDisable(true);
    }
  };
  return (
    <div className=" mx-auto p-6">
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
          className={`w-full mt-5 bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 rounded-lg transition-colors duration-300 ${
            disable ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {!disable ? (
            loader ? (
              <VscLoading className="animate-spin text-center mx-auto text-xl" />
            ) : (
              "Send Request"
            )
          ) : (
            "Sended"
          )}
        </button>
      </form>
    </div>
  );
};

export default Negotiate;
