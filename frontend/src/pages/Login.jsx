import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
    const response=await axiosInstance.post('/auth/login',data)
     return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(loginData);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-blue-200 ">
      <div className="w-96 bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Welcome back!!
        </h2>

        <form className="space-y-8" onSubmit={handleSubmit}>
         
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
          </div>

         
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>

       
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
