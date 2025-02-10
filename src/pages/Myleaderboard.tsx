import React from "react";
import Navbar from "../components/Navbar";
import Leaderboard from "../components/Leaderboard";
import Footer from "../components/Footer";

const Myleaderboard: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Leaderboard />
      <Footer />
    </div>
  );
};

export default Myleaderboard;
