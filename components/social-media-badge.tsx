"use client"

import { useSocialMediaTracking } from '@/hooks/use-social-media-tracking'
import { Badge } from '@/components/ui/badge'

export const SocialMediaBadge = () => {
  const { trackingData, isLoading, getPlatformName, getPlatformIcon, hasTrackingData } = useSocialMediaTracking()

  if (isLoading || !hasTrackingData) {
    return null
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
        <span className="mr-1">{getPlatformIcon(trackingData!.platform)}</span>
        <span>أتيت من {getPlatformName(trackingData!.platform)}</span>
      </Badge>
    </div>
  )
}
