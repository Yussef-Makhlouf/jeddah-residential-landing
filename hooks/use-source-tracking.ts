"use client"

import { useState, useEffect } from 'react'

interface SourceInfo {
  source: string
  socialMedia?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

export function useSourceTracking(): SourceInfo {
  const [sourceInfo, setSourceInfo] = useState<SourceInfo>({
    source: 'موقع الويب'
  })

  useEffect(() => {
    // الحصول على معلومات URL
    const urlParams = new URLSearchParams(window.location.search)
    const referrer = document.referrer
    const currentPath = window.location.pathname
    
    let source = 'موقع الويب'
    let socialMedia: string | undefined

    // التحقق من URL path أولاً - للروابط التي تنتهي بـ social-media platform name
    const detectPlatformFromPath = (): string | null => {
      // إزالة السلاش الأول من المسار
      const pathSegments = currentPath.split('/').filter(segment => segment.length > 0)
      
      if (pathSegments.length > 0) {
        const platformSegment = pathSegments[0].toLowerCase()
        
        // قائمة المنصات المدعومة
        const platformMap: Record<string, string> = {
          // أسماء المنصات الكاملة
          'facebook': 'facebook',
          'meta': 'facebook',
          'instagram': 'instagram',
          'twitter': 'twitter',
          'x': 'twitter',
          'tiktok': 'tiktok',
          'snapchat': 'snapchat',
          'whatsapp': 'whatsapp',
          'google': 'google',
          'youtube': 'youtube',
          'linkedin': 'linkedin',
          'telegram': 'telegram',
          
          // الاختصارات المدعومة
          'fb': 'facebook',
          'ig': 'instagram',
          'tw': 'twitter',
          'tt': 'tiktok',
          'sc': 'snapchat',
          'wa': 'whatsapp',
          'yt': 'youtube',
          'in': 'linkedin',
          'tg': 'telegram'
        }
        
        return platformMap[platformSegment] || null
      }
      
      return null
    }

    // محاولة اكتشاف المنصة من URL path
    const platformFromPath = detectPlatformFromPath()
    if (platformFromPath) {
      source = platformFromPath
      socialMedia = platformFromPath
      
      // حفظ معلومات التتبع في localStorage
      const trackingData = {
        platform: platformFromPath,
        timestamp: new Date().toISOString(),
        utm_source: platformFromPath,
        utm_medium: 'social',
        utm_campaign: 'url_path_detection'
      }
      
      localStorage.setItem('social_media_source', JSON.stringify(trackingData))
      console.log('Platform detected from URL path:', platformFromPath)
    }

    // التحقق من UTM parameters
    const utmSource = urlParams.get('utm_source')
    const utmMedium = urlParams.get('utm_medium')
    const utmCampaign = urlParams.get('utm_campaign')

    // إذا لم يتم اكتشاف المنصة من URL path، تحقق من UTM parameters
    if (!platformFromPath && utmSource) {
      source = utmSource.toLowerCase()
      if (utmMedium) {
        socialMedia = utmMedium.toLowerCase()
      }
      
      // تطبيع أسماء المنصات الشائعة
      if (source.includes('meta') || source.includes('facebook')) {
        source = 'facebook'
        socialMedia = 'facebook'
      } else if (source.includes('instagram')) {
        source = 'instagram'
        socialMedia = 'instagram'
      } else if (source.includes('snapchat')) {
        source = 'snapchat'
        socialMedia = 'snapchat'
      } else if (source.includes('google') || source.includes('adwords')) {
        source = 'google'
      } else if (source.includes('whatsapp')) {
        source = 'whatsapp'
        socialMedia = 'whatsapp'
      }
    } else if (!platformFromPath && referrer) {
      // التحقق من Referrer
      const referrerUrl = new URL(referrer)
      const hostname = referrerUrl.hostname.toLowerCase()

      if (hostname.includes('facebook.com') || hostname.includes('fb.com') || hostname.includes('meta.com')) {
        source = 'facebook'
        socialMedia = 'facebook'
      } else if (hostname.includes('instagram.com')) {
        source = 'instagram'
        socialMedia = 'instagram'
      } else if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
        source = 'twitter'
        socialMedia = 'twitter'
      } else if (hostname.includes('linkedin.com')) {
        source = 'linkedin'
        socialMedia = 'linkedin'
      } else if (hostname.includes('youtube.com')) {
        source = 'youtube'
        socialMedia = 'youtube'
      } else if (hostname.includes('tiktok.com')) {
        source = 'tiktok'
        socialMedia = 'tiktok'
      } else if (hostname.includes('snapchat.com')) {
        source = 'snapchat'
        socialMedia = 'snapchat'
      } else if (hostname.includes('whatsapp.com')) {
        source = 'whatsapp'
        socialMedia = 'whatsapp'
      } else if (hostname.includes('telegram.org')) {
        source = 'telegram'
        socialMedia = 'telegram'
      } else if (hostname.includes('google.com') || hostname.includes('google.ae') || hostname.includes('googleads') || hostname.includes('google ads')) {
        source = 'google'
      } else if (hostname.includes('bing.com')) {
        source = 'bing'
      } else if (hostname.includes('yahoo.com')) {
        source = 'yahoo'
      } else {
        source = `موقع آخر (${hostname})`
      }
    }

    setSourceInfo({
      source,
      socialMedia,
      utmSource: utmSource || undefined,
      utmMedium: utmMedium || undefined,
      utmCampaign: utmCampaign || undefined
    })

    // حفظ المعلومات في localStorage للاستخدام لاحقاً
    // إذا تم اكتشاف المنصة من URL path، لا نعيد كتابة البيانات المحفوظة مسبقاً
    if (!platformFromPath) {
      localStorage.setItem('sourceInfo', JSON.stringify({
        source,
        socialMedia,
        utmSource: utmSource || undefined,
        utmMedium: utmMedium || undefined,
        utmCampaign: utmCampaign || undefined,
        timestamp: new Date().toISOString(),
        detectionMethod: platformFromPath ? 'url_path' : (utmSource ? 'utm_params' : 'referrer')
      }))
    }

  }, [])

  return sourceInfo
}
