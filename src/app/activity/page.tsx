'use client'

import { RecentActivityClient } from "@/components/recent-activity-client"

export default function ActivityPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Recent Activity</h1>
      <RecentActivityClient />
    </div>
  )
} 