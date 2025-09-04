import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../lib/axios';

function BrowseSkills() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosInstance.get('/user/allusers');
      return response.data; 
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Browse Skills</h2>

      {users.length > 0 ? (
        <div className="grid gap-4">
          {users.map((user) => (
            <div 
              key={user._id} 
              className="border p-4 rounded-lg shadow-sm bg-white"
            >
              <h3 className="text-lg font-semibold">{user.fullName}</h3>

          
              <div className="mt-2">
                <p className="font-medium">Teaching Skills:</p>
                {user.teachingSkill?.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-700">
                    {user.teachingSkill.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No teaching skills added</p>
                )}
              </div>

              
              <div className="mt-2">
                <p className="font-medium">Learning Skills:</p>
                {user.learningSkill?.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-700">
                    {user.learningSkill.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No learning skills added</p>
                )}
              </div>

            
              <button
                onClick={() => alert(`Request sent to ${user.fullName}`)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Send Request
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
}

export default BrowseSkills;



