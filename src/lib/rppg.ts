import * as tf from '@tensorflow/tfjs';
import { CONFIG } from '../config';
import { VitalSigns } from '../types';

export interface RppgSignal {
  timestamp: number;
  value: number;
}

export interface VitalSignMetrics {
  heartRate: number;
  respiratoryRate: number;
  stressLevel: number;
}

// Butterworth bandpass filter coefficients for heart rate (0.7-4Hz)
const BANDPASS_B = [0.02452, 0, -0.04904, 0, 0.02452];
const BANDPASS_A = [1, -3.8343, 5.5281, -3.5646, 0.8708];

// Extract the green channel and normalize
const extractGreenChannel = (imageData: ImageData): number => {
  const pixels = imageData.data;
  let sum = 0;
  let count = 0;
  
  // Only consider pixels with reasonable RGB values to avoid noise
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    
    // Check if the pixel is not too dark or too bright
    if (g > 20 && g < 230 && r > 10 && b > 10) {
      sum += g;
      count++;
    }
  }
  
  // Normalize the green value
  return count > 0 ? sum / count : 0;
};

// Apply Butterworth bandpass filter
const applyBandpassFilter = (signal: number[]): number[] => {
  const filtered = new Array(signal.length).fill(0);
  const order = BANDPASS_A.length;
  
  // Apply filter
  for (let i = 0; i < signal.length; i++) {
    filtered[i] = BANDPASS_B[0] * signal[i];
    
    for (let j = 1; j < order; j++) {
      if (i - j >= 0) {
        filtered[i] += BANDPASS_B[j] * signal[i - j];
        filtered[i] -= BANDPASS_A[j] * filtered[i - j];
      }
    }
  }
  
  return filtered;
};

// Detrend the signal using a moving average
const detrendSignal = (signal: number[], windowSize: number): number[] => {
  const result = new Array(signal.length).fill(0);
  
  for (let i = 0; i < signal.length; i++) {
    let sum = 0;
    let count = 0;
    const halfWindow = Math.floor(windowSize / 2);
    
    for (let j = Math.max(0, i - halfWindow); j < Math.min(signal.length, i + halfWindow + 1); j++) {
      sum += signal[j];
      count++;
    }
    
    const movingAverage = sum / count;
    result[i] = signal[i] - movingAverage;
  }
  
  return result;
};

// Calculate power spectrum using FFT
const calculatePowerSpectrum = async (signal: number[], samplingRate: number): Promise<{ frequencies: number[], magnitude: number[] }> => {
  // Convert signal to tensor
  const signalTensor = tf.tensor1d(signal);
  
  // Apply Hanning window
  const window = tf.tensor1d(
    signal.map((_, i) => 0.5 * (1 - Math.cos((2 * Math.PI * i) / (signal.length - 1)))
  ));
  const windowedSignal = tf.mul(signalTensor, window);
  
  // Perform FFT
  const fft = tf.spectral.rfft(windowedSignal);
  const magnitudes = tf.abs(fft);
  
  // Convert to array
  const magnitude = Array.from(await magnitudes.data());
  
  // Calculate frequency bins
  const frequencies = Array.from(
    { length: magnitude.length },
    (_, i) => (i * samplingRate) / (2 * magnitude.length)
  );
  
  // Cleanup tensors
  signalTensor.dispose();
  window.dispose();
  windowedSignal.dispose();
  fft.dispose();
  magnitudes.dispose();
  
  return { frequencies, magnitude };
};

// Find peaks in the signal
const findPeaks = (signal: number[], minDistance: number = 10): number[] => {
  const peaks: number[] = [];
  
  for (let i = 1; i < signal.length - 1; i++) {
    if (signal[i] > signal[i - 1] && signal[i] > signal[i + 1]) {
      if (peaks.length === 0 || i - peaks[peaks.length - 1] >= minDistance) {
        peaks.push(i);
      } else if (signal[i] > signal[peaks[peaks.length - 1]]) {
        peaks[peaks.length - 1] = i;
      }
    }
  }
  
  return peaks;
};

// Calculate heart rate from peaks
const calculateHeartRate = (signals: RppgSignal[], samplingRate: number): number => {
  if (signals.length < 2) return 0;
  
  // Simple peak detection algorithm
  const values = signals.map(s => s.value);
  const peaks = [];
  
  for (let i = 1; i < values.length - 1; i++) {
    if (values[i] > values[i - 1] && values[i] > values[i + 1]) {
      peaks.push(i);
    }
  }
  
  if (peaks.length < 2) return 0;
  
  // Calculate average time between peaks
  let totalTime = 0;
  for (let i = 1; i < peaks.length; i++) {
    totalTime += signals[peaks[i]].timestamp - signals[peaks[i - 1]].timestamp;
  }
  const avgTimeBetweenPeaks = totalTime / (peaks.length - 1);
  
  // Convert to BPM
  return Math.round((60 * 1000) / avgTimeBetweenPeaks);
};

// Calculate respiratory rate from signal envelope
const calculateRespiratoryRate = (signals: RppgSignal[], samplingRate: number): number => {
  if (signals.length < 2) return 0;
  
  // Simple peak detection for respiratory rate (slower than heart rate)
  const values = signals.map(s => s.value);
  const peaks = [];
  
  // Apply moving average to smooth the signal
  const windowSize = Math.floor(samplingRate / 2);
  const smoothedValues = [];
  
  for (let i = 0; i < values.length; i++) {
    let sum = 0;
    let count = 0;
    for (let j = Math.max(0, i - windowSize); j <= Math.min(values.length - 1, i + windowSize); j++) {
      sum += values[j];
      count++;
    }
    smoothedValues.push(sum / count);
  }
  
  // Find peaks in smoothed signal
  for (let i = 1; i < smoothedValues.length - 1; i++) {
    if (smoothedValues[i] > smoothedValues[i - 1] && smoothedValues[i] > smoothedValues[i + 1]) {
      peaks.push(i);
    }
  }
  
  if (peaks.length < 2) return 0;
  
  // Calculate average time between peaks
  let totalTime = 0;
  for (let i = 1; i < peaks.length; i++) {
    totalTime += signals[peaks[i]].timestamp - signals[peaks[i - 1]].timestamp;
  }
  const avgTimeBetweenPeaks = totalTime / (peaks.length - 1);
  
  // Convert to breaths per minute
  return Math.round((60 * 1000) / avgTimeBetweenPeaks);
};

// Calculate stress level based on Heart Rate Variability (HRV)
const calculateStressLevel = (signals: RppgSignal[]): number => {
  if (signals.length < 2) return 0;
  
  // Calculate heart rate variability (HRV) as a proxy for stress
  const values = signals.map(s => s.value);
  const peaks = [];
  
  // Find peaks
  for (let i = 1; i < values.length - 1; i++) {
    if (values[i] > values[i - 1] && values[i] > values[i + 1]) {
      peaks.push(i);
    }
  }
  
  if (peaks.length < 2) return 0;
  
  // Calculate RR intervals
  const rrIntervals = [];
  for (let i = 1; i < peaks.length; i++) {
    rrIntervals.push(signals[peaks[i]].timestamp - signals[peaks[i - 1]].timestamp);
  }
  
  // Calculate RMSSD (Root Mean Square of Successive Differences)
  let sumSquaredDiffs = 0;
  for (let i = 1; i < rrIntervals.length; i++) {
    const diff = rrIntervals[i] - rrIntervals[i - 1];
    sumSquaredDiffs += diff * diff;
  }
  const rmssd = Math.sqrt(sumSquaredDiffs / (rrIntervals.length - 1));
  
  // Convert RMSSD to stress level (0-100)
  // Lower HRV (RMSSD) indicates higher stress
  const maxRmssd = 100; // Maximum expected RMSSD
  const stressLevel = Math.max(0, Math.min(100, 100 - (rmssd / maxRmssd * 100)));
  
  return Math.round(stressLevel);
};

export const processFrame = async (
  faceRegion: ImageData,
  signalHistory: RppgSignal[],
  samplingRate: number
): Promise<VitalSigns> => {
  try {
    // Calculate average color in the face region
    const data = faceRegion.data;
    let r = 0, g = 0, b = 0;
    let count = 0;
    
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count++;
    }
    
    const avgR = r / count;
    const avgG = g / count;
    const avgB = b / count;
    
    // Calculate PPG signal (using green channel as it's most sensitive to blood volume changes)
    const ppgSignal = avgG;
    
    // Add signal to history
    const timestamp = Date.now();
    signalHistory.push({ timestamp, value: ppgSignal });
    
    // Calculate vital signs
    const heartRate = calculateHeartRate(signalHistory, samplingRate);
    const respiratoryRate = calculateRespiratoryRate(signalHistory, samplingRate);
    const stressLevel = calculateStressLevel(signalHistory);
    
    return {
      heartRate,
      respiratoryRate,
      stressLevel
    };
  } catch (error) {
    console.error('Error processing frame:', error);
    return {
      heartRate: 0,
      respiratoryRate: 0,
      stressLevel: 0
    };
  }
};

export const extractFaceRegion = (
  video: HTMLVideoElement,
  face: any
): ImageData | null => {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = CONFIG.webcam.width;
    canvas.height = CONFIG.webcam.height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return null;
    
    // Draw the video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Extract face region
    const faceBox = face.boundingBox;
    const x = Math.max(0, faceBox.xMin * canvas.width);
    const y = Math.max(0, faceBox.yMin * canvas.height);
    const width = Math.min(canvas.width - x, faceBox.width * canvas.width);
    const height = Math.min(canvas.height - y, faceBox.height * canvas.height);
    
    return ctx.getImageData(x, y, width, height);
  } catch (error) {
    console.error('Error extracting face region:', error);
    return null;
  }
}; 