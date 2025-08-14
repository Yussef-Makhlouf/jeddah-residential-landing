"use client"

import { useSourceTracking } from "@/hooks/use-source-tracking"
import { Facebook, Instagram, Twitter, Linkedin, Youtube, MessageCircle } from "lucide-react"

export function SourceIndicator() {
  const { source, socialMedia } = useSourceTracking()

  if (!socialMedia) return null

  const getIcon = () => {
    switch (socialMedia.toLowerCase()) {
      case 'facebook':
        return <Facebook className="w-4 h-4" />
      case 'instagram':
        return <Instagram className="w-4 h-4" />
      case 'twitter':
      case 'twitter/x':
        return <Twitter className="w-4 h-4" />
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />
      case 'youtube':
        return <Youtube className="w-4 h-4" />
      default:
        return <MessageCircle className="w-4 h-4" />
    }
  }

  const getColor = () => {
    switch (socialMedia.toLowerCase()) {
      case 'facebook':
        return 'bg-blue-500'
      case 'instagram':
        return 'bg-gradient-to-r from-purple-500 to-pink-500'
      case 'twitter':
      case 'twitter/x':
        return 'bg-black'
      case 'linkedin':
        return 'bg-blue-600'
      case 'youtube':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className={`${getColor()} text-white px-3 py-2 rounded-full shadow-lg flex items-center space-x-2 space-x-reverse text-sm`}>
        {getIcon()}
        <span>أتيت من {socialMedia}</span>
      </div>
    </div>
  )
}
