"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Settings, 
  BarChart3, 
  Home, 
  Building2,
  MapPin,
  Phone,
  Share2,
  Target,
  Shield,
  Star
} from "lucide-react"
import { useProjectData } from "@/hooks/use-website-data"

export function AdminNav() {
  const pathname = usePathname()
  const { projectData } = useProjectData()

  const navItems = [
    {
      title: "لوحة التحكم الرئيسية",
      href: "/admin/control-panel",
      icon: Settings,
      description: "إدارة جميع محتويات الموقع"
    },
    {
      title: "تتبع الزيارات",
      href: "/admin/tracking",
      icon: BarChart3,
      description: "مراقبة وتحليل الزيارات"
    }
  ]

  const quickActions = [
    {
      title: "معلومات المشروع",
      href: "/admin/control-panel?tab=project",
      icon: Building2
    },
    {
      title: "الشقق والأسعار",
      href: "/admin/control-panel?tab=apartments",
      icon: Home
    },
    {
      title: "الموقع والعنوان",
      href: "/admin/control-panel?tab=location",
      icon: MapPin
    },
    {
      title: "معلومات التواصل",
      href: "/admin/control-panel?tab=contact",
      icon: Phone
    },
    {
      title: "وسائل التواصل الاجتماعي",
      href: "/admin/control-panel?tab=social",
      icon: Share2
    },
    {
      title: "الصفحة الرئيسية",
      href: "/admin/control-panel?tab=hero",
      icon: Target
    },
    {
      title: "المميزات الإستراتيجية",
      href: "/admin/control-panel?tab=strategic",
      icon: Shield
    },
    {
      title: "مميزات المشروع",
      href: "/admin/control-panel?tab=highlights",
      icon: Star
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">الإدارة</h1>
          <p className="text-xl text-gray-600">مرحباً بك في لوحة إدارة موقع {projectData?.name || "مشروع راف 25"}</p>
        </div>
    
        {/* Main Navigation */}
        <div className="grid md:grid-cols-2 gap-6">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link key={item.href} href={item.href}>
                <Card className={`h-full cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  isActive ? 'ring-2 ring-[#540f6b] bg-[#f5f3f0]' : 'hover:bg-white'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 space-x-reverse">
                      <div className={`p-3 rounded-lg ${
                        isActive ? 'bg-[#540f6b] text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">إجراءات سريعة</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              
              return (
                <Link key={action.href} href={action.href}>
                  <Card className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:bg-white">
                    <CardContent className="p-4 text-center">
                      <div className="p-3 bg-[#540f6b] text-white rounded-lg w-fit mx-auto mb-3">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm">{action.title}</h3>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Back to Website */}
        <div className="text-center">
          <Link href="/">
            <Button variant="outline" size="lg" className="bg-white">
              <Home className="w-4 h-4 ml-2" />
              العودة إلى الموقع
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
