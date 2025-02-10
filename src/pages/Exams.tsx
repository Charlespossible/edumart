import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Exam from "../components/Exam";

const Exams: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Exam />
      <Footer />
    </div>
  );
};

export default Exams;
