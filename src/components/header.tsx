"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SettingsOverlay } from '@/components/settings-overlay'
import { Heart, Settings } from 'lucide-react'

export function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-rose-500" />
              <span className="font-semibold text-white">HealthVision</span>
            </a>
          </div>

          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={() => setIsSettingsOpen(true)}
              className="text-gray-300 hover:text-white hover:bg-white/10 p-2.5 group"
              size="icon"
            >
              <Settings className="h-6 w-6 transition-transform duration-300 group-hover:rotate-180" />
            </Button>

            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-white">{user.name || 'User'}</div>
                <div className="text-xs text-gray-400">{user.email || ''}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SettingsOverlay 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </header>
  )
} 