"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Settings, 
  Save, 
  Edit,
  Globe,
  Building2,
  MapPin,
  FileText
} from "lucide-react"

interface SiteSettings {
  siteTitle: string
  siteDescription: string
  projectName: string
  projectLocation: string
  startingPrice: string
  currency: string
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  aboutTitle: string
  aboutDescription: string
  featuresTitle: string
  featuresDescription: string
  contactTitle: string
  contactDescription: string
  footerText: string
  licenseNumber: string
  unifiedNumber: string
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteTitle: "مشروع راف 25 - جدة",
    siteDescription: "مشروع سكني متميز في حي الزهراء بجدة. أسعار تبدأ من 870,000 ريال. موقع إستراتيجي وتصميم عصري.",
    projectName: "مشروع راف 25",
    projectLocation: "حي الزهراء، جدة",
    startingPrice: "870,000",
    currency: "ريال",
    heroTitle: "حقق حلمك بتملك السكن المثالي",
    heroSubtitle: "في جدة - حي الزهراء",
    heroDescription: "مشروع سكني متميز في موقع إستراتيجي مع تصميم عصري ومرافق متكاملة",
    aboutTitle: "مشروع راف 25",
    aboutDescription: "مشروع سكني فاخر في قلب جدة، يوفر نمط حياة عصري مع كل وسائل الراحة والرفاهية",
    featuresTitle: "مميزات المشروع",
    featuresDescription: "يتميز المشروع بموقع إستراتيجي وتصميم عصري ومرافق متكاملة",
    contactTitle: "تواصل معنا",
    contactDescription: "نحن هنا لمساعدتك في تحقيق حلمك بتملك السكن المثالي",
    footerText: "مشروع راف 25 - جميع الحقوق محفوظة © 2025",
    licenseNumber: "I20002693",
    unifiedNumber: "920031103"
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editingSettings, setEditingSettings] = useState<SiteSettings>(settings)

  const handleEdit = () => {
    setEditingSettings({ ...settings })
    setIsEditing(true)
  }

  const handleSave = () => {
    setSettings(editingSettings)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditingSettings(settings)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof SiteSettings, value: string) => {
    setEditingSettings({ ...editingSettings, [field]: value })
  }

  const currentSettings = isEditing ? editingSettings : settings

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">إعدادات الموقع</h1>
        <p className="mt-2 text-gray-600">تعديل العناوين والمحتوى العام للموقع</p>
      </div>

      {/* General Settings */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">الإعدادات العامة</h2>
          {!isEditing && (
            <Button onClick={handleEdit}>
              <Edit className="w-4 h-4 ml-1" />
              تعديل
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>عنوان الموقع</Label>
            <Input
              value={currentSettings.siteTitle}
              onChange={(e) => handleInputChange("siteTitle", e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div>
            <Label>وصف الموقع</Label>
            <Input
              value={currentSettings.siteDescription}
              onChange={(e) => handleInputChange("siteDescription", e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div>
            <Label>اسم المشروع</Label>
            <Input
              value={currentSettings.projectName}
              onChange={(e) => handleInputChange("projectName", e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div>
            <Label>موقع المشروع</Label>
            <Input
              value={currentSettings.projectLocation}
              onChange={(e) => handleInputChange("projectLocation", e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div>
            <Label>السعر الابتدائي</Label>
            <Input
              value={currentSettings.startingPrice}
              onChange={(e) => handleInputChange("startingPrice", e.target.value)}
              disabled={!isEditing}
              dir="ltr"
            />
          </div>

          <div>
            <Label>العملة</Label>
            <Input
              value={currentSettings.currency}
              onChange={(e) => handleInputChange("currency", e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex space-x-2 space-x-reverse mt-4">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 ml-1" />
              حفظ
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              إلغاء
            </Button>
          </div>
        )}
      </Card>

      {/* Hero Section Settings */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">إعدادات القسم الرئيسي</h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label>العنوان الرئيسي</Label>
            <Input
              value={currentSettings.heroTitle}
              onChange={(e) => handleInputChange("heroTitle", e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div>
            <Label>العنوان الفرعي</Label>
            <Input
              value={currentSettings.heroSubtitle}
              onChange={(e) => handleInputChange("heroSubtitle", e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div>
            <Label>وصف القسم الرئيسي</Label>
            <Textarea
              value={currentSettings.heroDescription}
              onChange={(e) => handleInputChange("heroDescription", e.target.value)}
              disabled={!isEditing}
              rows={3}
            />
          </div>
        </div>
      </Card>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* About Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">قسم من نحن</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label>عنوان القسم</Label>
              <Input
                value={currentSettings.aboutTitle}
                onChange={(e) => handleInputChange("aboutTitle", e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div>
              <Label>وصف القسم</Label>
              <Textarea
                value={currentSettings.aboutDescription}
                onChange={(e) => handleInputChange("aboutDescription", e.target.value)}
                disabled={!isEditing}
                rows={4}
              />
            </div>
          </div>
        </Card>

        {/* Features Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">قسم المميزات</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label>عنوان القسم</Label>
              <Input
                value={currentSettings.featuresTitle}
                onChange={(e) => handleInputChange("featuresTitle", e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div>
              <Label>وصف القسم</Label>
              <Textarea
                value={currentSettings.featuresDescription}
                onChange={(e) => handleInputChange("featuresDescription", e.target.value)}
                disabled={!isEditing}
                rows={4}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Contact & Footer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">قسم التواصل</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label>عنوان القسم</Label>
              <Input
                value={currentSettings.contactTitle}
                onChange={(e) => handleInputChange("contactTitle", e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div>
              <Label>وصف القسم</Label>
              <Textarea
                value={currentSettings.contactDescription}
                onChange={(e) => handleInputChange("contactDescription", e.target.value)}
                disabled={!isEditing}
                rows={3}
              />
            </div>
          </div>
        </Card>

        {/* Footer Settings */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">إعدادات التذييل</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label>نص التذييل</Label>
              <Input
                value={currentSettings.footerText}
                onChange={(e) => handleInputChange("footerText", e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div>
              <Label>رقم الترخيص</Label>
              <Input
                value={currentSettings.licenseNumber}
                onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                disabled={!isEditing}
                dir="ltr"
              />
            </div>

            <div>
              <Label>الرقم الموحد</Label>
              <Input
                value={currentSettings.unifiedNumber}
                onChange={(e) => handleInputChange("unifiedNumber", e.target.value)}
                disabled={!isEditing}
                dir="ltr"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Preview */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">معاينة الإعدادات</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-2">
            <p><strong>عنوان الموقع:</strong> {currentSettings.siteTitle}</p>
            <p><strong>وصف الموقع:</strong> {currentSettings.siteDescription}</p>
            <p><strong>اسم المشروع:</strong> {currentSettings.projectName}</p>
            <p><strong>الموقع:</strong> {currentSettings.projectLocation}</p>
            <p><strong>السعر الابتدائي:</strong> {currentSettings.startingPrice} {currentSettings.currency}</p>
            <p><strong>العنوان الرئيسي:</strong> {currentSettings.heroTitle}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
