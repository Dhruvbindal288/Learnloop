import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import login from "../assets/login.png";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/auth/login", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]);
      toast.success("Login Successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(loginData);
  };

  return (
    <div className="h-screen flex flex-col-reverse lg:flex-row items-center justify-center bg-blue-200 px-4 lg:px-20">
    
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
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
              required
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
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>

      
      <div className="flex justify-center items-center w-full lg:w-1/2 mb-8 lg:mb-0">
        <img
          src={login}
          alt="Login Illustration"
          className="max-w-xs sm:max-w-sm lg:max-w-md w-full"
        />
      </div>
    </div>
  );
}

export default Login;
