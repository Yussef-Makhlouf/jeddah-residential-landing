"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    notes: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        phone: "",
        notes: "",
      })
      onClose()
    }, 3000)
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[#e5e1dc]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e5e1dc]">
          <div>
            <h2 className="text-2xl font-bold text-[#540f6b]">أحجز و تملك الآن شقة العمر</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full w-10 h-10 p-0 hover:bg-[#f5f3f0]">
            <X className="w-5 h-5 text-[#6b7280]" />
          </Button>
        </div>

        {/* Success State */}
        {isSubmitted ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-[#c48765] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#ffffff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#540f6b] mb-2">تم إرسال طلبك بنجاح!</h3>
            <p className="text-[#6b7280]">سنتواصل معك قريباً لتأكيد موعد المعاينة</p>
          </div>
        ) : (
          /* Form */
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
                    placeholder="أدخل اسمك الكامل"
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
                placeholder="أي متطلبات خاصة أو أسئلة تود طرحها..."
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
        )}
      </div>
    </div>
  )
}
