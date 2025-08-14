"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Star, 
  Shield, 
  Edit, 
  Save, 
  X,
  Plus,
  Trash2,
  Building2,
  Zap,
  Droplets,
  Users2,
  CheckCircle
} from "lucide-react"

interface ProjectFeature {
  id: string
  title: string
  description?: string
  icon: string
  isActive: boolean
  order: number
  category: string
}

interface Guarantee {
  id: string
  text: string
  icon: string
  period: string
  isActive: boolean
}

export default function FeaturesPage() {
  const [features, setFeatures] = useState<ProjectFeature[]>([
    {
      id: "1",
      title: "بيئة سكنية متكاملة",
      description: "مشروع سكني متكامل مع جميع المرافق والخدمات",
      icon: "Shield",
      isActive: true,
      order: 1,
      category: "main"
    },
    {
      id: "2",
      title: "مداخل مكيفة",
      description: "مداخل مكيفة للراحة والرفاهية",
      icon: "Building2",
      isActive: true,
      order: 2,
      category: "main"
    },
    {
      id: "3",
      title: "كاميرات مراقبة",
      description: "نظام مراقبة متطور للأمان",
      icon: "CheckCircle",
      isActive: true,
      order: 3,
      category: "main"
    },
    {
      id: "4",
      title: "سمارت هوم",
      description: "تقنيات ذكية للمنزل",
      icon: "Zap",
      isActive: true,
      order: 4,
      category: "main"
    },
    {
      id: "5",
      title: "تصميم مودرن",
      description: "تصميم عصري وأنيق",
      icon: "Star",
      isActive: true,
      order: 5,
      category: "main"
    },
    {
      id: "6",
      title: "موقع مثالي",
      description: "موقع إستراتيجي في قلب جدة",
      icon: "CheckCircle",
      isActive: true,
      order: 6,
      category: "main"
    }
  ])

  const [guarantees, setGuarantees] = useState<Guarantee[]>([
    {
      id: "1",
      text: "15 سنةضمان على الهيكل الأنشائي",
      icon: "Building2",
      period: "15 سنة",
      isActive: true
    },
    {
      id: "2",
      text: "25 سنةضمان على قواطع وأفياش",
      icon: "Zap",
      period: "25 سنة",
      isActive: true
    },
    {
      id: "3",
      text: "سنتين ضمان على السباكة",
      icon: "Droplets",
      period: "سنتين",
      isActive: true
    },
    {
      id: "4",
      text: "سنة ضمان على اتحاد الملاك",
      icon: "Users2",
      period: "سنة",
      isActive: true
    }
  ])

  const [editingFeatureId, setEditingFeatureId] = useState<string | null>(null)
  const [editingFeature, setEditingFeature] = useState<ProjectFeature | null>(null)
  const [editingGuaranteeId, setEditingGuaranteeId] = useState<string | null>(null)
  const [editingGuarantee, setEditingGuarantee] = useState<Guarantee | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    { value: "all", label: "جميع المميزات" },
    { value: "main", label: "المميزات الرئيسية" },
    { value: "location", label: "مميزات الموقع" },
    { value: "amenities", label: "المرافق" }
  ]

  const iconOptions = [
    { value: "Shield", label: "درع" },
    { value: "Building2", label: "مبنى" },
    { value: "CheckCircle", label: "علامة صح" },
    { value: "Zap", label: "برق" },
    { value: "Star", label: "نجمة" },
    { value: "Droplets", label: "قطرات" },
    { value: "Users2", label: "مستخدمين" }
  ]

  const filteredFeatures = selectedCategory === "all" 
    ? features 
    : features.filter(f => f.category === selectedCategory)

  // Feature handlers
  const handleEditFeature = (feature: ProjectFeature) => {
    setEditingFeatureId(feature.id)
    setEditingFeature({ ...feature })
  }

  const handleSaveFeature = () => {
    if (editingFeature) {
      setFeatures(features.map(f => 
        f.id === editingFeature.id ? editingFeature : f
      ))
      setEditingFeatureId(null)
      setEditingFeature(null)
    }
  }

  const handleCancelFeature = () => {
    setEditingFeatureId(null)
    setEditingFeature(null)
  }

  const handleInputChangeFeature = (field: keyof ProjectFeature, value: any) => {
    if (editingFeature) {
      setEditingFeature({ ...editingFeature, [field]: value })
    }
  }

  const addFeature = () => {
    const newFeature: ProjectFeature = {
      id: Date.now().toString(),
      title: "ميزة جديدة",
      description: "",
      icon: "Star",
      isActive: true,
      order: features.length + 1,
      category: "main"
    }
    setFeatures([...features, newFeature])
  }

  const deleteFeature = (id: string) => {
    setFeatures(features.filter(f => f.id !== id))
  }

  // Guarantee handlers
  const handleEditGuarantee = (guarantee: Guarantee) => {
    setEditingGuaranteeId(guarantee.id)
    setEditingGuarantee({ ...guarantee })
  }

  const handleSaveGuarantee = () => {
    if (editingGuarantee) {
      setGuarantees(guarantees.map(g => 
        g.id === editingGuarantee.id ? editingGuarantee : g
      ))
      setEditingGuaranteeId(null)
      setEditingGuarantee(null)
    }
  }

  const handleCancelGuarantee = () => {
    setEditingGuaranteeId(null)
    setEditingGuarantee(null)
  }

  const handleInputChangeGuarantee = (field: keyof Guarantee, value: any) => {
    if (editingGuarantee) {
      setEditingGuarantee({ ...editingGuarantee, [field]: value })
    }
  }

  const addGuarantee = () => {
    const newGuarantee: Guarantee = {
      id: Date.now().toString(),
      text: "ضمان جديد",
      icon: "Shield",
      period: "سنة",
      isActive: true
    }
    setGuarantees([...guarantees, newGuarantee])
  }

  const deleteGuarantee = (id: string) => {
    setGuarantees(guarantees.filter(g => g.id !== id))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">إدارة المميزات والضمانات</h1>
        <p className="mt-2 text-gray-600">تعديل مميزات المشروع والضمانات المقدمة</p>
      </div>

      {/* Project Features */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">مميزات المشروع</h2>
          <Button onClick={addFeature}>
            <Plus className="w-4 h-4 ml-2" />
            إضافة ميزة
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.value)}
              size="sm"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFeatures.map((feature) => (
            <Card key={feature.id} className="p-4">
              {editingFeatureId === feature.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">تعديل الميزة</h3>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm" onClick={handleSaveFeature} className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 ml-1" />
                        حفظ
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancelFeature}>
                        <X className="w-4 h-4 ml-1" />
                        إلغاء
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label>عنوان الميزة</Label>
                      <Input
                        value={editingFeature?.title || ""}
                        onChange={(e) => handleInputChangeFeature("title", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>وصف الميزة</Label>
                      <Textarea
                        value={editingFeature?.description || ""}
                        onChange={(e) => handleInputChangeFeature("description", e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>الأيقونة</Label>
                      <select
                        value={editingFeature?.icon || ""}
                        onChange={(e) => handleInputChangeFeature("icon", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        {iconOptions.map((icon) => (
                          <option key={icon.value} value={icon.value}>
                            {icon.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>الفئة</Label>
                      <select
                        value={editingFeature?.category || ""}
                        onChange={(e) => handleInputChangeFeature("category", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="main">المميزات الرئيسية</option>
                        <option value="location">مميزات الموقع</option>
                        <option value="amenities">المرافق</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        id={`active-feature-${feature.id}`}
                        checked={editingFeature?.isActive || false}
                        onChange={(e) => handleInputChangeFeature("isActive", e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor={`active-feature-${feature.id}`}>نشط</Label>
                    </div>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Star className="w-4 h-4 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    </div>
                    <Badge variant={feature.isActive ? "default" : "secondary"}>
                      {feature.isActive ? "نشط" : "غير نشط"}
                    </Badge>
                  </div>
                  
                  {feature.description && (
                    <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">الفئة: {categories.find(c => c.value === feature.category)?.label}</span>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm" onClick={() => handleEditFeature(feature)}>
                        <Edit className="w-4 h-4 ml-1" />
                        تعديل
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deleteFeature(feature.id)} className="text-red-600">
                        <Trash2 className="w-4 h-4 ml-1" />
                        حذف
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </Card>

      {/* Guarantees */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">ضمانات المشروع</h2>
          <Button onClick={addGuarantee}>
            <Plus className="w-4 h-4 ml-2" />
            إضافة ضمان
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guarantees.map((guarantee) => (
            <Card key={guarantee.id} className="p-4">
              {editingGuaranteeId === guarantee.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">تعديل الضمان</h3>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm" onClick={handleSaveGuarantee} className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 ml-1" />
                        حفظ
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancelGuarantee}>
                        <X className="w-4 h-4 ml-1" />
                        إلغاء
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label>نص الضمان</Label>
                      <Textarea
                        value={editingGuarantee?.text || ""}
                        onChange={(e) => handleInputChangeGuarantee("text", e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>الأيقونة</Label>
                      <select
                        value={editingGuarantee?.icon || ""}
                        onChange={(e) => handleInputChangeGuarantee("icon", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        {iconOptions.map((icon) => (
                          <option key={icon.value} value={icon.value}>
                            {icon.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>مدة الضمان</Label>
                      <Input
                        value={editingGuarantee?.period || ""}
                        onChange={(e) => handleInputChangeGuarantee("period", e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        id={`active-guarantee-${guarantee.id}`}
                        checked={editingGuarantee?.isActive || false}
                        onChange={(e) => handleInputChangeGuarantee("isActive", e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor={`active-guarantee-${guarantee.id}`}>نشط</Label>
                    </div>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-4 h-4 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">{guarantee.text}</h3>
                    </div>
                    <Badge variant={guarantee.isActive ? "default" : "secondary"}>
                      {guarantee.isActive ? "نشط" : "غير نشط"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">مدة الضمان: {guarantee.period}</span>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm" onClick={() => handleEditGuarantee(guarantee)}>
                        <Edit className="w-4 h-4 ml-1" />
                        تعديل
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deleteGuarantee(guarantee.id)} className="text-red-600">
                        <Trash2 className="w-4 h-4 ml-1" />
                        حذف
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </Card>

      {/* Statistics */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">إحصائيات المميزات</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{features.length}</p>
            <p className="text-sm text-gray-600">إجمالي المميزات</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{features.filter(f => f.isActive).length}</p>
            <p className="text-sm text-gray-600">المميزات النشطة</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{guarantees.length}</p>
            <p className="text-sm text-gray-600">إجمالي الضمانات</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{guarantees.filter(g => g.isActive).length}</p>
            <p className="text-sm text-gray-600">الضمانات النشطة</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
