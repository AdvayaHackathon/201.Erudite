"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Activity, Camera, Heart, LineChart, Loader2 } from 'lucide-react'
import { VitalSignsChart } from '@/components/vital-signs-chart'
import { CameraCapture } from '@/components/camera-capture'
import { HealthMetricsOverview } from '@/components/health-metrics-overview'
import { RecentActivity } from '@/components/recent-activity'
import { Header } from '@/components/header'
import { HealthMetricsClient } from '@/components/health-metrics-client'
import { VitalSignsClient } from '@/components/vital-signs-client'
import { RecentActivityClient } from '@/components/recent-activity-client'
import { ActivityHistory } from '@/components/activity-history'
import { HealthInsights } from '@/lib/fake-data'

export default function Dashboard() {
  const router = useRouter()
  const [isCapturing, setIsCapturing] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [captureComplete, setCaptureComplete] = useState(false)
  const [loading, setLoading] = useState(true)
  const [healthInsights, setHealthInsights] = useState<HealthInsights | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) throw error
        
        if (!session) {
          router.push('/landing')
          return
        }

        // Load stored insights if available
        const storedInsights = localStorage.getItem('healthInsights')
        if (storedInsights) {
          setHealthInsights(JSON.parse(storedInsights))
        }

        setLoading(false)
      } catch (error) {
        console.error('Auth error:', error)
        router.push('/landing')
      }
    }

    checkAuth()
  }, [router])

  const startCapture = () => {
    setIsCapturing(true)
    setCaptureComplete(false)
  }

  const handleCaptureComplete = (insights: HealthInsights) => {
    setIsCapturing(false)
    setIsProcessing(true)
    setHealthInsights(insights)

    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false)
      setCaptureComplete(true)
    }, 3000)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {healthInsights && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-black border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Heart Rate</CardTitle>
                    <Heart className="h-4 w-4 text-rose-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{healthInsights.heartRate}</div>
                    <p className="text-xs text-gray-400">beats per minute</p>
                  </CardContent>
                </Card>

                <Card className="bg-black border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Blood Pressure</CardTitle>
                    <Activity className="h-4 w-4 text-rose-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      {healthInsights.bloodPressure.systolic}/{healthInsights.bloodPressure.diastolic}
                    </div>
                    <p className="text-xs text-gray-400">mmHg</p>
                  </CardContent>
                </Card>

                <Card className="bg-black border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Oxygen Saturation</CardTitle>
                    <LineChart className="h-4 w-4 text-rose-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{healthInsights.oxygenSaturation}%</div>
                    <p className="text-xs text-gray-400">SpO2</p>
                  </CardContent>
                </Card>

                <Card className="bg-black border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Stress Level</CardTitle>
                    <Activity className="h-4 w-4 text-rose-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{healthInsights.stressLevel}%</div>
                    <p className="text-xs text-gray-400">perceived stress</p>
                  </CardContent>
                </Card>
              </div>
            )}

            <Card className="bg-black border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg text-white">Health Capture</CardTitle>
              </CardHeader>
              <CardContent>
                {!captureComplete && (
                  <Card className="bg-black border-white/10">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-rose-500/10 p-3 flex-shrink-0">
                            <Camera className="h-8 w-8 text-rose-500" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-white">Complete Your Daily Health Check</h3>
                            <p className="text-base text-gray-400">
                              Take a minute to capture your health data for today to maintain accurate monitoring.
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={() => router.push('/camera')}
                          className="bg-rose-500 text-white hover:bg-rose-600 px-6 py-2.5 rounded-md shadow-sm text-base font-medium transition-colors whitespace-nowrap ml-5"
                        >
                          Start
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vitals" className="space-y-4">
            <Card className="bg-black border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg text-white">Vital Signs</CardTitle>
              </CardHeader>
              <CardContent>
                <VitalSignsClient />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card className="bg-black border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg text-white">Activity History</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityHistory />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="bg-black border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentActivityClient />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
