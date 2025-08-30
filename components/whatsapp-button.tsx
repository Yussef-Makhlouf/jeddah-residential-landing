"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { useSourceTracking } from "@/hooks/use-source-tracking"
import { useAnalyticsTracking } from "@/hooks/use-analytics-tracking"
import { generateWhatsAppUrl, getWhatsAppConfig } from "@/lib/whatsapp-messages"
import { trackContactAction } from "@/lib/gtm"

interface WhatsAppButtonProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children?: React.ReactNode
  showIcon?: boolean
}

export function WhatsAppButton({ 
  variant = 'default', 
  size = 'md', 
  className = '',
  children,
  showIcon = true 
}: WhatsAppButtonProps) {
  const { source, socialMedia } = useSourceTracking()
  const { trackWhatsAppClick } = useAnalyticsTracking()
  
  const handleWhatsAppClick = () => {
    const platform = socialMedia || source || 'default'
    const config = getWhatsAppConfig(platform)
    const whatsappUrl = generateWhatsAppUrl(platform)
    
    // تتبع النقرة مع تفاصيل المنصة ورقم الهاتف (Analytics القديم)
    trackWhatsAppClick(config.phone, platform)
    
    // تتبع GTM - Google Tag Manager
    trackContactAction('whatsapp', config.phone, platform, source)
    
    console.log(`🔥 WhatsApp click from ${platform} → Phone: ${config.phone}`)
    console.log(`📊 GTM Tracking: whatsapp_click event sent`)
    
    window.open(whatsappUrl, "_blank")
  }

  const getButtonStyles = () => {
    const baseStyles = "transition-all duration-300 hover:transform hover:-translate-y-1"
    
    if (variant === 'default') {
      return `bg-green-600 hover:bg-green-700 text-white ${baseStyles} ${className}`
    } else if (variant === 'outline') {
      return `border-green-600 text-green-600 hover:bg-green-600 hover:text-white ${baseStyles} ${className}`
    } else {
      return `text-green-600 hover:bg-green-50 ${baseStyles} ${className}`
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 text-sm'
      case 'lg':
        return 'px-6 py-4 text-lg'
      default:
        return 'px-4 py-3 text-base'
    }
  }

  return (
    <a
      href={generateWhatsAppUrl(socialMedia || source || 'default')}
      target="_blank"
      rel="noopener noreferrer"
      className={`${getButtonStyles()} ${getSizeStyles()} flex items-center gap-2`}
    >
      {showIcon && <MessageCircle className="w-4 h-4" />}
      {children || 'تواصل عبر الواتساب'}
    </a>
  )
}
