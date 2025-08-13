"use client"

import { Button } from "@/components/ui/button"
import { Phone, MessageCircle } from "lucide-react"

interface FloatingButtonsProps {
  onBookingClick: () => void
}

export function FloatingButtons({ onBookingClick }: FloatingButtonsProps) {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("مرحباً، أريد الاستفسار عن مشروع الزهراء السكني")
    window.open(`https://wa.me/966536667967?text=${message}`, "_blank")
  }

  const handleCallClick = () => {
    window.open("tel:0536667967", "_self")
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <Button
        onClick={handleWhatsAppClick}
        className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full w-14 h-14 p-0 shadow-elegant-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1"
        title="تواصل عبر الواتساب"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Call Button */}
      <Button
        onClick={handleCallClick}
        className="bg-[#540f6b] hover:bg-[#6d1f7b] border-2 border-white  text-white rounded-full w-14 h-14 p-0 shadow-elegant-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1"
        title="اتصل بنا"
      >
        <Phone className="w-6 h-6" />
      </Button>

      {/* Booking Button */}
      <Button
        onClick={onBookingClick}
        className="bg-[#c48765] hover:bg-[#b8895e] text-white rounded-full w-14 h-14 p-0 shadow-elegant-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1"
        title="احجز موعد"
      >
        <span className="text-lg font-bold">حجز</span>
      </Button>
    </div>
  )
}
