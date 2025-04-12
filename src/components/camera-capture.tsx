"use client"

import { useState, useCallback, useRef } from "react"
import Webcam from "react-webcam"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Camera, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateFakeInsights, estimateAgeFromImage } from "@/lib/fake-data"

interface CameraCaptureProps {
  onComplete?: (insights: any) => void
}

export function CameraCapture({ onComplete }: CameraCaptureProps) {
  const router = useRouter()
  const webcamRef = useRef<Webcam>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [captureProgress, setCaptureProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [stepsCompleted, setStepsCompleted] = useState<boolean[]>([false, false, false])
  const [error, setError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const captureSteps = [
    "Look directly at the camera for facial analysis",
    "Turn your head slowly to the left and right",
    "Remain still for vital sign measurement",
  ]

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  }

  const handleUserMedia = () => {
    setIsInitialized(true)
    startCaptureProcess()
  }

  const handleUserMediaError = (err: Error) => {
    console.error("Webcam error:", err)
    setError("Failed to access camera. Please check your camera permissions.")
    setIsStreaming(false)
  }

  const startCamera = useCallback(() => {
    setError(null)
    setIsStreaming(true)
  }, [])

  const handleComplete = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        const estimatedAge = estimateAgeFromImage(imageSrc)
        const insights = generateFakeInsights(estimatedAge)
        
        if (onComplete) {
          onComplete(insights)
        } else {
          // Store insights in localStorage for demo purposes
          localStorage.setItem('healthInsights', JSON.stringify(insights))
          router.push('/dashboard')
        }
      }
    }
  }

  const startCaptureProcess = () => {
    let progress = 0
    const totalDuration = 30
    const stepDuration = totalDuration / captureSteps.length
    let currentStepIndex = 0

    const interval = setInterval(() => {
      progress += 1
      setCaptureProgress(Math.min((progress / totalDuration) * 100, 100))

      if (progress >= (currentStepIndex + 1) * stepDuration) {
        const newStepsCompleted = [...stepsCompleted]
        newStepsCompleted[currentStepIndex] = true
        setStepsCompleted(newStepsCompleted)

        currentStepIndex++
        setCurrentStep(currentStepIndex)

        if (currentStepIndex >= captureSteps.length) {
          clearInterval(interval)
          setTimeout(handleComplete, 1000)
        }
      }
    }, 1000)
  }

  return (
    <div className="grid gap-6">
      <div className="relative w-[80%] max-w-2xl mx-auto">
        <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
          {!isStreaming ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white">
              <div className="bg-rose-500/10 p-4 rounded-full mb-4">
                <Camera className="h-12 w-12 text-rose-500" />
              </div>
              <p className="text-center max-w-md text-gray-300">Position yourself in a well-lit area with your face clearly visible</p>
              <Button 
                onClick={startCamera} 
                className="mt-4 bg-rose-500 hover:bg-rose-600 text-white shadow-lg hover:shadow-rose-500/25 transition-all duration-200"
              >
                Start Camera
              </Button>
              {error && (
                <p className="text-red-400 mt-2 text-sm bg-red-500/10 px-3 py-1 rounded-full">{error}</p>
              )}
            </div>
          ) : (
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="h-full w-full object-cover"
              mirrored={true}
              onUserMedia={handleUserMedia}
              onUserMediaError={handleUserMediaError}
              forceScreenshotSourceSize={true}
            />
          )}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
            <span className="text-sm text-white font-medium">Recording</span>
          </div>
          <div className="text-sm text-white font-medium bg-white/10 px-3 py-1 rounded-full">
            {Math.floor(captureProgress)}%
          </div>
        </div>
      </div>

      {isStreaming && isInitialized && (
        <div className="space-y-4 mt-6 bg-black p-6 rounded-xl border border-white/10">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-300">
              <span>Capture progress</span>
              <span>{Math.round(captureProgress)}%</span>
            </div>
            <Progress 
              value={captureProgress} 
              className="h-2 bg-gray-900"
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-white">Capture Steps:</h3>
            <ul className="space-y-2">
              {captureSteps.map((step, index) => (
                <li key={index} className="flex items-center gap-2">
                  {stepsCompleted[index] ? (
                    <div className="bg-green-500/10 p-1 rounded-full">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                  ) : (
                    <div
                      className={`h-5 w-5 rounded-full border flex-shrink-0 ${
                        currentStep === index 
                          ? "bg-rose-500/10 border-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.3)]" 
                          : "border-gray-700"
                      }`}
                    />
                  )}
                  <span
                    className={`${
                      currentStep === index 
                        ? "text-white font-medium" 
                        : stepsCompleted[index] 
                          ? "text-gray-300" 
                          : "text-gray-400"
                    }`}
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
