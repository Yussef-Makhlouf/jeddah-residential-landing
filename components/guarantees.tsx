import { Shield, Zap, Wrench, Users } from "lucide-react"

export function Guarantees() {
  const guarantees = [
    {
      icon: Shield,
      years: "15",
      title: "الهيكل الإنشائي",
      description: "ضمان شامل على الهيكل الإنشائي للمبنى",
    },
    {
      icon: Zap,
      years: "25",
      title: "قواطع وأفياش",
      description: "ضمان على جميع الأعمال الكهربائية",
    },
    {
      icon: Wrench,
      years: "2",
      title: "أعمال السباكة",
      description: "ضمان على جميع أعمال السباكة والصرف",
    },
    {
      icon: Users,
      years: "1",
      title: "اتحاد ملاك",
      description: "عضوية اتحاد الملاك لسنة كاملة",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">ضمانات المشروع</h2>
          <p className="text-xl text-gray-600">نوفر لك ضمانات شاملة لراحة البال والثقة الكاملة</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guarantees.map((guarantee, index) => (
            <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition-colors">
                <guarantee.icon className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                {guarantee.years}
                <span className="text-lg mr-1">سنة</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{guarantee.title}</h3>
              <p className="text-gray-600 leading-relaxed">{guarantee.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
