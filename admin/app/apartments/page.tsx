"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  Bed, 
  Bath, 
  Square, 
  Edit, 
  Save, 
  X,
  Plus,
  Trash2,
  MessageSquareXIcon,

} from "lucide-react"

interface Apartment {
  id: string
  name: string
  price: string
  area: string
  rooms: number
  bathrooms: number
  features: string[]
  popular: boolean
  image: string
}

export default function ApartmentsPage() {
  const [apartments, setApartments] = useState<Apartment[]>([
    {
      id: "A",
      name: "نموذج A - واجهة أمامية",
      price: "890,000",
      area: "155",
      rooms: 4,
      bathrooms: 4,
      features: ["غرفة استقبال", "2 غرفة نوم", "4 دورات مياه", "مجلس نساء", "مطبخ", "غرفة سائق", "غرفة خادمة"],
      popular: true,
      image: "/a.jpg",
    },
    {
      id: "B",
      name: "نموذج B - واجهة خلفية",
      price: "870,000",
      area: "151",
      rooms: 4,
      bathrooms: 4,
      features: ["غرفة استقبال", "2 غرفة نوم", "مجلس", "مطبخ", "4 دورات مياه", "غرفة خادمة", "غرفة سائق"],
      popular: false,
      image: "/b.jpg",
    },
    {
      id: "C",
      name: "نموذج C - واجهة خلفية",
      price: "870,000",
      area: "151",
      rooms: 4,
      bathrooms: 4,
      features: ["2 غرفة نوم", "مجلس", "مطبخ", "4 دورات مياه", "غرفة سائق"],
      popular: false,
      image: "/c.jpg",
    },
    {
      id: "D",
      name: "نموذج D - واجهة أمامية",
      price: "890,000",
      area: "155",
      rooms: 4,
      bathrooms: 4,
      features: ["2 غرفة نوم", "مجلس", "مطبخ", "4 دورات مياه", "غرفة خادمة", "غرفة سائق"],
      popular: false,
      image: "/d.jpg",
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingApartment, setEditingApartment] = useState<Apartment | null>(null)

  const handleEdit = (apartment: Apartment) => {
    setEditingId(apartment.id)
    setEditingApartment({ ...apartment })
  }

  const handleSave = () => {
    if (editingApartment) {
      setApartments(apartments.map(apt => 
        apt.id === editingApartment.id ? editingApartment : apt
      ))
      setEditingId(null)
      setEditingApartment(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditingApartment(null)
  }

  const handleInputChange = (field: keyof Apartment, value: any) => {
    if (editingApartment) {
      setEditingApartment({ ...editingApartment, [field]: value })
    }
  }

  const handleFeatureChange = (index: number, value: string) => {
    if (editingApartment) {
      const newFeatures = [...editingApartment.features]
      newFeatures[index] = value
      setEditingApartment({ ...editingApartment, features: newFeatures })
    }
  }

  const addFeature = () => {
    if (editingApartment) {
      setEditingApartment({
        ...editingApartment,
        features: [...editingApartment.features, ""]
      })
    }
  }

  const removeFeature = (index: number) => {
    if (editingApartment) {
      const newFeatures = editingApartment.features.filter((_, i) => i !== index)
      setEditingApartment({ ...editingApartment, features: newFeatures })
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">إدارة الشقق</h1>
        <p className="mt-2 text-gray-600">تعديل تفاصيل الشقق المتاحة في المشروع</p>
      </div>

      {/* Apartments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {apartments.map((apartment) => (
          <Card key={apartment.id} className="p-6">
            {editingId === apartment.id ? (
              // Edit Mode
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">تعديل {apartment.name}</h3>
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>اسم النموذج</Label>
                    <Input
                      value={editingApartment?.name || ""}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>السعر (ريال)</Label>
                    <Input
                      value={editingApartment?.price || ""}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>المساحة (م²)</Label>
                    <Input
                      value={editingApartment?.area || ""}
                      onChange={(e) => handleInputChange("area", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>عدد الغرف</Label>
                    <Input
                      type="number"
                      value={editingApartment?.rooms || 0}
                      onChange={(e) => handleInputChange("rooms", parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>عدد دورات المياه</Label>
                    <Input
                      type="number"
                      value={editingApartment?.bathrooms || 0}
                      onChange={(e) => handleInputChange("bathrooms", parseInt(e.target.value))}
                    />
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <input
                      type="checkbox"
                      id={`popular-${apartment.id}`}
                      checked={editingApartment?.popular || false}
                      onChange={(e) => handleInputChange("popular", e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor={`popular-${apartment.id}`}>الأكثر طلباً</Label>
                  </div>
                </div>

                <div>
                  <Label>مكونات الشقة</Label>
                  <div className="space-y-2">
                    {editingApartment?.features.map((feature, index) => (
                      <div key={index} className="flex space-x-2 space-x-reverse">
                        <Input
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          placeholder="أدخل مكون الشقة"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFeature(index)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button size="sm" variant="outline" onClick={addFeature}>
                      <Plus className="w-4 h-4 ml-1" />
                      إضافة مكون
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              // View Mode
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{apartment.name}</h3>
                    {apartment.popular && (
                      <Badge className="mt-1 bg-[#c48765] text-white">الأكثر طلباً</Badge>
                    )}
                  </div>
                  <Button size="sm" onClick={() => handleEdit(apartment)}>
                    <Edit className="w-4 h-4 ml-1" />
                    تعديل
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 space-x-reverse text-sm text-gray-600">
                      <Bed className="w-4 h-4 text-[#c48765]" />
                      <span>{apartment.rooms}</span>
                    </div>
                    <p className="text-xs text-gray-500">غرف</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 space-x-reverse text-sm text-gray-600">
                      <Bath className="w-4 h-4 text-[#c48765]" />
                      <span>{apartment.bathrooms}</span>
                    </div>
                    <p className="text-xs text-gray-500">دورات مياه</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 space-x-reverse text-sm text-gray-600">
                      <Square className="w-4 h-4 text-[#c48765]" />
                      <span>{apartment.area}</span>
                    </div>
                    <p className="text-xs text-gray-500">م²</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-2xl font-bold text-[#540f6b]">{apartment.price} ريال</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">مكونات الشقة:</h4>
                  <div className="grid grid-cols-1 gap-1">
                    {apartment.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 space-x-reverse">
                        <div className="w-2 h-2 bg-[#540f6b] rounded-full"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
