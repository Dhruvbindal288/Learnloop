import React from 'react'
import axiosInstance from '../lib/axios';
import { useQuery} from "@tanstack/react-query";
function useNotification() {
  const { data, isLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const response = await axiosInstance.get("/user/requests");
      return response.data.requests; 
    },
  });
  return {data,isLoading}
}

export default useNotification
