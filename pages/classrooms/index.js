import React, { useEffect, useRef, useState } from "react";
import {
  Camera,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Hand,
  Users,
  MessageSquare,
  Share,
  Settings,
  Signal,
} from "lucide-react";
import ChatPanel from "@/components/classrooms/ChatPannel";
import SettingsPanel from "@/components/classrooms/SettingsPanel";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { data } from "autoprefixer";
import { io } from "socket.io-client";
import { userAgent } from "next/server";
import { useSelector } from "react-redux";
import BannedPage from "@/components/BannedPage";
import { FadeLoader } from "react-spinners";

// http://localhost:3000/classrooms?uid=test_4&isTeacher=true
// http://localhost:3000/classrooms?uid=test_2&isTeacher=false

const config = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

const ClassroomUI = () => {
  const user = useSelector((state) => state.user);

  const [messages, setMessages] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [canAccess, setCanAccess] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [notAllowedTexter, setNotAllowedTexter] = useState([]);
  const pubVideo = useRef(null);
  const subVideo = useRef(null);
  const [client, setClient] = useState(null);
  const [socket, setSocket] = useState(null);
  const [signal, setSignal] = useState(null);
  const [dc, setDc] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    audioInput: "",
    audioOutput: "",
    videoInput: "",
    audioInputDevices: [],
    audioOutputDevices: [],
    videoInputDevices: [],
    echoCancellation: true,
    videoQuality: "medium",
    darkMode: false,
    notifications: true,
    language: "en",
  });
  const [raisedhands, setRaisedHands] = useState([]);

  const notificationSound = new Audio("/notification-2-269292.mp3");

  useEffect(() => {
    const initialiseSDK = async () => {
      try {
        const ionSDK = await import("ion-sdk-js");
        const signalModule = await import(
          "ion-sdk-js/lib/signal/json-rpc-impl"
        );

        const newSignal = new signalModule.IonSFUJSONRPCSignal(
          "ws://localhost:7000/ws"
        ); // connect to out signal server/mdeia server basically
        const newClient = new ionSDK.Client(newSignal, config); // create  a new client
        const uid = new URLSearchParams(window.location.search).get("uid");

        newSignal.onopen = () => {
          newClient.join("test room", uid);
          setClient(newClient);
        };

        // add event listerners here maybe? // list to data channeel maybe?
      } catch (error) {
        console.log("failed to initlaise SDk", error);
      }
    };
    initialiseSDK();
  }, []);

  useEffect(() => {
    if (!client) return;
    const isTeacher = new URLSearchParams(window.location.search).get(
      "isTeacher"
    );

    if (!JSON.parse(isTeacher)) {
      // this is the client accessig the remote streaam
      client.ontrack = (track, stream) => {
        console.log("got track: ", track.id, "for stream: ", stream.id);
        track.onunmute = () => {
          subVideo.current.srcObject = stream;
          subVideo.current.autoplay = true;
          subVideo.current.muted = false;

          stream.onremovetrack = () => {
            subVideo.current.srcObject = null;
          };
        };
      };
    } else {
      start(true);
    }
  }, [client]);

  console.log("data -->", participants);

  useEffect(() => {
    if (user && user._id.length > 0) {
      console.log("user", user);
      const newSocket = io("http://localhost:3001");
      newSocket.on("connect", () => {
        console.log(newSocket.id); // x8WIv7-mJelg7on_ALbx

        newSocket.emit("join_room", "123", {
          id: user._id,
          name: user.name,
          isActive: true,
          isMuted: false,
          isVideoOff: false,
        });
        setSocket(newSocket);
      });

      newSocket.on("error", (data) => {
        console.log("error data", data);
        switch (data) {
          case "joining":
            setCanAccess(false);
            setIsLoader(false);
            break;
          default:
            break;
        }
        console.log("hello", data);
        setParticipants(data);
      });
      newSocket.on("updated_participants", (data) => {
        console.log("hello", data);
        setParticipants(data);
      });
      newSocket.on("updated_chat", (data) => {
        console.log("hello", data);
        setMessages(data);
      });
      newSocket.on("history", (data) => {
        const { allowedSpeakers, notAllowedTexters } = data;
        console.log("hello", data);
        setNotAllowedTexter(notAllowedTexters);
      });
      newSocket.on("raised_hand", (data) => {
        console.log("raised");
        notify(data);
      });

      newSocket.on("updated_rasied_hands", (data) => {
        console.log("hello from hand", data);
        setRaisedHands(data);
      });

      newSocket.on("updated_revoked_text_permission", (data) => {
        console.log("hello from text _>", data);
        setNotAllowedTexter(data);
      });

      newSocket.on("remove_banned_user", (bannedId) => {
        if (user._id === bannedId) {
          // send a message
          toast("You have been banned from the meeting by the teacher");
          // set banned state
          setCanAccess(false);
          console.log("to be banned _>", data);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (socket && user && user._id.length > 0) {
      setIsLoader(false);
    }
  }, [socket, user]);

  const start = async (isCamera) => {
    console.log("start 1");
    if (!client) return;
    console.log("start 2");

    try {
      const ionSDK = await import("ion-sdk-js");
      const media = isCamera
        ? await ionSDK.LocalStream.getUserMedia({
            audio: true,
            video: true,
            simulcast: true,
          })
        : await ionSDK.LocalStream.getDisplayMedia({
            resolution: "vga",
            video: true,
            audio: true,
            codec: "vp8",
          });

      pubVideo.current.srcObject = media;
      pubVideo.current.autoplay = true;
      pubVideo.current.controls = true;
      pubVideo.current.muted = true;
      try {
        client.publish(media);
        let lastBytes = 0;
        const statsInterval = setInterval(async () => {
          try {
            const stats = await client.getPubStats();
            if (stats?.video) {
              const currentBytes = stats.video.bytesSent || 0;
              const bitrateMbps = (
                ((currentBytes - lastBytes) * 8) /
                (5 * 1000000)
              ).toFixed(2);
              console.log("Video Stats:", {
                resolution: `${stats.video.width}x${stats.video.height}`,
                fps: stats.video.frameRate,
                bitrate: `${bitrateMbps} Mbps`,
                cpu: stats.video.cpu || "N/A",
              });
              lastBytes = currentBytes;
            }
          } catch (error) {
            console.log("Stats error:", error);
          }
        }, 5000);

        return () => clearInterval(statsInterval);
      } catch (error) {
        console.log(error, "publishing");
      }
    } catch (error) {
      console.error("Failed to start media:", error);
    }
  };

  useEffect(() => {
    if (!client) return;
    console.log("here", dc);

    const _dc = client.createDataChannel("messaging");

    _dc.onopen = () => {
      console.log("iss opene");
      setDc(_dc);
      _dc.onmessage = (messsage) => {
        console.log(messsage);
      };
    };
  }, [client]);

  const grantPermission = () => {};
  const denyPermission = () => {};

  const revokeTextPermission = (userId) => {
    if (!socket) return;
    socket.emit("revoke_text_permission", "123", userId);
  };

  const grantTextPermission = (userId) => {
    if (!socket) return;
    socket.emit("grant_text_permission", "123", userId);
  };

  const banStudent = (userId, username) => {
    if (!socket) return;

    if (!window.confirm("Are you sure you want to ban " + username)) return;

    socket.emit("ban_user", "123", userId);
  };

  const notify = (data) => {
    console.log("i am here ");
    notificationSound
      .play()
      .catch((error) => console.log("failed to play because", error));
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {data.name}🤚
                </p>
                <p className="mt-1 text-sm text-gray-500">Raised hand</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ),
      { duration: 10000 }
    );
  };

  const raiseHand = () => {
    console.log("raising my hand");
    if (!socket) return;

    socket.emit("raise_hand", "123", {
      id: user._id,
      name: user.name,
      targetUserId: user._id,
      timestamp: Date.now(),
    });
  };

  const handleMessae = (content) => {
    if (!socket) return;
    socket.emit("send_text", "123", {
      content,
      sender: user.name,
      senderId: user._id,
      timestamp: Date.now(),
    });
  };

  if (isLoader) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <FadeLoader color="#00FFFF" />
      </div>
    );
  }

  if (!canAccess) {
    return <BannedPage />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Control Bar */}
      <div className="h-16 bg-white shadow-sm flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          {/* Room Info */}
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">Mathematics 101</h1>
            <p className="text-sm text-gray-500">Room: MATH-101-2024</p>
          </div>

          {/* Connection Quality Indicator */}
          <div className="flex items-center space-x-2">
            <Signal className="w-4 h-4 text-green-500" />
            <span className="text-sm">Excellent</span>
          </div>
        </div>

        {/* Time and Participants */}
        <div className="flex items-center space-x-4">
          <div className="text-lg">00:45:30</div>
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            <span>32/40</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Primary Video Grid */}
        <div className="flex-1 p-4 grid ">
          {/* Teacher's Video (Larger) */}
          <video ref={pubVideo} className="hidden" />

          <video
            id="subVideo"
            className={`bg-blue-400 h-full `}
            controls
            ref={subVideo}
          ></video>

          {/* <div
            className={`col-span-2 row-span-2 bg-gray-900 rounded-lg  ${
              subVideo.current && subVideo.current.srcObject
                ? "hidden bg-red-500"
                : "relative"
            }`}
          >
            <div className="absolute bottom-4 left-4 text-white flex items-center">
              <div className="bg-gray-900/60 px-3 py-1 rounded-full flex items-center">
                <span>Dr. Smith</span>
                <div className="ml-2 px-2 py-0.5 bg-blue-500 rounded text-xs">
                  Teacher
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <ChatPanel
          notAllowedTexter={notAllowedTexter}
          banStudent={banStudent}
          user={user}
          denyPermission={denyPermission}
          grantPermission={grantPermission}
          raisedhands={raisedhands}
          messages={messages}
          revokeTextPermission={revokeTextPermission}
          onSendMessage={handleMessae}
          participants={participants}
          grantTextPermission={grantTextPermission}
        />
      </div>

      {/* Bottom Control Bar */}
      <div className="h-20 bg-white border-t px-4 flex items-center justify-between">
        {/* Left Controls */}
        <div className="flex space-x-2">
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* Center Controls */}
        <div className="flex space-x-4">
          <button className="p-4 rounded-full bg-gray-100 hover:bg-gray-200">
            <Mic className="w-6 h-6" />
          </button>
          <button className="p-4 rounded-full bg-gray-100 hover:bg-gray-200">
            <Video className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              console.log(dc);
              start(false);
            }}
            className="p-4 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <Share className="w-6 h-6" />
          </button>
          <button
            onClick={raiseHand}
            className="p-4 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <Hand className="w-6 h-6" />
          </button>
        </div>

        {/* Right Controls */}
        {user.role !== "student" ? (
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            End
          </button>
        ) : (
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Leave
          </button>
        )}
      </div>

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={() => {}}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(ClassroomUI), {
  ssr: false,
});
