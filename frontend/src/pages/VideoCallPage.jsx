import React, { useEffect, useRef, useState } from "react";
import socket from "../lib/socket";
import useAuth from "../hooks/useAuth";

function VideoCallPage({ friendId }) {
  const { authUser } = useAuth();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);

  const [localStream, setLocalStream] = useState(null);
  const [incomingCall, setIncomingCall] = useState(false);
  const [callerId, setCallerId] = useState(null);

  useEffect(() => {
  
    async function initMedia() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });
      pcRef.current = pc;

     
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

     
      pc.ontrack = (event) => {
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
      };

    
      pc.onicecandidate = (event) => {
        if (event.candidate && callerId) {
          socket.emit("ice-candidate", { candidate: event.candidate, to: callerId || friendId });
        }
      };
    }

    initMedia();
  }, [friendId, callerId]);

  
  useEffect(() => {
    
    socket.on("offer", async ({ from, sdp }) => {
      setIncomingCall(true);
      setCallerId(from);
      pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
    });

   
    socket.on("answer", async ({ sdp }) => {
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
    });

   
    socket.on("ice-candidate", async ({ candidate }) => {
      try {
        await pcRef.current.addIceCandidate(candidate);
      } catch (err) {
        console.error("Error adding received ICE candidate", err);
      }
    });

    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, []);

  
  const startCall = async () => {
    const pc = pcRef.current;
    if (!pc) return;
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit("offer", { to: friendId, sdp: offer });
    setCallerId(friendId);
  };

 
  const answerCall = async () => {
    setIncomingCall(false);
    const pc = pcRef.current;
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.emit("answer", { to: callerId, sdp: answer });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-100">
      <div className="flex gap-4">
        <video ref={localVideoRef} autoPlay muted className="w-64 h-48 bg-black rounded" />
        <video ref={remoteVideoRef} autoPlay className="w-64 h-48 bg-black rounded" />
      </div>

      {incomingCall ? (
        <button
          onClick={answerCall}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Accept Call
        </button>
      ) : (
        <button
          onClick={startCall}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          Start Call
        </button>
      )}
    </div>
  );
}

export default VideoCallPage;
