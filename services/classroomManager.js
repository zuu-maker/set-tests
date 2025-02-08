import { db } from "@/firebase";
import firebase from "firebase";

const configuration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

export async function createRoom(roomId, userId, role) {
  try {
    if (role === "student") {
      const roomRef = db.collection("Classrooms").doc(roomId);

      await roomRef.set({
        teacher: userId,
        activeUsers: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      console.log("done");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function startCall(localStream) {
  try {
    const peerConnection = new RTCPeerConnection(configuration);
    // registerPeerConnectionListeners(peerConnection);

    // localStream.getTracks().forEach((track) => {
    //   peerConnection.addTrack(track, localStream);
    // });

    // peerConnection.addEventListener("track", (event) => {
    //   console.log("Got remote track:", event.streams[0]);
    //   event.streams[0].getTracks().forEach((track) => {
    //     console.log("Add a track to the remoteStream:", track);
    //     remoteStream.addTrack(track);
    //   });
    // });
  } catch (error) {}
}

function registerPeerConnectionListeners(peerConnection) {
  peerConnection.addEventListener("icegatheringstatechange", () => {
    console.log(
      `ICE gathering state changed: ${peerConnection.iceGatheringState}`
    );
  });

  peerConnection.addEventListener("connectionstatechange", () => {
    console.log(`Connection state change: ${peerConnection.connectionState}`);
  });

  peerConnection.addEventListener("signalingstatechange", () => {
    console.log(`Signaling state change: ${peerConnection.signalingState}`);
  });

  peerConnection.addEventListener("iceconnectionstatechange", () => {
    console.log(
      `ICE connection state change: ${peerConnection.iceConnectionState}`
    );
  });
}

function unRegisterPeerConnectionListeners(peerConnection) {
  peerConnection.removeEventListener("icegatheringstatechange", () => {
    console.log(
      `ICE gathering state changed: ${peerConnection.iceGatheringState}`
    );
  });

  peerConnection.removeEventListener("connectionstatechange", () => {
    console.log(`Connection state change: ${peerConnection.connectionState}`);
  });

  peerConnection.removeEventListener("signalingstatechange", () => {
    console.log(`Signaling state change: ${peerConnection.signalingState}`);
  });

  peerConnection.removeEventListener("iceconnectionstatechange", () => {
    console.log(
      `ICE connection state change: ${peerConnection.iceConnectionState}`
    );
  });
}
