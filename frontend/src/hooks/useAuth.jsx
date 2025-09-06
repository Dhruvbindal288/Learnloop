import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

function useAuth() {
  const {
    data: authUser,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/auth/me");
        // backend returns { user: null } if not logged in
        return response.data.user;
      } catch (err) {
        // If server fails, return null so frontend can handle
        console.error("Error fetching auth user:", err);
        return null;
      }
    },
    retry: false, // don't retry automatically
  });

  return { authUser, isLoading, isError, error };
}

export default useAuth;
