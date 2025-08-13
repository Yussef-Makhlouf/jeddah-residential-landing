import { Shield, Award, Clock, Users, CheckCircle, Star } from "lucide-react"

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
  "فريق هندسي متخصص",
  "مواد بناء عالية الجودة",
  "التزام بمواعيد التسليم",
]

export function TrustIndicators() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-[#2c2c2c] mb-4">
            <span className="font-bold text-[#540f6b]">ضمانات المشروع</span>
          </h2>
          <p className="text-xl text-[#6b7280] max-w-3xl mx-auto">
            نلتزم بأعلى معايير الجودة ونقدم ضمانات شاملة لراحة بالك وثقتك
          </p>
        </div>

        {/* Guarantees Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {guarantees.map((guarantee, index) => (
            <div key={index} className="text-center">
              <div className="bg-[#f5f3f0] rounded-2xl p-8 mb-4 border border-[#e5e1dc] hover:border-[#c48765] transition-colors duration-300">
                <guarantee.icon className="w-12 h-12 text-[#540f6b] mx-auto mb-4" />
                <div className="text-3xl font-bold text-[#2c2c2c] mb-1">{guarantee.title}</div>
                <div className="text-[#c48765] font-medium mb-2">{guarantee.subtitle}</div>
                <p className="text-[#6b7280] text-sm">{guarantee.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Factors */}
        
      </div>
    </section>
  )
}
