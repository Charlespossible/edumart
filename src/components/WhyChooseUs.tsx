import React from 'react';
import { FaStar, FaShieldAlt, FaUserTie } from 'react-icons/fa';

const WhyChooseUs: React.FC = () => {
  return (
    <section className="bg-white py-12 px-6">
      {/* Heading */}
      <h4 className="text-2xl font-bold text-center mb-0" >Why Choose Us</h4>
      <hr className="border-b-4 border-[#97c966] mt-8 mb-16 w-2/12 mx-auto" ></hr>

      {/* Features Container */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        {/* Feature 1 */}
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md w-full md:w-1/3 text-center">
          <FaStar className="text-[#97c966] text-4xl mb-4" />
          <h5 className="text-xl font-semibold mb-2">Top Quality</h5>
          <p className="text-gray-600">
            We ensure top-notch quality in everything we deliver, meeting the highest standards.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md w-full md:w-1/3 text-center">
          <FaShieldAlt className="text-[#97c966] text-4xl mb-4" />
          <h5 className="text-xl font-semibold mb-2">Secure & Reliable</h5>
          <p className="text-gray-600">
            Security and reliability are at the core of our services, ensuring peace of mind.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md w-full md:w-1/3 text-center">
          <FaUserTie className="text-[#97c966] text-4xl mb-4" />
          <h5 className="text-xl font-semibold mb-2">Expert Team</h5>
          <p className="text-gray-600">
            Our team of experts brings experience and knowledge to deliver the best results.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
