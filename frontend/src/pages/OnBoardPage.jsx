/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

function OnBoardPage() {
  const { authUser } = useAuth();

  const [onboardData, setOnboardData] = useState({
    learningSkills: [],
    teachingSkills: [],
  });

  const [learningInput, setLearningInput] = useState("");
  const [teachingInput, setTeachingInput] = useState("");
  const queryClient=useQueryClient();
  const{mutate,data, isPending}=useMutation({
     mutationFn:async(data)=>{
        const response=await axiosInstance.post('/user/on-board',data)
return response.data
    },
    onSuccess:()=>{ queryClient.invalidateQueries(["authUser"]);}
  })

  const handleAddSkill = (type) => {
    if (type === "learning" && learningInput.trim()) {
      setOnboardData((prev) => ({
        ...prev,
        learningSkills: [...prev.learningSkills, learningInput.trim()],
      }));
      setLearningInput("");
    }
    if (type === "teaching" && teachingInput.trim()) {
      setOnboardData((prev) => ({
        ...prev,
        teachingSkills: [...prev.teachingSkills, teachingInput.trim()],
      }));
      setTeachingInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   mutate(onboardData)
   
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-indigo-300 to-blue-300">
      <div className="w-96 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Complete Your Onboarding
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
        
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={authUser?.fullName || ""}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

         
          <div>
            <label
              htmlFor="learningSkill"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Learning Skills
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="learningSkill"
                placeholder="Enter a skill"
                value={learningInput}
                onChange={(e) => setLearningInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
              <button
                type="button"
                onClick={() => handleAddSkill("learning")}
                className="px-4 bg-green-500 text-white rounded-xl hover:bg-green-600"
              >
                Add
              </button>
            </div>
            <ul className="mt-2 flex flex-wrap gap-2">
              {onboardData.learningSkills.map((skill, index) => (
                <li
                  key={index}
                  className="px-3 py-1 bg-blue-100 rounded-xl text-sm text-gray-700"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          
          <div>
            <label
              htmlFor="teachingSkill"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Teaching Skills
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="teachingSkill"
                placeholder="Enter a skill"
                value={teachingInput}
                onChange={(e) => setTeachingInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
              <button
                type="button"
                onClick={() => handleAddSkill("teaching")}
                className="px-4 bg-green-500 text-white rounded-xl hover:bg-green-600"
              >
                Add
              </button>
            </div>
            <ul className="mt-2 flex flex-wrap gap-2">
              {onboardData.teachingSkills.map((skill, index) => (
                <li
                  key={index}
                  className="px-3 py-1 bg-purple-100 rounded-xl text-sm text-gray-700"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300 shadow-md"
          disabled={isPending}
          >
           {isPending?'Saving your data..':"Save & Continue"} 
          </button>
        </form>
      </div>
    </div>
  );
}

export default OnBoardPage;
