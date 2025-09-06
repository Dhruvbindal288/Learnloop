import React from 'react'
import { useQuery}from '@tanstack/react-query';
import axiosInstance from '../lib/axios';
function useAuth() {
const { data: authUser, isLoading, isError, error }= useQuery({
  queryKey:["authUser"],
  queryFn:async()=>{
    const response=await axiosInstance.get('/auth/me');
    return response.data
  },retry:false,
}) 
return {authUser,isLoading,isError,error}
}

export default useAuth;
