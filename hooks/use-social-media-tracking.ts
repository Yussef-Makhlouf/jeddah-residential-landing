"use client"

import { useState, useEffect } from 'react'
import { getSocialMediaSource, getSocialMediaSourceFromCookie, type SocialMediaTracking } from '@/lib/tracking'

export const useSocialMediaTracking = () => {
  const [trackingData, setTrackingData] = useState<SocialMediaTracking | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTrackingData = () => {
      // Try to get from localStorage first
      let data = getSocialMediaSource()
      
      // If not in localStorage, try cookie
      if (!data) {
        data = getSocialMediaSourceFromCookie()
      }
      
      setTrackingData(data)
      setIsLoading(false)
    }

    loadTrackingData()
  }, [])

  const getPlatformName = (platform: string): string => {
    const platformNames: Record<string, string> = {
      facebook: 'فيسبوك',
      instagram: 'إنستغرام',
      twitter: 'تويتر',
      linkedin: 'لينكد إن'
    }
    
    return platformNames[platform] || platform
  }

  const getPlatformIcon = (platform: string): string => {
    const platformIcons: Record<string, string> = {
      facebook: '📘',
      instagram: '📷',
      twitter: '🐦',
      linkedin: '💼'
    }
    
    return platformIcons[platform] || '🔗'
  }

  return {
    trackingData,
    isLoading,
    getPlatformName,
    getPlatformIcon,
    hasTrackingData: !!trackingData
  }
}
