"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  Building2, 
  Phone, 
  Image, 
  MapPin, 
  Settings,
  TrendingUp,
  Users,
  Eye,
  FileText,
  Globe,
  MessageCircle,
  Calendar,
  Shield,
  Star,
  BarChart3,
  Download,
  Upload
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const stats = [
    {
      title: "إجمالي الزيارات",
      value: "1,234",
      change: "+12%",
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "طلبات الحجز",
      value: "89",
      change: "+5%",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "الشقق المتاحة",
      value: "4",
      change: "مستقر",
      icon: Building2,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "معدل التحويل",
      value: "3.2%",
      change: "+0.8%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ]

  const quickActions = [
    {
      title: "إدارة الشقق",
      description: "تعديل تفاصيل الشقق والأسعار",
      icon: Building2,
      href: "/admin/apartments",
      color: "bg-blue-500"
    },
    {
      title: "إدارة الصور",
      description: "تحديث صور المشروع والكاروسيل",
      icon: Image,
      href: "/admin/images",
      color: "bg-green-500"
    },
    {
      title: "معلومات التواصل",
      description: "تحديث أرقام الهاتف والواتساب",
      icon: Phone,
      href: "/admin/contact",
      color: "bg-purple-500"
    },
    {
      title: "إعدادات الموقع",
      description: "تعديل العناوين والمحتوى العام",
      icon: Settings,
      href: "/admin/settings",
      color: "bg-orange-500"
    },
    {
      title: "إدارة المميزات",
      description: "تعديل مميزات المشروع والضمانات",
      icon: Star,
      href: "/admin/features",
      color: "bg-red-500"
    },
    {
      title: "إدارة الموقع",
      description: "تحديث معلومات الموقع والخرائط",
      icon: MapPin,
      href: "/admin/location",
      color: "bg-indigo-500"
    },
    {
      title: "طلبات الحجز",
      description: "عرض وإدارة طلبات الحجز",
      icon: Calendar,
      href: "/admin/bookings",
      color: "bg-teal-500"
    },
    {
      title: "وسائل التواصل",
      description: "إدارة روابط السوشيال ميديا",
      icon: MessageCircle,
      href: "/admin/social",
      color: "bg-pink-500"
    }
  ]

  const recentActivity = [
    {
      type: "update",
      title: "تم تحديث أسعار الشقق",
      time: "منذ ساعتين",
      color: "bg-green-500"
    },
    {
      type: "booking",
      title: "طلب حجز جديد - نموذج A",
      time: "منذ 3 ساعات",
      color: "bg-blue-500"
    },
    {
      type: "image",
      title: "تم تحديث صور المشروع",
      time: "منذ 5 ساعات",
      color: "bg-purple-500"
    },
    {
      type: "contact",
      title: "تم تحديث رقم الواتساب",
      time: "منذ يوم واحد",
      color: "bg-orange-500"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
        <p className="mt-2 text-gray-600">مرحباً بك في لوحة تحكم مشروع راف 25</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">إجراءات سريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className={`p-3 rounded-lg ${action.color}`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">النشاط الأخير</h2>
        <Card className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 space-x-reverse">
                <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">التقارير السريعة</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 ml-2" />
              تقرير طلبات الحجز
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="w-4 h-4 ml-2" />
              تحليل الزيارات
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 ml-2" />
              تقرير الأداء
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Upload className="w-4 h-4 ml-2" />
              نسخ احتياطي
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Globe className="w-4 h-4 ml-2" />
              نشر التحديثات
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="w-4 h-4 ml-2" />
              فحص الأمان
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
