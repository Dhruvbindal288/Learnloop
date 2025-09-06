import React from "react";
import Sidebar from "../components/Sidebar";
import useMessages from "../hooks/useMessages";
import { useQueryClient } from "@tanstack/react-query";
import socket from "../lib/socket"; 
import useAuth from "../hooks/useAuth";
import { FaVideo } from "react-icons/fa";
// import { useNavigate } from "react-router-dom"; 

function Chat() {
  const [selectedFriend, setSelectedFriend] = React.useState(null);
  const { authUser } = useAuth();
  const queryClient = useQueryClient();
  // const navigate = useNavigate(); 

  const { data: messages = [], isLoading } = useMessages(selectedFriend?._id);

  
  React.useEffect(() => {
    if (!selectedFriend) return;

    socket.on("receiveMessage", (newMessage) => {
      if (
        newMessage.senderId === selectedFriend._id ||
        newMessage.receiverId === selectedFriend._id
      ) {
        queryClient.invalidateQueries(["messages", selectedFriend._id]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [selectedFriend, queryClient]);

  const handleSend = () => {
    const input = document.getElementById("chatInput");
    const text = input.value.trim();
    if (!text) return;

    socket.emit("sendMessage", {
      senderId: authUser._id,
      receiverId: selectedFriend._id,
      message: text,
    });

    input.value = "";
  };

  

 
  return (
    <div className="flex h-[calc(100vh-64px)] pt-16 bg-gradient-to-br from-indigo-50 via-indigo-100 to-blue-50">
     
      <div className={`${selectedFriend ? "hidden md:block w-1/3 lg:w-1/4" : "block w-full md:w-1/3 lg:w-1/4"} border-r bg-white shadow-sm`}>
        <Sidebar onSelectFriend={setSelectedFriend} />
      </div>

     
      <div className={`${selectedFriend ? "flex flex-col flex-1" : "hidden md:flex flex-col flex-1"}`}>
        {selectedFriend ? (
          <>
          
            <div className="flex items-center gap-3 p-4 border-b shadow-sm bg-gradient-to-r from-[#0e7490] via-[#3b82f6] to-[#4f46e5]">
              <button onClick={() => setSelectedFriend(null)} className="md:hidden px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition">Back</button>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-500 text-white font-semibold">
                {selectedFriend.fullName?.charAt(0).toUpperCase()}
              </div>
              <div className="w-full flex items-center justify-between">
                <h2 className="text-lg font-bold text-black-800 truncate">{selectedFriend.fullName}</h2>
                {/* <button onClick={startCall}><FaVideo size={26} color="black" /></button> */}
              </div>
            </div>

            
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {isLoading ? (
                <p className="text-gray-500">Loading messages...</p>
              ) : messages.length === 0 ? (
                <p className="text-gray-500 text-center mt-4">No messages yet</p>
              ) : (
                messages.map((msg) => (
                  <div key={msg._id} className={`p-2 rounded-2xl max-w-2xs break-words ${msg.senderId === selectedFriend._id ? "bg-blue-400 text-left" : "bg-blue-500 text-white ml-auto text-left"}`}>
                    {msg.message}
                  </div>
                ))
              )}
            </div>

           
            <div className="p-4 border-t flex items-center gap-2 bg-gray-100">
              <input
                id="chatInput"
                type="text"
                autoComplete="off"
                placeholder="Type a message..."
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <button onClick={handleSend} className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition">
                Send
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 h-full flex items-center justify-center text-lg">
            Select a friend to see messages
          </p>
        )}
      </div>
    </div>
  );
}

export default Chat;
