import React from "react";
import { Hand, HandStop, Mic, Video, X } from "lucide-react";

function TeacherUI({ raisedHands, grantPermission, denyPermission }) {
  return (
    <div>
      {/* Notification */}
      {/* {showNotification && raisedHands.size > 0 && (
        <Alert className="mb-4">
          <AlertDescription>
            New hand raised! {raisedHands.size} student(s) waiting.
          </AlertDescription>
        </Alert>
      )} */}

      {raisedHands.size > 0 && (
        <div className="space-y-2">
          {Array.from(raisedHands.entries()).map(([userId, data]) => (
            <div
              key={userId}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <div>
                <p className="font-medium">{data.username}</p>
                <p className="text-xs text-gray-500">
                  {new Date(data.timestamp).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => grantPermission(userId, data.username)}
                  className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                  title="Grant Permission"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  onClick={() => denyPermission(userId)}
                  className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                  title="Deny Permission"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeacherUI;
