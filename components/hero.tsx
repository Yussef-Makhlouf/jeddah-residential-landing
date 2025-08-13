import { Button } from "@/components/ui/button"
import { Phone, MapPin, Star } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/modern-geometric-pattern.png')] bg-repeat opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
            >
              <Phone className="w-4 h-4 ml-2" />
              اتصل بنا
            </Button>
          </div>
          <div className="text-2xl font-bold text-blue-900">مشروع الزهراء السكني</div>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 space-x-reverse text-amber-600">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-sm font-medium">مشروع مميز في جدة</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                حقق حلمك
                <span className="block text-blue-600">السكن المثالي</span>
                <span className="block text-2xl lg:text-3xl font-normal text-gray-600 mt-2">في جدة - حي الزهراء</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                أسعار تبدأ من <span className="text-3xl font-bold text-green-600"><Image src="/sar.svg" alt="sar" width={20} height={20} /> 870,000</span> فقط
              </p>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse text-gray-600">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>موقع استراتيجي قريب من المسجد والحدائق والمدارس</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                احجز موعد المعاينة
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg bg-transparent"
              >
                تحميل الكتيب
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/jeddah-luxury-residence.png"
                alt="مشروع الزهراء السكني"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 border">
              <div className="text-sm text-gray-600">مساحات تصل إلى</div>
              <div className="text-2xl font-bold text-blue-600">155 م²</div>
            </div>

            <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 border">
              <div className="text-sm text-gray-600">ضمان</div>
              <div className="text-2xl font-bold text-green-600">15 سنة</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
