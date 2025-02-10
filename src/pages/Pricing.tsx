import React from "react";
import PricingTable from "../components/PricingTable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Pricing: React.FC = () => {
  return (
    <div>
      <Navbar />
      <PricingTable />
      <Footer />
    </div>
  );
};

export default Pricing;
