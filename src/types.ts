export interface VitalSigns {
  heartRate: number;
  respiratoryRate: number;
  stressLevel: number;
}

export interface FaceDetection {
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  landmarks: Array<{ x: number; y: number }>;
}

export interface PoseDetection {
  keypoints: Array<{
    name: string;
    x: number;
    y: number;
    score: number;
  }>;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    tension: number;
  }>;
}

export interface HealthMonitorProps {
  width?: number;
  height?: number;
  onError?: (error: string) => void;
} 