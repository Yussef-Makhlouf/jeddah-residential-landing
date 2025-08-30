"use client"

import { useState, useEffect } from "react"
import { MapPin, School, Building2, TreePine, Stethoscope, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookingModal } from "@/components/booking-modal"
import apiService from "@/lib/api-service"
import { StrategicFeature } from "@/lib/website-data"

// Icon mapping
const iconMap: { [key: string]: any } = {
  MapPin,
  School,
  Building2,
  TreePine,
  Stethoscope,
  Calendar
}

export function StrategicFeatures() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [features, setFeatures] = useState<StrategicFeature[]>([])

  useEffect(() => {
    // Load features from API
    const loadFeaturesData = async () => {
      try {
        const featuresData = await apiService.getStrategicFeaturesData()
        setFeatures(featuresData)
      } catch (error) {
        console.error('Error loading strategic features data:', error)
        // Fallback to default features
        setFeatures([
          {
            icon: "MapPin",
            title: "موقع إستراتيجي",
            description: "وسط 3 شوارع رئيسية",
            details: ["شارع حلمي كتبي", "طريق الأمير سلطان", "شارع عبد الله كاظم"],
            isMain: true,
          },
          {
            icon: "Building2",
            title: "قريب من المسجد",
            isMain: false,
          }
        ])
      }
    }

    loadFeaturesData()
  }, [])

  if (!features || features.length === 0) {
    return null // Loading state
  }

  return (
    <section className="py-16 md:py-24 bg-[#efedea]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-2xl lg:text-4xl font-bold text-[#2c2c2c] mb-4">
            <span className="font-bold text-[#540f6b]">مميزات الموقع</span> الإستراتيجي
          </h2>
        </div>

        {/* Main Feature Card - Mobile First */}
        <div className="mb-8 md:mb-12">
          {features.filter(f => f.isMain).map((feature, index) => {
            const IconComponent = iconMap[feature.icon]
            return (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#e5e1dc] hover:border-[#c48765] transition-all duration-300 shadow-elegant hover:shadow-elegant-lg">
                {/* Icon and Title */}
                <div className="flex items-center space-x-4 space-x-reverse mb-6">
                  <div className="bg-[#f5f3f0] mx-2 rounded-xl p-4 group-hover:bg-[#c48765] group-hover:text-white transition-colors duration-300 flex-shrink-0">
                    {IconComponent && <IconComponent className="w-6 md:w-8 h-6 md:h-8 text-[#540f6b] group-hover:text-white " />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl md:text-2xl text-[#2c2c2c] mb-2">{feature.title}</h3>
                    <p className="text-[#434344] text-base md:text-lg">{feature.description}</p>
                  </div>
                </div>

                {/* Details List */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#540f6b] text-lg mb-3">الشوارع الرئيسية:</h4>
                  {feature.details?.map((detail: string, detailIndex: number) => {
                    return (
                    <div key={detailIndex} className="flex items-center space-x-3 space-x-reverse bg-[#f5f3f0] rounded-lg p-3">
                      <div className="w-2 h-2 bg-[#540f6b] rounded-full flex-shrink-0"></div>
                      <span className="text-[#2c2c2c] text-base font-medium mx-2">{detail}</span>
                    </div>
                  )})}
                </div>
              </div>
            </div>
          )})}
        </div>

        {/* Secondary Features Grid - Mobile First */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-12">
          {features.filter(f => !f.isMain).map((feature, index) => {
            const IconComponent = iconMap[feature.icon]
            return (
            <div key={index} className="group">
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border flex flex-row items-center justify-center border-[#e5e1dc] hover:border-[#c48765] transition-all duration-300 shadow-sm hover:shadow-md h-full">
                {/* Icon */}
                <div className="bg-[#f5f3f0] mx-2 rounded-lg p-3 group-hover:bg-[#c48765] group-hover:text-white transition-colors duration-300 w-fit mb-4">
                  {IconComponent && <IconComponent className="w-5 md:w-6 h-5 md:h-6 text-[#540f6b] group-hover:text-white" />}
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="font-bold text-sm md:text-base text-[#2c2c2c] mb-2 leading-tight">{feature.title}</h3>
                </div>
              </div>
            </div>
          )})}
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <Button
            onClick={() => {
              const formElement = document.getElementById('booking-form')
              if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            className="bg-[#540f6b] hover:bg-[#31203a] text-white px-8 py-4 rounded-[18px] text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1 flex items-center space-x-2 space-x-reverse mx-auto p-6"
          >
            <Calendar className="w-5 h-5" />
            <span>احجز وتملك الآن شقة العمر</span>
          </Button>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
