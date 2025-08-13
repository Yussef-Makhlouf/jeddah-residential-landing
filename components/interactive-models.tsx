"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bed, Bath, Square, Eye, Heart, Share2, Users } from "lucide-react"

export function InteractiveModels() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  const models = [
    {
      id: "A",
      title: "نموذج A - واجهة أمامية",
      price: "890,000",
      area: "155",
      rooms: "4",
      bathrooms: "4",
      features: ["غرفة استقبال", "2 غرفة نوم", "مجلس نساء", "مطبخ", "غرفة سائق", "غرفة خادمة"],
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      description: "تصميم عصري مع واجهة أمامية مميزة، يوفر مساحات واسعة ومريحة للعائلة الكبيرة",
      highlights: ["تصميم معاصر", "إطلالة مميزة", "مساحات واسعة"],
    },
    {
      id: "B",
      title: "نموذج B - واجهة خلفية",
      price: "870,000",
      area: "151",
      rooms: "4",
      bathrooms: "4",
      features: ["غرفة استقبال", "2 غرفة نوم", "مجلس", "مطبخ", "غرفة خادمة", "غرفة سائق"],
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      description: "الخيار الأمثل للعائلات، يجمع بين الراحة والعملية بتصميم ذكي",
      highlights: ["الأكثر طلباً", "سعر مناسب", "تصميم عملي"],
      popular: true,
    },
    {
      id: "C",
      title: "نموذج C - واجهة خلفية",
      price: "870,000",
      area: "151",
      rooms: "4",
      bathrooms: "4",
      features: ["2 غرفة نوم", "مجلس", "مطبخ", "غرفة سائق"],
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      description: "تصميم مدروس يركز على الخصوصية والراحة مع استغلال أمثل للمساحة",
      highlights: ["خصوصية عالية", "استغلال أمثل", "تصميم مدروس"],
    },
    {
      id: "D",
      title: "نموذج D - واجهة أمامية",
      price: "890,000",
      area: "155",
      rooms: "4",
      bathrooms: "4",
      features: ["2 غرفة نوم", "مجلس", "مطبخ", "غرفة خادمة", "غرفة سائق"],
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      description: "تصميم فاخر مع واجهة أمامية أنيقة، مثالي للعائلات التي تقدر الأناقة",
      highlights: ["تصميم فاخر", "واجهة أنيقة", "مساحات مريحة"],
    },
  ]

  const toggleFavorite = (modelId: string) => {
    setFavorites((prev) => (prev.includes(modelId) ? prev.filter((id) => id !== modelId) : [...prev, modelId]))
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">نماذج حصرية</Badge>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">اكتشف نماذج المشروع</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            تصاميم عصرية مدروسة بعناية لتناسب احتياجات العائلة السعودية الحديثة
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {models.map((model) => (
            <Card
              key={model.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm"
            >
              {model.popular && (
                <div className="absolute top-4 right-4 z-20">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
                    الأكثر طلباً
                  </Badge>
                </div>
              )}

              <div className="relative overflow-hidden">
                <img
                  src={model.images[0] || "/placeholder.svg"}
                  alt={model.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Action Buttons */}
                <div className="absolute top-4 left-4 flex space-x-2 space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 backdrop-blur-sm hover:bg-white"
                    onClick={() => toggleFavorite(model.id)}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(model.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg">
                  <div className="text-2xl font-bold text-blue-600">{model.price}</div>
                  <div className="text-sm text-gray-600">ريال سعودي</div>
                </div>
              </div>

              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{model.title}</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Eye className="w-4 h-4 ml-2" />
                        عرض التفاصيل
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">{model.title}</DialogTitle>
                      </DialogHeader>

                      <Tabs defaultValue="images" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="images">الصور</TabsTrigger>
                          <TabsTrigger value="details">التفاصيل</TabsTrigger>
                          <TabsTrigger value="features">المميزات</TabsTrigger>
                        </TabsList>

                        <TabsContent value="images" className="space-y-4">
                          <div className="grid gap-4">
                            {model.images.map((image, index) => (
                              <img
                                key={index}
                                src={image || "/placeholder.svg"}
                                alt={`${model.title} - صورة ${index + 1}`}
                                className="w-full h-64 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="details" className="space-y-6">
                          <p className="text-gray-600 text-lg leading-relaxed">{model.description}</p>

                          <div className="grid grid-cols-3 gap-6">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <Bed className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                              <div className="text-2xl font-bold text-gray-900">{model.rooms}</div>
                              <div className="text-sm text-gray-600">غرف</div>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <Bath className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                              <div className="text-2xl font-bold text-gray-900">{model.bathrooms}</div>
                              <div className="text-sm text-gray-600">حمامات</div>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <Square className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                              <div className="text-2xl font-bold text-gray-900">{model.area}</div>
                              <div className="text-sm text-gray-600">م²</div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="features" className="space-y-4">
                          <div className="grid gap-3">
                            {model.features.map((feature, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg"
                              >
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                <span className="text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-6">
                            <h4 className="font-bold text-gray-900 mb-3">النقاط المميزة:</h4>
                            <div className="flex flex-wrap gap-2">
                              {model.highlights.map((highlight, index) => (
                                <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                                  {highlight}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">{model.description}</p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <Bed className="w-5 h-5 text-blue-600" />
                    <span>{model.rooms} غرف</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <Bath className="w-5 h-5 text-blue-600" />
                    <span>{model.bathrooms} حمامات</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <Square className="w-5 h-5 text-blue-600" />
                    <span>{model.area} م²</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {model.highlights.map((highlight, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-blue-200 text-blue-700">
                      {highlight}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">احجز معاينة</Button>
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                    <Heart className={`w-4 h-4 ${favorites.includes(model.id) ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">تحتاج مساعدة في الاختيار؟</h3>
          <p className="text-gray-600 mb-6">فريقنا المختص سيساعدك في اختيار النموذج الأنسب لاحتياجاتك</p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Users className="w-5 h-5 ml-2" />
            تحدث مع مستشار
          </Button>
        </div>
      </div>
    </section>
  )
}
