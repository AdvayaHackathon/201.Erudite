'use client'

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Heart, Smile, Activity } from "lucide-react"
import { PosePreview } from "@/components/pose-preview"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <header className="py-12 px-4 md:px-8">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-rose-500">HealthVision</div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </nav>
        
        <div className="max-w-7xl mx-auto mt-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Transforming Healthcare Monitoring</h1>
            <p className="text-xl text-gray-400">Advanced, no-hardware health monitoring through everyday cameras. Empowering clinicians with AI-enhanced insights for better patient care.</p>
            <div className="flex gap-4">
              <Button 
                onClick={() => router.push('/auth')}
                className="bg-rose-500 hover:bg-rose-600"
              >
                Sign Up/Login
              </Button>
              <Button variant="outline" className="border-white/20 hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
            <div className="relative bg-black/50 border border-white/10 rounded-2xl p-8">
              <PosePreview />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 md:px-8 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Innovative Health Monitoring Features</h2>
            <p className="text-xl text-gray-400">Our platform leverages everyday cameras to deliver comprehensive health insights</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-black border-white/10">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Neuro-Vision Screening</h3>
                <p className="text-gray-400">Advanced algorithms detect subtle neurological indicators through standard video capture.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black border-white/10">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Remote Photoplethysmography</h3>
                <p className="text-gray-400">Monitor heart rate and vital signs without physical contact using rPPG technology.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black border-white/10">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mb-4">
                  <Smile className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Micro-Expression Analysis</h3>
                <p className="text-gray-400">Capture subtle emotional and physiological responses through facial analysis.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black border-white/10">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Gait Analysis</h3>
                <p className="text-gray-400">Comprehensive mobility assessment through advanced pose detection algorithms.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
} 