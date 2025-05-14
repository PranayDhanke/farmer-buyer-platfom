// components/CookieConsent.tsx
'use client';

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookie_consent");
    if (!consent) setShowBanner(true);
  }, []);

  const handleAccept = () => {
    Cookies.set("cookie_consent", "accepted", { expires: 365 });
    setShowBanner(false);
    // Initialize tracking here if needed
  };

  const handleReject = () => {
    Cookies.set("cookie_consent", "rejected", { expires: 365 });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 w-full bg-gray-900 text-white px-6 py-4 z-50 flex flex-col md:flex-row justify-between items-center">
      <p className="mb-2 md:mb-0">We use cookies to enhance your experience. Do you accept?</p>
      <div className="flex gap-2">
        <button onClick={handleAccept} className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">
          Accept
        </button>
        <button onClick={handleReject} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
          Reject
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
