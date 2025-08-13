"use client"

import { useState } from "react"
import { Shield, Wifi, Camera, Users, MapPin, CheckCircle, LucideSnowflake, Building2, Zap, Droplets, Users2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookingModal } from "@/components/booking-modal"

const highlights = [
  {
    icon: Shield,
    title: "بيئة سكنية متكاملة",

  },
  {
    icon: LucideSnowflake,
    title: "مداخل مكيفة",

  },
  {
    icon: Camera,
    title: "كاميرات مراقبة",

  },
  {
    icon: Wifi,
    title: "سمارت هوم",

  },
  {
    icon: Users,
    title: "تصميم مودرن",
 
  },
  {
    icon: MapPin,
    title: "موقع مثالي",
  },
]



const trustFactors = [
  {
    text: "15 سنه ضمان على الهيكل الأنشائي",
    icon: Building2,
  },
  {
    text: "25 سنه ضمان على قواطع وأفياش",
    icon: Zap,
  },
  {
    text: "سنتين ضمان على سباكة",
    icon: Droplets,
  },
  {
    text: "سنة ضمان على اتحاد الملاك",
    icon: Users2,
  },
]

export function ProjectHighlights() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-2xl lg:text-4xl font-bold text-[#2c2c2c] mb-4">
            <span className="font-bold text-[#540f6b]">مميزات المشروع</span>
          </h2>
          <p className="text-base md:text-base text-[#6b7280] max-w-3xl mx-auto">
            مساحات تصل إلى 155 م² - موقع استثنائي قريب من الواجهة البحرية والمطار وأهم الشوارع الرئيسية
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-12">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="flex items-center justify-start gap-3 md:gap-4 bg-[#f5f3f0] rounded-2xl py-4 md:py-6 md:px-4"
            >
              <div className="flex-shrink-0 flex items-center justify-center bg-white rounded-full w-12 md:w-16 h-12 md:h-16 border border-[#e5e1dc] mx-2">
                <highlight.icon className="w-6 md:w-8 h-6 md:h-8  text-[#540f6b]" />
              </div>
              <h3 className="font-bold text-sm md:text-lg lg:text-xl text-[#2c2c2c] leading-tight">
                {highlight.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Guarantees Section */}
        <div className="mt-16 md:mt-20">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2c2c2c] mb-4">
              <span className="font-bold text-[#540f6b]">ضمانات المشروع</span>
            </h2>
            <p className="text-lg md:text-xl text-[#6b7280] max-w-3xl mx-auto">
              نلتزم بأعلى معايير الجودة ونقدم ضمانات شاملة لراحة بالك وثقتك
            </p>
          </div>

          {/* Trust Factors */}
          <div className="bg-[#f5f3f0] rounded-2xl p-6 md:p-4 border border-[#e5e1dc]">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {trustFactors.map((factor, index) => (
                <div key={index} className="flex items-center gap-2 md:gap-3">
                  <div className="flex-shrink-0 flex items-center justify-center bg-white rounded-full w-8 md:w-10 h-8 md:h-10 border border-[#e5e1dc]">
                    <factor.icon className="w-4 md:w-5 h-4 md:h-5 text-[#540f6b] " />
                  </div>
                  <span className="text-[#2c2c2c] text-sm md:text-base font-medium">{factor.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Button */}
        <div className="mt-16 md:mt-20 text-center ">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#540f6b] hover:bg-[#540f6b] text-white  px-8 py-6 rounded-[18px] text-lg font-bold transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1"
          >
            أحجز و تملك الآن شقة العمر
          </Button>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
