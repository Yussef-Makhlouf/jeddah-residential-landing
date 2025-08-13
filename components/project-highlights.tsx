import { Shield, Wifi, Camera, Thermometer, Users, MapPin, Award, Clock, CheckCircle, Star } from "lucide-react"

const highlights = [
  {
    icon: Shield,
    title: "بيئة سكنية متكاملة",
    description: "مجتمع آمن ومتكامل للعائلات",
  },
  {
    icon: Thermometer,
    title: "مداخل مكيفة",
    description: "راحة في جميع فصول السنة",
  },
  {
    icon: Camera,
    title: "كاميرات مراقبة",
    description: "أمان على مدار الساعة",
  },
  {
    icon: Wifi,
    title: "سمارت هوم",
    description: "تقنيات ذكية حديثة",
  },
  {
    icon: Users,
    title: "تصميم مودرن",
    description: "هندسة معمارية عصرية",
  },
  {
    icon: MapPin,
    title: "موقع مثالي",
    description: "بالقرب من كل ما تحتاجه",
  },
]

const guarantees = [
  {
    icon: Shield,
    title: "15 سنة",
    subtitle: "الهيكل الإنشائي",
    description: "ضمان شامل على جودة البناء",
  },
  {
    icon: Award,
    title: "25 سنة",
    subtitle: "قواطع وأفياش",
    description: "ضمان الأعمال الكهربائية",
  },
  {
    icon: Clock,
    title: "سنتين",
    subtitle: "أعمال سباكة",
    description: "ضمان شامل للسباكة",
  },
  {
    icon: Users,
    title: "سنة",
    subtitle: "اتحاد ملاك",
    description: "عضوية اتحاد الملاك",
  },
]

const trustFactors = [
  "مطور عقاري معتمد",
  "رخصة بناء سارية",
  "تأمين شامل على المشروع",


  "التزام بمواعيد التسليم",
]

export function ProjectHighlights() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#2c2c2c] mb-4">
            <span className="font-bold text-[#540f6b]">مميزات المشروع</span>
          </h2>
          <p className="text-lg md:text-xl text-[#6b7280] max-w-3xl mx-auto">
            مساحات تصل إلى 155 م² - موقع استثنائي قريب من الواجهة البحرية والمطار وأهم الشوارع الرئيسية
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {highlights.map((highlight, index) => (
            <div key={index} className="text-center group">
              <div className="bg-[#f5f3f0] rounded-full w-16 md:w-20 h-16 md:h-20 flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-[#c48765] transition-colors duration-300">
                <highlight.icon className="w-6 md:w-8 h-6 md:h-8 text-[#540f6b] group-hover:text-white" />
              </div>
              <h3 className="font-bold text-sm md:text-lg lg:text-xl text-[#2c2c2c] mb-2 md:mb-3 leading-tight">
                {highlight.title}
              </h3>
              <p className="text-[#6b7280] leading-relaxed text-xs md:text-sm lg:text-base">{highlight.description}</p>
            </div>
          ))}
        </div>

        {/* Guarantees Section */}
        <div className="mt-16 md:mt-20">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#2c2c2c] mb-4">
              <span className="font-bold text-[#540f6b]">ضمانات المشروع</span>
            </h2>
            <p className="text-lg md:text-xl text-[#6b7280] max-w-3xl mx-auto">
              نلتزم بأعلى معايير الجودة ونقدم ضمانات شاملة لراحة بالك وثقتك
            </p>
          </div>

          {/* Guarantees Grid - Two cards per row */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-12">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="text-center">
                <div className="bg-[#f5f3f0] rounded-2xl p-4 md:p-6 lg:p-8 border border-[#e5e1dc] hover:border-[#c48765] transition-colors duration-300 h-full">
                  <guarantee.icon className="w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 text-[#540f6b] mx-auto mb-3 md:mb-4" />
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2c2c2c] mb-1">{guarantee.title}</div>
                  <div className="text-[#c48765] font-medium mb-2 text-sm md:text-base">{guarantee.subtitle}</div>
                  <p className="text-[#6b7280] text-xs md:text-sm">{guarantee.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Factors */}
          <div className="bg-[#f5f3f0] rounded-2xl p-6 md:p-8 border border-[#e5e1dc]">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {trustFactors.map((factor, index) => (
                <div key={index} className="flex items-center gap-2 md:gap-3">
                  <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-[#540f6b] flex-shrink-0" />
                  <span className="text-[#2c2c2c] text-sm md:text-base font-medium">{factor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20 bg-[#f5f3f0] rounded-2xl p-6 md:p-8 lg:p-12 border border-[#e5e1dc]">
          <div className="grid grid-cols-3 gap-6 md:gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#540f6b] mb-2">155</div>
              <div className="text-[#6b7280] text-sm md:text-base">متر مربع مساحة قصوى</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#c48765] mb-2">4</div>
              <div className="text-[#6b7280] text-sm md:text-base">نماذج مختلفة للاختيار</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#540f6b] mb-2">15</div>
              <div className="text-[#6b7280] text-sm md:text-base">سنة ضمان الهيكل الإنشائي</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
