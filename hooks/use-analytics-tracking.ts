"use client"

import { useSourceTracking } from './use-source-tracking'

interface AnalyticsEvent {
  event_type: 'whatsapp_click' | 'phone_click' | 'booking_click' | 'page_view'
  timestamp: string
  source_platform: string
  social_media?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  phone_number?: string
  additional_data?: Record<string, any>
}

export function useAnalyticsTracking() {
  const sourceInfo = useSourceTracking()

  const trackEvent = (eventType: AnalyticsEvent['event_type'], additionalData?: Record<string, any>) => {
    const event: AnalyticsEvent = {
      event_type: eventType,
      timestamp: new Date().toISOString(),
      source_platform: sourceInfo.source,
      social_media: sourceInfo.socialMedia,
      utm_source: sourceInfo.utmSource,
      utm_medium: sourceInfo.utmMedium,
      utm_campaign: sourceInfo.utmCampaign,
      additional_data: additionalData
    }

    // حفظ الحدث في localStorage للتحليل
    try {
      const existingEvents = JSON.parse(localStorage.getItem('analytics_events') || '[]')
      existingEvents.push(event)
      
      // الاحتفاظ بآخر 100 حدث فقط
      if (existingEvents.length > 100) {
        existingEvents.splice(0, existingEvents.length - 100)
      }
      
      localStorage.setItem('analytics_events', JSON.stringify(existingEvents))
      
      // طباعة للتطوير
      console.log('📊 Event tracked:', event)
    } catch (error) {
      console.error('Error saving analytics event:', error)
    }

    // يمكن إضافة إرسال للخادم هنا
    // sendEventToServer(event)
  }

  const trackWhatsAppClick = (phoneNumber: string, platform?: string) => {
    trackEvent('whatsapp_click', {
      phone_number: phoneNumber,
      target_platform: platform || sourceInfo.socialMedia || sourceInfo.source,
      message_customized: true
    })
  }

  const trackPhoneClick = (phoneNumber: string) => {
    trackEvent('phone_click', {
      phone_number: phoneNumber
    })
  }

  const trackBookingClick = (formType?: string) => {
    trackEvent('booking_click', {
      form_type: formType || 'main_booking'
    })
  }

  const getAnalyticsEvents = (): AnalyticsEvent[] => {
    try {
      return JSON.parse(localStorage.getItem('analytics_events') || '[]')
    } catch (error) {
      console.error('Error reading analytics events:', error)
      return []
    }
  }

  const getEventsByType = (eventType: AnalyticsEvent['event_type']): AnalyticsEvent[] => {
    return getAnalyticsEvents().filter(event => event.event_type === eventType)
  }

  const getEventsByPlatform = (platform: string): AnalyticsEvent[] => {
    return getAnalyticsEvents().filter(event => 
      event.source_platform === platform || event.social_media === platform
    )
  }

  const clearAnalyticsEvents = () => {
    localStorage.removeItem('analytics_events')
  }

  return {
    trackEvent,
    trackWhatsAppClick,
    trackPhoneClick,
    trackBookingClick,
    getAnalyticsEvents,
    getEventsByType,
    getEventsByPlatform,
    clearAnalyticsEvents
  }
}
