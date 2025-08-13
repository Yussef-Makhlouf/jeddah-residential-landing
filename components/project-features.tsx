import { CheckCircle, Home, Shield, Zap, Camera, Thermometer } from "lucide-react"

export function ProjectFeatures() {
  const features = [
    {
      icon: Home,
      title: "بيئة سكنية متكاملة",
      description: "مجتمع سكني متكامل يوفر كل ما تحتاجه العائلة",
    },
    {
      icon: Shield,
      title: "تصميم مودرن",
      description: "تصاميم عصرية تواكب أحدث الاتجاهات المعمارية",
    },
    {
      icon: Camera,
      title: "كاميرات مراقبة",
      description: "نظام مراقبة متطور لضمان الأمان والحماية",
    },
    {
      icon: Zap,
      title: "سمارت هوم",
      description: "تقنيات المنزل الذكي لحياة أكثر راحة وسهولة",
    },
    {
      icon: Thermometer,
      title: "مداخل مكيفة",
      description: "مداخل مكيفة لراحة قصوى في جميع الأوقات",
    },
    {
      icon: CheckCircle,
      title: "موقع مثالي",
      description: "بالقرب من كل ما تحتاجه من خدمات ومرافق",
    },
  ]

  return (
    <section className="py-20 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">مميزات المشروع</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            مساحات تصل إلى 155 م² - موقع استثنائي قريب من الواجهة البحرية والمطار وأهم الشوارع الرئيسية
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 space-x-reverse group">
              <div className="bg-blue-800 p-3 rounded-lg group-hover:bg-blue-700 transition-colors">
                <feature.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-blue-100 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
