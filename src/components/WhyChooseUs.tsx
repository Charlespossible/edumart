import React from 'react';
import { FaSmile , FaWifi , FaMobile } from 'react-icons/fa';

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
          <FaSmile className="text-[#97c966] text-4xl mb-4" />
          <h5 className="text-xl font-semibold mb-2">We help you to pass</h5>
          <p className="text-gray-600">
          We provide you with all the explanations with the best tools that help students to pass their exams.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md w-full md:w-1/3 text-center">
          <FaWifi className="text-[#97c966] text-4xl mb-4" />
          <h5 className="text-xl font-semibold mb-2">Practice Anywhere</h5>
          <p className="text-gray-600">
            You can practice the exams anywhere and anytime with our online platform.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md w-full md:w-1/3 text-center">
          <FaMobile className="text-[#97c966] text-4xl mb-4" />
          <h5 className="text-xl font-semibold mb-2">Mobile friendly</h5>
          <p className="text-gray-600">
            Our platform is mobile friendly, so you can practice the exams on your mobile phone.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
