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
  ScreenShareOff,
  ScreenShare,
  ListVideo,
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
import { useRouter } from "next/router";
import { Tooltip } from "react-tooltip";
import { useStopwatch } from "react-timer-hook";

// http://localhost:3000/classrooms?uid=test_4&isTeacher=true
// http://localhost:3000/classrooms?uid=test_2&isTeacher=false

//new
// http://localhost:3000/classrooms/teacher?uid=test_4
// http://localhost:3000/classrooms/student?uid=test_2

const config = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

const ClassroomStudent = () => {
  const user = useSelector((state) => state.user);

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

  const [messages, setMessages] = useState([]);
  const [localstream, setLocalStream] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(false); // get rid of this
  const [isAudioBroadcastMuted, setIsAudioBroadcastMuted] = useState(false);
  const [isVideoBroadcastMuted, setIsVideoBroadcastMuted] = useState(false);
  const [isScreenMuted, setIsScreenMuted] = useState(true);
  const [callStarted, setCallStarted] = useState(false);
  const [isSharingCamera, setIsSharingCamera] = useState(true);
  const [isLoader, setIsLoader] = useState(true);
  const [canAccess, setCanAccess] = useState(true);
  const [canSpeak, setCanSpeak] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [notAllowedTexter, setNotAllowedTexter] = useState([]);
  const [allowedSpeakers, setAllowedSpeakers] = useState([]);
  const localAudioRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [client, setClient] = useState(null);
  const [socket, setSocket] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
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

  let router = useRouter();

  const notificationSound = new Audio("/notification-2-269292.mp3");

  // const isTeacher =

  const [isTeacher, setIsTeacher] = useState(
    new URLSearchParams(window.location.search).get("isTeacher")
  );

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

    setCallStarted(true);
    // this is the client accessig the remote streaam

    console.log("in here 1121212");
    client.ontrack = (track, stream) => {
      console.log("got track: ", track.id, "for stream: ", stream.id);

      track.onunmute = () => {
        if (track.kind === "video") {
          remoteVideoRef.current.srcObject = stream;
          remoteVideoRef.current.playsInline = true;
          remoteVideoRef.current.autoplay = true;
          stream.onremovetrack = () => {
            console.log("Track removed from stream");
            setRemoteStream(null);
          };
        } else if (track.kind === "audio") {
          const audioContainer = document.getElementById("audio-container");
          const audioElem = document.createElement("audio");
          audioElem.id = `audio-${stream.id}`;
          audioElem.srcObject = stream;
          audioElem.autoplay = true;
          audioElem.controls = true;

          audioContainer.appendChild(audioElem);
        }
      };
    };
  }, [client]);

  useEffect(() => {
    if (user && user._id.length > 0) {
      console.log("user", user);
      const newSocket = io("http://localhost:3001");
      // if (user.role !== "student") {
      //   setIsAudioMuted(false);
      //   setIsVideoMuted(false);
      // }
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
          case "banned":
            setCanAccess(false);
            setIsLoader(false);
            break;
          case "room":
            toast.error(
              "There is a problem with the room please contact support"
            );
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

      newSocket.on("updated_mute_state", (data) => {
        if (data.kind === "video") {
          setIsVideoBroadcastMuted(data.muted);
        }
        if (data.kind === "audio") {
          setIsAudioBroadcastMuted(data.muted);
        }
      });

      newSocket.on("updated_chat", (data) => {
        console.log("hello", data);
        setMessages(data);
      });

      newSocket.on("history", (data) => {
        const {
          allowedSpeakers,
          notAllowedTexters,
          _isAudioMuted,
          _isVideoMuted,
        } = data;
        console.log("hello", data);
        setAllowedSpeakers(allowedSpeakers);
        setNotAllowedTexter(notAllowedTexters);
        setIsAudioBroadcastMuted(_isAudioMuted);
        setIsVideoBroadcastMuted(_isVideoMuted);
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
          // disconnect localstream
          // send a message
          toast("You have been banned from the meeting by the teacher");
          // set banned state
          setCanAccess(false);
          console.log("to be banned _>", data);
        }
      });

      // probablly reset all states
      newSocket.on("disconnet", () => {
        // i reckon you gon have to remove the lcoal stream
        console.log("disconnected");
      });

      //reset states
      newSocket.on("left_meeting", () => {
        router.push("/learn");
      });

      newSocket.on("meeting_ended", () => {
        router.push("/class-ended");
      });

      return () => {
        newSocket.off("remove_banned_user");
        newSocket.off("updated_revoked_text_permission");
        newSocket.off("updated_rasied_hands");
        newSocket.off("raised_hand");
        newSocket.off("history");
        newSocket.off("updated_chat");
        newSocket.off("updated_participants");
        newSocket.off("error");
        console.log("done unmounting");
      };
    }
  }, [user]);

  useEffect(() => {
    if (socket && user && user._id.length > 0) {
      setIsLoader(false);
    }
  }, [socket, user]);

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

  useEffect(() => {}, [allowedSpeakers]);

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

  const leaveOrEndMeeting = () => {
    if (user.role && socket) {
      if (user.role === "student") {
        socket.emit("leave_meeting");
      } else {
        socket.emit("end_meeting");
      }
    }
  };

  const handleAudio = async () => {
    // put can speak here if cant error message and thell them to raise your hand first
    if (!socket) {
      toast.error("you are not connectd to realtime functions");
      return;
    }

    if (!client) {
      toast.error("you are not connectd to streaming functionalities");
      return;
    }

    if (!localstream) {
      try {
        const ionSDK = await import("ion-sdk-js");
        const media = await ionSDK.LocalStream.getUserMedia({
          audio: true,
          video: false,
        });

        await client.publish(media);

        // localAudioRef.current.srcObject = media;
        // localAudioRef.current.autoplay = true;

        setLocalStream(media);
        setIsAudioMuted(false);
      } catch (error) {
        console.log(error);
        toast.error("Can not create suddio stream");
      }
    } else {
      try {
        if (isAudioMuted) {
          localstream.unmute("audio");
        } else {
          localstream.mute("audio");
        }
        setIsAudioMuted(!isAudioMuted);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const VideoMutedOverlay = () => (
    <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
      <div className="text-center text-white">
        <VideoOff className="w-16 h-16 mx-auto mb-4" />
        <p className="text-xl font-medium">Video is turned off</p>
      </div>
    </div>
  );

  const AudioMutedOverlay = () => (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-900/80 text-white px-4 py-2 rounded-full flex items-center space-x-2">
      <MicOff className="w-5 h-5" />
      <span>Audio is muted</span>
    </div>
  );

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
          {callStarted && (
            <div className="flex items-center space-x-2">
              <ListVideo className="w-4 h-4 text-green-500" />
              <span className="text-sm">Live</span>
            </div>
          )}
        </div>
        {/* do timer next */}
        {/* Time and Participants */}
        <div className="flex items-center space-x-4">
          <div className="text-lg">
            {" "}
            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            <span>
              {Array.isArray(participants) && participants.length + "/"}40
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Primary Video Grid */}
        <div className="flex-1 p-4">
          <div className="relative w-full h-full">
            <video
              ref={remoteVideoRef}
              controls
              className="w-full h-full object-cover "
              autoPlay
              playsInline
            />
            {isVideoBroadcastMuted && <VideoMutedOverlay />}
            {isAudioBroadcastMuted && <AudioMutedOverlay />}
          </div>
          <div id="audio-container" className="hidden"></div>
          <audio ref={localAudioRef} controls autoPlay />
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
          {isAudioMuted ? (
            <button
              data-tooltip-id="tooltip"
              data-tooltip-content="Unmute"
              onClick={handleAudio}
              className="p-4 rounded-full bg-gray-100 hover:bg-gray-300 disabled:hover:bg-gray-100"
            >
              <MicOff className="w-6 h-6" />
            </button>
          ) : (
            <button
              data-tooltip-id="tooltip"
              data-tooltip-content="Mute"
              onClick={handleAudio}
              className="p-4 rounded-full bg-gray-100 hover:bg-gray-300 disabled:hover:bg-gray-100"
            >
              <Mic className="w-6 h-6" />
            </button>
          )}

          <button
            data-tooltip-id="tooltip"
            data-tooltip-content="Raise hand"
            onClick={raiseHand}
            className="p-4 rounded-full bg-gray-100 hover:bg-gray-300 disabled:hover:bg-gray-100"
          >
            <Hand className="w-6 h-6" />
          </button>
        </div>

        {/* Right Controls */}
        <div>
          <button
            onClick={leaveOrEndMeeting}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Leave
          </button>
        </div>
      </div>

      <Tooltip className="z-50" id="tooltip" />

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={() => {}}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(ClassroomStudent), {
  ssr: false,
});
