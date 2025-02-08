import { db } from "@/firebase";

// classroom-signaling.js
class ClassroomSignaling {
  constructor(roomId, userId, role) {
    this.db = db;
    this.roomId = roomId;
    this.userId = userId;
    this.role = role; // 'teacher' or 'student'
    this.participants = new Map();
    this.unsubscribeCallbacks = new Set();
  }

  async initializeClassroom() {
    try {
      // Set up room if teacher
      if (this.role === "teacher") {
        await this.db
          .collection("Classrooms")
          .doc(this.roomId)
          .set({
            teacherId: this.userId,
            status: "active",
            settings: {
              allowStudentAudio: true,
              allowStudentVideo: true,
              allowChat: true,
              allowHandRaise: true,
            },
            activeParticipants: [this.userId],
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
      }

      // Join classroom
      await this.joinClassroom();

      // Listen for classroom events
      this.setupClassroomListeners();
    } catch (error) {
      console.error("Error initializing classroom:", error);
      throw error;
    }
  }

  async joinClassroom() {
    const participantRef = this.db
      .collection("classrooms")
      .doc(this.roomId)
      .collection("participants")
      .doc(this.userId);

    await participantRef.set({
      userId: this.userId,
      role: this.role,
      joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
      mediaStatus: {
        audio: false,
        video: false,
        handRaised: false,
      },
    });

    // Update active participants
    await this.db
      .collection("classrooms")
      .doc(this.roomId)
      .update({
        activeParticipants: firebase.firestore.FieldValue.arrayUnion(
          this.userId
        ),
      });
  }

  setupClassroomListeners() {
    // Listen for new participants
    const participantsUnsubscribe = this.db
      .collection("classrooms")
      .doc(this.roomId)
      .collection("participants")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const participant = change.doc.data();
          if (change.type === "added" && participant.userId !== this.userId) {
            this.handleNewParticipant(participant);
          } else if (change.type === "removed") {
            this.handleParticipantLeft(participant.userId);
          }
        });
      });

    // Listen for signals
    const signalsUnsubscribe = this.db
      .collection("classrooms")
      .doc(this.roomId)
      .collection("signals")
      .where("to", "==", this.userId)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === "added") {
            const signal = change.doc.data();
            await this.handleSignal(signal);
            // Clean up processed signal
            await change.doc.ref.delete();
          }
        });
      });

    // Listen for classroom settings changes
    const settingsUnsubscribe = this.db
      .collection("classrooms")
      .doc(this.roomId)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          this.handleSettingsUpdate(snapshot.data().settings);
        }
      });

    this.unsubscribeCallbacks.add(participantsUnsubscribe);
    this.unsubscribeCallbacks.add(signalsUnsubscribe);
    this.unsubscribeCallbacks.add(settingsUnsubscribe);
  }

  async sendSignal(targetUserId, signal) {
    try {
      await this.db
        .collection("classrooms")
        .doc(this.roomId)
        .collection("signals")
        .add({
          type: signal.type,
          data: signal.data,
          from: this.userId,
          to: targetUserId,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
      console.error("Error sending signal:", error);
      throw error;
    }
  }

  // Handle classroom-specific actions
  async updateMediaStatus(updates) {
    const participantRef = this.db
      .collection("classrooms")
      .doc(this.roomId)
      .collection("participants")
      .doc(this.userId);

    await participantRef.update({
      mediaStatus: updates,
    });
  }

  async raiseHand() {
    await this.updateMediaStatus({
      handRaised: true,
    });
  }

  async lowerHand() {
    await this.updateMediaStatus({
      handRaised: false,
    });
  }

  // Teacher-specific actions
  async updateClassroomSettings(settings) {
    if (this.role !== "teacher") {
      throw new Error("Only teachers can update classroom settings");
    }

    await this.db.collection("classrooms").doc(this.roomId).update({
      settings,
    });
  }

  async muteAllStudents() {
    if (this.role !== "teacher") return;

    const batch = this.db.batch();
    const participants = await this.db
      .collection("classrooms")
      .doc(this.roomId)
      .collection("participants")
      .where("role", "==", "student")
      .get();

    participants.docs.forEach((doc) => {
      batch.update(doc.ref, {
        "mediaStatus.audio": false,
      });
    });

    await batch.commit();
  }

  // Cleanup
  async leaveClassroom() {
    try {
      // Remove from participants
      await this.db
        .collection("classrooms")
        .doc(this.roomId)
        .collection("participants")
        .doc(this.userId)
        .delete();

      // Update active participants
      await this.db
        .collection("classrooms")
        .doc(this.roomId)
        .update({
          activeParticipants: firebase.firestore.FieldValue.arrayRemove(
            this.userId
          ),
        });

      // Cleanup listeners
      this.unsubscribeCallbacks.forEach((unsubscribe) => unsubscribe());
      this.unsubscribeCallbacks.clear();

      // If teacher is leaving, end class
      if (this.role === "teacher") {
        await this.endClass();
      }
    } catch (error) {
      console.error("Error leaving classroom:", error);
      throw error;
    }
  }

  async endClass() {
    if (this.role !== "teacher") return;

    await this.db.collection("classrooms").doc(this.roomId).update({
      status: "ended",
      endedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  // Event handlers
  handleNewParticipant(participant) {
    this.participants.set(participant.userId, participant);
    // Implement your connection logic here
    if (this.onParticipantJoined) {
      this.onParticipantJoined(participant);
    }
  }

  handleParticipantLeft(userId) {
    this.participants.delete(userId);
    if (this.onParticipantLeft) {
      this.onParticipantLeft(userId);
    }
  }

  async handleSignal(signal) {
    if (this.onSignalReceived) {
      await this.onSignalReceived(signal);
    }
  }

  handleSettingsUpdate(settings) {
    if (this.onSettingsUpdated) {
      this.onSettingsUpdated(settings);
    }
  }

  // Event listeners
  setOnParticipantJoined(callback) {
    this.onParticipantJoined = callback;
  }

  setOnParticipantLeft(callback) {
    this.onParticipantLeft = callback;
  }

  setOnSignalReceived(callback) {
    this.onSignalReceived = callback;
  }

  setOnSettingsUpdated(callback) {
    this.onSettingsUpdated = callback;
  }
}
