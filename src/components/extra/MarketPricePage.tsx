"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RealPriceSkeleton from "../skeleton/RealPriceSkeleton";

export default function MarketPrices() {
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState([ { commodity: "", modal_price: 0, state: "", district: "" , market: "" }]);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_FARMER_API_KEY;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${key}&format=json&limit=1000&filters%5Bstate.keyword%5D=Maharashtra`
        );

        if (res.ok) {
          const data = await res.json();

          console.log(data);
          
          setPrices(data.records);
        }else{
          setPrices([]);
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtered results based on search
  const filteredPrices = prices.filter(
    (item) =>
      item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.market.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredPrices.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredPrices.length / rowsPerPage);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Real-Time Market Prices
          </h2>
          <p className="text-gray-600 mt-2">
            Search and explore the latest prices across Maharashtra.
          </p>
        </div>

        <div className="mb-6 text-center">
          <input
            type="text"
            placeholder="Search by commodity , market or district..."
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to page 1 on new search
            }}
          />
        </div>

        {loading ? (
          <RealPriceSkeleton />
        ) : (
          <>
            <div className="overflow-x-auto mx-auto">
              <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden">
                <thead className="bg-green-100 text-left text-gray-700 text-sm uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3 border">#</th>
                    <th className="px-6 py-3 border">Commodity</th>
                    <th className="px-6 py-3 border">Price (₹)</th>
                    <th className="px-6 py-3 border">Market</th>
                    <th className="px-6 py-3 border">District</th>
                    <th className="px-6 py-3 border">State</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((item, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="hover:bg-green-50 transition-colors"
                    >
                      <td className="px-6 py-3 border text-sm text-gray-700">
                        {indexOfFirstRow + index + 1}
                      </td>
                      <td className="px-6 py-3 border text-sm font-medium text-gray-800">
                        {item.commodity}
                      </td>
                      <td className="px-6 py-3 border text-sm text-green-600 font-semibold">
                        ₹{item.modal_price}
                      </td>
                       <td className="px-6 py-3 border text-sm text-green-600 font-semibold">
                        {item.market}
                      </td>
                      <td className="px-6 py-3 border text-sm text-gray-700">
                        {item.district}
                      </td>
                      <td className="px-6 py-3 border text-sm text-gray-700">
                        {item.state}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {filteredPrices.length === 0 && (
                <p className="text-center text-gray-500 mt-4">
                  No matching records found.
                </p>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center items-center space-x-2 flex-wrap">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`px-3 py-1 text-sm rounded border ${
                      currentPage === i + 1
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
