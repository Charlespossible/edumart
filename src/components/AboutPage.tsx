import React from "react";
import aboutimg from "../assets/images/aboutimg.jpg";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full flex flex-col md:flex-row mt-12">
        
        {/* Right Section */}
        <div className="md:w-1/2 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">What is Edumart?</h1>
          <p className="text-gray-600 mb-6">
            Edumart prepares students writing JAMB, WAEC, NECO, and GCE exams to
            pass in one sitting!
          </p>
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Good Reasons Why You Should Use the Edumart CBT App:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Pass your JAMB, WAEC, NECO, and GCE in one sitting.</li>
            <li>Well-explained solutions.</li>
            <li>Diagrams, tables, and graphs included.</li>
            <li>
              Access over 10,000 offline past exam questions for JAMB, WAEC
              (including SSCE/GCE), and NECO with their past question solutions.
            </li>
            <li>Contains JAMB CBT, WAEC, and NECO standard Calculator.</li>
            <li>Edumart helps you to get familiar with how JAMB CBT feels.</li>
            <li>Lots of subjects and years are available in the CBT app.</li>
            <li>
              Access the latest news about your Examinations (JAMB, NECO, WAEC,
              including SSCE/GCE) or preferred institution of choice.
            </li>
          </ul>
          <p className="text-gray-600 mt-4">
            Practicing properly with the Edumart CBT app ensures you pass with
            good grades in your JAMB, NECO, WAEC (SSCE/GCE) exams.
          </p>
        </div>

            {/* Left Section */}
        <div className="md:w-1/2 p-6 flex flex-col items-center">
          <img
            src={aboutimg}
            alt="Edumart Illustration"
            className="w-full rounded-lg"
          />
          <div className="mt-4 text-center">
            <div className="bg-[#97c966] text-white px-4 py-2 rounded-lg">
              🎉 Our Mobile App Coming Soon!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
