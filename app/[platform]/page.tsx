"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { 
  getPlatformFromExtension, 
  getPlatformFromUrlPath, 
  createTrackingFromUrlPath,
  isValidPlatformPath,
  SOCIAL_MEDIA_PLATFORMS 
} from "@/lib/tracking"
import { CleanHero } from "@/components/clean-hero"
import { ApartmentShowcase } from "@/components/apartment-showcase"
import { StrategicFeatures } from "@/components/strategic-features"
import { ProjectHighlights } from "@/components/project-highlights"
import { LocationAdvantages } from "@/components/location-advantages"
import { BookingModal } from "@/components/booking-modal"
import { FloatingButtons } from "@/components/floating-buttons"
import { Footer } from "@/components/footer"
import { ImageCarousel } from "@/components/image-carousel"
import { Badge } from "@/components/ui/badge"

export default function PlatformPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const platformParam = params.platform as string
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isValidPlatform, setIsValidPlatform] = useState(false)
  const [platformInfo, setPlatformInfo] = useState<{
    name: string
    icon: string
    color: string
  } | null>(null)

  useEffect(() => {
    // Determine the actual platform from the URL parameter
    let actualPlatform = platformParam
    
    // أولاً: محاولة اكتشاف المنصة من URL path (الطريقة الجديدة)
    const platformFromPath = getPlatformFromUrlPath(platformParam)
    if (platformFromPath) {
      actualPlatform = platformFromPath
      console.log('Platform detected from URL path:', platformFromPath)
    } else {
      // ثانياً: التحقق من الاختصارات المعرفة مسبقاً
      const platformFromExtension = getPlatformFromExtension(platformParam)
      if (platformFromExtension) {
        actualPlatform = platformFromExtension
        console.log('Platform detected from extension:', platformFromExtension)
      }
    }
    
    // Validate that it's a supported platform
    const supportedPlatforms = Object.values(SOCIAL_MEDIA_PLATFORMS)
    if (!supportedPlatforms.includes(actualPlatform as any)) {
      setIsValidPlatform(false)
      console.warn('Unsupported platform:', platformParam, 'Detected as:', actualPlatform)
      return
    }

    // Set platform info
    const platformData = {
      facebook: { name: 'فيسبوك', icon: '📘', color: 'bg-blue-500' },
      meta: { name: 'ميتا', icon: '🔵', color: 'bg-blue-600' },
      instagram: { name: 'إنستغرام', icon: '📷', color: 'bg-pink-500' },
      twitter: { name: 'تويتر', icon: '🐦', color: 'bg-sky-500' },
      tiktok: { name: 'تيك توك', icon: '🎵', color: 'bg-black' },
      snapchat: { name: 'سناب شات', icon: '👻', color: 'bg-yellow-500' },
      whatsapp: { name: 'واتساب', icon: '💬', color: 'bg-green-500' },
      google: { name: 'جوجل', icon: '🔍', color: 'bg-red-500' }
    }
    
    setPlatformInfo(platformData[actualPlatform as keyof typeof platformData])
    setIsValidPlatform(true)

    // Set tracking cookie or localStorage
    const setTracking = () => {
      // استخدام الدالة الجديدة لإنشاء معلومات التتبع
      const trackingData = createTrackingFromUrlPath(platformParam, searchParams) || {
        platform: actualPlatform,
        timestamp: new Date().toISOString(),
        utm_source: searchParams.get('utm_source') || actualPlatform,
        utm_medium: searchParams.get('utm_medium') || 'social',
        utm_campaign: searchParams.get('utm_campaign') || 'default'
      }

      // Store in localStorage
      localStorage.setItem('social_media_source', JSON.stringify(trackingData))
      
      // Set cookie for server-side tracking
      document.cookie = `social_source=${encodeURIComponent(JSON.stringify(trackingData))}; path=/; max-age=2592000` // 30 days
      
      console.log('Tracking data saved:', trackingData)
    }

    setTracking()
  }, [platformParam, searchParams])

  // if (!isValidPlatform) {
  //   return (
  //     <div className="min-h-screen bg-[#efedea] flex items-center justify-center" dir="rtl">
  //       <div className="text-center">
  //         <h1 className="text-2xl font-bold text-gray-800 mb-4">404 - الصفحة غير موجودة</h1>
  //         <p className="text-gray-600">الرابط الذي تبحث عنه غير صحيح</p>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-[#efedea]" dir="rtl">
      {/* Social Media Badge */}
      {platformInfo && (
        <div className="fixed top-4 left-4 z-50">
    
        </div>
      )}

      <CleanHero onBookingClick={() => setIsBookingModalOpen(true)} />
      
      {/* Image Carousel Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#540f6b] mb-4">معرض الصور</h2>
          </div>
          <ImageCarousel 
            images={[
              { src: "/banner.png", alt: "مشروع الزهراء السكني" },
              { src: "/banner1.png", alt: "مشروع الزهراء السكني" },
              { src: "/banner2.png", alt: "مشروع الزهراء السكني" },
              { src: "/banner3.jpg", alt: "مشروع الزهراء السكني" },
              { src: "/banner4.jpg", alt: "مشروع الزهراء السكني" },
              { src: "/banner5.jpg", alt: "مشروع الزهراء السكني" },
            ]}
            className="max-w-4xl mx-auto"
          />
        </div>
      </section>
      
      <ApartmentShowcase onBookingClick={() => setIsBookingModalOpen(true)} />
      <StrategicFeatures />
      <ProjectHighlights />
      <LocationAdvantages />
      <Footer />
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
      <FloatingButtons onBookingClick={() => setIsBookingModalOpen(true)} />
    </div>
  )
}
