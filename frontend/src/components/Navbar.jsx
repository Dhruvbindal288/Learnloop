import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { authUser, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await axiosInstance.post("/auth/logout"); 
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]); 
      toast.success("Logout successfully")
      navigate("/"); 
    },
    onError: (err) => {
      console.error("Logout failed:", err);
      toast.error("Server error can't logout")
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
    setIsOpen(false); 
  };


  if (isLoading) return <div className="p-4">Loading...</div>;

  
  return (
    <nav className="bg-gradient-to-r from-[#33a7c7] via-[#6588c1] to-[#807af5] shadow-md fixed w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-indigo-700">LearnLoop</div>

          <ul className="hidden md:flex items-center space-x-10 font-medium text-white">
            <NavLink to="/" className="hover:text-indigo-700">Home</NavLink>
            <NavLink to="/browse" className="hover:text-indigo-700">Browse Skills</NavLink>
            <NavLink to="/notifications" className="hover:text-indigo-700">Notifications</NavLink>
            <NavLink to="/chat" className="hover:text-indigo-700">Chat</NavLink>

            <li className="cursor-pointer">
              {authUser ? (
                <span onClick={handleLogout}>Logout</span>
              ) : (
                <NavLink to="/login">Login</NavLink>
              )}
            </li>
          </ul>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-[#33a7c7] via-[#6588c1] to-[#807af5] shadow-lg">
          <ul className="flex flex-col items-center space-y-4 py-4 font-medium text-white">
            <NavLink to="/" onClick={() => setIsOpen(false)} className="hover:text-indigo-700">Home</NavLink>
            <NavLink to="/browse" onClick={() => setIsOpen(false)} className="hover:text-indigo-700">Browse Skills</NavLink>
            <NavLink to="/notifications" onClick={() => setIsOpen(false)} className="hover:text-indigo-700">Notifications</NavLink>
            <NavLink to="/chat" onClick={() => setIsOpen(false)} className="hover:text-indigo-700">Chat</NavLink>

            <li className="cursor-pointer">
              {authUser ? (
                <span onClick={handleLogout}>Logout</span>
              ) : (
                <NavLink to="/login" onClick={() => setIsOpen(false)}>Login</NavLink>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
