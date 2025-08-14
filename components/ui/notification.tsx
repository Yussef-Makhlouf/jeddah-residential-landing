"use client"

import { useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

interface NotificationProps {
  type: 'success' | 'error' | 'info'
  message: string
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export function Notification({ 
  type, 
  message, 
  isVisible, 
  onClose, 
  duration = 5000 
}: NotificationProps) {
  const [isShowing, setIsShowing] = useState(isVisible)

  useEffect(() => {
    setIsShowing(isVisible)
    
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setIsShowing(false)
        onClose()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isShowing) return null

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-blue-50 border-blue-200'
    }
  }

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full ${getBgColor()} border rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out`}>
      <div className="flex items-start space-x-3 space-x-reverse">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">
            {message}
          </p>
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={() => {
              setIsShowing(false)
              onClose()
            }}
            className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
