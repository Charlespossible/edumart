import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import EdumartLogo from "../assets/images/EdumartLogo.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login status
  const [userFirstName, setUserFirstName] = useState(""); // Stores user's first name
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For dropdown visibility
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserFirstName(user.firstName);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle "Get Started" button click
  const handleGetStarted = () => {
    navigate("/login");
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserFirstName("");
    navigate("/login");
  };

  return (
    <nav className="bg-[#97c966] shadow-md sticky top-0 z-50 h-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <img
                src={EdumartLogo}
                alt="Project Logo"
                className="h-11 w-auto object-contain"
              />
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-12 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-normal text-lg text-white hover:text-[#78846f] ${
                  isActive ? "font-normal text-white" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `font-normal text-lg text-white hover:text-[#78846f]  ${
                  isActive ? "font-normal text-white" : ""
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/exam"
              className={({ isActive }) =>
                `font-normal text-lg text-white hover:text-[#78846f]  ${
                  isActive ? "font-normal text-blue-500" : ""
                }`
              }
            >
              Exams
            </NavLink>
            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                `font-normal text-lg text-white hover:text-[#78846f]  ${
                  isActive ? "font-normal text-blue-500" : ""
                }`
              }
            >
              LeaderBoard
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `font-normal text-lg text-white hover:text-[#78846f]  ${
                  isActive ? "font-normal text-blue-500" : ""
                }`
              }
            >
              Pricing
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `font-normal text-lg text-white hover:text-[#78846f]  ${
                  isActive ? "font-normal text-blue-500" : ""
                }`
              }
            >
              Contact
            </NavLink>

            {/* Conditional Rendering based on login status */}
            {isLoggedIn ? (
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <div className="flex items-center space-x-2 cursor-pointer">
                  <span className="text-white font-semibold">{userFirstName}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleGetStarted}
                className="bg-white text-[#97c966] font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition duration-300"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="font-extrabold text-lg text-white hover:text-[#78846f] focus:outline-none"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 6.75h16.5m-16.5 6.75h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-[#97c966] py-4">
            <div className="flex flex-col space-y-2 mt-4">
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-white hover:text-[#78846f] ${
                    isActive ? "font-normal text-[#97c966]" : ""
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-white hover:text-[#78846f] ${
                    isActive ? "font-normal text-[#97c966]" : ""
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/exam"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-white hover:text-[#78846f] ${
                    isActive ? "font-normal text-blue-500" : ""
                  }`
                }
              >
                Exams
              </NavLink>
              <NavLink
                to="/leaderboard"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-white hover:text-[#78846f] ${
                    isActive ? "font-normal text-blue-500" : ""
                  }`
                }
              >
                Leaderboard
              </NavLink>
              <NavLink
                to="/pricing"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-white hover:text-[#78846f] ${
                    isActive ? "font-normal text-blue-500" : ""
                  }`
                }
              >
                Pricing
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-white hover:text-[#78846f] ${
                    isActive ? "font-normal text-blue-500" : ""
                  }`
                }
              >
                Contact
              </NavLink>

              {/* Conditional rendering for mobile menu */}
              {isLoggedIn ? (
                <div className="relative">
                  <div
                    className="flex items-center justify-between px-4 py-2 text-white cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span>{userFirstName}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                  {isDropdownOpen && (
                    <div className="mt-2 space-y-2">
                      <button
                        onClick={() => {
                          navigate("/dashboard");
                          setIsOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-white hover:bg-[#78846f]"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-white hover:bg-[#78846f]"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleGetStarted();
                    setIsOpen(false);
                  }}
                  className="bg-[#97c966] text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition duration-300"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;