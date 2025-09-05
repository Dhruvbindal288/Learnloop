import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

function useMessages(receiverId) {
  return useQuery({
    queryKey: ["messages", receiverId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/messages/${receiverId}`);
      return res.data;
    },
    enabled: !!receiverId, 
  });
}

export default useMessages;