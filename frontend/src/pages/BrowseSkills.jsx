import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

function BrowseSkills() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosInstance.get("/user/allusers");
      return response.data;
    },
  });


const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.post(`user/send-request/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Request sent successfully");
      queryClient.invalidateQueries(["requests"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center text-lg text-gray-600">
        Loading...
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Browse Skills
      </h2>

      {users.length > 0 ? ( 
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                {user.fullName}
              </h3>

         
              <div className="mb-4">
                <p className="font-medium text-gray-700">Teaching Skills:</p>
                {user.teachingSkill?.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.teachingSkill.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full shadow-sm hover:scale-105 transition-transform"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm mt-1">
                    No teaching skills added
                  </p>
                )}
              </div>

              
              <div className="mb-6">
                <p className="font-medium text-gray-700">Learning Skills:</p>
                {user.learningSkill?.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.learningSkill.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-1 bg-green-100 text-green-800 text-sm rounded-full shadow-sm hover:scale-105 transition-transform"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm mt-1">
                    No learning skills added
                  </p>
                )}
              </div>

          
              <button
                onClick={() => mutate(user._id)}
                disabled={isPending}
                className={`w-full py-3 rounded-xl font-medium transition-all duration-300 shadow-md ${
                  isPending
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:scale-105"
                }`}
              >
                {isPending ? "Sending..." : "Send Request"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-10 text-lg">
          No users found
        </div>
      )}
    </div>
  );
}

export default BrowseSkills;
