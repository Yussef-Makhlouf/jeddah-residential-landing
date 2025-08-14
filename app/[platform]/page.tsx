"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { getPlatformFromExtension, SOCIAL_MEDIA_PLATFORMS } from "@/lib/tracking"

export default function PlatformPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const platformParam = params.platform as string

  useEffect(() => {
    // Determine the actual platform from the URL parameter
    let actualPlatform = platformParam
    
    // Check if it's an extension and convert to full platform name
    const platformFromExtension = getPlatformFromExtension(platformParam)
    if (platformFromExtension) {
      actualPlatform = platformFromExtension
    }
    
    // Validate that it's a supported platform
    const supportedPlatforms = Object.values(SOCIAL_MEDIA_PLATFORMS)
    if (!supportedPlatforms.includes(actualPlatform as any)) {
      // If not a supported platform, redirect to home
      router.replace('/')
      return
    }

    // Set tracking cookie or localStorage
    const setTracking = () => {
      const trackingData = {
        platform: actualPlatform,
        timestamp: new Date().toISOString(),
        utm_source: searchParams.get('utm_source') || actualPlatform,
        utm_medium: searchParams.get('utm_medium') || 'social',
        utm_campaign: searchParams.get('utm_campaign') || 'default'
      }

      // Store in localStorage
      localStorage.setItem('social_media_source', JSON.stringify(trackingData))
      
      // Set cookie for server-side tracking
      document.cookie = `social_source=${JSON.stringify(trackingData)}; path=/; max-age=2592000` // 30 days
    }

    setTracking()
    
    // Redirect to main page
    router.replace('/')
  }, [platformParam, router, searchParams])

  return (
    <div className="min-h-screen bg-[#efedea] flex items-center justify-center" dir="rtl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">جاري التوجيه...</p>
      </div>
    </div>
  )
}
