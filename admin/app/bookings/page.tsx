"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  User, 
  Phone, 
  MessageCircle, 
  Eye, 
  CheckCircle, 
  XCircle,
  Clock,
  Filter,
  Download,
  Search,
  Mail,
  MapPin
} from "lucide-react"

interface Booking {
  id: string
  name: string
  phone: string
  notes: string
  status: "pending" | "contacted" | "confirmed" | "cancelled"
  createdAt: string
  contactedAt?: string
  confirmedAt?: string
  apartmentModel?: string
  preferredTime?: string
  source: string
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      name: "أحمد محمد",
      phone: "0536667967",
      notes: "مهتم بنموذج A، يريد معاينة الأسبوع القادم",
      status: "pending",
      createdAt: "2025-01-15T10:30:00",
      apartmentModel: "نموذج A",
      preferredTime: "مساءً",
      source: "الموقع"
    },
    {
      id: "2",
      name: "فاطمة علي",
      phone: "0501234567",
      notes: "تريد معلومات عن الأسعار والمواعيد المتاحة",
      status: "contacted",
      createdAt: "2025-01-14T15:45:00",
      contactedAt: "2025-01-15T09:00:00",
      source: "الواتساب"
    },
    {
      id: "3",
      name: "محمد عبدالله",
      phone: "0559876543",
      notes: "مهتم بالشقق المتاحة، يريد معرفة تفاصيل التمويل",
      status: "confirmed",
      createdAt: "2025-01-13T12:20:00",
      contactedAt: "2025-01-14T10:00:00",
      confirmedAt: "2025-01-15T14:30:00",
      apartmentModel: "نموذج B",
      source: "الموقع"
    },
    {
      id: "4",
      name: "سارة أحمد",
      phone: "0543210987",
      notes: "تريد معاينة المشروع مع العائلة",
      status: "cancelled",
      createdAt: "2025-01-12T16:15:00",
      source: "الواتساب"
    }
  ])

  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const statusOptions = [
    { value: "all", label: "جميع الطلبات", color: "bg-gray-100" },
    { value: "pending", label: "في الانتظار", color: "bg-yellow-100" },
    { value: "contacted", label: "تم التواصل", color: "bg-blue-100" },
    { value: "confirmed", label: "مؤكد", color: "bg-green-100" },
    { value: "cancelled", label: "ملغي", color: "bg-red-100" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500"
      case "contacted": return "bg-blue-500"
      case "confirmed": return "bg-green-500"
      case "cancelled": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "في الانتظار"
      case "contacted": return "تم التواصل"
      case "confirmed": return "مؤكد"
      case "cancelled": return "ملغي"
      default: return "غير محدد"
    }
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = selectedStatus === "all" || booking.status === selectedStatus
    const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.phone.includes(searchTerm) ||
                         booking.notes.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const updateBookingStatus = (id: string, status: Booking["status"]) => {
    const updatedBookings = bookings.map(booking => {
      if (booking.id === id) {
        const updated = { ...booking, status }
        if (status === "contacted" && !booking.contactedAt) {
          updated.contactedAt = new Date().toISOString()
        }
        if (status === "confirmed" && !booking.confirmedAt) {
          updated.confirmedAt = new Date().toISOString()
        }
        return updated
      }
      return booking
    })
    setBookings(updatedBookings)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "منذ دقائق"
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`
    const diffInDays = Math.floor(diffInHours / 24)
    return `منذ ${diffInDays} يوم`
  }

  const exportBookings = () => {
    const csvContent = [
      ["الاسم", "رقم الهاتف", "الحالة", "التاريخ", "الملاحظات"],
      ...filteredBookings.map(booking => [
        booking.name,
        booking.phone,
        getStatusLabel(booking.status),
        formatDate(booking.createdAt),
        booking.notes
      ])
    ].map(row => row.join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "طلبات_الحجز.csv"
    link.click()
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">إدارة طلبات الحجز</h1>
        <p className="mt-2 text-gray-600">عرض وإدارة جميع طلبات الحجز الواردة</p>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedStatus === option.value ? "default" : "outline"}
                onClick={() => setSelectedStatus(option.value)}
                size="sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="البحث في الطلبات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" onClick={exportBookings}>
              <Download className="w-4 h-4 ml-2" />
              تصدير
            </Button>
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{bookings.length}</p>
            <p className="text-sm text-gray-600">إجمالي الطلبات</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {bookings.filter(b => b.status === "pending").length}
            </p>
            <p className="text-sm text-gray-600">في الانتظار</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {bookings.filter(b => b.status === "confirmed").length}
            </p>
            <p className="text-sm text-gray-600">مؤكد</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {bookings.filter(b => b.status === "contacted").length}
            </p>
            <p className="text-sm text-gray-600">تم التواصل</p>
          </div>
        </Card>
      </div>

      {/* Bookings List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{booking.name}</h3>
                  <p className="text-sm text-gray-600">{booking.phone}</p>
                </div>
              </div>
              <Badge className={getStatusColor(booking.status)}>
                {getStatusLabel(booking.status)}
              </Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(booking.createdAt)}</span>
                <span className="text-gray-400">({getTimeAgo(booking.createdAt)})</span>
              </div>

              {booking.apartmentModel && (
                <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>النموذج: {booking.apartmentModel}</span>
                </div>
              )}

              {booking.preferredTime && (
                <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>الوقت المفضل: {booking.preferredTime}</span>
                </div>
              )}

              <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                <MessageCircle className="w-4 h-4" />
                <span>المصدر: {booking.source}</span>
              </div>
            </div>

            {booking.notes && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{booking.notes}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex space-x-2 space-x-reverse">
                <Button
                  size="sm"
                  onClick={() => setSelectedBooking(booking)}
                  variant="outline"
                >
                  <Eye className="w-4 h-4 ml-1" />
                  تفاصيل
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(`tel:${booking.phone}`, "_self")}
                >
                  <Phone className="w-4 h-4 ml-1" />
                  اتصال
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const message = encodeURIComponent(`مرحباً ${booking.name}، شكراً لاهتمامك بمشروع راف 25`)
                    window.open(`https://wa.me/${booking.phone}?text=${message}`, "_blank")
                  }}
                >
                  <MessageCircle className="w-4 h-4 ml-1" />
                  واتساب
                </Button>
              </div>

              <div className="flex space-x-2 space-x-reverse">
                {booking.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => updateBookingStatus(booking.id, "contacted")}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <CheckCircle className="w-4 h-4 ml-1" />
                      تم التواصل
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateBookingStatus(booking.id, "cancelled")}
                      className="text-red-600"
                    >
                      <XCircle className="w-4 h-4 ml-1" />
                      إلغاء
                    </Button>
                  </>
                )}
                
                {booking.status === "contacted" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => updateBookingStatus(booking.id, "confirmed")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 ml-1" />
                      تأكيد
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateBookingStatus(booking.id, "cancelled")}
                      className="text-red-600"
                    >
                      <XCircle className="w-4 h-4 ml-1" />
                      إلغاء
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">تفاصيل الطلب</h2>
                <Button variant="ghost" size="sm" onClick={() => setSelectedBooking(null)}>
                  <XCircle className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>الاسم</Label>
                    <p className="text-gray-900 font-medium">{selectedBooking.name}</p>
                  </div>
                  <div>
                    <Label>رقم الهاتف</Label>
                    <p className="text-gray-900 font-medium">{selectedBooking.phone}</p>
                  </div>
                </div>

                <div>
                  <Label>الحالة</Label>
                  <Badge className={getStatusColor(selectedBooking.status)}>
                    {getStatusLabel(selectedBooking.status)}
                  </Badge>
                </div>

                <div>
                  <Label>تاريخ الطلب</Label>
                  <p className="text-gray-900">{formatDate(selectedBooking.createdAt)}</p>
                </div>

                {selectedBooking.contactedAt && (
                  <div>
                    <Label>تاريخ التواصل</Label>
                    <p className="text-gray-900">{formatDate(selectedBooking.contactedAt)}</p>
                  </div>
                )}

                {selectedBooking.confirmedAt && (
                  <div>
                    <Label>تاريخ التأكيد</Label>
                    <p className="text-gray-900">{formatDate(selectedBooking.confirmedAt)}</p>
                  </div>
                )}

                {selectedBooking.apartmentModel && (
                  <div>
                    <Label>النموذج المطلوب</Label>
                    <p className="text-gray-900">{selectedBooking.apartmentModel}</p>
                  </div>
                )}

                {selectedBooking.preferredTime && (
                  <div>
                    <Label>الوقت المفضل</Label>
                    <p className="text-gray-900">{selectedBooking.preferredTime}</p>
                  </div>
                )}

                <div>
                  <Label>المصدر</Label>
                  <p className="text-gray-900">{selectedBooking.source}</p>
                </div>

                {selectedBooking.notes && (
                  <div>
                    <Label>الملاحظات</Label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedBooking.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex space-x-2 space-x-reverse mt-6">
                <Button
                  onClick={() => window.open(`tel:${selectedBooking.phone}`, "_self")}
                  className="flex-1"
                >
                  <Phone className="w-4 h-4 ml-2" />
                  اتصال
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const message = encodeURIComponent(`مرحباً ${selectedBooking.name}، شكراً لاهتمامك بمشروع راف 25`)
                    window.open(`https://wa.me/${selectedBooking.phone}?text=${message}`, "_blank")
                  }}
                  className="flex-1"
                >
                  <MessageCircle className="w-4 h-4 ml-2" />
                  واتساب
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
