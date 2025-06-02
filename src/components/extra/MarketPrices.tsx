"use client";
import { useEffect, useState } from "react";
import { FaLeaf, FaRupeeSign } from "react-icons/fa";
import { motion } from "framer-motion";
import RealPriceSkeleton from "../skeleton/RealPriceSkeleton";

export default function MarketPrices() {
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState([
    { commodity: "", modal_price: 0, state: "", district: "" },
  ]);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_FARMER_API_KEY;
    const fetDate = async () => {
      const res = await fetch(
        `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${key}&format=json&limit=8&filters%5Bstate.keyword%5D=Maharashtra`,
        {
          method: "GET",
        }
      );

      if (res.ok) {
        const data = await res.json();
        const dataRecords = data.records;
        setPrices(dataRecords);
        setLoading(false);
      }else{
         setPrices([]);
        setLoading(false);
      }
    };
    fetDate();
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Real-Time Market Prices
          </h2>
          <p className="text-gray-600 mt-2">
            Stay updated with the latest market prices across regions.
          </p>
        </div>

        {loading ? (
          <RealPriceSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {prices.map((item, index) => (
              <motion.div
                key={index}
                className="bg-green-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="flex items-center mb-3">
                  <FaLeaf className="text-green-600 text-xl mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.commodity}
                  </h3>
                </div>
                <div className="flex items-center text-gray-700 mb-1">
                  <FaRupeeSign className="mr-1 text-green-500" />
                  <p className="text-lg font-medium">{item.modal_price}</p>
                </div>
                <p className="text-sm text-gray-500">
                  Location: {item.district}, {item.state}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
