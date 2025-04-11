# Health Monitoring System

A cutting-edge health monitoring solution that uses computer vision and remote photoplethysmography (rPPG) to measure vital signs without any wearable devices. This system leverages your device's camera to track heart rate, respiratory rate, and stress levels in real-time.

## Features

- **Real-time Vital Sign Monitoring**
  - Heart rate measurement using rPPG
  - Respiratory rate detection
  - Stress level assessment through HRV analysis
  - Facial micro-expression analysis
  - Posture tracking

- **No Additional Hardware Required**
  - Uses standard webcam or smartphone camera
  - Works in various lighting conditions
  - Privacy-focused local processing

- **Advanced Analytics**
  - Real-time data visualization
  - Historical trend analysis
  - Automated health insights

## Technical Stack

- **Frontend Framework**: Next.js with TypeScript
- **UI Components**: TailwindCSS
- **Computer Vision**: TensorFlow.js
  - Face Landmarks Detection
  - Pose Detection
  - Custom rPPG implementation
- **Data Visualization**: Chart.js

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- A modern web browser
- Webcam or smartphone camera

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/health-monitor.git
   cd health-monitor
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Grant camera permissions when prompted
2. Position yourself in front of the camera
3. Ensure good lighting conditions
4. Click "Start Monitoring" to begin
5. Stay relatively still while measurements are being taken
6. View your real-time vital signs and trends

## How It Works

### Remote Photoplethysmography (rPPG)

The system uses rPPG to detect subtle color changes in facial skin that correspond to blood volume variations. This allows for contactless measurement of:

1. Heart Rate: By analyzing the periodic changes in skin color
2. Respiratory Rate: Through chest movement detection
3. Stress Levels: Via Heart Rate Variability (HRV) analysis

### Face Detection and Tracking

- Uses TensorFlow.js face-landmarks-detection model
- Tracks 468 facial landmarks in real-time
- Ensures accurate ROI (Region of Interest) selection for rPPG

### Signal Processing

1. Green channel extraction from video feed
2. Signal detrending and filtering
3. Fast Fourier Transform (FFT) for frequency analysis
4. Peak detection and vital sign estimation

## Privacy and Security

- All processing is done locally in the browser
- No video data is stored or transmitted
- No personal information is collected

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- TensorFlow.js team for their excellent computer vision models
- The scientific community for rPPG research and publications
- Our contributors and supporters

## Contact

For questions and support, please open an issue in the GitHub repository. 