import React from "react";
import examboys from "../assets/images/examboys.jpg"
//import TypingEffect from 'react-typing-effect';


const Hero: React.FC = () => {
  return (
    <section
      className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${examboys})`, 
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#dcedc8] bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white p-6 max-w-2xl">
        <h1 className="text-2xl md:text-6xl font-bold mb-4">
          Edumart CBT
        </h1>
        <p className="text-lg md:text-xl ">
        Practice ahead for your upcoming exams.
        </p>
        <h6 className="text-sm sm:text-xl">
            Pass in one sitting
        </h6>
        <button className="bg-[#97c966] rounded-full text-white px-6 py-3 mt-8 font-semibold" >Sign Up Now</button>
      </div>
    </section>
  );
};

export default Hero;
