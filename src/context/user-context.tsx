"use client"

import { createContext, useContext, useState, useEffect } from "react"

interface UserContextType {
  name: string
  email: string
  isAuthenticated: boolean
  updateName: (newName: string) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState("User")
  const [email, setEmail] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for user data in localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      const { name, email } = JSON.parse(userData)
      setName(name)
      setEmail(email)
      setIsAuthenticated(true)
    }
  }, [])

  const updateName = (newName: string) => {
    setName(newName)
    // Update localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      const updatedData = { ...JSON.parse(userData), name: newName }
      localStorage.setItem('user', JSON.stringify(updatedData))
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setName("User")
    setEmail("")
    setIsAuthenticated(false)
    // Redirect to auth page
    window.location.href = '/auth'
  }

  return (
    <UserContext.Provider value={{ name, email, isAuthenticated, updateName, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
} 