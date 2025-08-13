import { Button } from "@/components/ui/button"
import { Phone, MapPin, Star, Play, ArrowDown } from "lucide-react"

export function ModernHero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-blue-500/5 via-transparent to-indigo-500/5 rounded-full animate-spin-slow"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Modern Navigation */}
        <nav className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white/30 hover:bg-white/10 bg-transparent backdrop-blur-sm"
            >
              <Phone className="w-4 h-4 ml-2" />
              اتصل بنا
            </Button>
          </div>
          <div className="text-2xl font-bold text-white">مشروع الزهراء السكني</div>
        </nav>

        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
          {/* Enhanced Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="flex space-x-1 space-x-reverse">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-amber-400 font-medium">مشروع مميز في جدة</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  حقق حلمك
                </span>
                <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  السكن المثالي
                </span>
                <span className="block text-2xl lg:text-4xl font-normal text-blue-200 mt-4">في جدة - حي الزهراء</span>
              </h1>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <p className="text-white/90 text-lg mb-2">أسعار تبدأ من</p>
                <div className="flex items-baseline space-x-2 space-x-reverse">
                  <span className="text-4xl lg:text-5xl font-bold text-green-400">870,000</span>
                  <span className="text-2xl text-green-300">﷼</span>
                  <span className="text-white/70">فقط</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse text-blue-200">
              <MapPin className="w-6 h-6 text-blue-400" />
              <span className="text-lg">موقع استراتيجي قريب من المسجد والحدائق والمدارس</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-10 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                احجز موعد المعاينة
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-10 py-6 text-lg bg-transparent backdrop-blur-sm rounded-xl"
              >
                <Play className="w-5 h-5 ml-2" />
                شاهد الفيديو
              </Button>
            </div>
          </div>

          {/* Modern Hero Visual */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
              <img
                src="/placeholder.svg?height=700&width=600"
                alt="مشروع الزهراء السكني"
                className="w-full h-[700px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              {/* Floating Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full w-20 h-20 p-0 border border-white/30"
                >
                  <Play className="w-8 h-8 fill-current" />
                </Button>
              </div>
            </div>

            {/* Enhanced Floating Cards */}
            <div className="absolute -bottom-8 -right-8 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 transform hover:scale-105 transition-transform duration-300">
              <div className="text-sm text-gray-600 mb-1">مساحات تصل إلى</div>
              <div className="text-3xl font-bold text-blue-600">155 م²</div>
              <div className="text-xs text-gray-500 mt-1">مساحة مثالية للعائلة</div>
            </div>

            <div className="absolute -top-8 -left-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="text-sm opacity-90 mb-1">ضمان شامل</div>
              <div className="text-3xl font-bold">15 سنة</div>
              <div className="text-xs opacity-80 mt-1">للهيكل الإنشائي</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/60" />
        </div>
      </div>
    </section>
  )
}
