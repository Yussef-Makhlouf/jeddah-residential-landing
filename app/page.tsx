"use client"

import { useState } from "react"
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

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#efedea]" dir="rtl">
      <CleanHero onBookingClick={() => setIsBookingModalOpen(true)} />
      
      {/* Image Carousel Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#540f6b] mb-4">معرض الصور</h2>
          </div>
          <ImageCarousel 
            images={[
              { src: "/banner.png", alt: "مشروع الزهراء السكني" },
              { src: "/banner1.png", alt: "مشروع الزهراء السكني" },
              { src: "/banner2.png", alt: "مشروع الزهراء السكني" },
              { src: "/banner3.jpg", alt: "مشروع الزهراء السكني" },
              { src: "/banner4.jpg", alt: "مشروع الزهراء السكني" },
              { src: "/banner5.jpg", alt: "مشروع الزهراء السكني" },
            ]}
            className="max-w-4xl mx-auto"
          />
        </div>
      </section>
      
      <ApartmentShowcase onBookingClick={() => setIsBookingModalOpen(true)} />
      <StrategicFeatures />
      <ProjectHighlights />
      <LocationAdvantages />
      {/* <TrustIndicators /> */}
      <Footer />
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
      <FloatingButtons onBookingClick={() => setIsBookingModalOpen(true)} />
    </div>
  )
}
