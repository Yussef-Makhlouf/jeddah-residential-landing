import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function VideoSection() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">عرض فيديو المشروع</h2>
          <p className="text-xl text-gray-300">شاهد جولة افتراضية داخل المشروع واكتشف جمال التصميم</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img src="/jeddah-luxury-residence-thumbnail.png" alt="عرض فيديو المشروع" className="w-full h-[500px] object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Button
                size="lg"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white"
              >
                <Play className="w-8 h-8 ml-2" />
                تشغيل الفيديو
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
