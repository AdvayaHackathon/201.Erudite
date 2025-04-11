import React, { useEffect, useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { processFrame, extractFaceRegion, RppgSignal } from '../lib/rppg';
import { CONFIG } from '../config';
import { VitalSigns, FaceDetection, PoseDetection } from '../types';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SAMPLING_RATE = 30; // 30 fps
const MAX_HISTORY_LENGTH = 60; // 1 minute of history

const HealthMonitor: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    heartRate: 0,
    respiratoryRate: 0,
    stressLevel: 0,
  });
  const [vitalHistory, setVitalHistory] = useState<VitalSigns[]>([]);
  
  // Refs for models and monitoring
  const faceModelRef = useRef<any>(null);
  const poseModelRef = useRef<any>(null);
  const monitoringIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const rppgSignalsRef = useRef<RppgSignal[]>([]);

  // Load ML models
  const loadModels = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Initialize TensorFlow.js
      await tf.ready();
      
      // Load face detection model
      faceModelRef.current = await faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
        {
          runtime: 'tfjs',
          refineLandmarks: true,
          maxFaces: 1
        }
      );
      
      // Load pose detection model
      poseModelRef.current = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        { modelType: 'lightning' }
      );
      
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load models. Please refresh and try again.');
      setIsLoading(false);
      console.error('Error loading models:', err);
    }
  };

  // Initialize models on component mount
  useEffect(() => {
    loadModels();
    return () => {
      // Cleanup
      if (monitoringIntervalRef.current) {
        clearInterval(monitoringIntervalRef.current);
      }
    };
  }, []);

  const processFrame = async () => {
    if (!webcamRef.current?.video || !faceModelRef.current || !poseModelRef.current) return;

    try {
      const video = webcamRef.current.video;

      // Get face landmarks
      const faces = await faceModelRef.current.estimateFaces({
        input: video,
        flipHorizontal: false
      });

      // Get pose
      const poses = await poseModelRef.current.estimatePoses(video);

      if (faces.length > 0) {
        // Extract face region for rPPG analysis
        const faceRegion = extractFaceRegion(video, faces[0]);
        
        if (faceRegion) {
          // Process the frame and get vital signs
          const metrics = await processFrame(
            faceRegion,
            rppgSignalsRef.current,
            SAMPLING_RATE
          );

          // Update vital signs
          setVitalSigns(metrics);
          setVitalHistory(prev => {
            const newHistory = [...prev, metrics];
            return newHistory.slice(-MAX_HISTORY_LENGTH);
          });

          // Update rPPG signals history
          rppgSignalsRef.current = rppgSignalsRef.current.slice(-SAMPLING_RATE * 10); // Keep last 10 seconds
        }
      }
    } catch (err) {
      console.error('Error processing frame:', err);
    }
  };

  const startMonitoring = useCallback(async () => {
    if (!faceModelRef.current || !poseModelRef.current) {
      setError('Models not loaded. Please wait or refresh the page.');
      return;
    }

    setIsMonitoring(true);
    rppgSignalsRef.current = []; // Reset signals

    // Start monitoring loop
    monitoringIntervalRef.current = setInterval(processFrame, 1000 / SAMPLING_RATE);
  }, []);

  const stopMonitoring = useCallback(() => {
    if (monitoringIntervalRef.current) {
      clearInterval(monitoringIntervalRef.current);
      monitoringIntervalRef.current = null;
    }
    setIsMonitoring(false);
  }, []);

  const toggleMonitoring = () => {
    if (isMonitoring) {
      stopMonitoring();
    } else {
      startMonitoring();
    }
  };

  const chartData = {
    labels: vitalHistory.map((_, i) => i.toString()),
    datasets: [
      {
        label: 'Heart Rate (BPM)',
        data: vitalHistory.map(v => v.heartRate),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Respiratory Rate (breaths/min)',
        data: vitalHistory.map(v => v.respiratoryRate),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Stress Level (%)',
        data: vitalHistory.map(v => v.stressLevel),
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative w-[640px] h-[480px] mb-4">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
            <div className="text-lg font-semibold">Loading models...</div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-100 bg-opacity-75 z-10">
            <div className="text-lg font-semibold text-red-600">{error}</div>
          </div>
        )}
        <Webcam
          ref={webcamRef}
          audio={false}
          width={640}
          height={480}
          screenshotFormat="image/jpeg"
          className="rounded-lg"
          mirrored
        />
      </div>

      <button
        onClick={toggleMonitoring}
        disabled={isLoading || !!error}
        className={`mb-4 px-6 py-2 rounded text-white font-semibold ${
          isLoading || !!error
            ? 'bg-gray-400 cursor-not-allowed'
            : isMonitoring
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
      </button>

      <div className="grid grid-cols-3 gap-4 mb-4 w-full max-w-4xl">
        <div className="p-4 border rounded bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700">Heart Rate</h2>
          <p className="text-3xl font-bold text-blue-600">{vitalSigns.heartRate} <span className="text-sm text-gray-500">BPM</span></p>
        </div>
        <div className="p-4 border rounded bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700">Respiratory Rate</h2>
          <p className="text-3xl font-bold text-green-600">{vitalSigns.respiratoryRate} <span className="text-sm text-gray-500">breaths/min</span></p>
        </div>
        <div className="p-4 border rounded bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700">Stress Level</h2>
          <p className="text-3xl font-bold text-purple-600">{vitalSigns.stressLevel}%</p>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-white p-4 rounded shadow-sm">
        <Line 
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
              title: {
                display: true,
                text: 'Vital Signs Trends'
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }}
        />
      </div>

      {isMonitoring && (
        <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded">
          <p className="text-center">
            Please remain still and face the camera directly for accurate measurements.
          </p>
        </div>
      )}
    </div>
  );
};

export default HealthMonitor; 