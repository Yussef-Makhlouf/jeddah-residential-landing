"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Star, MessageCircle } from "lucide-react"
import Image from "next/image"

interface CleanHeroProps {
  onBookingClick: () => void
}

export function CleanHero({ onBookingClick }: CleanHeroProps) {

  const handleWhatsAppContact = () => {
    const message = `مرحباً، أريد الاستفسار عن مشروع راف 25`
    const whatsappUrl = `https://wa.me/966536667967?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className=" relative overflow-hidden">
      {/* Background Pattern Layer */}
      <div className="absolute inset-0 bg-[#540f6b] "></div>
      <div className="absolute inset-0 bg-[url('/banner1.png')] bg-cover bg-center bg-no-repeat opacity-55"></div>
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#b48ad6] via-[#d1b3e0] to-[#b48ad6] opacity-90"></div> */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#540f6b] via-[#6d1f7b] to-[#540f6b] opacity-90"></div> */}
      {/* Navigation */}
      <nav className="border-b border-white/20 relative z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white backdrop-blur-sm bg-white/10 px-4 py-2 rounded-lg">مشروع راف 25</div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content Side */}
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="space-y-4 backdrop-blur-md bg-white/10 p-8 rounded-2xl border border-white/20">
                <h1 className="text-2xl lg:text-4xl font-light text-white leading-tight flex flex-col space-y-2">
                  <span className="font-bold">حقق حلمك</span>
                  <span className="text-white font-bold">بتملك السكن المثالى</span>
                  <span className="text-xl text-white/90 font-light">في جدة - حي الزهراء</span>
                </h1>
              </div>

              {/* <div className="flex items-center space-x-3 space-x-reverse text-white/90 backdrop-blur-sm bg-white/10 px-4 py-3 rounded-lg">
                <MapPin className="w-5 h-5 text-white" />
                <span>موقع إستراتيجي وسط 3 شوارع رئيسية</span>
              </div> */}
            </div>

            {/* Price Card */}
            <div className="rounded-2xl p-8">
              <div className="space-y-4">
                <p className="text-white/80 mx-3 text-center lg:text-right">أسعار تبدأ من</p>
                {/* السعر في الوسط للشاشات الصغيرة، وعلى اليمين للشاشات الكبيرة */}
                <div className="flex items-center space-x-2 space-x-reverse justify-center lg:justify-start">
                  <span className="text-4xl font-bold text-white text-center lg:text-right">870,000</span>
                  <span className="text-2xl text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="200 200 600 600" width="32" height="32">
                      <path fill="#fff" d="M553.3,687.4c-7.8,17.2-12.9,35.9-14.9,55.5l164.4-35c7.8-17.2,12.9-35.9,14.9-55.5l-164.4,35Z"/>
                      <path fill="#fff" d="M702.8,603.3c7.8-17.2,12.9-35.9,14.9-55.5l-128.1,27.2v-52.4l113.2-24.1c7.8-17.2,12.9-35.9,14.9-55.5l-128.1,27.2v-188.3c-19.6,11-37.1,25.7-51.2,43v156.2l-51.2,10.9v-235.7c-19.6,11-37.1,25.7-51.2,43v203.6l-114.6,24.4c-7.8,17.2-12.9,35.9-14.9,55.5l129.5-27.5v66l-138.8,29.5c-7.8,17.2-12.9,35.9-14.9,55.5l145.3-30.9c11.8-2.5,22-9.5,28.6-19.1l26.6-39.5c2.8-4.1,4.4-9,4.4-14.3v-58.1l51.2-10.9v104.7l164.4-35Z"/>
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onBookingClick}
                size="lg"
                className="bg-white hover:bg-[#540f6b] text-[#540f6b] hover:text-white px-12 py-6 text-lg rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1 backdrop-blur-sm"
              >
                احجز وتملك الآن شقة العمر
              </Button>
            </div>
          </div>

          {/* Visual Side - Static Image */}
    
        </div>
      </div>
    </section>
  )
}
