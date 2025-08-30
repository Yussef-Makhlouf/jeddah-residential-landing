"use client"

import React from 'react'

interface LoadingProps {
  message?: string
  size?: 'small' | 'medium' | 'large'
  fullScreen?: boolean
}

export function Loading({ 
  message = "جاري التحميل...", 
  size = 'medium',
  fullScreen = false 
}: LoadingProps) {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  }

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`${sizeClasses[size]} animate-spin`}>
        <svg className="w-full h-full text-[#540f6b]" fill="none" viewBox="0 0 24 24">
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      <p className="text-[#540f6b] font-medium text-sm animate-pulse">
        {message}
      </p>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#e5e1dc]">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  return <LoadingSpinner />
}

// Page Loading Component
export function PageLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] to-[#f0ebe5] flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 mx-auto animate-spin">
          <svg className="w-full h-full text-[#540f6b]" fill="none" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="3"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[#540f6b]">جاري التحميل</h2>
          <p className="text-[#6b7280] text-lg">يرجى الانتظار قليلاً...</p>
        </div>
        <div className="flex justify-center space-x-1 space-x-reverse">
          <div className="w-2 h-2 bg-[#540f6b] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-2 h-2 bg-[#540f6b] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-2 h-2 bg-[#540f6b] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
      </div>
    </div>
  )
}
