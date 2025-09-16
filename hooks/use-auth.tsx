"use client"

import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { toast } from 'react-toastify'

interface User {
  id: string
  email: string
  name: string
  role: string
  lastLogin?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  forgotPassword: (email: string) => Promise<{ success: boolean; otp?: string }>
  resetPassword: (email: string, code: string, newPassword: string, confirmPassword: string) => Promise<boolean>
  changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) => Promise<boolean>
  refreshToken: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  // Check authentication status on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Auth check error:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        toast.success(data.message)
        return true
      } else {
        toast.error(data.message)
        return false
      }
    } catch (error) {
      toast.error('حدث خطأ في الاتصال')
      return false
    }
  }


  const logout = async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST'
      })
      setUser(null)
      toast.success('تم تسجيل الخروج بنجاح')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('حدث خطأ في تسجيل الخروج')
    }
  }

  const forgotPassword = async (email: string): Promise<{ success: boolean; otp?: string }> => {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (data.success) {
        toast.success(data.message)
        return { success: true, otp: data.otp }
      } else {
        toast.error(data.message)
        return { success: false }
      }
    } catch (error) {
      toast.error('حدث خطأ في الاتصال')
      return { success: false }
    }
  }

  const resetPassword = async (email: string, code: string, newPassword: string, confirmPassword: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, code, newPassword, confirmPassword })
      })

      const data = await response.json()

      if (data.success) {
        toast.success(data.message)
        return true
      } else {
        toast.error(data.message)
        return false
      }
    } catch (error) {
      toast.error('حدث خطأ في الاتصال')
      return false
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string, confirmPassword: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword })
      })

      const data = await response.json()

      if (data.success) {
        toast.success(data.message)
        return true
      } else {
        toast.error(data.message)
        return false
      }
    } catch (error) {
      toast.error('حدث خطأ في الاتصال')
      return false
    }
  }

  const refreshToken = async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST'
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        return true
      } else {
        setUser(null)
        return false
      }
    } catch (error) {
      console.error('Token refresh error:', error)
      setUser(null)
      return false
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
    refreshToken
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
