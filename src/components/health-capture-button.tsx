"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function HealthCaptureButton() {
  const router = useRouter()

  return (
    <Button 
      onClick={() => router.push('/camera')}
      className="bg-rose-500 text-white hover:bg-rose-600 px-4 py-2 rounded-md shadow-sm"
    >
      Start
    </Button>
  )
} 