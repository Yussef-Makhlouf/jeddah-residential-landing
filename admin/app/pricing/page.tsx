"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  DollarSign, 
  Edit, 
  Save, 
  X,
  TrendingUp,
  TrendingDown,
  Percent,
  Calculator,
  History
} from "lucide-react"

interface PricingInfo {
  startingPrice: string
  currency: string
  pricePerSquareMeter: string
  downPayment: string
  monthlyPayment: string
  financingPeriod: string
  specialOffers: string[]
  priceHistory: {
    date: string
    price: string
    change: string
  }[]
}

export default function PricingPage() {
  const [pricingInfo, setPricingInfo] = useState<PricingInfo>({
    startingPrice: "870,000",
    currency: "ريال",
    pricePerSquareMeter: "5,613",
    downPayment: "20%",
    monthlyPayment: "3,500",
    financingPeriod: "25 سنة",
    specialOffers: [
      "خصم 5% للدفع النقدي",
      "تسهيلات في التمويل",
      "إعفاء من رسوم التسجيل",
      "هدية مجانية: أثاث المطبخ"
    ],
    priceHistory: [
      {
        date: "يناير 2025",
        price: "870,000",
        change: "+0%"
      },
      {
        date: "ديسمبر 2024",
        price: "850,000",
        change: "+2.4%"
      },
      {
        date: "نوفمبر 2024",
        price: "830,000",
        change: "+4.8%"
      }
    ]
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editingPricing, setEditingPricing] = useState<PricingInfo>(pricingInfo)
  const [newOffer, setNewOffer] = useState("")

  const handleEdit = () => {
    setEditingPricing({ ...pricingInfo })
    setIsEditing(true)
  }

  const handleSave = () => {
    setPricingInfo(editingPricing)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditingPricing(pricingInfo)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof PricingInfo, value: any) => {
    setEditingPricing({ ...editingPricing, [field]: value })
  }

  const addSpecialOffer = () => {
    if (newOffer.trim()) {
      setEditingPricing({
        ...editingPricing,
        specialOffers: [...editingPricing.specialOffers, newOffer.trim()]
      })
      setNewOffer("")
    }
  }

  const removeSpecialOffer = (index: number) => {
    const newOffers = editingPricing.specialOffers.filter((_, i) => i !== index)
    setEditingPricing({ ...editingPricing, specialOffers: newOffers })
  }

  const currentPricing = isEditing ? editingPricing : pricingInfo

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">إدارة الأسعار</h1>
        <p className="mt-2 text-gray-600">تعديل وإدارة أسعار المشروع والعروض الخاصة</p>
      </div>

      {/* Main Pricing */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">الأسعار الأساسية</h2>
          {!isEditing && (
            <Button onClick={handleEdit}>
              <Edit className="w-4 h-4 ml-2" />
              تعديل
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label>السعر الابتدائي</Label>
            <div className="flex items-center space-x-2 space-x-reverse mt-1">
              <Input
                value={currentPricing.startingPrice}
                onChange={(e) => handleInputChange("startingPrice", e.target.value)}
                disabled={!isEditing}
                dir="ltr"
              />
              <span className="text-gray-600">{currentPricing.currency}</span>
            </div>
          </div>

          <div>
            <Label>سعر المتر المربع</Label>
            <div className="flex items-center space-x-2 space-x-reverse mt-1">
              <Input
                value={currentPricing.pricePerSquareMeter}
                onChange={(e) => handleInputChange("pricePerSquareMeter", e.target.value)}
                disabled={!isEditing}
                dir="ltr"
              />
              <span className="text-gray-600">{currentPricing.currency}/م²</span>
            </div>
          </div>

          <div>
            <Label>العملة</Label>
            <Input
              value={currentPricing.currency}
              onChange={(e) => handleInputChange("currency", e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div>
            <Label>الدفعة الأولى</Label>
            <Input
              value={currentPricing.downPayment}
              onChange={(e) => handleInputChange("downPayment", e.target.value)}
              disabled={!isEditing}
              placeholder="مثال: 20%"
            />
          </div>

          <div>
            <Label>القسط الشهري</Label>
            <div className="flex items-center space-x-2 space-x-reverse mt-1">
              <Input
                value={currentPricing.monthlyPayment}
                onChange={(e) => handleInputChange("monthlyPayment", e.target.value)}
                disabled={!isEditing}
                dir="ltr"
              />
              <span className="text-gray-600">{currentPricing.currency}</span>
            </div>
          </div>

          <div>
            <Label>مدة التمويل</Label>
            <Input
              value={currentPricing.financingPeriod}
              onChange={(e) => handleInputChange("financingPeriod", e.target.value)}
              disabled={!isEditing}
              placeholder="مثال: 25 سنة"
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex space-x-2 space-x-reverse mt-6">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 ml-2" />
              حفظ
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              إلغاء
            </Button>
          </div>
        )}
      </Card>

      {/* Special Offers */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">العروض الخاصة</h2>
          {isEditing && (
            <div className="flex space-x-2 space-x-reverse">
              <Input
                value={newOffer}
                onChange={(e) => setNewOffer(e.target.value)}
                placeholder="أضف عرض جديد..."
                className="w-64"
              />
              <Button onClick={addSpecialOffer} size="sm">
                إضافة
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentPricing.specialOffers.map((offer, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-900">{offer}</span>
              </div>
              {isEditing && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeSpecialOffer(index)}
                  className="text-red-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Price Calculator */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">حاسبة الأسعار</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label>مساحة الشقة (م²)</Label>
              <Input
                type="number"
                placeholder="مثال: 155"
                className="mt-1"
                dir="ltr"
              />
            </div>
            <div>
              <Label>نوع الدفع</Label>
              <select className="w-full p-2 border border-gray-300 rounded-md mt-1">
                <option>نقدي</option>
                <option>تمويل بنكي</option>
                <option>دفعة أولى + أقساط</option>
              </select>
            </div>
            <Button className="w-full">
              <Calculator className="w-4 h-4 ml-2" />
              احسب السعر
            </Button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">نتيجة الحساب</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">السعر الإجمالي:</span>
                <span className="font-semibold">870,000 ريال</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">الدفعة الأولى:</span>
                <span className="font-semibold">174,000 ريال</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">القسط الشهري:</span>
                <span className="font-semibold">3,500 ريال</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">مدة التمويل:</span>
                <span className="font-semibold">25 سنة</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-green-600">
                  <span>الخصم:</span>
                  <span className="font-semibold">-43,500 ريال</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Price History */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">تاريخ الأسعار</h2>
        <div className="space-y-4">
          {currentPricing.priceHistory.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3 space-x-reverse">
                <History className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-900">{item.price} {currentPricing.currency}</p>
                  <p className="text-sm text-gray-600">{item.date}</p>
                </div>
              </div>
              <Badge 
                variant={item.change.startsWith('+') ? "default" : "secondary"}
                className={item.change.startsWith('+') ? "bg-green-500" : "bg-red-500"}
              >
                {item.change}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="flex items-center space-x-2 space-x-reverse"
            onClick={() => {
              const message = encodeURIComponent(`أسعار مشروع راف 25 تبدأ من ${currentPricing.startingPrice} ${currentPricing.currency}`)
              window.open(`https://wa.me/?text=${message}`, "_blank")
            }}
          >
            <TrendingUp className="w-4 h-4" />
            <span>مشاركة الأسعار</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center space-x-2 space-x-reverse"
            onClick={() => {
              const text = encodeURIComponent(`أسعار مشروع راف 25 الجديدة:\nالسعر الابتدائي: ${currentPricing.startingPrice} ${currentPricing.currency}\nسعر المتر: ${currentPricing.pricePerSquareMeter} ${currentPricing.currency}`)
              window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
            }}
          >
            <TrendingDown className="w-4 h-4" />
            <span>نشر التحديثات</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center space-x-2 space-x-reverse"
            onClick={() => {
              const offers = currentPricing.specialOffers.join('\n• ')
              const message = encodeURIComponent(`العروض الخاصة في مشروع راف 25:\n• ${offers}`)
              window.open(`https://wa.me/?text=${message}`, "_blank")
            }}
          >
            <Percent className="w-4 h-4" />
            <span>مشاركة العروض</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}
