import { db } from "@/firebase";

export class SessionManger {
  static async isUserSignedIn(userId) {
    try {
      console.log(userId);
      const sessions = await db
        .collection("ActiveSessions")
        .where("userId", "==", userId)
        .get();

      return sessions.docs.length > 0 ? true : false;
    } catch (error) {
      console.error("Error checking session:", error);
      throw error;
    }
  }

  static async createSession(userId) {
    try {
      // First check if user already has an active session
      const isActive = await this.isUserSignedIn(userId);
      if (isActive) {
        return false;
      }

      // Create new session
      await db.collection("ActiveSessions").add({
        lastActive: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        userId,
        deviceInfo: {
          userAgent: window.navigator.userAgent,
          platform: window.navigator.platform,
        },
      });

      return true;
    } catch (error) {
      console.error("Error creating session:", error);
      throw error;
    }
  }

  static async endSession(userId) {
    try {
      const userSessions = await db
        .collection("ActiveSessions")
        .where("userId", "==", userId)
        .get();
      if (!userSessions.empty) {
        const sessionId = userSessions.docs[0].id;
        await db.collection("ActiveSessions").doc(sessionId).delete();
      }
    } catch (error) {
      console.error("Error ending session:", error);
    }
  }
}
