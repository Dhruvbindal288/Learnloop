import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "../lib/axios";

function Notification() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const response = await axiosInstance.get("/user/requests");
      return response.data.requests; 
    },
  });

  
  const acceptMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.post(`/user/accept-request/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["requests"]);
    },
  });

  
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.post(`/user/reject-request/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["requests"]);
    },
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Notifications
      </h2>

      {data?.length > 0 ? (
        <div className="space-y-4 max-w-2xl mx-auto">
          {data.map((req) => (
            <div
              key={req._id}
              className="bg-white shadow-md rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-gray-800 font-semibold">
                  {req.sender.fullName}
                </p>
                <p className="text-sm text-gray-500">
                  sent you a friend request
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => acceptMutation.mutate(req._id)}
                  disabled={acceptMutation.isPending}
                  className="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50"
                >
                  {acceptMutation.isPending ? "Accepting..." : "Accept"}
                </button>
                <button
                  onClick={() => rejectMutation.mutate(req._id)}
                  disabled={rejectMutation.isPending}
                  className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                >
                  {rejectMutation.isPending ? "Rejecting..." : "Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-10">
          No new notifications 🎉
        </div>
      )}
    </div>
  );
}

export default Notification;
