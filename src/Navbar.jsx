import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from "react-icons/fi";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { path: '/add-trip', label: 'Home' },
    { path: '/trips', label: 'Your Trips' },
    { path: '/summary', label: 'Trip Summary' },
    { path: '/itinerary', label: 'Itinerary' },
  ];

  return (
    <nav className="shadow-lg backdrop-blur-md rounded-2xl mb-8 border border-gray-200">
      <div className="px-4 py-4 flex items-center gap-10 justify-between"> 
        <h1 className="text-2xl font-bold text-blue-700">
          TripPlanner
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-lg text-white">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className="hover:text-black transition hover:bg-white  rounded-md"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-transparent shadow-lg rounded-b-xl">
          <ul className="flex flex-col items-center py-4 space-y-4 text-md text-white">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-blue-600 transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}