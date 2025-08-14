"use client"

import { SocialMediaLinks } from '@/components/social-media-links'
import { useSocialMediaTracking } from '@/hooks/use-social-media-tracking'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function TrackingPage() {
  const { trackingData, getPlatformName, getPlatformIcon } = useSocialMediaTracking()

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة تتبع وسائل التواصل الاجتماعي</h1>
          <p className="text-gray-600">مراقبة وتحليل الزيارات من وسائل التواصل الاجتماعي</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Current Tracking Data */}
          <Card>
            <CardHeader>
              <CardTitle>بيانات التتبع الحالية</CardTitle>
            </CardHeader>
            <CardContent>
              {trackingData ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Badge variant="secondary">
                      {getPlatformIcon(trackingData.platform)} {getPlatformName(trackingData.platform)}
                    </Badge>
                  </div>
                  <div className="text-sm space-y-1">
                    <p><strong>المنصة:</strong> {trackingData.platform}</p>
                    <p><strong>المصدر:</strong> {trackingData.utm_source}</p>
                    <p><strong>الوسيط:</strong> {trackingData.utm_medium}</p>
                    <p><strong>الحملة:</strong> {trackingData.utm_campaign}</p>
                    <p><strong>التاريخ:</strong> {new Date(trackingData.timestamp).toLocaleString('ar-SA')}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center">لا توجد بيانات تتبع حالية</p>
              )}
            </CardContent>
          </Card>

          {/* Tracking Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>كيفية الاستخدام</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                                 <div className="p-3 bg-blue-50 rounded-lg">
                   <h4 className="font-semibold mb-2">الروابط المتاحة:</h4>
                   <ul className="space-y-1 text-gray-600">
                     <li>• /facebook أو /fb - لتتبع زيارات فيسبوك</li>
                     <li>• /instagram أو /ig - لتتبع زيارات إنستغرام</li>
                     <li>• /twitter أو /tw - لتتبع زيارات تويتر</li>
                     <li>• /tiktok أو /tt - لتتبع زيارات تيك توك</li>
                     <li>• /snapchat أو /sc - لتتبع زيارات سناب شات</li>
                   </ul>
                 </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-2">مثال على الاستخدام:</h4>
                                     <p className="text-gray-600">
                     https://yoursite.com/fb?utm_campaign=spring_2024
                   </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Social Media Links Generator */}
        <SocialMediaLinks />
      </div>
    </div>
  )
}
