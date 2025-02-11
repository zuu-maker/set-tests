import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Settings,
  X,
  Volume2,
  Video,
  Mic,
  Monitor,
  Users,
  Bell,
  Sun,
  Moon,
} from "lucide-react";

const SettingsPanel = ({ isOpen, onClose, settings, onUpdateSettings }) => {
  const [activeTab, setActiveTab] = useState("audio");

  const updateSettings = () => {};
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Navigation */}
        <div className="flex border-b">
          {["audio", "video", "general"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 p-3 text-sm font-medium ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="p-4 space-y-4">
          {activeTab === "audio" && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Microphone
                </label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={settings.audioInput}
                  onChange={(e) =>
                    onUpdateSettings({ audioInput: e.target.value })
                  }
                >
                  {settings.audioInputDevices.map((device) => (
                    <option key={device.id} value={device.id}>
                      {device.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Speakers
                </label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={settings.audioOutput}
                  onChange={(e) =>
                    onUpdateSettings({ audioOutput: e.target.value })
                  }
                >
                  {settings.audioOutputDevices.map((device) => (
                    <option key={device.id} value={device.id}>
                      {device.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Echo Cancellation
                </span>
                <input
                  type="checkbox"
                  checked={settings.echoCancellation}
                  onChange={(e) =>
                    onUpdateSettings({ echoCancellation: e.target.checked })
                  }
                  className="rounded text-blue-500"
                />
              </div>
            </>
          )}

          {activeTab === "video" && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Camera
                </label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={settings.videoInput}
                  onChange={(e) =>
                    onUpdateSettings({ videoInput: e.target.value })
                  }
                >
                  {settings.videoInputDevices.map((device) => (
                    <option key={device.id} value={device.id}>
                      {device.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Video Quality
                </label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={settings.videoQuality}
                  onChange={(e) =>
                    onUpdateSettings({ videoQuality: e.target.value })
                  }
                >
                  <option value="low">Low (360p)</option>
                  <option value="medium">Medium (720p)</option>
                  <option value="high">High (1080p)</option>
                </select>
              </div>
            </>
          )}

          {activeTab === "general" && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Dark Mode
                </span>
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={(e) =>
                    onUpdateSettings({ darkMode: e.target.checked })
                  }
                  className="rounded text-blue-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Notifications
                </span>
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) =>
                    onUpdateSettings({ notifications: e.target.checked })
                  }
                  className="rounded text-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={settings.language}
                  onChange={(e) =>
                    onUpdateSettings({ language: e.target.value })
                  }
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
