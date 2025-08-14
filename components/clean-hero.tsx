"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Star, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

interface CleanHeroProps {
  onBookingClick: () => void
}

export function CleanHero({ onBookingClick }: CleanHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Array of images for the carousel
  const images = [
    { src: "/banner.png", alt: "مشروع الزهراء السكني" },
    { src: "/banner1.png", alt: "مشروع الزهراء السكني" },
    { src: "/banner2.png", alt: "مشروع الزهراء السكني" },
    { src: "/banner3.jpg", alt: "مشروع الزهراء السكني" },
    { src: "/banner4.jpg", alt: "مشروع الزهراء السكني" },
    { src: "/banner5.jpg", alt: "مشروع الزهراء السكني" },


  ]

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [images.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const handleWhatsAppContact = () => {
    const message = `مرحباً، أريد الاستفسار عن مشروع راف 25`
    const whatsappUrl = `https://wa.me/966536667967?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className=" relative overflow-hidden">
      {/* Background Pattern Layer */}
      <div className="absolute inset-0 bg-[#540f6b] "></div>
      <div className="absolute inset-0 bg-[url('/banner1.png')] bg-cover bg-center bg-no-repeat opacity-50"></div>
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

          {/* Visual Side - Carousel */}
          <div className="relative">
            <div className="backdrop-blur-md bg-white/20 rounded-3xl overflow-hidden shadow-elegant-lg border border-white/20">
              {/* Carousel Container */}
              <div className="relative w-full h-[600px] overflow-hidden">
                {/* Images */}
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={image?.src}
                      alt={image?.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 backdrop-blur-md bg-white/20 hover:bg-white/30 text-[#540f6b] p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10 border border-white/20"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 backdrop-blur-md bg-white/20 hover:bg-white/30 text-[#540f6b] p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10 border border-white/20"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 space-x-reverse z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 backdrop-blur-sm ${
                        index === currentSlide
                          ? 'bg-[#540f6b] scale-125'
                          : 'bg-[#540f6b]text-white'
                      }`}
                      aria-label={`Go to slide ${index + 1}`} dir="ltr"
                    />
                  ))}
                </div>

                {/* Slide Counter */}
                <div className="absolute top-4 right-4 backdrop-blur-md bg-black/30 text-[#540f6b] px-3 py-1 rounded-full text-sm z-10 border border-white/20">
                  {currentSlide + 1} / {images.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
