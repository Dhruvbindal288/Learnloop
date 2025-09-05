import React from "react";
import useAuth from "../hooks/useAuth";

function Profile() {
  const { authUser } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-50 via-indigo-100 to-blue-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">User Profile</h1>

        <div className="space-y-6">
          <div className="bg-indigo-50 p-4 rounded-lg shadow-inner">
            <label className="block text-gray-600 font-semibold mb-1">Full Name</label>
            <p className="text-gray-800">{authUser.fullName}</p>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg shadow-inner">
            <label className="block text-gray-600 font-semibold mb-1">Email</label>
            <p className="text-gray-800">{authUser.email}</p>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg shadow-inner">
            <label className="block text-gray-600 font-semibold mb-1">Teaching Skills</label>
            <p className="text-gray-800">{authUser.teachingSkill || "Not added"}</p>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg shadow-inner">
            <label className="block text-gray-600 font-semibold mb-1">Learning Skills</label>
            <p className="text-gray-800">{authUser.learningSkill || "Not added"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
