import { CONFIG } from '../config';
import { VitalSigns, FaceDetection, PoseDetection } from '../types';

export const calculateHeartRate = (faceDetection: FaceDetection): number => {
  // This is a simplified version - in a real application, you would use
  // photoplethysmography (PPG) to detect blood flow changes
  const { landmarks } = faceDetection;
  if (!landmarks || landmarks.length < 2) return 0;

  // Calculate distance between two facial landmarks (e.g., corners of the eyes)
  const distance = Math.sqrt(
    Math.pow(landmarks[0].x - landmarks[1].x, 2) +
    Math.pow(landmarks[0].y - landmarks[1].y, 2)
  );

  // Convert distance to heart rate (simplified)
  const heartRate = Math.round(60 + (distance * 10));
  return Math.min(Math.max(heartRate, CONFIG.thresholds.heartRate.min), CONFIG.thresholds.heartRate.max);
};

export const calculateRespiratoryRate = (poseDetection: PoseDetection): number => {
  // This is a simplified version - in a real application, you would track
  // chest movement over time
  const { keypoints } = poseDetection;
  if (!keypoints || keypoints.length < 2) return 0;

  // Find chest keypoints
  const chestKeypoints = keypoints.filter(k => k.name.includes('chest'));
  if (chestKeypoints.length < 2) return 0;

  // Calculate chest movement
  const movement = Math.abs(chestKeypoints[0].y - chestKeypoints[1].y);
  
  // Convert movement to respiratory rate (simplified)
  const respiratoryRate = Math.round(12 + (movement * 5));
  return Math.min(Math.max(respiratoryRate, CONFIG.thresholds.respiratoryRate.min), CONFIG.thresholds.respiratoryRate.max);
};

export const calculateStressLevel = (faceDetection: FaceDetection, poseDetection: PoseDetection): number => {
  // This is a simplified version - in a real application, you would use
  // multiple factors including facial expressions and body posture
  const heartRate = calculateHeartRate(faceDetection);
  const respiratoryRate = calculateRespiratoryRate(poseDetection);

  // Calculate stress level based on heart rate and respiratory rate
  const heartRateStress = Math.abs(heartRate - CONFIG.thresholds.heartRate.normal.max);
  const respiratoryRateStress = Math.abs(respiratoryRate - CONFIG.thresholds.respiratoryRate.normal.max);
  
  const stressLevel = Math.round((heartRateStress + respiratoryRateStress) / 2);
  return Math.min(Math.max(stressLevel, CONFIG.thresholds.stressLevel.min), CONFIG.thresholds.stressLevel.max);
};

export const smoothData = (data: number[], windowSize: number = CONFIG.processing.smoothingWindow): number => {
  if (data.length === 0) return 0;
  if (data.length < windowSize) return data[data.length - 1];

  const window = data.slice(-windowSize);
  return Math.round(window.reduce((a, b) => a + b) / window.length);
}; 