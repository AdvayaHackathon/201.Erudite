'use client'

import { CameraCapture } from "./camera-capture"

export function CameraCaptureClient() {
  return (
    <CameraCapture onComplete={() => console.log("Capture complete")} />
  )
} 