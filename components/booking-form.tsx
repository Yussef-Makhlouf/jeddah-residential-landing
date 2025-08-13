"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, User, Phone, Mail, MapPin } from "lucide-react"

export function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    model: "",
    visitDate: "",
    visitTime: "",
    message: "",
    agreeToTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">احجز موعد المعاينة</h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            احجز موعداً لمعاينة النموذج الذي يناسبك واكتشف منزل أحلامك
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Booking Form */}
          <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">نموذج الحجز</CardTitle>
              <p className="text-gray-600">املأ البيانات التالية وسنتواصل معك خلال 24 ساعة</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <User className="w-5 h-5 ml-2 text-blue-600" />
                    البيانات الشخصية
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="أدخل اسمك الكامل"
                        required
                        className="text-right"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الجوال *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="05xxxxxxxx"
                        required
                        className="text-right"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@email.com"
                      className="text-right"
                    />
                  </div>
                </div>

                {/* Visit Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Calendar className="w-5 h-5 ml-2 text-blue-600" />
                    تفاصيل الزيارة
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="model">النموذج المطلوب معاينته *</Label>
                    <Select
                      value={formData.model}
                      onValueChange={(value) => setFormData({ ...formData, model: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر النموذج" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">نموذج A - واجهة أمامية (890,000 ﷼)</SelectItem>
                        <SelectItem value="B">نموذج B - واجهة خلفية (870,000 ﷼)</SelectItem>
                        <SelectItem value="C">نموذج C - واجهة خلفية (870,000 ﷼)</SelectItem>
                        <SelectItem value="D">نموذج D - واجهة أمامية (890,000 ﷼)</SelectItem>
                        <SelectItem value="all">جميع النماذج</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="visitDate">تاريخ الزيارة المفضل *</Label>
                      <Input
                        id="visitDate"
                        type="date"
                        value={formData.visitDate}
                        onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                        required
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="visitTime">الوقت المفضل *</Label>
                      <Select
                        value={formData.visitTime}
                        onValueChange={(value) => setFormData({ ...formData, visitTime: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الوقت" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">صباحاً (9:00 - 12:00)</SelectItem>
                          <SelectItem value="afternoon">بعد الظهر (2:00 - 5:00)</SelectItem>
                          <SelectItem value="evening">مساءً (6:00 - 8:00)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Additional Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">ملاحظات إضافية</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="أي متطلبات خاصة أو أسئلة تود طرحها..."
                    rows={4}
                    className="text-right"
                  />
                </div>

                {/* Terms Agreement */}
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-600">
                    أوافق على <span className="text-blue-600 underline cursor-pointer">الشروط والأحكام</span> و
                    <span className="text-blue-600 underline cursor-pointer"> سياسة الخصوصية</span>
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 text-lg"
                  disabled={!formData.agreeToTerms}
                >
                  <Calendar className="w-5 h-5 ml-2" />
                  تأكيد الحجز
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information & Benefits */}
          <div className="space-y-8">
            {/* Contact Card */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold mb-4">تواصل معنا مباشرة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">اتصل بنا</div>
                    <div className="text-blue-200">+966 50 123 4567</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">البريد الإلكتروني</div>
                    <div className="text-blue-200">info@alzahra-project.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">موقع المشروع</div>
                    <div className="text-blue-200">جدة - حي الزهراء</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits Card */}
            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md border-green-500/30 text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold mb-4">مميزات الحجز المبكر</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>خصم خاص للحجز المبكر</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>أولوية في اختيار الموقع</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>استشارة مجانية مع المهندس</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>مرونة في خطط السداد</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
