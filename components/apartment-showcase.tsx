"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Square, MessageCircle } from "lucide-react"
import Image from "next/image"

interface ApartmentShowcaseProps {
  onBookingClick: () => void
}

const apartments = [
  {
    id: "A",
    name: "نموذج A - واجهة أمامية",
    price: "890,000",
    area: "155",
    rooms: 4,
    bathrooms: 4,
    features: ["غرفة استقبال", "2 غرفة نوم", "4 دورات مياه", "مجلس نساء", "مطبخ", "غرفة سائق", "غرفة خادمة"],
    popular: true,
    image: "/a.jpg",
  },
  {
    id: "B",
    name: "نموذج B - واجهة خلفية",
    price: "870,000",
    area: "151",
    rooms: 4,
    bathrooms: 4,
    features: ["غرفة استقبال", "2 غرفة نوم", "مجلس", "مطبخ", "4 دورات مياه", "غرفة خادمة", "غرفة سائق"],
    popular: false,
    image: "/b.jpg",
  },
  {
    id: "C",
    name: "نموذج C - واجهة خلفية",
    price: "870,000",
    area: "151",
    rooms: 4,
    bathrooms: 4,
    features: ["2 غرفة نوم", "مجلس", "مطبخ", "4 دورات مياه", "غرفة سائق"],
    popular: false,
    image: "/c.jpg",
  },
  {
    id: "D",
    name: "نموذج D - واجهة أمامية",
    price: "890,000",
    area: "155",
    rooms: 4,
    bathrooms: 4,
    features: ["2 غرفة نوم", "مجلس", "مطبخ", "4 دورات مياه", "غرفة خادمة", "غرفة سائق"],
    popular: false,
    image: "/d.jpg",
  },
]

export function ApartmentShowcase({ onBookingClick }: ApartmentShowcaseProps) {
  const [selectedApartment, setSelectedApartment] = useState(apartments[0])

  const handleWhatsAppContact = () => {
    const message = `مرحباً، أريد الاستفسار عن ${selectedApartment.name} في مشروع حي الزهراء 25`
    const whatsappUrl = `https://wa.me/966500000000?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2c2c2c] mb-4">
            <span className="font-bold text-[#540f6b] ">نماذج الشقق</span> المتاحة
          </h2>
   
        </div>

        {/* Mobile Tabs */}
        <div className="lg:hidden mb-8" >
          <div className="flex overflow-x-auto pb-2 space-x-2 space-x-reverse mx-2">
            {apartments.map((apartment) => (
              <button
                key={apartment.id}
                onClick={() => setSelectedApartment(apartment)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all  mx-1 duration-300 ${
                  selectedApartment.id === apartment.id
                    ? "bg-[#540f6b] text-white"
                    : "bg-white text-[#6b7280] border border-[#e5e1dc]"
                }`}
              >
                نموذج {apartment.id}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Desktop Apartment Selection */}
          <div className="hidden lg:block lg:col-span-1 space-y-4">
            {apartments.map((apartment) => (
              <div
                key={apartment.id}
                onClick={() => setSelectedApartment(apartment)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedApartment.id === apartment.id
                    ? "border-[#540f6b] bg-[#f5f3f0]"
                    : "border-[#e5e1dc] bg-white hover:border-[#c48765]"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-[#2c2c2c]">{apartment.name}</h3>
                    {apartment.popular && (
                      <Badge className="mt-1 bg-[#c48765] text-white hover:bg-[#c48765]">الأكثر طلباً</Badge>
                    )}
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold flex items-center text-[#540f6b]">
                      {apartment.price}
                      <Image src="/sar.svg" alt="sar" width={30} height={30} className="ml-1" />
                    </div>
                   
                  </div>
                </div>

                <div className="flex items-center space-x-4 space-x-reverse text-sm text-[#6b7280]">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Bed className="w-4 h-4 text-[#c48765]" />
                    <span>{apartment.rooms}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Bath className="w-4 h-4 text-[#c48765]" />
                    <span>{apartment.bathrooms}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Square className="w-4 h-4 text-[#c48765]" />
                    <span>{apartment.area} م²</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Apartment Details - Fixed Height for Mobile */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-elegant border border-[#e5e1dc] overflow-hidden h-fit">
              {/* Image */}
              <div className="aspect-video bg-[#f5f3f0]">
                <img
                  src={selectedApartment.image || "/placeholder.svg"}
                  alt={selectedApartment.name}
                  className="w-full h-full object-contain "
                />
              </div>

              {/* Details */}
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl md:text-2xl font-bold text-[#2c2c2c] mb-2">{selectedApartment.name}</h3>
                    {selectedApartment.popular && (
                      <Badge className="mb-3 md:hidden bg-[#c48765] text-white hover:bg-[#c48765]">الأكثر طلباً</Badge>
                    )}
                    <div className="flex items-center space-x-4 md:space-x-6 space-x-reverse text-[#6b7280] text-sm md:text-base">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Bed className="w-4 md:w-5 h-4 md:h-5 text-[#c48765] mx-2" />
                        <span>{selectedApartment.rooms} غرف</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Bath className="w-4 md:w-5 h-4 md:h-5 text-[#c48765] mx-2" />
                        <span>{selectedApartment.bathrooms} دورات مياه</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Square className="w-4 md:w-5 h-4 md:h-5 text-[#c48765] mx-2" />
                        <span>{selectedApartment.area} م²</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right md:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-[#540f6b] flex items-center">
                      {selectedApartment.price}
                      <Image src="/sar.svg" alt="sar" width={30} height={30} className="ml-1" />
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6 md:mb-8">
                  <h4 className="font-bold text-[#2c2c2c] mb-4">مكونات الشقة:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                    {selectedApartment.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 space-x-reverse">
                        <div className="w-2 h-2 bg-[#540f6b] rounded-full flex-shrink-0 mx-2" ></div>
                        <span className="text-[#2c2c2c] text-sm md:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

   
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
