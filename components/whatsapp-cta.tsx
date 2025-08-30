"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { useSourceTracking } from "@/hooks/use-source-tracking"
import { useAnalyticsTracking } from "@/hooks/use-analytics-tracking"
import { getWhatsAppConfig } from "@/lib/whatsapp-messages"
import { trackContactAction } from "@/lib/gtm"
import { MessageCircle, ArrowRight, Star } from "lucide-react"
import WebsiteDataService, { WhatsAppCTAInfo } from "@/lib/website-data"
import { useDynamicProjectData } from "@/hooks/use-website-data"

export function WhatsAppCTA() {
  const [whatsappInfo, setWhatsappInfo] = useState<WhatsAppCTAInfo | null>(null)
  const { source, socialMedia } = useSourceTracking()
  const { trackPhoneClick } = useAnalyticsTracking()
  const { getWhatsAppMessage } = useDynamicProjectData()
  
  useEffect(() => {
    setWhatsappInfo(WebsiteDataService.getWhatsappCTAInfo())
  }, [])

  if (!whatsappInfo) {
    return null
  }

  const platform = socialMedia || source || 'default'
  const config = getWhatsAppConfig(platform)
  
  const handlePhoneClick = () => {
    const phoneNumber = whatsappInfo.phone
    
    // تتبع المكالمة (Analytics القديم)
    trackPhoneClick(phoneNumber)
    
    // تتبع GTM - Google Tag Manager
    trackContactAction('phone', phoneNumber, platform, source)
    
    console.log(`📞 Phone call from ${platform}`)
    console.log(`📊 GTM Tracking: phone_call event sent`)
    
    window.open(`tel:${phoneNumber}`, "_self")
  }
  
  const getVariantStyles = () => {
    switch (whatsappInfo.variant) {
      case 'primary':
        return 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
      case 'secondary':
        return 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
      case 'minimal':
        return 'bg-white border-2 border-green-600 text-green-600'
      default:
        return 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
    }
  }
  
  return (
    <div className={`rounded-2xl p-8 ${getVariantStyles()} shadow-lg`}>
      <div className="text-center space-y-6">
        {/* العنوان */}
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold">
            {whatsappInfo.title}
          </h2>
          <p className="text-lg opacity-90">
            {whatsappInfo.subtitle}
          </p>
        </div>

        {/* معلومات إضافية */}
        {whatsappInfo.showPhone && (
          <div className="flex items-center justify-center space-x-2 space-x-reverse">
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold">رقم الواتساب: {whatsappInfo.phone}</span>
          </div>
        )}

        {/* الرسالة المخصصة */}
        {whatsappInfo.showMessage && (
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm opacity-90">
              <strong>رسالة مخصصة لزوار {platform}:</strong><br />
              {getWhatsAppMessage()}
            </p>
          </div>
        )}

        {/* أزرار التواصل */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <WhatsAppButton 
            size="lg" 
            variant={whatsappInfo.variant === 'minimal' ? 'outline' : 'default'}
            className="min-w-[200px]"
          >
            <MessageCircle className="w-5 h-5" />
            تواصل عبر الواتساب
            <ArrowRight className="w-4 h-4" />
          </WhatsAppButton>
          
          <Button
            variant="outline"
            size="lg"
            className={`min-w-[200px] ${
              whatsappInfo.variant === 'minimal' 
                ? 'border-white text-white hover:bg-white hover:text-green-600' 
                : 'border-white text-white hover:bg-white hover:text-green-600'
            }`}
            onClick={handlePhoneClick}
          >
            <Star className="w-5 h-5" />
            اتصل بنا مباشرة
          </Button>
        </div>


     
      </div>
    </div>
  )
}
