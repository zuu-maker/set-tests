import Footer from "@/components/new-landing/Footer";
import ForSchoolHero from "@/components/new-landing/ForSchoolHero";
import ForSchoolPricing from "@/components/new-landing/ForSchoolPricing";
import Navbar from "@/components/new-landing/Navbar";
import React from "react";

function schools() {
  return (
    <div className="bg-gradient-to-br from-cyan-50 via-white to-cyan-50 min-h-screen">
      <div className="bg-pattern">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>
      <Navbar />
      <ForSchoolHero />
      <ForSchoolPricing />
      <Footer />
    </div>
  );
}

export default schools;
