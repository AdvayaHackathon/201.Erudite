'use client'

import { CameraCapture } from "@/components/camera-capture"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CameraPage() {
  const router = useRouter()

  const handleComplete = () => {
    // Redirect back to dashboard after capture is complete
    router.push('/dashboard')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/dashboard" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Health Capture</h1>
      </div>
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <CameraCapture onComplete={handleComplete} />
          </div>
        </div>
      </div>
    </div>
  )
} 