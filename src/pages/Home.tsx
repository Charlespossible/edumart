import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonial from "../components/Testimonials";
import { testimonials } from "../data/testimonials";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <Testimonial testimonials={testimonials} />
      <Footer />
    </>
  );
};

export default Home;
