export interface SocialMediaTracking {
  platform: string
  timestamp: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
}

export const SOCIAL_MEDIA_PLATFORMS = {
  FACEBOOK: 'facebook',
  META: 'meta',
  INSTAGRAM: 'instagram',
  TWITTER: 'twitter',
  TIKTOK: 'tiktok',
  SNAPCHAT: 'snapchat',
  GOOGLE: 'google',
  WHATSAPP: 'whatsapp'
} as const

export const SOCIAL_MEDIA_EXTENSIONS = {
  FACEBOOK: 'fb',
  META: 'meta',
  INSTAGRAM: 'ig',
  TWITTER: 'tw',
  TIKTOK: 'tt',
  SNAPCHAT: 'sc',
  GOOGLE: 'google',
  WHATSAPP: 'wa'
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

export const generateSocialMediaUrl = (platform: SocialPlatform, campaign?: string, useExtension: boolean = false): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://project25.raf-advanced.sa'
  
  // Map platform to extension
  const platformToExtension: Record<SocialPlatform, SocialExtension> = {
    [SOCIAL_MEDIA_PLATFORMS.FACEBOOK]: SOCIAL_MEDIA_EXTENSIONS.FACEBOOK,
    [SOCIAL_MEDIA_PLATFORMS.META]: SOCIAL_MEDIA_EXTENSIONS.META,
    [SOCIAL_MEDIA_PLATFORMS.INSTAGRAM]: SOCIAL_MEDIA_EXTENSIONS.INSTAGRAM,
    [SOCIAL_MEDIA_PLATFORMS.TWITTER]: SOCIAL_MEDIA_EXTENSIONS.TWITTER,
    [SOCIAL_MEDIA_PLATFORMS.TIKTOK]: SOCIAL_MEDIA_EXTENSIONS.TIKTOK,
    [SOCIAL_MEDIA_PLATFORMS.SNAPCHAT]: SOCIAL_MEDIA_EXTENSIONS.SNAPCHAT,
    [SOCIAL_MEDIA_PLATFORMS.GOOGLE]: SOCIAL_MEDIA_EXTENSIONS.GOOGLE,
    [SOCIAL_MEDIA_PLATFORMS.WHATSAPP]: SOCIAL_MEDIA_EXTENSIONS.WHATSAPP
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
    [SOCIAL_MEDIA_EXTENSIONS.META]: SOCIAL_MEDIA_PLATFORMS.META,
    [SOCIAL_MEDIA_EXTENSIONS.INSTAGRAM]: SOCIAL_MEDIA_PLATFORMS.INSTAGRAM,
    [SOCIAL_MEDIA_EXTENSIONS.TWITTER]: SOCIAL_MEDIA_PLATFORMS.TWITTER,
    [SOCIAL_MEDIA_EXTENSIONS.TIKTOK]: SOCIAL_MEDIA_PLATFORMS.TIKTOK,
    [SOCIAL_MEDIA_EXTENSIONS.SNAPCHAT]: SOCIAL_MEDIA_PLATFORMS.SNAPCHAT,
    [SOCIAL_MEDIA_EXTENSIONS.GOOGLE]: SOCIAL_MEDIA_PLATFORMS.GOOGLE,
    [SOCIAL_MEDIA_EXTENSIONS.WHATSAPP]: SOCIAL_MEDIA_PLATFORMS.WHATSAPP
  }
  
  return extensionToPlatform[extension as SocialExtension] || null
}

// دالة جديدة لاكتشاف المنصة من URL path مع دعم الأسماء الكاملة والاختصارات
export const getPlatformFromUrlPath = (pathSegment: string): SocialPlatform | null => {
  const normalizedPath = pathSegment.toLowerCase().trim()
  
  // خريطة شاملة للمنصات تشمل الأسماء الكاملة والاختصارات والمرادفات
  const platformMapping: Record<string, SocialPlatform> = {
    // Facebook & Meta
    'facebook': SOCIAL_MEDIA_PLATFORMS.FACEBOOK,
    'meta': SOCIAL_MEDIA_PLATFORMS.META,
    'fb': SOCIAL_MEDIA_PLATFORMS.FACEBOOK,
    
    // Instagram
    'instagram': SOCIAL_MEDIA_PLATFORMS.INSTAGRAM,
    'ig': SOCIAL_MEDIA_PLATFORMS.INSTAGRAM,
    'insta': SOCIAL_MEDIA_PLATFORMS.INSTAGRAM,
    
    // Twitter / X
    'twitter': SOCIAL_MEDIA_PLATFORMS.TWITTER,
    'x': SOCIAL_MEDIA_PLATFORMS.TWITTER,
    'tw': SOCIAL_MEDIA_PLATFORMS.TWITTER,
    
    // TikTok
    'tiktok': SOCIAL_MEDIA_PLATFORMS.TIKTOK,
    'tt': SOCIAL_MEDIA_PLATFORMS.TIKTOK,
    'tik-tok': SOCIAL_MEDIA_PLATFORMS.TIKTOK,
    
    // Snapchat
    'snapchat': SOCIAL_MEDIA_PLATFORMS.SNAPCHAT,
    'snap': SOCIAL_MEDIA_PLATFORMS.SNAPCHAT,
    'sc': SOCIAL_MEDIA_PLATFORMS.SNAPCHAT,
    
    // WhatsApp
    'whatsapp': SOCIAL_MEDIA_PLATFORMS.WHATSAPP,
    'wa': SOCIAL_MEDIA_PLATFORMS.WHATSAPP,
    'whats-app': SOCIAL_MEDIA_PLATFORMS.WHATSAPP,
    
    // Google
    'google': SOCIAL_MEDIA_PLATFORMS.GOOGLE,
    'ggl': SOCIAL_MEDIA_PLATFORMS.GOOGLE,
    'ads': SOCIAL_MEDIA_PLATFORMS.GOOGLE,
    'adwords': SOCIAL_MEDIA_PLATFORMS.GOOGLE
  }
  
  return platformMapping[normalizedPath] || null
}

// دالة للتحقق من صحة URL path للمنصة
export const isValidPlatformPath = (pathSegment: string): boolean => {
  return getPlatformFromUrlPath(pathSegment) !== null
}

// دالة لإنشاء معلومات التتبع من URL path
export const createTrackingFromUrlPath = (pathSegment: string, searchParams?: URLSearchParams): SocialMediaTracking | null => {
  const platform = getPlatformFromUrlPath(pathSegment)
  
  if (!platform) {
    return null
  }
  
  return {
    platform,
    timestamp: new Date().toISOString(),
    utm_source: searchParams?.get('utm_source') || platform,
    utm_medium: searchParams?.get('utm_medium') || 'social',
    utm_campaign: searchParams?.get('utm_campaign') || 'url_path_detection'
  }
}