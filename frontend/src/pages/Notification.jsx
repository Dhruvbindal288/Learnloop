import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

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
      toast.success("Request Accepted Successfully");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.post(`/user/reject-request/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["requests"]);
      toast.success("Request Rejected Successfully");
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
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Notifications
      </h2>

      {data?.length > 0 ? (
        <div className="space-y-6 max-w-2xl mx-auto">
          {data.map((req) => (
            <div
              key={req._id}
              className="bg-white shadow-lg rounded-2xl p-5 flex items-center justify-between transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {req.senderId?.fullName}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  sent you a friend request
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => acceptMutation.mutate(req._id)}
                  disabled={acceptMutation.isPending}
                  className="px-5 py-2 bg-blue-500 text-white font-medium rounded-xl hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {acceptMutation.isPending ? "Accepting..." : "Accept"}
                </button>
                <button
                  onClick={() => rejectMutation.mutate(req._id)}
                  disabled={rejectMutation.isPending}
                  className="px-5 py-2 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {rejectMutation.isPending ? "Rejecting..." : "Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-12 text-lg">
          No new notifications 🎉
        </div>
      )}
    </div>
  );
}

export default Notification;
