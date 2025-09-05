import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import BrowseSkills from "./pages/BrowseSkills";
import OnBoardPage from "./pages/OnBoardPage";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Notification from "./pages/Notification";
import Chat from "./pages/Chat";
import { Toaster } from "react-hot-toast";
import socket from "./lib/socket";
import png from "./assets/404.png";
import VideoCallPage from "./pages/VideoCallPage";
function App() {
  const { authUser, isLoading } = useAuth();

  React.useEffect(() => {
    if (authUser?._id) {
      socket.emit("join", authUser._id);
      console.log("🔗 Joined socket room:", authUser._id);
    }
  }, [authUser]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <Toaster />
      <Routes>
       
        <Route path="/" element={<Home />} />

     
       <Route
  path="/login"
  element={
    authUser ? (
      authUser.onBoarded ? (
        <Navigate to="/" />
      ) : (
        <Navigate to="/onboard" />
      )
    ) : (
      <Login />
    )
  }
/>
<Route
  path="/signup"
  element={
    authUser ? (
      authUser.onBoarded ? (
        <Navigate to="/" />
      ) : (
        <Navigate to="/onboard" />
      )
    ) : (
      <Signup />
    )
  }
/>

       
        <Route
          path="/onboard"
          element={
            authUser ? (
              authUser.onBoarded ? (
                <Navigate to="/" />
              ) : (
                <OnBoardPage />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      
        <Route
          path="/browse"
          element={
            authUser ? (
              authUser.onBoarded ? (
                <BrowseSkills />
              ) : (
                <Navigate to="/onboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            authUser ? (
              authUser.onBoarded ? (
                <Notification />
              ) : (
                <Navigate to="/onboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/chat"
          element={
            authUser ? (
              authUser.onBoarded ? (
                <Chat />
              ) : (
                <Navigate to="/onboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
  path="/video-call/:friendId"  
  element={
    authUser ? (
      authUser.onBoarded ? (
        <VideoCallPage />
      ) : (
        <Navigate to="/onboard" />
      )
    ) : (
      <Navigate to="/login" />
    )
  }
/>
        <Route
          path="*"
          element={
            
            
 <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", 
      }}
    >
      <img
        src={png}
        alt="Page Not Found"
        style={{ width: "60%", height: "auto" ,paddingTop:"150px"}} 
      />
    </div>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
