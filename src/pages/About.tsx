import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutPage from "../components/AboutPage";

const About: React.FC = () => {
  return (
    <div>
      <Navbar />
      <AboutPage />
      <Footer />
    </div>
  );
};

export default About;
