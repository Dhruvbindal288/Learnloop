import React from "react";
import useFriend from "../hooks/useFriend";

function Sidebar({onSelectFriend}) {
  const { friends, isLoading } = useFriend();

  if (isLoading) return <p className="p-4">Loading friends...</p>;

  return (
   <div className="h-[calc(100vh-130px)] border-r bg-white shadow-sm flex flex-col">
  <h2 className="text-xl font-bold text-gray-800 p-5.5 border-b">Friends</h2>

  <ul className="flex-1 overflow-y-auto ">
    {friends.length > 0 ? (
      friends.map((friend) => (
        <li key={friend._id}>
          <button
            className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 transition rounded-lg text-left"
            onClick={() => onSelectFriend(friend)}
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-500 text-white font-semibold">
              {friend.fullName?.charAt(0).toUpperCase()}
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{friend.fullName}</span>
              <span className="text-sm text-gray-500">
                {friend.teachingSkill || "No skill set"}
              </span>
            </div>
          </button>
        </li>
      ))
    ) : (
      <p className="p-4 text-gray-500">No friends found</p>
    )}
  </ul>
</div>
  );
}

export default Sidebar;
