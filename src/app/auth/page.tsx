'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const AuthPage = () => {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    number: false,
    uppercase: false,
    special: false
  })

  const checkPasswordRequirements = (pass) => {
    setPasswordRequirements({
      length: pass.length >= 8,
      number: /[0-9]/.test(pass),
      uppercase: /[A-Z]/.test(pass),
      special: /[^A-Za-z0-9]/.test(pass)
    })
  }

  const handlePasswordChange = (e) => {
    const pass = e.target.value
    setPassword(pass)
    checkPasswordRequirements(pass)
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) throw error
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error
        
        localStorage.setItem('user', JSON.stringify({
          name: data.user.user_metadata.name || 'User',
          email: data.user.email
        }))
        
        router.push('/dashboard')
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            },
          },
        })

        if (error) throw error
        
        localStorage.setItem('user', JSON.stringify({
          name: name,
          email: email
        }))
        
        router.push('/dashboard')
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md bg-black border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl text-white">{isLogin ? 'Welcome Back' : 'Create Account'}</CardTitle>
          <CardDescription className="text-gray-400">
            {isLogin ? 'Sign in to continue to HealthVision' : 'Join HealthVision to get started'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="bg-black/50 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  required
                  className="bg-black/50 border-white/10 text-white"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {!isLogin && (
                <div className="space-y-1 text-sm text-gray-400">
                  <div className={`flex items-center gap-2 ${passwordRequirements.length ? 'text-green-500' : ''}`}>
                    {passwordRequirements.length ? '✓' : '✗'} At least 8 characters
                  </div>
                  <div className={`flex items-center gap-2 ${passwordRequirements.number ? 'text-green-500' : ''}`}>
                    {passwordRequirements.number ? '✓' : '✗'} Contains a number
                  </div>
                  <div className={`flex items-center gap-2 ${passwordRequirements.uppercase ? 'text-green-500' : ''}`}>
                    {passwordRequirements.uppercase ? '✓' : '✗'} Contains uppercase letter
                  </div>
                  <div className={`flex items-center gap-2 ${passwordRequirements.special ? 'text-green-500' : ''}`}>
                    {passwordRequirements.special ? '✓' : '✗'} Contains special character
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="text-sm text-red-500 bg-red-500/10 p-2 rounded-md">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-rose-500 hover:bg-rose-600"
              disabled={loading}
            >
              {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-rose-500 hover:text-rose-600"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-black px-2 text-gray-400">
                or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="flex items-center justify-center gap-2 border-white/10 hover:bg-white/10"
            >
              <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
              Google
            </Button>
            <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-2 border-white/10 hover:bg-white/10"
            >
              <img src="/microsoft-icon.svg" alt="Microsoft" className="w-5 h-5" />
              Microsoft
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthPage 