"use client"

import { useState, useEffect } from "react"
import { MapPin, Clock, Car, Plane } from "lucide-react"
import apiService from "@/lib/api-service"
import { LocationInfo } from "@/lib/website-data"
import { useProjectData } from "@/hooks/use-website-data"

// Icon mapping
const iconMap: { [key: string]: any } = {
  MapPin,
  Clock,
  Car,
  Plane
}

export function LocationAdvantages() {
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null)
  const { projectData } = useProjectData()

  useEffect(() => {
    // Load location data from API
    const loadLocationData = async () => {
      try {
        const websiteData = await apiService.getAllData()
        setLocationInfo(websiteData.location)
      } catch (error) {
        console.error('Error loading location data:', error)
        // Fallback to default location data
        setLocationInfo({
          address: "حي الزهراء، جدة، المملكة العربية السعودية",
          mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3709.9005761511416!2d39.14023258505769!3d21.589803685697152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDM1JzIzLjMiTiAzOcKwMDgnMTcuMCJF!5e0!3m2!1sar!2seg!4v1755078085233!5m2!1sar!2seg",
          features: [
            { title: "قريب من الواجهة البحرية", time: "8 دقائق", icon: "MapPin" },
            { title: "قريب من المطار", time: "10 دقائق", icon: "Plane" },
            { title: "شوارع رئيسية", time: "مباشر", icon: "Car" },
            { title: "مركز المدينة", time: "20 دقيقة", icon: "Clock" }
          ]
        })
      }
    }

    loadLocationData()
  }, [])

  if (!locationInfo) {
    return null // Loading state
  }

  return (
    <section className="py-24 bg-[#efedea]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#2c2c2c] mb-6">
              <span className=" font-bold text-[#540f6b]">موقع مثالي</span> بالقرب من كل ما تحتاجه
            </h2>
            <p className="text-xl text-[#6b7280] mb-12">
              يتميز المشروع بموقعه الإستراتيجي الذي يوفر سهولة الوصول لجميع المرافق والخدمات المهمة في جدة
            </p>

            <div className="space-y-6">
              {locationInfo.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon]
                return (
                  <div key={index} className="flex items-start space-x-4 space-x-reverse">
                    <div className="bg-[#f5f3f0] rounded-lg p-3 flex-shrink-0 border border-[#e5e1dc]">
                      {IconComponent && <IconComponent className="w-6 h-6 text-[#540f6b]" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2 mx-2">
                        <h3 className="font-bold text-lg text-[#2c2c2c]">{feature.title}</h3>
                        <span className="bg-[#c48765] text-white px-3 py-1 rounded-full text-sm font-medium">
                          {feature.time}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-white rounded-2xl shadow-elegant border border-[#e5e1dc] overflow-hidden">
            <div className="aspect-square bg-[#f5f3f0] flex items-center justify-center">
              <iframe
                src={locationInfo.mapUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="خريطة موقع المشروع"
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-[#2c2c2c] mb-2">{projectData?.name || "مشروع راف 25"}</h3>
              <p className="text-[#6b7280] mb-4">{locationInfo.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
