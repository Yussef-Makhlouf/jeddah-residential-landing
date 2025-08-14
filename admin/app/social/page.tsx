"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  MessageCircle, 
  Edit, 
  Save, 
  X,
  ExternalLink,
  Copy,
  Check,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
  Globe
} from "lucide-react"

interface SocialMedia {
  id: string
  platform: string
  url: string
  isActive: boolean
  icon: string
  color: string
  followers?: string
  lastPost?: string
}

export default function SocialPage() {
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([
    {
      id: "1",
      platform: "تيك توك",
      url: "https://www.tiktok.com/@rafgrope",
      isActive: true,
      icon: "TikTok",
      color: "bg-black",
      followers: "1.2K",
      lastPost: "منذ يومين"
    },
    {
      id: "2",
      platform: "سناب شات",
      url: "https://www.snapchat.com/add/rafgrope",
      isActive: true,
      icon: "Snapchat",
      color: "bg-yellow-500",
      followers: "500+",
      lastPost: "منذ 3 أيام"
    },
    {
      id: "3",
      platform: "إنستغرام",
      url: "https://www.instagram.com/rafgrope/",
      isActive: true,
      icon: "Instagram",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      followers: "2.5K",
      lastPost: "منذ ساعة"
    },
    {
      id: "4",
      platform: "تويتر",
      url: "https://x.com/Rafgrope",
      isActive: true,
      icon: "Twitter",
      color: "bg-blue-500",
      followers: "800+",
      lastPost: "منذ 5 ساعات"
    },
    {
      id: "5",
      platform: "فيسبوك",
      url: "https://www.facebook.com/rafgrope",
      isActive: false,
      icon: "Facebook",
      color: "bg-blue-600",
      followers: "1.5K",
      lastPost: "منذ أسبوع"
    },
    {
      id: "6",
      platform: "يوتيوب",
      url: "https://www.youtube.com/@rafgrope",
      isActive: false,
      icon: "Youtube",
      color: "bg-red-600",
      followers: "500+",
      lastPost: "منذ أسبوعين"
    }
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingSocial, setEditingSocial] = useState<SocialMedia | null>(null)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  const platformIcons = {
    TikTok: "🎵",
    Snapchat: "👻",
    Instagram: "📷",
    Twitter: "🐦",
    Facebook: "📘",
    Youtube: "📺",
    Linkedin: "💼"
  }

  const handleEdit = (social: SocialMedia) => {
    setEditingId(social.id)
    setEditingSocial({ ...social })
  }

  const handleSave = () => {
    if (editingSocial) {
      setSocialMedia(socialMedia.map(s => 
        s.id === editingSocial.id ? editingSocial : s
      ))
      setEditingId(null)
      setEditingSocial(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditingSocial(null)
  }

  const handleInputChange = (field: keyof SocialMedia, value: any) => {
    if (editingSocial) {
      setEditingSocial({ ...editingSocial, [field]: value })
    }
  }

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedUrl(url)
      setTimeout(() => setCopiedUrl(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const addSocialMedia = () => {
    const newSocial: SocialMedia = {
      id: Date.now().toString(),
      platform: "منصة جديدة",
      url: "",
      isActive: true,
      icon: "Globe",
      color: "bg-gray-500"
    }
    setSocialMedia([...socialMedia, newSocial])
  }

  const deleteSocialMedia = (id: string) => {
    setSocialMedia(socialMedia.filter(s => s.id !== id))
  }

  const activeSocialMedia = socialMedia.filter(s => s.isActive)
  const inactiveSocialMedia = socialMedia.filter(s => !s.isActive)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">إدارة وسائل التواصل الاجتماعي</h1>
        <p className="mt-2 text-gray-600">إدارة روابط وحسابات وسائل التواصل الاجتماعي</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{socialMedia.length}</p>
            <p className="text-sm text-gray-600">إجمالي المنصات</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{activeSocialMedia.length}</p>
            <p className="text-sm text-gray-600">المنصات النشطة</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">5.5K+</p>
            <p className="text-sm text-gray-600">إجمالي المتابعين</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">12</p>
            <p className="text-sm text-gray-600">المنشورات هذا الشهر</p>
          </div>
        </Card>
      </div>

      {/* Active Social Media */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">المنصات النشطة</h2>
          <Button onClick={addSocialMedia}>
            <MessageCircle className="w-4 h-4 ml-2" />
            إضافة منصة
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeSocialMedia.map((social) => (
            <Card key={social.id} className="p-4">
              {editingId === social.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">تعديل {social.platform}</h3>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 ml-1" />
                        حفظ
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancel}>
                        <X className="w-4 h-4 ml-1" />
                        إلغاء
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label>اسم المنصة</Label>
                      <Input
                        value={editingSocial?.platform || ""}
                        onChange={(e) => handleInputChange("platform", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>رابط الحساب</Label>
                      <Input
                        value={editingSocial?.url || ""}
                        onChange={(e) => handleInputChange("url", e.target.value)}
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <Label>عدد المتابعين</Label>
                      <Input
                        value={editingSocial?.followers || ""}
                        onChange={(e) => handleInputChange("followers", e.target.value)}
                        placeholder="مثال: 1.2K"
                      />
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        id={`active-${social.id}`}
                        checked={editingSocial?.isActive || false}
                        onChange={(e) => handleInputChange("isActive", e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor={`active-${social.id}`}>نشط</Label>
                    </div>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className={`w-10 h-10 ${social.color} rounded-lg flex items-center justify-center text-white`}>
                        <span className="text-lg">{platformIcons[social.icon as keyof typeof platformIcons] || "🌐"}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{social.platform}</h3>
                        {social.followers && (
                          <p className="text-sm text-gray-600">{social.followers} متابع</p>
                        )}
                      </div>
                    </div>
                    <Badge variant="default" className="bg-green-500">
                      نشط
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                      <Globe className="w-4 h-4" />
                      <span className="truncate">{social.url}</span>
                    </div>
                    {social.lastPost && (
                      <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                        <MessageCircle className="w-4 h-4" />
                        <span>آخر منشور: {social.lastPost}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm" onClick={() => handleEdit(social)}>
                        <Edit className="w-4 h-4 ml-1" />
                        تعديل
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(social.url)}
                      >
                        {copiedUrl === social.url ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(social.url, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteSocialMedia(social.id)}
                        className="text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </Card>

      {/* Inactive Social Media */}
      {inactiveSocialMedia.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">المنصات غير النشطة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inactiveSocialMedia.map((social) => (
              <Card key={social.id} className="p-4 opacity-60">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className={`w-10 h-10 ${social.color} rounded-lg flex items-center justify-center text-white`}>
                      <span className="text-lg">{platformIcons[social.icon as keyof typeof platformIcons] || "🌐"}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{social.platform}</h3>
                      {social.followers && (
                        <p className="text-sm text-gray-600">{social.followers} متابع</p>
                      )}
                    </div>
                  </div>
                  <Badge variant="secondary">غير نشط</Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                    <Globe className="w-4 h-4" />
                    <span className="truncate">{social.url}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button size="sm" onClick={() => handleEdit(social)}>
                    <Edit className="w-4 h-4 ml-1" />
                    تعديل
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(social.url, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="flex items-center space-x-2 space-x-reverse"
            onClick={() => {
              const message = encodeURIComponent("شاهد مشروع راف 25 في جدة - موقع إستراتيجي وتصميم عصري 🏠✨")
              window.open(`https://wa.me/?text=${message}`, "_blank")
            }}
          >
            <MessageCircle className="w-4 h-4" />
            <span>مشاركة عبر الواتساب</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center space-x-2 space-x-reverse"
            onClick={() => {
              const text = encodeURIComponent("مشروع راف 25 - جدة\nموقع إستراتيجي وتصميم عصري\nللحجز: 0536667967")
              window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
            }}
          >
            <Twitter className="w-4 h-4" />
            <span>مشاركة على تويتر</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center space-x-2 space-x-reverse"
            onClick={() => {
              const text = encodeURIComponent("مشروع راف 25 - جدة\nموقع إستراتيجي وتصميم عصري\nللحجز: 0536667967")
              window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${text}`, "_blank")
            }}
          >
            <Facebook className="w-4 h-4" />
            <span>مشاركة على فيسبوك</span>
          </Button>
        </div>
      </Card>

      {/* Analytics Preview */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">نظرة عامة على الأداء</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">1.2K</p>
            <p className="text-sm text-gray-600">تيك توك</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">2.5K</p>
            <p className="text-sm text-gray-600">إنستغرام</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">800+</p>
            <p className="text-sm text-gray-600">تويتر</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">500+</p>
            <p className="text-sm text-gray-600">سناب شات</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
