import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <nav className="bg-gradient-to-r from-[#33a7c7] via-[#6588c1] to-[#807af5] shadow-md fixed w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
         
          <div className="text-2xl font-bold text-indigo-700">LearnLoop</div>

         
          <ul className="hidden md:flex items-center space-x-10 font-medium text-white">
            <NavLink to="/">
              <li className="hover:text-indigo-700 cursor-pointer">Home</li>
            </NavLink>
            <NavLink to="/browse">
              <li className="hover:text-indigo-700 cursor-pointer">Browse Skills</li>
            </NavLink>
            <NavLink to="/notifications">
              <li className="hover:text-indigo-700 cursor-pointer">Notifications</li>
            </NavLink>
            <NavLink to="/chat">
              <li className="hover:text-indigo-700 cursor-pointer">Chat</li>
            </NavLink>

           
          </ul>

          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-[#33a7c7] via-[#6588c1] to-[#807af5] shadow-lg">
          <ul className="flex flex-col items-center space-y-4 py-4 font-medium text-white">
            <NavLink to="/" onClick={() => setIsOpen(false)}>
              <li className="hover:text-indigo-700 cursor-pointer">Home</li>
            </NavLink>
            <NavLink to="/browse" onClick={() => setIsOpen(false)}>
              <li className="hover:text-indigo-700 cursor-pointer">Browse Skills</li>
            </NavLink>
            <NavLink to="/notifications" onClick={() => setIsOpen(false)}>
              <li className="hover:text-indigo-700 cursor-pointer">Notifications</li>
            </NavLink>
            <NavLink to="/chat" onClick={() => setIsOpen(false)}>
              <li className="hover:text-indigo-700 cursor-pointer">Chat</li>
            </NavLink>

           
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
