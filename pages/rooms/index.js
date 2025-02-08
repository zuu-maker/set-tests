import { db } from "@/firebase";
import { createRoom, startCall } from "@/services/classroomManager";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const configuration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

function Rooms() {
  const user = useSelector((state) => state.user);

  const localVideoRef = useRef(null);
  const localShareRef = useRef(null);
  const [error, setError] = useState("");
  const [hasMediaPermissions, setHasMediaPermissions] = useState(false);
  const [localStream, setLocalStream] = useState({});
  const [remoteStream, setRemoteStream] = useState({});

  useEffect(() => {}, []);
  const createClass = async () => {
    if (user && user._id.length === 0) return;
    let date = new Date();
    const roomId = `class-${date.getTime()}`;

    await createRoom(roomId, user._id, user.role);

    console.log(user);
  };

  const startClass = async () => {
    try {
      let localStream = requestMediaPermissions();
      const peerConnection = new RTCPeerConnection(configuration);

      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });
      let _remoteStream = new MediaStream();

      await db.collection("Classrooms").doc("class-1738581191873").update({
        offer,
      });
    } catch (error) {
      setError("Failed to start call");
      console.log(error);
    }
  };

  const startShare = async () => {
    try {
      requestScreenPermissions();
      // startCall(localStream);
    } catch (error) {
      setError("Failed to start call");
      console.log(error);
    }
  };

  const requestMediaPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      setHasMediaPermissions(true);
      setError("");
      return stream;
    } catch (err) {
      setError("Please allow camera and microphone access to join the class");
      setHasMediaPermissions(false);
    }
  };

  const requestScreenPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always" | "motion" | "never",
          displaySurface: "application" | "browser" | "monitor" | "window",
        },
      });

      if (localShareRef.current) {
        localShareRef.current.srcObject = stream;
      }

      setError("");
    } catch (err) {
      setError("Please allow camera and microphone access to join the class");
      setHasMediaPermissions(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center ">
      <div className="flex items-center justify-center  space-x-3">
        <button
          onClick={createClass}
          className="p-2 bg-gray-500 rounded-md  w-40 text-white"
        >
          create Room
        </button>
        <button
          onClick={startClass}
          className="p-2 bg-blue-500 rounded-md  w-40 text-white"
        >
          Start Class
        </button>
        <button
          onClick={startShare}
          className="p-2 bg-cyan-500 rounded-md  w-40 text-white"
        >
          Share screen
        </button>
      </div>
      <div className="flex">
        <video
          autoPlay
          playsInline
          controls={false}
          muted
          className="w-96 object-cover mt-2"
          ref={localVideoRef}
        />

        <video
          autoPlay
          playsInline
          controls={false}
          muted
          className="w-96 object-cover mt-2"
          ref={localShareRef}
        />
      </div>
      <p className="text-red-500 text-lg">{error}</p>
    </div>
  );
}

export default Rooms;
