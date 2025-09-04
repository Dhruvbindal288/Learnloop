import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-blue-300 text-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
         
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-indigo-700">LearnLoop</h2>
            <p className="text-sm text-black">
              A free learning platform to explore, share, and grow skills.
            </p>
          </div>

       
          <div className="flex space-x-6">
           
            <a href="#" className="hover:text-indigo-500">
              <FaLinkedinIn size={18} />
            </a>
            <a href="#" className="hover:text-indigo-500">
              <FaGithub size={18} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-black">
          © {new Date().getFullYear()} LearnLoop | All Rights Reserved <br />
          Built with ❤️ by <span className="text-indigo-700">Dhruv Bindal</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
