export interface SocialMediaTracking {
  platform: string
  timestamp: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
}

export const SOCIAL_MEDIA_PLATFORMS = {
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin'
} as const

export const SOCIAL_MEDIA_EXTENSIONS = {
  FACEBOOK: 'fb',
  INSTAGRAM: 'ig',
  TWITTER: 'tw',
  LINKEDIN: 'li'
} as const

export type SocialExtension = typeof SOCIAL_MEDIA_EXTENSIONS[keyof typeof SOCIAL_MEDIA_EXTENSIONS]

export type SocialPlatform = typeof SOCIAL_MEDIA_PLATFORMS[keyof typeof SOCIAL_MEDIA_PLATFORMS]

export const getSocialMediaSource = (): SocialMediaTracking | null => {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem('social_media_source')
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error reading social media source:', error)
  }
  
  return null
}

export const setSocialMediaSource = (trackingData: SocialMediaTracking): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('social_media_source', JSON.stringify(trackingData))
  } catch (error) {
    console.error('Error setting social media source:', error)
  }
}

export const clearSocialMediaSource = (): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem('social_media_source')
  } catch (error) {
    console.error('Error clearing social media source:', error)
  }
}

export const getSocialMediaSourceFromCookie = (): SocialMediaTracking | null => {
  if (typeof document === 'undefined') return null
  
  try {
    const cookies = document.cookie.split(';')
    const socialSourceCookie = cookies.find(cookie => 
      cookie.trim().startsWith('social_source=')
    )
    
    if (socialSourceCookie) {
      const value = socialSourceCookie.split('=')[1]
      return JSON.parse(decodeURIComponent(value))
    }
  } catch (error) {
    console.error('Error reading social media source from cookie:', error)
  }
  
  return null
}

export const generateSocialMediaUrl = (platform: SocialPlatform, campaign?: string, useExtension: boolean = true): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
  // Map platform to extension
  const platformToExtension: Record<SocialPlatform, SocialExtension> = {
    [SOCIAL_MEDIA_PLATFORMS.FACEBOOK]: SOCIAL_MEDIA_EXTENSIONS.FACEBOOK,
    [SOCIAL_MEDIA_PLATFORMS.INSTAGRAM]: SOCIAL_MEDIA_EXTENSIONS.INSTAGRAM,
    [SOCIAL_MEDIA_PLATFORMS.TWITTER]: SOCIAL_MEDIA_EXTENSIONS.TWITTER,
    [SOCIAL_MEDIA_PLATFORMS.LINKEDIN]: SOCIAL_MEDIA_EXTENSIONS.LINKEDIN
  }
  
  const pathSegment = useExtension ? platformToExtension[platform] : platform
  const platformPath = `/${pathSegment}`
  const params = new URLSearchParams()
  
  if (campaign) {
    params.set('utm_campaign', campaign)
  }
  
  const queryString = params.toString()
  return `${baseUrl}${platformPath}${queryString ? `?${queryString}` : ''}`
}

export const getPlatformFromExtension = (extension: string): SocialPlatform | null => {
  const extensionToPlatform: Record<SocialExtension, SocialPlatform> = {
    [SOCIAL_MEDIA_EXTENSIONS.FACEBOOK]: SOCIAL_MEDIA_PLATFORMS.FACEBOOK,
    [SOCIAL_MEDIA_EXTENSIONS.INSTAGRAM]: SOCIAL_MEDIA_PLATFORMS.INSTAGRAM,
    [SOCIAL_MEDIA_EXTENSIONS.TWITTER]: SOCIAL_MEDIA_PLATFORMS.TWITTER,
    [SOCIAL_MEDIA_EXTENSIONS.LINKEDIN]: SOCIAL_MEDIA_PLATFORMS.LINKEDIN
  }
  
  return extensionToPlatform[extension as SocialExtension] || null
}
