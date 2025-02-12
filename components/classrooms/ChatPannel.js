import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Settings,
  X,
  Volume2,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Monitor,
  Users,
  Bell,
  Sun,
  Moon,
  Hand,
  MessageSquareOff,
  UserX,
} from "lucide-react";
import TeacherUI from "./raisehands/TeacherUI";

const ChatPanel = ({
  isOpen,
  onClose,
  messages = [],
  onSendMessage,
  participants,
  raisedhands,
  grantPermission,
  revokeTextPermission,
  grantTextPermission,
  denyPermission,
  notAllowedTexter,
  banStudent,
  user,
}) => {
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("participants"); // 'chat' or 'participants'
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  // if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-white shadow-lg flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("participants")}
            className={`px-3 py-1 rounded-lg ${
              activeTab === "participants"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600"
            }`}
          >
            <Users className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-3 py-1 rounded-lg ${
              activeTab === "chat"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveTab("raisedHands")}
            className={`px-3 py-1 rounded-lg ${
              activeTab === "raisedHands"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600"
            }`}
          >
            <Hand className="w-5 h-5" />
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Mute all
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "chat" && (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  msg.senderId === user._id
                    ? "bg-blue-100 ml-8"
                    : "bg-gray-300 mr-8"
                }`}
              >
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-medium text-sm">{msg.sender}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm">{msg.content}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        {activeTab === "participants" && (
          <div className="space-y-2">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      participant.isActive ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                  <span className="ml-2">{participant.name}</span>
                </div>

                <div className="flex space-x-2">
                  {notAllowedTexter.includes(user._id) ? (
                    <MessageSquareOff
                      onClick={() => {
                        grantTextPermission(participant.id);
                      }}
                      className="w-4 h-4 text-gray-400 cursor-pointer"
                    />
                  ) : (
                    <MessageSquare
                      onClick={() => {
                        revokeTextPermission(participant.id);
                      }}
                      className="w-4 h-4 text-gray-400 cursor-pointer"
                    />
                  )}

                  {participant.isMuted ? (
                    <MicOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Mic className="w-4 h-4 text-gray-400" />
                  )}
                  <UserX
                    onClick={() => banStudent(participant.id, participant.name)}
                    className="w-4 h-4 text-gray-400"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "raisedHands" && (
          <TeacherUI
            raisedhands={raisedhands}
            grantPermission={grantPermission}
            denyPermission={denyPermission}
          />
        )}
      </div>

      {/* Message Input */}
      {activeTab === "chat" && (
        <div>
          {!notAllowedTexter.includes(user._id) ? (
            <form onSubmit={handleSend} className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </form>
          ) : (
            <p>Your text permissions have been revoked</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatPanel;
