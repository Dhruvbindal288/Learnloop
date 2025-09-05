import React from "react";
import Sidebar from "../components/Sidebar";
import useMessages from "../hooks/useMessages";

function Chat() {
  const [selectedFriend, setSelectedFriend] = React.useState(null);

  const { data: messages = [], isLoading } = useMessages(
    selectedFriend?._id
  );

  return (
    <div className="flex h-[calc(100vh-64px)] pt-16"> 
      {/* Sidebar */}
      <Sidebar onSelectFriend={setSelectedFriend} />

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedFriend ? (
          <>
            {/* Chat header */}
            <div className="flex items-center gap-3 p-4 border-b shadow-sm">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-500 text-white font-semibold">
                {selectedFriend.fullName?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-lg font-bold text-gray-800">
                {selectedFriend.fullName}
              </h2>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {isLoading ? (
                <p className="text-gray-500">Loading messages...</p>
              ) : messages.length === 0 ? (
                <p className="text-gray-500 text-center mt-4">
                  No messages yet
                </p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`p-2 rounded max-w-xs ${
                      msg.senderId === selectedFriend._id
                        ? "bg-gray-200 text-left"
                        : "bg-blue-200 ml-auto text-right"
                    }`}
                  >
                    {msg.message}
                  </div>
                ))
              )}
            </div>

            {/* Input box fixed at bottom */}
            <div className="p-4 border-t flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
                Send
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 h-full flex items-center justify-center">
            Select a friend to see messages
          </p>
        )}
      </div>
    </div>
  );
}

export default Chat;
