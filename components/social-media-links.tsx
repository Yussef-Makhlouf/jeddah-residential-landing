"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { generateSocialMediaUrl, SOCIAL_MEDIA_PLATFORMS, type SocialPlatform } from '@/lib/tracking'
import { Badge } from '@/components/ui/badge'

export const SocialMediaLinks = () => {
  const [campaign, setCampaign] = useState('')
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null)
  const [useExtensions, setUseExtensions] = useState(true)

  const handleCopyLink = async (platform: SocialPlatform) => {
    const url = generateSocialMediaUrl(platform, campaign || undefined, useExtensions)
    
    try {
      await navigator.clipboard.writeText(url)
      setCopiedPlatform(platform)
      setTimeout(() => setCopiedPlatform(null), 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  const getPlatformInfo = (platform: SocialPlatform) => {
    const platformInfo: Record<SocialPlatform, { name: string; icon: string; color: string }> = {
      [SOCIAL_MEDIA_PLATFORMS.FACEBOOK]: { name: 'فيسبوك', icon: '📘', color: 'bg-blue-500' },
      [SOCIAL_MEDIA_PLATFORMS.INSTAGRAM]: { name: 'إنستغرام', icon: '📷', color: 'bg-pink-500' },
      [SOCIAL_MEDIA_PLATFORMS.TWITTER]: { name: 'تويتر', icon: '🐦', color: 'bg-sky-500' },
      [SOCIAL_MEDIA_PLATFORMS.TIKTOK]: { name: 'تيك توك', icon: '🎵', color: 'bg-black' },
      [SOCIAL_MEDIA_PLATFORMS.SNAPCHAT]: { name: 'سناب شات', icon: '👻', color: 'bg-yellow-500' },
      [SOCIAL_MEDIA_PLATFORMS.META]: { name: 'ميتا', icon: '🌐', color: 'bg-blue-500' },
      [SOCIAL_MEDIA_PLATFORMS.GOOGLE]: { name: 'جوجل', icon: '🔍', color: 'bg-red-500' },
      [SOCIAL_MEDIA_PLATFORMS.WHATSAPP]: { name: 'واتساب', icon: '📱', color: 'bg-green-500' }
    }
    
    return platformInfo[platform]
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">روابط وسائل التواصل الاجتماعي للتتبع</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="campaign">اسم الحملة (اختياري)</Label>
          <Input
            id="campaign"
            value={campaign}
            onChange={(e) => setCampaign(e.target.value)}
            placeholder="مثال: حملة_الربيع_2024"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2 space-x-reverse">
            <input
              type="checkbox"
              id="useExtensions"
              checked={useExtensions}
              onChange={(e) => setUseExtensions(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="useExtensions">استخدام امتدادات مختصرة (fb, ig, tw, tt, sc)</Label>
          </div>
        </div>
        
        <div className="grid gap-3">
          {Object.values(SOCIAL_MEDIA_PLATFORMS).map((platform) => {
            const info = getPlatformInfo(platform)
            const isCopied = copiedPlatform === platform
            
            return (
              <div key={platform} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Badge className={`${info.color} text-white`}>
                    {info.icon} {info.name}
                  </Badge>
                                     <span className="text-sm text-gray-600">
                     {generateSocialMediaUrl(platform, campaign || undefined, useExtensions)}
                   </span>
                </div>
                <Button
                  variant={isCopied ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCopyLink(platform)}
                >
                  {isCopied ? 'تم النسخ!' : 'نسخ الرابط'}
                </Button>
              </div>
            )
          })}
        </div>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            استخدم هذه الروابط في منشورات وسائل التواصل الاجتماعي لتتبع الزيارات
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
