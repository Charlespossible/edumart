import React from "react";
import type { Testimonial } from "../types/testimonial";

interface TestimonialProps {
  testimonials: Testimonial[];
}

const Testimonial: React.FC<TestimonialProps> = ({ testimonials }) => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          What Our Users Say
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Students, teachers and parents have good things to say about Edumart.
        </p>
      </div>
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-gray-50 p-6 rounded-lg shadow-md text-center"
          >
            <img
              className="mx-auto h-20 w-20 rounded-full object-cover"
              src={testimonial.image}
              alt={testimonial.name}
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              {testimonial.name}
            </h3>
            <p className="text-sm text-[#97c966] ">{testimonial.role}</p>
            <p className="mt-3 text-[#78846f] italic">
              "{testimonial.message}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
