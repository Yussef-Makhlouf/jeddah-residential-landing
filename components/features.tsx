import { MapPin, Shield, Home, Zap } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: MapPin,
      title: "موقع إستراتيجي",
      description: "يقع وسط 3 شوارع رئيسية: شارع حلمي كتبي، طريق الأمير سلطان، شارع عبد الله كاظم",
    },
    {
      icon: Home,
      title: "تصميم عصري",
      description: "تصاميم حديثة ومبتكرة تلبي احتياجات العائلة السعودية المعاصرة",
    },
    {
      icon: Shield,
      title: "أمان وحماية",
      description: "كاميرات مراقبة على مدار الساعة ونظام أمني متطور",
    },
    {
      icon: Zap,
      title: "منزل ذكي",
      description: "تقنيات المنزل الذكي ومداخل مكيفة لراحة قصوى",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">مميزات الموقع الإستراتيجي</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">قريب من المسجد - الحدائق - المدارس - المستشفى</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
