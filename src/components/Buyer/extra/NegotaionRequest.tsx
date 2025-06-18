"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/app/lib/superbase/supabaseClient";
import imgs from "@/../public/images/image.png";
import { VscLoading } from "react-icons/vsc";
import { BiTrash } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/extra/CartContext";
import { toast, ToastContainer } from "react-toastify";

const NegotiationRequest = () => {
  const { addToCart, cart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([
    {
      id: "",
      FarmerName: "",
      prodId: "",
      prod_name: "",
      imageUrl: "",
      Origprice: 0,
      NegoPrice: 0,
      accept: false,
      reject: false,
      quantity: 0,
      FarmerUid: "",
      name: "",
      category:"",
      description:""
    },
  ]);

  useEffect(() => {
    const supabaseUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.id) {
        const res = await fetch("/api/Negotiation/getBuyer", {
          method: "POST",
          body: JSON.stringify({ uid: user.id }),
        });

        if (res.ok) {
          const buyerData = await res.json();
          setRequests(buyerData.requests);
        }
      }
      setLoading(false);
    };

    supabaseUser();
  }, []);

  const setDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this request?"
    );
    if (confirmDelete) {
      const res = await fetch("/api/Negotiation/delete", {
        method: "POST",
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert("Request deleted successfully");
        router.refresh();
      }
    }
  };

  const addCart = (
    id: string,
    name: string,
    price: number,
    quantity: number,
    image: string,
    availableQuantity: number,
    uid: string,
    prod_name: string,
    category:string,
    description:string
  ) => {
    const cartItem = cart.find((item) => item.id === id);
    const alreadyInCart = cartItem ? cartItem.quantity : 0;

    const product = requests.find((p) => p.id === id);
    if (!product) {
      toast.error("Product not found");
      return;
    }

    if (alreadyInCart + quantity > product.quantity) {
      toast.warn(`Only ${product.quantity - alreadyInCart} kg left to add.`);
      return;
    }

    addToCart({
      id,
      name,
      price,
      quantity,
      image,
      availableQuantity,
      uid,
      prod_name,
      category,
      description
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Negotiation Requests
      </h1>
      <ToastContainer />

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <VscLoading className="text-3xl text-gray-500 animate-spin" />
        </div>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No negotiation requests found.
        </p>
      ) : (
        <div className="grid gap-6">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-xl shadow-sm p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              {/* Product Image */}
              <div className="w-24 h-24 relative flex-shrink-0">
                <Image
                  src={req.imageUrl || imgs}
                  alt={req.prod_name}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 w-full">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                  {req.prod_name}
                </h2>
                <p className="text-gray-600 mt-1">
                  Farmer:{" "}
                  <span className="font-medium text-gray-900">
                    {req.FarmerName}
                  </span>
                </p>
                <div className="flex flex-wrap gap-6 mt-3 text-gray-700 text-sm md:text-base">
                  <p>
                    Original Price:{" "}
                    <span className="font-medium text-black">
                      ₹{req.Origprice}
                    </span>
                  </p>
                  <p>
                    Negotiated Price:{" "}
                    <span className="font-medium text-black">
                      ₹{req.NegoPrice}
                    </span>
                  </p>
                </div>
              </div>

              {/* Status & Action */}
              <div className="flex flex-col items-start sm:items-end gap-2 sm:min-w-[150px]">
                <BiTrash
                  onClick={() => setDelete(req.id)}
                  className="text-xl text-gray-500 hover:text-red-600 transition cursor-pointer mt-1"
                />
                {req.accept ? (
                  <>
                    <span className="bg-green-100 text-green-700 font-semibold text-sm px-4 py-1.5 rounded-md">
                      Accepted
                    </span>
                    <div>
                      <button
                        onClick={() => {
                          addCart(
                            req.prodId,
                            req.name,
                            req.NegoPrice,
                            1,
                            req.imageUrl,
                            req.quantity,
                            req.FarmerUid,
                            req.prod_name,
                            req.category,
                            req.description
                          );
                        }}
                        className="bg-yellow-200 text-yellow-800 cursor-pointer hover:bg-yellow-300 transition font-semibold text-sm px-4 py-1.5 rounded-md"
                      >
                        Order Now
                      </button>
                    </div>
                  </>
                ) : req.reject ? (
                  <span className="bg-red-100 text-red-700 font-semibold text-sm px-4 py-1.5 rounded-md">
                    Rejected
                  </span>
                ) : (
                  <span className="bg-orange-100 text-orange-600 font-semibold text-sm px-4 py-1.5 rounded-md">
                    Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NegotiationRequest;
