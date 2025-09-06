import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import form from "../assets/form.png";

function OnBoardPage() {
  const { authUser } = useAuth();
  const queryClient = useQueryClient();

  const [onboardData, setOnboardData] = useState({
    learningSkill: "",
    teachingSkill: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/user/on-board", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      learningSkill: onboardData.learningSkill
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      teachingSkill: onboardData.teachingSkill
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    mutate(formattedData);
  };

  return (
    <div className="h-screen flex flex-col-reverse lg:flex-row items-center justify-center bg-gradient-to-r from-indigo-300 to-blue-300 px-4">
     
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
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
              Learning Skills (comma separated)
            </label>
            <input
              type="text"
              id="learningSkill"
              placeholder="e.g. React, Node.js, Python"
              value={onboardData.learningSkill}
              onChange={(e) =>
                setOnboardData({
                  ...onboardData,
                  learningSkill: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>

          
          <div>
            <label
              htmlFor="teachingSkill"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Teaching Skills (comma separated)
            </label>
            <input
              type="text"
              id="teachingSkill"
              placeholder="e.g. JavaScript, SQL, Data Analysis"
              value={onboardData.teachingSkill}
              onChange={(e) =>
                setOnboardData({
                  ...onboardData,
                  teachingSkill: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>

         
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300 shadow-md"
            disabled={isPending}
          >
            {isPending ? "Saving your data..." : "Save & Continue"}
          </button>
        </form>
      </div>

     
      <div className="flex justify-center lg:ml-12 mb-6 lg:mb-0">
        <img
          src={form}
          alt="Onboarding illustration"
          className="w-72 sm:w-96 lg:w-[28rem] object-contain"
        />
      </div>
    </div>
  );
}

export default OnBoardPage;
