import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../lib/socket";
import useAuth from "../hooks/useAuth";

const VideoCallPage = () => {
  const { authUser } = useAuth();
  const { friendId } = useParams(); 
  const navigate = useNavigate();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);

  const [isCalling, setIsCalling] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);

  const ICE_SERVERS = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
    ],
  };

  useEffect(() => {

    const startLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localVideoRef.current.srcObject = stream;

      
        pcRef.current = new RTCPeerConnection(ICE_SERVERS);

       
        stream.getTracks().forEach((track) => {
          pcRef.current.addTrack(track, stream);
        });

       
        pcRef.current.ontrack = (event) => {
          remoteVideoRef.current.srcObject = event.streams[0];
        };

       
        pcRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", {
              to: friendId,
              candidate: event.candidate,
            });
          }
        };

      
        socket.on("offer", async (data) => {
          if (!pcRef.current) return;
          await pcRef.current.setRemoteDescription(data.offer);
          const answer = await pcRef.current.createAnswer();
          await pcRef.current.setLocalDescription(answer);
          socket.emit("answer", { to: data.from, answer });
          setCallAccepted(true);
        });

        socket.on("answer", async (data) => {
          if (!pcRef.current) return;
          await pcRef.current.setRemoteDescription(data.answer);
          setCallAccepted(true);
        });

        socket.on("ice-candidate", async (data) => {
          if (!pcRef.current) return;
          try {
            await pcRef.current.addIceCandidate(data.candidate);
          } catch (err) {
            console.error("Error adding received ICE candidate", err);
          }
        });

      
        socket.emit("join-call", { userId: authUser._id, friendId });
      } catch (err) {
        console.error("Error accessing camera/mic", err);
        alert("Please allow camera and microphone access.");
        navigate(-1);
      }
    };

    startLocalStream();

    return () => {
    
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      if (pcRef.current) pcRef.current.close();
    };
  }, [authUser._id, friendId, navigate]);

  const startCall = async () => {
    if (!pcRef.current) return;

    setIsCalling(true);

    const offer = await pcRef.current.createOffer();
    await pcRef.current.setLocalDescription(offer);
    socket.emit("offer", { to: friendId, offer, from: authUser._id });
  };

  const endCall = () => {
    if (pcRef.current) pcRef.current.close();
    pcRef.current = null;
    navigate(-1); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-4 p-4">
      <div className="flex gap-4 w-full max-w-4xl">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className="w-1/2 bg-black rounded"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          className="w-1/2 bg-black rounded"
        />
      </div>
      <div className="flex gap-4 mt-4">
        {!callAccepted && (
          <button
            onClick={startCall}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {isCalling ? "Calling..." : "Start Call"}
          </button>
        )}
        <button
          onClick={endCall}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          End Call
        </button>
      </div>
    </div>
  );
};

export default VideoCallPage;
