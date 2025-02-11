export // Enhanced camera constraints
const cameraConstraints = {
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
    sampleRate: 48000,
  },
  video: {
    width: { ideal: 1920, min: 640 },
    height: { ideal: 1080, min: 480 },
    frameRate: { ideal: 30, min: 15 },
    aspectRatio: 1.777777778,
    encodings: [
      {
        rid: "h",
        maxBitrate: 3000000,
        maxFramerate: 30,
      },
      {
        rid: "m",
        maxBitrate: 1000000,
        maxFramerate: 30,
      },
      {
        rid: "l",
        maxBitrate: 500000,
        maxFramerate: 15,
      },
    ],
  },
  simulcast: true,
};

// Enhanced screen share constraints
export const screenShareConstraints = {
  video: {
    width: { ideal: 1920, min: 1280 },
    height: { ideal: 1080, min: 720 },
    frameRate: { ideal: 30, min: 15 },
    displaySurface: "monitor",
    logicalSurface: true,
    encodings: [
      {
        rid: "h",
        maxBitrate: 5000000,
        maxFramerate: 30,
      },
    ],
  },
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 48000,
  },
  codec: "vp8",
  resolution: "hd",
};
