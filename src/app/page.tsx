"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        // Store user data in localStorage for the dashboard
        localStorage.setItem('user', JSON.stringify({
          name: session.user.user_metadata.name || 'User',
          email: session.user.email
        }))
        router.push('/dashboard')
      } else {
        router.push('/landing')
      }
    }

    checkAuth()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}
