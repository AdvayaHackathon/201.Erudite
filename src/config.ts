export const CONFIG = {
  webcam: {
    width: 640,
    height: 480,
  },
  model: {
    faceDetection: {
      maxFaces: 1,
      flipHorizontal: false,
    },
    poseDetection: {
      modelType: 'lightning',
    },
  },
  processing: {
    samplingRate: 30, // fps
    smoothingWindow: 5,
    historyLength: 60, // seconds
  },
  chart: {
    updateInterval: 1000, // ms
  },
  thresholds: {
    heartRate: {
      min: 40,
      max: 200,
      normal: {
        min: 60,
        max: 100,
      },
    },
    respiratoryRate: {
      min: 8,
      max: 30,
      normal: {
        min: 12,
        max: 20,
      },
    },
    stressLevel: {
      min: 0,
      max: 100,
    },
  },
}; 