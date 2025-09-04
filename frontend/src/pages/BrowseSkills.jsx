import React from "react";
import { useQuery,useMutation } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

function BrowseSkills() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosInstance.get("/user/allusers");
      return response.data;
    },
  });

  const {mutate,isPending}=useMutation({
    mutationFn:async(id)=>{
      const response=await axiosInstance.post(`user/send-request/${id}`);
      return response.data
    }
  })

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center text-lg text-gray-600">
        Loading...
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Browse Skills
      </h2>

      {users.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="border border-gray-200 rounded-2xl shadow-sm bg-white p-6 hover:shadow-md transition duration-300"
            >
              
              <h3 className="text-lg font-semibold text-indigo-600 mb-3">
                {user.fullName}
              </h3>

            
              <div className="mb-3">
                <p className="font-medium text-gray-700">Teaching Skills:</p>
                {user.teachingSkill?.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.teachingSkill.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm mt-1">
                    No teaching skills added
                  </p>
                )}
              </div>

              
              <div className="mb-4">
                <p className="font-medium text-gray-700">Learning Skills:</p>
                {user.learningSkill?.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.learningSkill.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm mt-1">
                    No learning skills added
                  </p>
                )}
              </div>

             
              <button
                onClick={() => mutate(user._id)}
                disabled={isPending}
                className={`w-full py-2 rounded-xl font-medium transition duration-300 ${
                  isPending
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {isPending ? "Sending..." : "Send Request"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No users found</div>
      )}
    </div>
  );
}

export default BrowseSkills;
