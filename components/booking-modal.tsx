"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Notification } from "@/components/ui/notification"
import { useSourceTracking } from "@/hooks/use-source-tracking"
import { pushToDataLayer } from "@/lib/gtm"
import { X, User, Calendar, Home } from "lucide-react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  name: string
  phone: string

  notes: string
}

interface FormErrors {
  [key: string]: string
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { source, socialMedia } = useSourceTracking()
  const router = useRouter()
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    notes: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info'
    message: string
    isVisible: boolean
  }>({
    type: 'info',
    message: '',
    isVisible: false
  })

  // Advanced validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation (optional)
    if (formData.name.trim() && formData.name.trim().length < 2) {
      newErrors.name = "الاسم يجب أن يكون أكثر من حرفين"
    }

    // Phone validation (Saudi format) - required
    const phoneRegex = /^(05|5)[0-9]{8}$/
    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الجوال مطلوب"
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "رقم الجوال غير صحيح (مثال: 0501234567)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source,
          socialMedia
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'حدث خطأ أثناء إرسال الطلب')
      }

      setIsSubmitting(false)

      // تتبع GTM - Google Tag Manager
      const platform = socialMedia || source || 'default'
      pushToDataLayer({
        event: 'form_submission',
        form_type: 'booking_form',
        traffic_source: platform,
        phone_number: formData.phone,
        name: formData.name,
        notes: formData.notes,
        timestamp: new Date().toISOString()
        
      })
      
      console.log(`📋 Form submitted from ${platform}`)
      console.log(`📊 GTM Tracking: form_submit and generate_lead events sent`)

      // إغلاق المودال والتوجه لصفحة الشكر
      onClose()
      
      // التوجه لصفحة الشكر مع منع العودة
      router.replace('/thank-you')

    } catch (error) {
      console.error('خطأ في إرسال الطلب:', error)
      setIsSubmitting(false)
      
      setNotification({
        type: 'error',
        message: 'حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى',
        isVisible: true
      })
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (!isOpen) return null

  return (
    <>
      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
      />
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[#e5e1dc]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e5e1dc]">
          <div>
            <h2 className="text-2xl font-bold text-[#540f6b]">احجز وتملك الآن شقة العمر</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full w-10 h-10 p-0 hover:bg-[#f5f3f0]">
            <X className="w-5 h-5 text-[#6b7280]" />
          </Button>
        </div>

        {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
         


              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-[#2c2c2c] my-2">
                    الاسم الكامل (اختياري)
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`mt-1 border-[#e5e1dc] focus:border-[#540f6b] focus:ring-[#540f6b] ${errors.name ? "border-red-500" : ""}`}
                    placeholder="أدخل اسمك "
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-[#2c2c2c] my-2">
                    رقم الجوال *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`mt-1 border-[#e5e1dc] focus:border-[#540f6b] focus:ring-[#540f6b] ${errors.phone ? "border-red-500" : ""}`}
                    placeholder="05xxxxxxxx"
                    dir="ltr"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>


            </div>

            {/* Additional Notes */}
            <div>
              <Label htmlFor="notes" className="text-[#2c2c2c] my-2">
                ملاحظات إضافية (اختياري)
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="mt-1 border-[#e5e1dc] focus:border-[#540f6b] focus:ring-[#540f6b]"
                placeholder="أترك ملاحظاتك هنا"
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#540f6b] hover:bg-[#6d1f7b] text-white px-8 py-3 rounded-xl flex-1 transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1"
              >
                {isSubmitting ? "جاري الإرسال..." : "تأكيد الحجز"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-[#c48765] text-[#c48765]  hover:text-[#c48765] px-8 py-3 rounded-xl bg-transparent transition-all duration-300"
              >
                إلغاء
              </Button>
            </div>
          </form>
      </div>
    </div>
    </>
  )
}
