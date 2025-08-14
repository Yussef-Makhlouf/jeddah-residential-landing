"use client"

import { Button } from "@/components/ui/button"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { useSourceTracking } from "@/hooks/use-source-tracking"
import { getWhatsAppConfig } from "@/lib/whatsapp-messages"
import { MessageCircle, ArrowRight, Star } from "lucide-react"

interface WhatsAppCTAProps {
  title?: string
  subtitle?: string
  variant?: 'primary' | 'secondary' | 'minimal'
  showPhone?: boolean
  showMessage?: boolean
}

export function WhatsAppCTA({ 
  title = "تواصل معنا الآن",
  subtitle = "احصل على استشارة مجانية وتفاصيل المشروع",
  variant = 'primary',
  showPhone = true,
  showMessage = false
}: WhatsAppCTAProps) {
  const { source, socialMedia } = useSourceTracking()
  const platform = socialMedia || source || 'default'
  const config = getWhatsAppConfig(platform)
  
  const getVariantStyles = () => {
    switch (variant) {
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
            {title}
          </h2>
          <p className="text-lg opacity-90">
            {subtitle}
          </p>
        </div>

        {/* معلومات إضافية */}
        {showPhone && (
          <div className="flex items-center justify-center space-x-2 space-x-reverse">
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold">رقم الواتساب: {config.phone}</span>
          </div>
        )}

        {/* الرسالة المخصصة */}
        {showMessage && (
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm opacity-90">
              <strong>رسالة مخصصة لزوار {platform}:</strong><br />
              {config.message}
            </p>
          </div>
        )}

        {/* أزرار التواصل */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <WhatsAppButton 
            size="lg" 
            variant={variant === 'minimal' ? 'outline' : 'default'}
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
              variant === 'minimal' 
                ? 'border-white text-white hover:bg-white hover:text-green-600' 
                : 'border-white text-white hover:bg-white hover:text-green-600'
            }`}
            onClick={() => window.open("tel:0536667967", "_self")}
          >
            <Star className="w-5 h-5" />
            اتصل بنا مباشرة
          </Button>
        </div>


     
      </div>
    </div>
  )
}
