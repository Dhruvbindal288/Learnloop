import React from "react";
import Features from "../components/Features";
function Home() {
  return (
    <div className="min-h-[90vh] w-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 p-8 md:p-12 ">
      <div className="flex flex-col items-center text-center p-6 md:p-12 gap-6">
     
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">
          Learn what you love
        </h1>
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">
          Teach what you know
        </h1>

       
        <p className="text-white text-sm md:text-lg opacity-90 max-w-xl mt-4">
          Connect with people, share your knowledge, and discover new skills from a global community.
        </p>

     
        <button className="mt-6 px-6 md:px-10 py-3 text-white bg-amber-300  font-bold rounded-full shadow-lg hover:bg-amber-400 hover:scale-105 transition-transform duration-300">
          Browse Skills
        </button>
      </div>
<Features></Features>

    </div>
  );
}

export default Home;
