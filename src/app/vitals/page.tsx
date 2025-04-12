'use client'

import { VitalSignsClient } from "@/components/vital-signs-client"

export default function VitalsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Vital Signs</h1>
      <VitalSignsClient />
    </div>
  )
} 