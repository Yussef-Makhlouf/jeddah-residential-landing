"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Building2,
  DollarSign,
  Image,
  Phone,
  MapPin,
  Share2,
  Settings,
  Calendar,
  X,
  Menu,
  Star,
  Users,
  BarChart3,
} from "lucide-react"

const navigation = [
  { name: "لوحة التحكم", href: "/admin", icon: LayoutDashboard },
  { name: "الشقق", href: "/admin/apartments", icon: Building2 },
  { name: "الأسعار", href: "/admin/pricing", icon: DollarSign },
  { name: "الصور والوسائط", href: "/admin/images", icon: Image },
  { name: "المميزات والضمانات", href: "/admin/features", icon: Star },
  { name: "الموقع والخرائط", href: "/admin/location", icon: MapPin },
  { name: "طلبات الحجز", href: "/admin/bookings", icon: Calendar },
  { name: "معلومات التواصل", href: "/admin/contact", icon: Phone },
  { name: "وسائل التواصل الاجتماعي", href: "/admin/social", icon: Share2 },
  { name: "الإعدادات", href: "/admin/settings", icon: Settings },
]

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-72 flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="mr-3 text-lg font-semibold text-gray-900">
              لوحة التحكم
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
                onClick={() => setOpen(false)}
              >
                <item.icon
                  className={cn(
                    "ml-3 h-5 w-5 flex-shrink-0",
                    isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"
                  )}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t p-4">
          <div className="text-xs text-gray-500 text-center">
            نظام إدارة المحتوى
            <br />
            النسخة 2.0
          </div>
        </div>
      </div>
    </>
  )
}
