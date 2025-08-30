"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import apiService from "@/lib/api-service"
import { ImageCarouselInfo } from "@/lib/website-data"

interface Image {
  src: string
  alt: string
}

interface ImageCarouselProps {
  className?: string
}

export const ImageCarousel = ({ className = "" }: ImageCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [carouselInfo, setCarouselInfo] = useState<ImageCarouselInfo | null>(null)

  useEffect(() => {
    const loadCarouselData = async () => {
      try {
        const data = await apiService.getImageCarouselData()
        setCarouselInfo(data)
      } catch (error) {
        console.error('Error loading image carousel data:', error)
        // Fallback to default images
        setCarouselInfo({
          title: "معرض الصور",
          subtitle: " ",
          images: [
            { src: "/banner.png", alt: "مشروع الزهراء السكني", title: "مشروع راف 25" },
            { src: "/banner1.png", alt: "مشروع الزهراء السكني", title: "مشروع راف 25" },
            { src: "/banner2.png", alt: "مشروع الزهراء السكني", title: "مشروع راف 25" }
          ]
        })
      }
    }

    loadCarouselData()
  }, [])


  // Auto-advance slides - moved before conditional return
  useEffect(() => {
    if (!carouselInfo || !carouselInfo.images || carouselInfo.images.length === 0) {
      return
    }
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselInfo.images.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [carouselInfo])

  if (!carouselInfo || !carouselInfo.images || carouselInfo.images.length === 0) {
    return null
  }

  const images = carouselInfo.images

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className={`relative ${className}`}>
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
                aria-label={`Go to slide ${index + 1}`}
                dir="ltr"
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
  )
}
