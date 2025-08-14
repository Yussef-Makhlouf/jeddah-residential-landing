"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Image, 
  Upload, 
  Trash2, 
  Edit, 
  Save, 
  X,
  Plus,
  Eye,
  Download,
  Copy
} from "lucide-react"

interface ImageItem {
  id: string
  name: string
  url: string
  alt: string
  category: string
  isActive: boolean
  order: number
}

export default function ImagesPage() {
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: "1",
      name: "صورة رئيسية 1",
      url: "/banner.png",
      alt: "مشروع الزهراء السكني",
      category: "hero",
      isActive: true,
      order: 1
    },
    {
      id: "2",
      name: "صورة رئيسية 2",
      url: "/banner1.png",
      alt: "مشروع الزهراء السكني",
      category: "hero",
      isActive: true,
      order: 2
    },
    {
      id: "3",
      name: "صورة رئيسية 3",
      url: "/banner2.png",
      alt: "مشروع الزهراء السكني",
      category: "hero",
      isActive: true,
      order: 3
    },
    {
      id: "4",
      name: "نموذج A",
      url: "/a.jpg",
      alt: "نموذج A - واجهة أمامية",
      category: "apartments",
      isActive: true,
      order: 1
    },
    {
      id: "5",
      name: "نموذج B",
      url: "/b.jpg",
      alt: "نموذج B - واجهة خلفية",
      category: "apartments",
      isActive: true,
      order: 2
    },
    {
      id: "6",
      name: "نموذج C",
      url: "/c.jpg",
      alt: "نموذج C - واجهة خلفية",
      category: "apartments",
      isActive: true,
      order: 3
    },
    {
      id: "7",
      name: "نموذج D",
      url: "/d.jpg",
      alt: "نموذج D - واجهة أمامية",
      category: "apartments",
      isActive: true,
      order: 4
    },
    {
      id: "8",
      name: "الشعار",
      url: "/logo.png",
      alt: "شعار مشروع راف 25",
      category: "logo",
      isActive: true,
      order: 1
    }
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingImage, setEditingImage] = useState<ImageItem | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [uploading, setUploading] = useState(false)

  const categories = [
    { value: "all", label: "جميع الصور" },
    { value: "hero", label: "صور القسم الرئيسي" },
    { value: "apartments", label: "صور الشقق" },
    { value: "logo", label: "الشعار" },
    { value: "gallery", label: "معرض الصور" }
  ]

  const filteredImages = selectedCategory === "all" 
    ? images 
    : images.filter(img => img.category === selectedCategory)

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

  const handleDelete = (id: string) => {
    setImages(images.filter(img => img.id !== id))
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setUploading(true)
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newImages: ImageItem[] = Array.from(files).map((file, index) => ({
      id: Date.now().toString() + index,
      name: file.name,
      url: URL.createObjectURL(file),
      alt: file.name,
      category: "gallery",
      isActive: true,
      order: images.length + index + 1
    }))

    setImages([...images, ...newImages])
    setUploading(false)
  }

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">إدارة الصور والوسائط</h1>
        <p className="mt-2 text-gray-600">إدارة جميع الصور والوسائط في الموقع</p>
      </div>

      {/* Upload Section */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">رفع صور جديدة</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">اسحب وأفلت الصور هنا أو اضغط للاختيار</p>
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
            id="image-upload"
          />
          <Label htmlFor="image-upload">
            <Button disabled={uploading} className="cursor-pointer">
              {uploading ? "جاري الرفع..." : "اختيار الصور"}
            </Button>
          </Label>
        </div>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
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

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <Card key={image.id} className="p-4">
            {editingId === image.id ? (
              // Edit Mode
              <div className="space-y-4">
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
                      <option value="hero">صور القسم الرئيسي</option>
                      <option value="apartments">صور الشقق</option>
                      <option value="logo">الشعار</option>
                      <option value="gallery">معرض الصور</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <input
                      type="checkbox"
                      id={`active-${image.id}`}
                      checked={editingImage?.isActive || false}
                      onChange={(e) => handleInputChange("isActive", e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor={`active-${image.id}`}>نشط</Label>
                  </div>
                </div>
              </div>
            ) : (
              // View Mode
              <div>
                <div className="relative mb-4">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={image.isActive ? "default" : "secondary"}>
                      {image.isActive ? "نشط" : "غير نشط"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">{image.name}</h3>
                  <p className="text-sm text-gray-600">{image.alt}</p>
                  <p className="text-xs text-gray-500">الفئة: {categories.find(c => c.value === image.category)?.label}</p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm" onClick={() => handleEdit(image)}>
                        <Edit className="w-4 h-4 ml-1" />
                        تعديل
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => copyImageUrl(image.url)}>
                        <Copy className="w-4 h-4 ml-1" />
                        نسخ الرابط
                      </Button>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(image.id)} className="text-red-600">
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

      {/* Image Statistics */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">إحصائيات الصور</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{images.length}</p>
            <p className="text-sm text-gray-600">إجمالي الصور</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{images.filter(img => img.isActive).length}</p>
            <p className="text-sm text-gray-600">الصور النشطة</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{images.filter(img => img.category === "hero").length}</p>
            <p className="text-sm text-gray-600">صور القسم الرئيسي</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{images.filter(img => img.category === "apartments").length}</p>
            <p className="text-sm text-gray-600">صور الشقق</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
