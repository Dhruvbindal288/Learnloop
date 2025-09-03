import React from "react";

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl hover:scale-105 transition-transform duration-300 w-72">
     
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>

     
      <p className="text-gray-600 mt-2 text-sm">{description}</p>
    </div>
  );
}

export default FeatureCard;
