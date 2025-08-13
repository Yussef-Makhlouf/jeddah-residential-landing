"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Star, MessageCircle } from "lucide-react"
import Image from "next/image"

interface CleanHeroProps {
  onBookingClick: () => void
}

export function CleanHero({ onBookingClick }: CleanHeroProps) {
  const handleWhatsAppContact = () => {
    const message = `مرحباً، أريد الاستفسار عن مشروع حي الزهراء 25`
    const whatsappUrl = `https://wa.me/966500000000?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className="bg-[#efedea]">
      {/* Navigation */}
      <nav className="border-b border-[#e5e1dc]">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-[#540f6b]">مشروع الزهراء 25</div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center space-x-1 space-x-reverse">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#c48765] text-[#c48765]" />
                ))}
              </div>
              <span className="text-sm text-[#6b7280]">مشروع معتمد</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content Side */}
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-light text-[#2c2c2c] leading-tight">
                  <span className="block font-bold">حقق حلمك</span>
                  <span className="block text-[#540f6b]">السكن المثالي</span>
                </h1>
                <p className="text-xl text-[#6b7280] font-light">في جدة - حي الزهراء</p>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse text-[#6b7280]">
                <MapPin className="w-5 h-5 text-[#540f6b]" />
                <span>موقع استراتيجي وسط 3 شوارع رئيسية</span>
              </div>
            </div>

            {/* Price Card */}
            <div className="bg-white rounded-2xl p-8 border border-[#e5e1dc] shadow-elegant">
              <div className="space-y-4">
                <p className="text-[#6b7280]">أسعار تبدأ من</p>
                <div className="flex items-baseline space-x-2 space-x-reverse">
                  <span className="text-5xl font-bold text-[#540f6b]">870,000</span>
                  <span className="text-2xl text-[#c48765]"><Image src="/sar.svg" alt="sar" width={35} height={35} /></span>
                </div>
                <p className="text-sm text-[#6b7280]">شامل جميع الخدمات والمرافق</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onBookingClick}
                size="lg"
                className="bg-[#540f6b] hover:bg-[#6d1f7b] text-white px-12 py-6 text-lg rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1"
              >
                احجز موعد المعاينة
              </Button>
              <Button
                onClick={handleWhatsAppContact}
                variant="outline"
                size="lg"
                className="border-[#c48765] text-[#c48765] hover:bg-[#c48765] hover:text-[#540f6b] px-12 py-6 text-lg rounded-xl font-medium bg-transparent transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5 ml-2" />
                تواصل واتساب
              </Button>
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative">
            <div className="bg-white rounded-3xl overflow-hidden shadow-elegant-lg">
              <img
                src="/banner.png"
                alt="مشروع الزهراء السكني"
                className="w-full h-[600px] object-cover"
              />
            </div>

            {/* Info Cards */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-elegant-lg p-6 border border-[#e5e1dc]">
              <div className="text-sm text-[#6b7280] mb-1">مساحات تصل إلى</div>
              <div className="text-3xl font-bold text-[#540f6b]">155 م²</div>
            </div>

            <div className="absolute -top-6 -left-6 bg-[#c48765] text-white rounded-xl shadow-elegant-lg p-6">
              <div className="text-sm opacity-90 mb-1">ضمان</div>
              <div className="text-3xl font-bold">15 سنة</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
