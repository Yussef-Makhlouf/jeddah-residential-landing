import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Square } from "lucide-react"

export function Models() {
  const models = [
    {
      id: "A",
      title: "نموذج A - واجهة أمامية",
      price: "890,000",
      area: "155",
      rooms: "4",
      bathrooms: "4",
      features: ["غرفة استقبال", "2 غرفة نوم", "مجلس نساء", "مطبخ", "غرفة سائق", "غرفة خادمة"],
      image: "/modern-villa-facade-model-A.png",
    },
    {
      id: "B",
      title: "نموذج B - واجهة خلفية",
      price: "870,000",
      area: "151",
      rooms: "4",
      bathrooms: "4",
      features: ["غرفة استقبال", "2 غرفة نوم", "مجلس", "مطبخ", "غرفة خادمة", "غرفة سائق"],
      image: "/modern-villa-back-facade-model-B.png",
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
      image: "/modern-villa-back-facade-model-C.png",
    },
    {
      id: "D",
      title: "نموذج D - واجهة أمامية",
      price: "890,000",
      area: "155",
      rooms: "4",
      bathrooms: "4",
      features: ["2 غرفة نوم", "مجلس", "مطبخ", "غرفة خادمة", "غرفة سائق"],
      image: "/modern-villa-facade-d.png",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">نماذج المشروع</h2>
          <p className="text-xl text-gray-600">اختر النموذج الذي يناسب احتياجاتك وأسلوب حياتك</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {models.map((model) => (
            <Card key={model.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
              {model.popular && (
                <Badge className="absolute top-4 right-4 z-10 bg-green-500 hover:bg-green-600">الأكثر طلباً</Badge>
              )}

              <div className="relative">
                <img src={model.image || "/placeholder.svg"} alt={model.title} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 right-4 bg-white rounded-lg px-3 py-1">
                  <span className="text-2xl font-bold text-blue-600">{model.price}</span>
                  <span className="text-sm text-gray-600 mr-1">﷼</span>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{model.title}</h3>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Bed className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-600">{model.rooms} غرف</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Bath className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-600">{model.bathrooms} حمامات</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Square className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-600">{model.area} م²</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">المميزات:</h4>
                  <div className="flex flex-wrap gap-2">
                    {model.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">عرض التفاصيل</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
