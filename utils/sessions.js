import { db } from "@/firebase";

export async function createNewSession(userId, deviceId, userAgent) {
  try {
    const sessionsRef = db.collection("ActiveSessions");

    // Start a transaction to handle race conditions

    // Get all existing sessions for the user
    const existingSessions = await sessionsRef
      .where("userId", "==", userId)
      .get();

    console.log("stuck here");

    if (!existingSessions.empty) {
      console.log("stuck here 2");
      existingSessions.docs.forEach(async (doc) => {
        await sessionsRef.doc(doc.id).delete();
      });
    }
    console.log("long 1");

    // Create new session
    const newSession = {
      userId,
      deviceId,
      userAgent,
    };

    await sessionsRef.add(newSession);
    console.log("long 2");

    console.log("done trans");
    return true;
  } catch (error) {
    console.log("session creation err", error);
    return false;
  }
}

export async function validateSession(userId, deviceId) {
  console.log("userid -->", userId);
  console.log("userid -->", deviceId);
  try {
    const sessionsRef = db.collection("ActiveSessions");

    const sessionQuery = await sessionsRef
      .where("userId", "==", userId)
      .where("deviceId", "==", deviceId)
      .limit(1)
      .get();

    if (sessionQuery.empty) {
      console.log("empty");
      return false;
    }

    // Check if session is expired (24 hours)
    // Update last active timestamp

    return true;
  } catch (error) {
    console.log("validatuion err", error);
    return false;
  }
}

export async function deleteSession(userId, deviceId) {
  console.log("userid -->", userId);
  console.log("userid -->", deviceId);
  try {
    const sessionsRef = db.collection("ActiveSessions");

    const sessionQuery = await sessionsRef
      .where("userId", "==", userId)
      .where("deviceId", "==", deviceId)
      .limit(1)
      .get();

    if (sessionQuery.empty) {
      await sessionsRef.doc(sessionQuery.docs[0].id).delete();
      console.log("deleted");
    }

    // Check if session is expired (24 hours)
    // Update last active timestamp
  } catch (error) {
    console.log("validatuion err", error);
  }
}
