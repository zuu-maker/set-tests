import React from "react";
import { Hand, HandStop, Mic, Video, X } from "lucide-react";

function TeacherUI({ raisedhands, grantPermission, denyPermission }) {
  console.log("in teacher ui", raisedhands);
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

      {raisedhands.length > 0 && (
        <div className="space-y-2">
          {raisedhands.map((data) => (
            <div
              key={data.timestamp}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <div>
                <p className="font-medium">{data.name}</p>
                <p className="text-xs text-gray-500">
                  {new Date(data.timestamp).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Grant permission"
                  onClick={() => grantPermission(data.id, data.name)}
                  className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                  title="Grant Permission"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Reject permission"
                  onClick={() => denyPermission(data.id)}
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
