"use client"

import { useEffect } from 'react'
import { CheckCircle, Home, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { pushToDataLayer } from '@/lib/gtm'
import { useSourceTracking } from '@/hooks/use-source-tracking'

export default function ThankYouPage() {
  const { source, socialMedia } = useSourceTracking()

  useEffect(() => {
    // Google Tag Manager - Thank You Page event
    const platform = socialMedia || source || 'direct'
    const eventData = {
      form_type: 'booking_form',
      traffic_source: platform,
      page: 'thank_you',
      timestamp: new Date().toISOString()
    }
    
    pushToDataLayer({
      event: 'form_submission',
      ...eventData
    });

    console.log(`🎯 Thank You Page - form_submission event sent for platform: ${platform}`)
    console.log(`📊 GTM Event: form_submission (Thank You Page)`)

    // منع العودة للخلف بطرق متعددة
    const preventBackNavigation = () => {
      // إضافة entry جديد في التاريخ
      window.history.pushState(null, '', window.location.href)
      
      // منع زر العودة
      window.addEventListener('popstate', (e) => {
        window.history.pushState(null, '', window.location.href)
      })
    }

    // تشغيل منع العودة
    preventBackNavigation()

    // إضافة معالج للـ beforeunload لمنع الإغلاق غير المرغوب فيه
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      return ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    // منع استخدام مفاتيح الاختصار للعودة
    const handleKeyDown = (e: KeyboardEvent) => {
      // منع Alt + Left Arrow (العودة)
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault()
      }
      // منع Backspace للعودة
      if (e.key === 'Backspace' && (e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
        e.preventDefault()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    // تنظيف المعالجات عند إلغاء التحميل
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-[#f8f6f3] to-[#f0ebe5] flex items-center justify-center p-4"
      data-gtm-page="thank-you"
      data-gtm-source={socialMedia || source || 'direct'}
    >
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-[#540f6b] to-[#6d1f7b] p-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              تم تسجيل بياناتك بنجاح
            </h1>
          </div>

          {/* Main content */}
          <div className="p-8 text-center space-y-6">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-[#c48765]/20 rounded-full flex items-center justify-center mx-auto">
                <Phone className="w-8 h-8 text-[#c48765]" />
              </div>
              
              <h2 className="text-2xl font-bold text-[#540f6b]">
                ترقّب اتصالنا في أقرب وقت..
              </h2>
              
              <p className="text-lg text-[#6b7280] leading-relaxed">
                سعداء بانضمامك لعائلتنا
              </p>
              
              <div className="bg-[#f8f6f3] rounded-2xl p-6 border border-[#e5e1dc]">
                <p className="text-xl font-semibold text-[#540f6b]">
                  شكرًا لك..
                </p>
              </div>
            </div>

          </div>

       
        </div>
      </div>
    </div>
  )
}
