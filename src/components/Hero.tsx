import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import examboys from "../assets/images/examboys.jpg";

const Hero: React.FC = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  return (
    <section
      className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${examboys})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#a4b394] bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white p-6 max-w-2xl">
        <h1 className="text-2xl md:text-6xl font-bold mb-4">
          <TypeAnimation
            sequence={['Edumart CBT', () => setShowSubtitle(true)]}
            speed={50}
            cursor={false}
            className="inline-block"
          />
        </h1>

        {showSubtitle && (
          <p className="text-lg md:text-xl font-bold mb-4">
            <TypeAnimation
              sequence={[
                'Practice ahead for your upcoming exams.',
                () => setShowTagline(true),
              ]}
              speed={40}
              cursor={false}
              className="inline-block"
            />
          </p>
        )}

        {showTagline && (
          <h6 className="text-sm sm:text-xl font-bold">
            <TypeAnimation
              sequence={['Pass in one sitting']}
              speed={30}
              cursor={false}
              className="inline-block"
            />
          </h6>
        )}

        <button className="bg-[#97c966] rounded-full text-white px-6 py-3 mt-8 font-semibold">
          <a href="/register">Sign Up Now</a>
        </button>
      </div>
    </section>
  );
};

export default Hero;