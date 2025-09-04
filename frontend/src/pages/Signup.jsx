/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query';

import axiosInstance from '../lib/axios';
function Signup() {
  const queryClient=useQueryClient();
const[formData,setformData]=useState({fullName:"",email:'',password:''});

const{data,isPending,mutate}= useMutation({
  mutationFn:async(formData)=>{
    const response=await axiosInstance.post('/auth/signup',formData)
  return response.data;
  },
  onSuccess:()=>{queryClient.invalidateQueries({ queryKey: ['authUser'] })} 
})

const handleSubmit=(e)=>{
   e.preventDefault();
mutate(formData)
}
  return (
     <div className="h-screen flex justify-center items-center bg-blue-200 ">
      <div className="w-96 bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Welcome To LearnLoop
        </h2>
        
        <form className="space-y-8" onSubmit={handleSubmit}>
         
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Full Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              type="text"
              name="fullname"
              id="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e)=>{setformData({...formData,fullName:e.target.value})}}
              required
            />
          </div>

         
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
               value={formData.email}
              onChange={(e)=>{setformData({...formData,email:e.target.value})}}
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
               value={formData.password}
              onChange={(e)=>{setformData({...formData,password:e.target.value})}}
               required
            />
          </div>

        
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300 shadow-md"
         disabled={isPending}
        >
          {isPending ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
