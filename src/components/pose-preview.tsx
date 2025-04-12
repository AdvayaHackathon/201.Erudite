'use client'

import { useEffect, useRef } from 'react'

export function PosePreview() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error)
      })
    }
  }, [])

  return (
    <div className="relative aspect-video bg-gradient-to-br from-rose-500/10 to-purple-500/10 rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => console.error('Video error:', e)}
      >
        <source
          src="/videos/pose-demo.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  )
} 