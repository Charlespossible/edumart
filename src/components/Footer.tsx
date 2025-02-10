import React from "react";
import { NavLink } from "react-router-dom";
import { FooterLink, SocialLink } from "../types/footer";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import EdumartLogo from "../assets/images/EdumartLogo.png";

const footerLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Exams", href: "/exams" },
  { label: "Pricing", href: "/pricing" },
  { label: "LeaderBoard", href: "/leaderboard" },
  { label: "Register", href: "/register" },
  { label: "Login", href: "/login" },
  { label: "Contact", href: "/contact" },
];

const socialLinks: SocialLink[] = [
  { icon: <FaFacebook className="text-xl" />, href: "https://facebook.com" },
  { icon: <FaTwitter className="text-xl" />, href: "https://twitter.com" },
  { icon: <FaLinkedin className="text-xl" />, href: "https://linkedin.com" },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#97c966] text-white py-10">
      <div className="container mx-auto px-6">
        {/* Footer Top */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          {/* Brand Info */}
          <div className="w-full md:w-1/3 text-center md:text-left mb-6 md:mb-0">
            <NavLink to="/" className="flex items-center">
              <img
                src={EdumartLogo}
                alt="Project Logo"
                className="h-11 w-auto object-contain"
              />
            </NavLink>
            <p className="mt-2 text-sm text-white">
              Your trusted platform for exam preparation.
            </p>
          </div>

          {/* Footer Links */}

          <div className="w-full md:w-1/3 flex justify-center">
            <ul className="flex flex-wrap justify-center space-x-4 md:space-x-6">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `text-white transition ${
                        isActive
                          ? "font-bold text-[#78846f]"
                          : "hover:text-[#78846f]"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            <ul className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-50 hover:text-white transition"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white pt-6 text-center">
          <p className="text-white font-bold text-lg">
            &copy; {currentYear} Edummart CBT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
