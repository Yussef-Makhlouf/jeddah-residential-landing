import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MessageCircle, Calendar } from "lucide-react"

export function Contact() {
  return (
    <section className="py-20 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">احجز موعد المعاينة</h2>
          <p className="text-xl text-blue-100">تواصل معنا الآن واحجز موعدك لمعاينة المشروع</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">أرسل لنا رسالة</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="الاسم الكامل"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
                <Input
                  placeholder="رقم الهاتف"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              </div>
              <Input
                placeholder="البريد الإلكتروني"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
              <Textarea
                placeholder="رسالتك"
                rows={4}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
              <Button className="w-full bg-white text-blue-900 hover:bg-gray-100">إرسال الرسالة</Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">طرق التواصل</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="bg-blue-800 p-3 rounded-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">اتصل بنا</div>
                    <div className="text-blue-100">+966 12 345 6789</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="bg-blue-800 p-3 rounded-lg">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">واتساب</div>
                    <div className="text-blue-100">+966 50 123 4567</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="bg-blue-800 p-3 rounded-lg">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">البريد الإلكتروني</div>
                    <div className="text-blue-100">info@alzahra-project.com</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <Calendar className="w-6 h-6 text-blue-300" />
                <span className="font-semibold">ساعات العمل</span>
              </div>
              <div className="space-y-2 text-blue-100">
                <div>السبت - الخميس: 9:00 ص - 9:00 م</div>
                <div>الجمعة: 2:00 م - 9:00 م</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
