"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Notification } from "@/components/ui/notification"
import { MapPin, Star, MessageCircle, User, Phone } from "lucide-react"
import Image from "next/image"
import { useSourceTracking } from "@/hooks/use-source-tracking"
import { generateWhatsAppUrl } from "@/lib/whatsapp-messages"
import { pushToDataLayer } from "@/lib/gtm"
import apiService from "@/lib/api-service"
import { HeroInfo } from "@/lib/website-data"
import { useProjectData } from "@/hooks/use-website-data"

interface CleanHeroProps {
  onBookingClick: () => void
}

interface FormData {
  name: string
  phone: string
  notes: string
}

interface FormErrors {
  [key: string]: string
}

export function CleanHero({ onBookingClick }: CleanHeroProps) {
  const { source, socialMedia } = useSourceTracking()
  const router = useRouter()
  const [heroInfo, setHeroInfo] = useState<HeroInfo | null>(null)
  const { projectData } = useProjectData()
  
  // Form states
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

  useEffect(() => {
    // Load hero data from API
    const loadHeroData = async () => {
      try {
        const data = await apiService.getHeroData()
        setHeroInfo(data)
      } catch (error) {
        console.error('Error loading hero data:', error)
        // Fallback to default values
        setHeroInfo({
          title: projectData?.name || "مشروع راف 25",
          subtitle: "بتملك السكن المثالى",
          location: "في جدة - حي الزهراء",
          startingPrice: "870,000",
          backgroundImage: "/banner1.png"
        })
      }
    }

    loadHeroData()

    // Google Tag Manager - DOM Ready event
    const platform = socialMedia || source || 'default'
    const eventData = {
      form_type: 'booking_form',
      traffic_source: platform,
      page: 'home',
      section: 'hero',
      timestamp: new Date().toISOString()
    }
    
    pushToDataLayer({
      event: 'form_submission',
      ...eventData
    });

    console.log(`📋 DOM Ready - form_submission event sent for platform: ${platform}`)
    console.log(`📊 GTM Event: form_submission (DOM Ready)`)
  }, [socialMedia, source])

  // Form validation
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

  // Handle form submission
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

      // Google Tag Manager
      const platform = socialMedia || source || 'default'
      const eventData = {
        form_type: 'booking_form',
        traffic_source: platform,
        phone_number: formData.phone,
        name: formData.name,
        notes: formData.notes,
        timestamp: new Date().toISOString()
      }
      
      pushToDataLayer({
        event: 'form_submission',
        ...eventData
      });

      console.log(`📋 Form submitted successfully`)
      console.log(`📞 Phone: ${formData.phone}, Name: ${formData.name || 'N/A'}`)
      console.log(`📊 GTM Event: form_submission sent to dataLayer`)

      // تأخير بسيط لضمان إرسال البيانات إلى GTM قبل التوجيه
      setTimeout(() => {
        // التوجه لصفحة الشكر مع منع العودة
        router.replace('/thank-you')
      }, 100)

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

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  // Scroll to form function
  const scrollToForm = () => {
    const formElement = document.getElementById('booking-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleWhatsAppContact = () => {
    const platform = socialMedia || source || 'default'
    const whatsappUrl = generateWhatsAppUrl(platform)
    window.open(whatsappUrl, "_blank")
  }

  if (!heroInfo) {
    return null // Loading state
  }

  return (
    <section className=" relative overflow-hidden">
      {/* Background Pattern Layer */}
      <div className="absolute inset-0 bg-[#540f6b] "></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-55"
        style={{ backgroundImage: `url(${heroInfo.backgroundImage})` }}
      ></div>
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#b48ad6] via-[#d1b3e0] to-[#b48ad6] opacity-90"></div> */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#540f6b] via-[#6d1f7b] to-[#540f6b] opacity-90"></div> */}
      {/* Navigation */}
      <nav className="border-b border-white/20 relative z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white backdrop-blur-sm bg-white/10 px-4 py-2 rounded-lg">{heroInfo.title}</div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content Side */}
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="space-y-4 backdrop-blur-md bg-white/10 p-8 rounded-2xl border border-white/20">
                <h1 className="text-2xl lg:text-4xl font-light text-white leading-tight flex flex-col space-y-2">
                  <span className="font-bold"> مشروع راف 25 </span>
                  <span className="text-white font-bold">{heroInfo.subtitle}</span>
                  <span className="text-xl text-white/90 font-light">{heroInfo.location}</span>
                  <span className="text-xl text-white/90 font-light">أسعار تبدأ من </span>
                     {/* السعر في الوسط للشاشات الصغيرة، وعلى اليمين للشاشات الكبيرة */}
                <div className="flex items-center space-x-2 space-x-reverse justify-center lg:justify-start">
                  <span className="text-4xl font-bold text-white text-center lg:text-right">{heroInfo.startingPrice}</span>
                  <span className="text-2xl text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="200 200 600 600" width="32" height="32">
                      <path fill="#fff" d="M553.3,687.4c-7.8,17.2-12.9,35.9-14.9,55.5l164.4-35c7.8-17.2,12.9-35.9,14.9-55.5l-164.4,35Z"/>
                      <path fill="#fff" d="M702.8,603.3c7.8-17.2,12.9-35.9,14.9-55.5l-128.1,27.2v-52.4l113.2-24.1c7.8-17.2,12.9-35.9,14.9-55.5l-128.1,27.2v-188.3c-19.6,11-37.1,25.7-51.2,43v156.2l-51.2,10.9v-235.7c-19.6,11-37.1,25.7-51.2,43v203.6l-114.6,24.4c-7.8,17.2-12.9,35.9-14.9,55.5l129.5-27.5v66l-138.8,29.5c-7.8,17.2-12.9,35.9-14.9,55.5l145.3-30.9c11.8-2.5,22-9.5,28.6-19.1l26.6-39.5c2.8-4.1,4.4-9,4.4-14.3v-58.1l51.2-10.9v104.7l164.4-35Z"/>
                    </svg>
                  </span>
                </div>
                </h1>
              </div>

              {/* <div className="flex items-center space-x-3 space-x-reverse text-white/90 backdrop-blur-sm bg-white/10 px-4 py-3 rounded-lg">
                <MapPin className="w-5 h-5 text-white" />
                <span>موقع إستراتيجي وسط 3 شوارع رئيسية</span>
              </div> */}
            </div>

            {/* Price Card */}
           {/* <div className="rounded-2xl p-8">
              <div className="space-y-4">
                <p className="text-white/80 mx-3 text-center lg:text-right">أسعار تبدأ من</p>
                <div className="flex items-center space-x-2 space-x-reverse justify-center lg:justify-start">
                  <span className="text-4xl font-bold text-white text-center lg:text-right">{heroInfo.startingPrice}</span>
                  <span className="text-2xl text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="200 200 600 600" width="32" height="32">
                      <path fill="#fff" d="M553.3,687.4c-7.8,17.2-12.9,35.9-14.9,55.5l164.4-35c7.8-17.2,12.9-35.9,14.9-55.5l-164.4,35Z"/>
                      <path fill="#fff" d="M702.8,603.3c7.8-17.2,12.9-35.9,14.9-55.5l-128.1,27.2v-52.4l113.2-24.1c7.8-17.2,12.9-35.9,14.9-55.5l-128.1,27.2v-188.3c-19.6,11-37.1,25.7-51.2,43v156.2l-51.2,10.9v-235.7c-19.6,11-37.1,25.7-51.2,43v203.6l-114.6,24.4c-7.8,17.2-12.9,35.9-14.9,55.5l129.5-27.5v66l-138.8,29.5c-7.8,17.2-12.9,35.9-14.9,55.5l145.3-30.9c11.8-2.5,22-9.5,28.6-19.1l26.6-39.5c2.8-4.1,4.4-9,4.4-14.3v-58.1l51.2-10.9v104.7l164.4-35Z"/>
                    </svg>
                  </span>
                </div>
              </div>
            </div>  */}

            {/* CTA Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToForm}
                size="lg"
                className="bg-white hover:bg-[#540f6b] text-[#540f6b] hover:text-white px-12 py-6 text-lg rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1 backdrop-blur-sm"
              >
                احجز وتملك الآن شقة العمر
              </Button>
            </div> */}
          </div>

          {/* Visual Side - Static Image */}
    
        </div>
      </div>

      {/* Booking Form Section */}
      <div id="booking-form" className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-[#540f6b] to-[#6d1f7b] p-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">احجز وتملك الآن شقة العمر</h2>
              <p className="text-white/90">املأ البيانات أدناه وسنتواصل معك خلال 24 ساعة</p>
            </div>

            {/* Form Content */}
            <form 
              onSubmit={handleSubmit} 
              className="p-6 space-y-6"
              data-gtm-form="booking-form"
              data-gtm-source={socialMedia || source || 'direct'}
              id="booking-form-element"
            >
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-[#2c2c2c] my-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    الاسم الكامل (اختياري)
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`mt-1 border-[#e5e1dc] focus:border-[#540f6b] focus:ring-[#540f6b] ${errors.name ? "border-red-500" : ""}`}
                    placeholder="أدخل اسمك"
                    data-gtm-field="name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-[#2c2c2c] my-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    رقم الجوال *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`mt-1 border-[#e5e1dc] focus:border-[#540f6b] focus:ring-[#540f6b] ${errors.phone ? "border-red-500" : ""}`}
                    placeholder="05xxxxxxxx"
                    dir="ltr"
                    data-gtm-field="phone"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <Label htmlFor="notes" className="text-[#2c2c2c] my-2">
                  ملاحظات إضافية (اختياري)
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="mt-1 border-[#e5e1dc] focus:border-[#540f6b] focus:ring-[#540f6b]"
                  placeholder="أترك ملاحظاتك هنا"
                  rows={3}
                  data-gtm-field="notes"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#540f6b] hover:bg-[#6d1f7b] text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1"
                  data-gtm-button="submit-booking"
                >
                  {isSubmitting ? "جاري الإرسال..." : " تواصل مع مستشار المبيعات"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Notification */}
      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
      />
    </section>
  )
}
