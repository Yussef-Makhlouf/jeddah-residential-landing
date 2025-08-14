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
import { SocialMediaBadge } from "@/components/social-media-badge"

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#efedea]" dir="rtl">
      <SocialMediaBadge />
      <CleanHero onBookingClick={() => setIsBookingModalOpen(true)} />
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
