// Example showing how Firebase Signaling and WebRTC work together

const configuration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

// 1. First, create the Firebase signaling instance
const firebaseSignaling = new FirestoreSignaling(roomId, userId, "teacher");

// 2. Then create WebRTC with this signaling
const webRTC = new WebRTCService(firebaseSignaling);

// Here's how they interact:
class WebRTCService {
  constructor(signaling) {
    this.signaling = signaling; // Firebase signaling instance
    this.peerConnections = new Map();

    // Listen for signaling events
    this.signaling.onSignal((signal) => {
      // When Firebase receives a message, handle it here
      if (signal.type === "offer") {
        this.handleOffer(signal.from, signal.data);
      } else if (signal.type === "answer") {
        this.handleAnswer(signal.from, signal.data);
      } else if (signal.type === "ice-candidate") {
        this.handleIceCandidate(signal.from, signal.data);
      }
    });
  }

  // When starting a call
  async startCall(otherUserId) {
    const peerConnection = new RTCPeerConnection(configuration);

    // When we have an ICE candidate, send it through Firebase
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.signaling.sendSignal(otherUserId, {
          type: "ice-candidate",
          data: event.candidate,
        });
      }
    };

    // Create and send offer through Firebase
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    await this.signaling.sendSignal(otherUserId, {
      type: "offer",
      data: offer,
    });
  }
}

// Here's the Firebase signaling part
class FirestoreSignaling {
  constructor(roomId, userId, role) {
    this.roomId = roomId;
    this.userId = userId;

    // Listen for WebRTC signals in Firebase
    firebase
      .firestore()
      .collection("rooms")
      .doc(roomId)
      .collection("signals")
      .where("to", "==", userId)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === "added") {
            const signal = change.doc.data();
            // Pass the signal to WebRTC
            this.onSignalCallback(signal);
            // Clean up the signal
            await change.doc.ref.delete();
          }
        });
      });
  }

  // Method to send signals (used by WebRTC)
  async sendSignal(targetUserId, signal) {
    await firebase
      .firestore()
      .collection("rooms")
      .doc(this.roomId)
      .collection("signals")
      .add({
        from: this.userId,
        to: targetUserId,
        type: signal.type,
        data: signal.data,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  }

  // Register callback for incoming signals
  onSignal(callback) {
    this.onSignalCallback = callback;
  }
}

// Usage example:
async function setupClassroomConnection() {
  // 1. Initialize Firebase signaling
  const signaling = new FirestoreSignaling(
    "classroom-123",
    "teacher-1",
    "teacher"
  );

  // 2. Create WebRTC with this signaling
  const webRTC = new WebRTCService(signaling);

  // 3. When a new student joins (handled by your UI)
  function onNewStudent(studentId) {
    // WebRTC will use signaling to establish connection
    webRTC.startCall(studentId);
  }
}
