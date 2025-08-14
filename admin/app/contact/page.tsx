"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Save, 
  Edit,
  Copy,
  Check
} from "lucide-react"

interface ContactInfo {
  phone: string
  whatsapp: string
  email: string
  address: string
  workingHours: string
  emergencyContact: string
  salesContact: string
  supportMessage: string
}

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: "0536667967",
    whatsapp: "966536667967",
    email: "info@raf25.com",
    address: "حي الزهراء، جدة، المملكة العربية السعودية",
    workingHours: "الأحد - الخميس: 8:00 ص - 6:00 م | الجمعة - السبت: 9:00 ص - 5:00 م",
    emergencyContact: "0536667967",
    salesContact: "0536667967",
    supportMessage: "مرحباً، أريد الاستفسار عن مشروع راف 25"
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editingInfo, setEditingInfo] = useState<ContactInfo>(contactInfo)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleEdit = () => {
    setEditingInfo({ ...contactInfo })
    setIsEditing(true)
  }

  const handleSave = () => {
    setContactInfo(editingInfo)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditingInfo(contactInfo)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof ContactInfo, value: string) => {
    setEditingInfo({ ...editingInfo, [field]: value })
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const currentInfo = isEditing ? editingInfo : contactInfo

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">معلومات التواصل</h1>
        <p className="mt-2 text-gray-600">تعديل معلومات التواصل والاتصال</p>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Phone & WhatsApp */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">أرقام التواصل</h2>
            {!isEditing && (
              <Button size="sm" onClick={handleEdit}>
                <Edit className="w-4 h-4 ml-1" />
                تعديل
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Label>رقم الهاتف الرئيسي</Label>
              <div className="flex items-center space-x-2 space-x-reverse mt-1">
                <Input
                  value={currentInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing}
                  dir="ltr"
                />
                {!isEditing && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(currentInfo.phone, "phone")}
                  >
                    {copiedField === "phone" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                )}
              </div>
            </div>

            <div>
              <Label>رقم الواتساب</Label>
              <div className="flex items-center space-x-2 space-x-reverse mt-1">
                <Input
                  value={currentInfo.whatsapp}
                  onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                  disabled={!isEditing}
                  dir="ltr"
                />
                {!isEditing && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(currentInfo.whatsapp, "whatsapp")}
                  >
                    {copiedField === "whatsapp" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                )}
              </div>
            </div>

            <div>
              <Label>البريد الإلكتروني</Label>
              <div className="flex items-center space-x-2 space-x-reverse mt-1">
                <Input
                  value={currentInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                  dir="ltr"
                />
                {!isEditing && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(currentInfo.email, "email")}
                  >
                    {copiedField === "email" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                )}
              </div>
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

        {/* Address & Hours */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">العنوان وساعات العمل</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label>العنوان</Label>
              <Textarea
                value={currentInfo.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                disabled={!isEditing}
                rows={3}
              />
            </div>

            <div>
              <Label>ساعات العمل</Label>
              <Textarea
                value={currentInfo.workingHours}
                onChange={(e) => handleInputChange("workingHours", e.target.value)}
                disabled={!isEditing}
                rows={3}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Contacts */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">معلومات إضافية</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>رقم الطوارئ</Label>
            <div className="flex items-center space-x-2 space-x-reverse mt-1">
              <Input
                value={currentInfo.emergencyContact}
                onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                disabled={!isEditing}
                dir="ltr"
              />
              {!isEditing && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(currentInfo.emergencyContact, "emergency")}
                >
                  {copiedField === "emergency" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              )}
            </div>
          </div>

          <div>
            <Label>رقم المبيعات</Label>
            <div className="flex items-center space-x-2 space-x-reverse mt-1">
              <Input
                value={currentInfo.salesContact}
                onChange={(e) => handleInputChange("salesContact", e.target.value)}
                disabled={!isEditing}
                dir="ltr"
              />
              {!isEditing && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(currentInfo.salesContact, "sales")}
                >
                  {copiedField === "sales" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Label>رسالة الواتساب الافتراضية</Label>
          <Textarea
            value={currentInfo.supportMessage}
            onChange={(e) => handleInputChange("supportMessage", e.target.value)}
            disabled={!isEditing}
            rows={3}
            placeholder="رسالة تلقائية تظهر عند الضغط على زر الواتساب"
          />
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="flex items-center space-x-2 space-x-reverse"
            onClick={() => window.open(`tel:${contactInfo.phone}`, "_self")}
          >
            <Phone className="w-4 h-4" />
            <span>اتصال مباشر</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center space-x-2 space-x-reverse"
            onClick={() => {
              const message = encodeURIComponent(contactInfo.supportMessage)
              window.open(`https://wa.me/${contactInfo.whatsapp}?text=${message}`, "_blank")
            }}
          >
            <MessageCircle className="w-4 h-4" />
            <span>واتساب مباشر</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center space-x-2 space-x-reverse"
            onClick={() => window.open(`mailto:${contactInfo.email}`, "_blank")}
          >
            <Mail className="w-4 h-4" />
            <span>إرسال بريد</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}
