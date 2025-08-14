import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans_Arabic } from "next/font/google"
import "./globals.css"

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex-arabic",
})

export const metadata: Metadata = {
  title: "مشروع الزهراء السكني - جدة",
  description: "مشروع سكني متميز في حي الزهراء بجدة. أسعار تبدأ من 870,000 ريال. موقع إستراتيجي وتصميم عصري.",
  icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={`${ibmPlexSansArabic.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
