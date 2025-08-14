"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Image, 
  Upload, 
  Edit, 
  Save, 
  X, 
  Trash2,
  Eye,
  Download
} from "lucide-react"

interface ImageItem {
  id: string
  name: string
  url: string
  alt: string
  category: string
  order: number
}

export default function ImagesPage() {
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: "1",
      name: "صورة البانر الرئيسي",
      url: "/banner.png",
      alt: "مشروع الزهراء السكني",
      category: "banner",
      order: 1
    },
    {
      id: "2",
      name: "صورة البانر 1",
      url: "/banner1.png",
      alt: "مشروع الزهراء السكني",
      category: "banner",
      order: 2
    },
    {
      id: "3",
      name: "صورة البانر 2",
      url: "/banner2.png",
      alt: "مشروع الزهراء السكني",
      category: "banner",
      order: 3
    },
    {
      id: "4",
      name: "صورة البانر 3",
      url: "/banner3.jpg",
      alt: "مشروع الزهراء السكني",
      category: "banner",
      order: 4
    },
    {
      id: "5",
      name: "صورة البانر 4",
      url: "/banner4.jpg",
      alt: "مشروع الزهراء السكني",
      category: "banner",
      order: 5
    },
    {
      id: "6",
      name: "صورة البانر 5",
      url: "/banner5.jpg",
      alt: "مشروع الزهراء السكني",
      category: "banner",
      order: 6
    },
    {
      id: "7",
      name: "نموذج شقة A",
      url: "/a.jpg",
      alt: "نموذج شقة A",
      category: "apartments",
      order: 1
    },
    {
      id: "8",
      name: "نموذج شقة B",
      url: "/b.jpg",
      alt: "نموذج شقة B",
      category: "apartments",
      order: 2
    },
    {
      id: "9",
      name: "نموذج شقة C",
      url: "/c.jpg",
      alt: "نموذج شقة C",
      category: "apartments",
      order: 3
    },
    {
      id: "10",
      name: "نموذج شقة D",
      url: "/d.jpg",
      alt: "نموذج شقة D",
      category: "apartments",
      order: 4
    }
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingImage, setEditingImage] = useState<ImageItem | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    { value: "all", label: "جميع الصور" },
    { value: "banner", label: "صور البانر" },
    { value: "apartments", label: "صور الشقق" },
    { value: "gallery", label: "معرض الصور" }
  ]

  const handleEdit = (image: ImageItem) => {
    setEditingId(image.id)
    setEditingImage({ ...image })
  }

  const handleSave = () => {
    if (editingImage) {
      setImages(images.map(img => 
        img.id === editingImage.id ? editingImage : img
      ))
      setEditingId(null)
      setEditingImage(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditingImage(null)
  }

  const handleInputChange = (field: keyof ImageItem, value: any) => {
    if (editingImage) {
      setEditingImage({ ...editingImage, [field]: value })
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // في التطبيق الحقيقي، هنا يتم رفع الملف إلى الخادم
      const newImage: ImageItem = {
        id: Date.now().toString(),
        name: file.name,
        url: URL.createObjectURL(file),
        alt: file.name,
        category: "gallery",
        order: images.length + 1
      }
      setImages([...images, newImage])
    }
  }

  const filteredImages = selectedCategory === "all" 
    ? images 
    : images.filter(img => img.category === selectedCategory)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">إدارة الصور</h1>
        <p className="mt-2 text-gray-600">تعديل وإدارة صور المشروع</p>
      </div>

      {/* Upload Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">رفع صورة جديدة</h2>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex-1">
            <Label htmlFor="image-upload">اختر صورة</Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="mt-1"
            />
          </div>
          <Button className="bg-[#540f6b] hover:bg-[#6d1f7b]">
            <Upload className="w-4 h-4 ml-1" />
            رفع الصورة
          </Button>
        </div>
      </Card>

      {/* Category Filter */}
      <div>
        <Label>تصفية حسب الفئة</Label>
        <div className="flex space-x-2 space-x-reverse mt-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
              className={selectedCategory === category.value ? "bg-[#540f6b] hover:bg-[#6d1f7b]" : ""}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            {editingId === image.id ? (
              // Edit Mode
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">تعديل الصورة</h3>
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
                    <Label>اسم الصورة</Label>
                    <Input
                      value={editingImage?.name || ""}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>النص البديل</Label>
                    <Input
                      value={editingImage?.alt || ""}
                      onChange={(e) => handleInputChange("alt", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>الفئة</Label>
                    <select
                      value={editingImage?.category || ""}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="banner">صور البانر</option>
                      <option value="apartments">صور الشقق</option>
                      <option value="gallery">معرض الصور</option>
                    </select>
                  </div>
                  <div>
                    <Label>ترتيب العرض</Label>
                    <Input
                      type="number"
                      value={editingImage?.order || 0}
                      onChange={(e) => handleInputChange("order", parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            ) : (
              // View Mode
              <div>
                <div className="aspect-video bg-gray-100 relative group">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2 space-x-reverse">
                      <Button size="sm" variant="secondary" className="bg-white text-gray-900">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-white text-gray-900">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{image.name}</h3>
                      <p className="text-sm text-gray-500">{image.alt}</p>
                    </div>
                    <Button size="sm" onClick={() => handleEdit(image)}>
                      <Edit className="w-4 h-4 ml-1" />
                      تعديل
                    </Button>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>الفئة: {categories.find(c => c.value === image.category)?.label}</span>
                    <span>الترتيب: {image.order}</span>
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
