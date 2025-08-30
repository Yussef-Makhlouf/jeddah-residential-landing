"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAnalyticsTracking } from '@/hooks/use-analytics-tracking'
import { Download, RefreshCw, MessageCircle, Phone, Calendar, Eye } from 'lucide-react'

interface EventSummary {
  platform: string
  whatsapp_clicks: number
  phone_clicks: number
  booking_clicks: number
  total_events: number
  last_activity: string
}

export function AnalyticsDashboard() {
  const { getAnalyticsEvents, getEventsByType, getEventsByPlatform, clearAnalyticsEvents } = useAnalyticsTracking()
  const [events, setEvents] = useState<any[]>([])
  const [summary, setSummary] = useState<EventSummary[]>([])

  const refreshData = () => {
    const allEvents = getAnalyticsEvents()
    setEvents(allEvents)
    
    // إنشاء ملخص بحسب المنصة
    const platformSummary: Record<string, EventSummary> = {}
    
    allEvents.forEach(event => {
      const platform = event.social_media || event.source_platform || 'unknown'
      
      if (!platformSummary[platform]) {
        platformSummary[platform] = {
          platform,
          whatsapp_clicks: 0,
          phone_clicks: 0,
          booking_clicks: 0,
          total_events: 0,
          last_activity: event.timestamp
        }
      }
      
      platformSummary[platform].total_events++
      
      if (event.event_type === 'whatsapp_click') {
        platformSummary[platform].whatsapp_clicks++
      } else if (event.event_type === 'phone_click') {
        platformSummary[platform].phone_clicks++
      } else if (event.event_type === 'booking_click') {
        platformSummary[platform].booking_clicks++
      }
      
      // تحديث آخر نشاط
      if (new Date(event.timestamp) > new Date(platformSummary[platform].last_activity)) {
        platformSummary[platform].last_activity = event.timestamp
      }
    })
    
    setSummary(Object.values(platformSummary).sort((a, b) => b.total_events - a.total_events))
  }

  useEffect(() => {
    refreshData()
  }, [])

  const exportData = () => {
    const dataStr = JSON.stringify(events, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `analytics-${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getPlatformBadgeColor = (platform: string) => {
    const colors: Record<string, string> = {
      'tiktok': 'bg-black text-white',
      'facebook': 'bg-blue-500 text-white',
      'instagram': 'bg-pink-500 text-white',
      'twitter': 'bg-sky-500 text-white',
      'snapchat': 'bg-yellow-500 text-black',
      'whatsapp': 'bg-green-500 text-white',
      'google': 'bg-red-500 text-white',
      'default': 'bg-gray-500 text-white'
    }
    return colors[platform] || colors['default']
  }

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">إحصائيات التتبع</h1>
        <div className="flex gap-2">
          <Button onClick={refreshData} variant="outline">
            <RefreshCw className="w-4 h-4 ml-2" />
            تحديث
          </Button>
          <Button onClick={exportData} variant="outline">
            <Download className="w-4 h-4 ml-2" />
            تصدير البيانات
          </Button>
          <Button onClick={clearAnalyticsEvents} variant="destructive">
            مسح البيانات
          </Button>
        </div>
      </div>

      {/* ملخص عام */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Eye className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{events.length}</p>
                <p className="text-gray-600">إجمالي الأحداث</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <MessageCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{getEventsByType('whatsapp_click').length}</p>
                <p className="text-gray-600">نقرات واتساب</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Phone className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{getEventsByType('phone_click').length}</p>
                <p className="text-gray-600">مكالمات هاتفية</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Calendar className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{getEventsByType('booking_click').length}</p>
                <p className="text-gray-600">طلبات حجز</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ملخص بحسب المنصة */}
      <Card>
        <CardHeader>
          <CardTitle>التفاعل بحسب المنصة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {summary.map((item) => (
              <div key={item.platform} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getPlatformBadgeColor(item.platform)}>
                    {item.platform}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    آخر نشاط: {formatDate(item.last_activity)}
                  </span>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-green-600">{item.whatsapp_clicks}</p>
                    <p className="text-xs text-gray-600">واتساب</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-blue-600">{item.phone_clicks}</p>
                    <p className="text-xs text-gray-600">هاتف</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-purple-600">{item.booking_clicks}</p>
                    <p className="text-xs text-gray-600">حجز</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-600">{item.total_events}</p>
                    <p className="text-xs text-gray-600">إجمالي</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* آخر الأحداث */}
      <Card>
        <CardHeader>
          <CardTitle>آخر الأحداث</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {events.slice(-20).reverse().map((event, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Badge className={getPlatformBadgeColor(event.social_media || event.source_platform)}>
                      {event.social_media || event.source_platform}
                    </Badge>
                    <span className="font-medium">
                      {event.event_type === 'whatsapp_click' && '📱 نقرة واتساب'}
                      {event.event_type === 'phone_click' && '📞 مكالمة هاتفية'}
                      {event.event_type === 'booking_click' && '📅 طلب حجز'}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(event.timestamp)}
                  </span>
                </div>
                {event.additional_data?.phone_number && (
                  <p className="text-sm text-gray-600 mt-1">
                    رقم الهاتف: {event.additional_data.phone_number}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
