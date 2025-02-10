import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import { RegistrationFormData } from "../types/RegistrationForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Register: React.FC = () => {
  const handleRegister = (data: RegistrationFormData) => {
    console.log("Registration data submitted:", data);
    // Implement backend integration later
  };

  return (
    <div>
      <Navbar />
      <RegistrationForm onSubmit={handleRegister} />
      <Footer />
    </div>
  );
};

export default Register;
