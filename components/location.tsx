import { MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Location() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">خريطة المشروع</h2>
          <p className="text-xl text-gray-600">موقع استراتيجي في قلب جدة - حي الزهراء</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 space-x-reverse">
              <MapPin className="w-6 h-6 text-blue-600" />
              <span className="text-lg text-gray-700">جدة - حي الزهراء</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">الشوارع الرئيسية المحيطة:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>شارع حلمي كتبي</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>طريق الأمير سلطان</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>شارع عبد الله كاظم</span>
                </li>
              </ul>
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700">
              <Navigation className="w-5 h-5 ml-2" />
              عرض الموقع على الخريطة
            </Button>
          </div>

          <div className="relative">
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <img
                src="/jeddah-al-zahra-map.png"
                alt="خريطة الموقع"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
