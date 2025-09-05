import React from 'react'
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

function useFriend() {
   const { data: friends = [], isLoading, isError, error } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const response = await axiosInstance.get("/user/friends");
      return response.data.friends;
    },
  });

  return { friends, isLoading, isError, error };
}

export default useFriend
