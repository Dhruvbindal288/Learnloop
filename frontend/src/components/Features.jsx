import React from "react";
import FeatureCard from "./FeatureCard";

function Features() {
const features = [
  {
    title: "Connect with Friends",
    description: "Find and connect with people who share the skills you want to learn.",
  },
  {
    title: "Video Skills",
    description: "Connect via video calls to learn and teach skills in real time.",
  },
  {
    title: "Chat & Messaging",
    description: "Send instant messages, share resources, and stay connected easily.",
  },
  {
    title: "Skill Exchange",
    description: "Teach what you know and learn what you love from others worldwide.",
  },
];

  return (
    <div className="py-12 px-6 bg-gradient-to-r from-blue-50 to-indigo-100">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-10">
        Why LearnLoop?
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Features;
