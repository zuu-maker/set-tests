import { db } from "@/firebase";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import firebase from "firebase";

const constraints = {
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  },
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    frameRate: { max: 30 },
  },
};

function Room() {
  let { id } = useParams();
  const { _id } = useSelector((state) => state.user);

  const [localStream, setLocalStream] = useState(null);
  const [isConnected, setIsConnected] = useState(null);
  const [participants, setParticipants] = useState(new Map());

  const peerConnections = useRef(new Map());

  useEffect(() => {
    if (!id || !_id) return;

    const queryRef = db
      .collection("Classrooms")
      .doc(_id)
      .collection("Signals")
      .where("to", "==", _id);

    const unsubscribe = queryRef.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          const signal = change.doc.data();
          const { from, type, data } = signal;

          switch (type) {
            case "offer":
              await handleOffer(from, data.offer);
              break;
            case "answer":
              await handleAnswer(from, data.answer);
              break;
            case "ice-candidate":
              await handleIceCandidate(from, data.candidate);
              break;
          }

          // Clean up processed signal
          await deleteDoc(change.doc.ref);
        }
      });
    });

    return () => unsubscribe();
  }, [id, _id, handleOffer, handleAnswer, handleIceCandidate]);

  useEffect(() => {
    if (localStream === null) requestMediaPermissions();

    const cleanup = async () => {
      // Stop all tracks in local stream
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }

      // Close all peer connections
      peerConnections.current.forEach((connection) => {
        connection.close();
      });
      peerConnections.current.clear();

      // Clear participants
      setParticipants(new Map());
      setLocalStream(null);
      setIsConnected(false);
    };

    return () => {
      cleanup();
      // Add your cleanup code here
    };
  }, [localStream]);

  const sendSignal = async (targetId, signal) => {
    try {
      await db.collection("Classrooms").doc(id).collection("Signals").add({
        from: userId,
        to: targetId,
        type: signal.type,
        data: signal,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (err) {
      setError("Failed to send signal");
      console.error("Signaling error:", err);
    }
  };

  const createPeerConnection = async (participantId) => {
    try {
      const peerConnection = new RTCPeerConnection(configuration);

      // Add local tracks to the connection
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, localStream);
        });
      }

      // Handle ICE candidates
      peerConnection.onicecandidate = ({ candidate }) => {
        if (candidate) {
          sendSignal(participantId, {
            type: "ice-candidate",
            candidate,
          });
        }
      };

      // Handle incoming tracks
      peerConnection.ontrack = (event) => {
        const [stream] = event.streams;
        setParticipants((prev) =>
          new Map(prev).set(participantId, {
            stream,
            userId: participantId,
          })
        );
      };

      // Store the peer connection
      peerConnections.current.set(participantId, peerConnection);
      return peerConnection;
    } catch (err) {
      setError("Failed to create peer connection");
      throw err;
    }
  };

  const requestMediaPermissions = async () => {
    try {
      const _localStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      setLocalStream(_localStream);

      setError("");
      return stream;
    } catch (err) {
      setError("Please allow camera and microphone access to join the class");
      setHasMediaPermissions(false);
    }
  };

  return <div>Room</div>;
}

export default Room;
