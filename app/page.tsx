"use client"

import { useState, useEffect } from "react"
import { CleanHero } from "@/components/clean-hero"
import { ApartmentShowcase } from "@/components/apartment-showcase"
import { StrategicFeatures } from "@/components/strategic-features"
import { ProjectHighlights } from "@/components/project-highlights"
import { LocationAdvantages } from "@/components/location-advantages"
// import { TrustIndicators } from "@/components/trust-indicators"
import { BookingModal } from "@/components/booking-modal"
import { FloatingButtons } from "@/components/floating-buttons"
import { Footer } from "@/components/footer"
import { ImageCarousel } from "@/components/image-carousel"
import { useImageCarouselData, useDynamicProjectData } from "@/hooks/use-website-data"

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const { carouselData, isLoading } = useImageCarouselData()
  const { getImageCarouselSubtitle } = useDynamicProjectData()

  // Function to scroll to booking form in CleanHero
  const scrollToBookingForm = () => {
    const formElement = document.getElementById('booking-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-[#efedea]" dir="rtl">
      <CleanHero onBookingClick={scrollToBookingForm} />
      
      {/* Image Carousel Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#540f6b] mb-4">
              {carouselData?.title || "معرض الصور"}
            </h2>
            <p className="text-lg text-[#6b7280]">
              {carouselData?.subtitle || getImageCarouselSubtitle()}
            </p>
          </div>
          {!isLoading && (
            <ImageCarousel 
              className="max-w-4xl mx-auto"
            />
          )}
        </div>
      </section>
      
      <ApartmentShowcase onBookingClick={scrollToBookingForm} />
      <StrategicFeatures />
      <ProjectHighlights />

      <LocationAdvantages />
      {/* <TrustIndicators /> */}
      <Footer />
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
      <FloatingButtons onBookingClick={scrollToBookingForm} />
    </div>
  )
}
