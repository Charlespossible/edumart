import React, { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface PricingPlan {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
}

const pricingPlans: PricingPlan[] = [
  {
    title: "Annualy",
    price: "₦1,000",
    features: ["Access to all exams", "Email support", "1 user"],
    buttonText: "Buy Now",
  },
];

const PricingTable: React.FC = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("accessToken"); // Check login status

  // Paystack configuration
  const config = {
    reference: new Date().getTime().toString(),
    email: "user@example.com", // Replace with authenticated user's email
    amount: 100000, // ₦1,000 in kobo
    publicKey: "your_paystack_public_key", // Replace with your Paystack public key
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = async (reference: any) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        "http://localhost:5000/api/subscription",
        { reference: reference.reference, amount: 1000 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowPaymentModal(false);
      toast.success("Payment successful! Your subscription is active.");
    } catch (error) {
      console.error("Error recording subscription:", error);
      toast.error("Payment successful, but subscription recording failed.");
    }
  };

  const onClose = () => {
    setShowPaymentModal(false);
    toast.error("Payment was not completed.");
  };

  const handleBuyNowClick = (plan: PricingPlan) => {
    if (!isAuthenticated) {
      toast.info("Please log in to subscribe.");
      navigate("/login");
      return;
    }
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  return (
    <div className="bg-gray-100 py-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Our Pricing Plan
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-4">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className="w-full md:w-1/3 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">{plan.title}</h3>
            <p className="text-4xl font-bold text-gray-800 mb-4">{plan.price}</p>
            <ul className="mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="text-gray-600 text-sm mb-2 flex items-center gap-2">
                  <span className="text-[#97c966]">✔</span> {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleBuyNowClick(plan)}
              className="bg-[#97c966] text-white px-6 py-2 rounded-lg hover:bg-[#97c966] transition-colors"
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      {showPaymentModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Confirm Payment</h3>
            <p className="text-gray-600 mb-4">
              You are about to purchase the <span className="font-bold">{selectedPlan.title}</span> plan for{" "}
              <span className="font-bold">{selectedPlan.price}</span>.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => initializePayment({ onSuccess, onClose })}
                className="bg-[#97c966] text-white px-4 py-2 rounded-lg hover:bg-[#97c966] transition-colors"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />
    </div>
  );
};

export default PricingTable;