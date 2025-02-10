import React from "react";


interface PricingPlan {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
}

const pricingPlans: PricingPlan[] = [
  {
    title: "Monthly",
    price: "₦1,000",
    features: ["Access to all exams", "Email support", "1 user"],
    buttonText: "Buy Now",
  },
  {
    title: "Bi-Annually",
    price: "₦5,000",
    features: ["Access to all exams", "Email support", "1 user"],
    buttonText: "Buy Now",
  },
  {
    title: "Annually",
    price: "₦10,000",
    features: [
      "Access to all exams",
      "Email support",
      "1 user",
    ],
    buttonText: "Buy Now",
  },
];

const PricingTable: React.FC = () => {
  return (
    <div className="bg-gray-100 py-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Our Pricing Plans
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-4">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className="w-full md:w-1/3 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              {plan.title}
            </h3>
            <p className="text-4xl font-bold text-gray-800 mb-4">
              {plan.price}
              <span className="text-lg font-normal text-gray-600"></span>
            </p>
            <ul className="mb-6">
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="text-gray-600 text-sm mb-2 flex items-center gap-2"
                >
                  <span className="text-[#97c966]">✔</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="bg-[#97c966] text-white px-6 py-2 rounded-lg hover:bg-[#97c966] transition-colors">
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingTable;
