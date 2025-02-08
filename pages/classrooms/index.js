import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Device } from "mediasoup-client";

function Classroom() {
  const [socket, setSocket] = useState(null);
  const [device, setDevice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [producerTransport, setProducerTransport] = useState(null);
  const [consumerTransport, setConsumerTransport] = useState(null);
  const [consumers, setConsumers] = useState(new Map());
  const [message, setMessage] = useState("N/a");
  const localVideoRef = useRef(null);
  const remoteVideosRef = useRef(null);

  // make sure you dbouble check if you are destructering well

  const roomId = "123";

  useEffect(() => {
    const newSocket = io("http://localhost:3001", {
      transports: ["websocket"],
      autoConnect: true,
    });
    setSocket(newSocket);
    console.log(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server with ID:", newSocket.id);
      setIsConnected(true);
      newSocket.emit("getRouterCapabilities");
      // Test connection by creating a room
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
      setIsConnected(false);
    });

    newSocket.on("routerCapabilities", async (rtpCapabilities) => {
      // double check this
      console.log("In here");
      try {
        const newDevice = new Device();
        await newDevice.load({ routerRtpCapabilities: rtpCapabilities });
        setDevice(newDevice);
      } catch (error) {
        console.error("Error loading device:", error);
      }
    });

    return () => {
      if (newSocket) newSocket.disconnect();
      cleanup();
    };
  }, []);

  const cleanup = () => {
    // Close all consumers
    consumers.forEach((consumer) => {
      consumer.close();
    });
    setConsumers(new Map());

    // Close transports
    if (producerTransport) {
      producerTransport.close();
    }
    if (consumerTransport) {
      consumerTransport.close();
    }

    // Clear video elements
    if (remoteVideosRef.current) {
      remoteVideosRef.current.innerHTML = "";
    }
  };

  console.log(device);

  const publish = async () => {
    if (!device || !socket) {
      alert("no device or socket");
    }

    let stream = await getUserMedia(true);

    socket.emit("createProducerTransport", {
      forceTcp: false,
      rtpCapabilities: device.rtpCapabilities,
    });

    socket.on(
      "producerTransportCreated",
      async ({ id, iceParameters, iceCandidates, dtlsParameters }) => {
        try {
          // console.log("in here");
          const transport = device.createSendTransport({
            id,
            iceParameters,
            iceCandidates,
            dtlsParameters,
          }); // we are creating a pc between our server and client this is the transport

          transport.on("connectionstatechange", async (state) => {
            switch (state) {
              case "connecting":
                setMessage("publishing");
                break;
              case "connected":
                localVideoRef.current.srcObject = stream;
                setMessage("published");
                break;
              case "failed":
                transport.close();
                setMessage("Failed to publish");
                break;

              default:
                break;
            }
          });

          transport.on(
            "connect",
            async ({ dtlsParameters }, callback, errback) => {
              console.log("dlts", dtlsParameters);
              socket.emit("connectProducerTransport", dtlsParameters); // we do this after successfully connecting the client transport and server transport
              socket.on("producerTransportConnected", (msg) => {
                if (msg !== "connected") errback();
                callback();
              }); // double check here callback()
            }
          );
          console.log(transport.id);

          transport.on(
            "produce",
            async ({ kind, rtpParameters }, callback, errback) => {
              console.log("kind etc", { kind, rtpParameters });
              socket.emit("produce", {
                transportId: transport.id,
                kind,
                rtpParameters,
                appData: {},
              });

              socket.once("published", ({ id }) => {
                console.log("Producer ID received:", id);
                if (id) {
                  callback({ id }); // Make sure to pass an object with id
                } else {
                  errback(new Error("Server failed to provide producer ID"));
                }
              });
            }
          );

          // connection state begin

          const track = stream.getVideoTracks()[0];

          await transport.produce({ track });
          // console.log("in here", transport);

          setProducerTransport(transport); // we set the transport so that  we are now able to listen to events and changes on the transport
        } catch (error) {
          console.log(error);
          alert("transport not created");
        }

        // this is to connect to the server
      }
    );
  };

  const getUserMedia = async (isWebcam) => {
    if (!device.canProduce("video")) {
      console.log("can not produce video");
      throw new Error(" can not produce video");
      return;
    }

    try {
      const stream = isWebcam
        ? await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          })
        : await navigator.mediaDevices.getDisplayMedia({ video: true });
      return stream;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Call createConsumerTransport when device is loaded
  // useEffect(() => {
  //   if (device && socket) {
  //     createConsumerTransport();
  //   }
  // }, [device, socket]);

  return (
    <div className="p-4">
      <div>Connection Status: {isConnected ? "Connected" : "Disconnected"}</div>
      <div>Producer transport Status: {message}</div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Local Video</h3>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full bg-black"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Remote Videos</h3>
          <div ref={remoteVideosRef} className="grid grid-cols-2 gap-2" />
        </div>
      </div>
      <button
        onClick={publish}
        // disabled={!isConnected || !device}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Start Stream
      </button>
    </div>
  );
}

export default Classroom;
