import { MapPin, School, Building2, TreePine, Stethoscope } from "lucide-react"

const features = [
  {
    icon: MapPin,
    title: "موقع استراتيجي",
    description: "وسط 3 شوارع رئيسية",
    details: ["شارع حلمي كتبي", "طريق الأمير سلطان", "شارع عبد الله كاظم"],
  },
  {
    icon: Building2,
    title: "قريب من المسجد",
    description: "على بُعد دقائق من المسجد",
    details: ["سهولة الوصول", "بيئة إسلامية", "راحة العبادة"],
  },
  {
    icon: TreePine,
    title: "حدائق ومتنزهات",
    description: "مساحات خضراء واسعة",
    details: ["بيئة صحية", "أماكن ترفيه", "هواء نقي"],
  },
  {
    icon: School,
    title: "مدارس متميزة",
    description: "أفضل المدارس في المنطقة",
    details: ["تعليم عالي الجودة", "قرب من المنزل", "أمان الأطفال"],
  },
  {
    icon: Stethoscope,
    title: "مستشفى قريب",
    description: "خدمات صحية متكاملة",
    details: ["رعاية طبية", "خدمات طوارئ", "عيادات متخصصة"],
  },
]

export function StrategicFeatures() {
  return (
    <section className="py-16 md:py-24 bg-[#efedea]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#2c2c2c] mb-4">
            <span className="font-bold text-[#540f6b]">مميزات الموقع</span> الاستراتيجي
          </h2>
          <p className="text-lg md:text-xl text-[#6b7280] max-w-3xl mx-auto">قريب من: مسجد - حدائق - مدارس - مستشفى</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-6 md:p-8 h-full border border-[#e5e1dc] hover:border-[#c48765] transition-all duration-300 shadow-elegant hover:shadow-elegant-lg">
                <div className="flex items-start space-x-4 space-x-reverse mb-4 md:mb-6">
                  <div className="bg-[#f5f3f0] rounded-xl p-3 group-hover:bg-[#c48765] group-hover:text-white transition-colors duration-300 flex-shrink-0">
                    <feature.icon className="w-5 md:w-6 h-5 md:h-6 text-[#540f6b] group-hover:text-white" />
                  </div>
                  <div className="min-w-0 flex-1 mx-2">
                    <h3 className="font-bold text-base md:text-lg text-[#2c2c2c] mb-1">{feature.title}</h3>
                    <p className="text-[#434344] text-sm">{feature.description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-1.5 h-1.5 bg-[#540f6b] rounded-full flex-shrink-0 mx-2"></div>
                      <span className="text-[#2c2c2c] text-sm">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
