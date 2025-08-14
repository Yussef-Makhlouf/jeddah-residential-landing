"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { useSourceTracking } from "@/hooks/use-source-tracking"
import { getWhatsAppConfig } from "@/lib/whatsapp-messages"
import { MessageCircle, Phone, Clock } from "lucide-react"

export function WhatsAppSection() {
  const { source, socialMedia } = useSourceTracking()
  const platform = socialMedia || source || 'default'
  const config = getWhatsAppConfig(platform)
  
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            تواصل معنا مباشرة عبر الواتساب
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            احصل على استشارة مجانية وتفاصيل المشروع من فريقنا المتخصص
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* معلومات الاتصال */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">رقم الواتساب</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-green-600 mb-2">
                {config.phone}
              </p>
              <p className="text-gray-600">
                متاح على مدار الساعة
              </p>
            </CardContent>
          </Card>

          {/* ساعات العمل */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">ساعات العمل</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-2 text-gray-600">
                <p>السبت - الخميس: 9:00 ص - 9:00 م</p>
                <p>الجمعة: 2:00 م - 9:00 م</p>
              </div>
            </CardContent>
          </Card>

          {/* زر التواصل */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">تواصل الآن</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <WhatsAppButton 
                size="lg" 
                className="w-full"
              >
                تواصل عبر الواتساب
              </WhatsAppButton>
              <p className="text-sm text-gray-500 mt-3">
                رسالة مخصصة لزوار {platform}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* رسالة مخصصة */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">رسالة مخصصة لزوار {platform}</h3>
              <p className="text-lg opacity-90 leading-relaxed">
                {config.message}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
