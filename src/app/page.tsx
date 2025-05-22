
import CookieConsent from "@/components/extra/CookieConsent";
import Footer from "@/components/Home/Footer";
import Header from "@/components/Home/Header";
import Home from "@/components/Home/Home";
import React from "react";

const Component = () => {
  return (
    <div >
      <Header />
      <CookieConsent />
      <Home />
      <Footer />
    </div>
  );
};

export default Component;
