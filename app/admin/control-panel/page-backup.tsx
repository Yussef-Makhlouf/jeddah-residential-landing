"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Building2, 
  Home, 
  MapPin, 
  Phone, 
  Share2, 
  Settings, 
  Save,
  Plus,
  Trash2,
  Edit,
  Target,
  Star,
  Shield,
  Zap,
  MessageCircle,
  Loader2,
  Menu,
  X,
  ChevronRight,
  LayoutDashboard
} from "lucide-react"

import apiService from "@/lib/api-service"
import { WebsiteData } from "@/lib/website-data"
import { validateWebsiteData, validateSection, ValidationError } from "@/lib/data-validation"
import { toast } from 'react-toastify'

// Navigation items configuration
const navigationItems = [
  {
    id: "project",
    label: "معلومات المشروع",
    icon: Building2,
    description: "البيانات الأساسية للمشروع"
  },
  {
    id: "apartments",
    label: "الشقق والأسعار",
    icon: Home,
    description: "إدارة نماذج الشقق والأسعار"
  },
  {
    id: "hero",
    label: "الصفحة الرئيسية",
    icon: Target,
    description: "محتوى القسم الرئيسي"
  }
]

export default function ControlPanel() {
  const [data, setData] = useState<WebsiteData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("project")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Load data from API on component mount
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const websiteData = await apiService.getAllData()
      setData(websiteData)
    } catch (error) {
      setError(apiService.handleError(error))
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveSection = async (sectionName: string, sectionData: any) => {
    try {
      setIsSaving(true)
      setError(null)
      
      // For general sections like project, contact, social, location
      if (!data) return
      await apiService.updateAllData(data)
      toast.success(`تم حفظ بيانات ${sectionName} بنجاح!`)
    } catch (error) {
      const errorMessage = apiService.handleError(error)
      setError(errorMessage)
      toast.error(`خطأ في حفظ ${sectionName}: ${errorMessage}`)
    } finally {
      setIsSaving(false)
    }
  }

  const handleProjectUpdate = (field: string, value: string) => {
    if (!data) return
    setData(prev => {
      if (!prev) return null
      return {
        ...prev,
        project: { ...prev.project, [field]: value }
      }
    })
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#540f6b]" />
          <h2 className="text-xl font-semibold text-gray-700">جاري تحميل البيانات...</h2>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">خطأ في تحميل البيانات</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={loadData} className="bg-[#540f6b] hover:bg-[#4a0d5f]">
            إعادة المحاولة
          </Button>
        </div>
      </div>
    )
  }

  // Show main content
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">لا توجد بيانات متاحة</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-16'} bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6 text-[#540f6b]" />
              <h2 className="text-lg font-semibold text-gray-900">لوحة التحكم</h2>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-right transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-[#540f6b] text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-[#540f6b]'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && (
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className={`text-xs ${activeTab === item.id ? 'text-gray-200' : 'text-gray-500'}`}>
                        {item.description}
                      </div>
                    </div>
                  )}
                  {activeTab === item.id && sidebarOpen && (
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  )}
                </button>
              )
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {navigationItems.find(item => item.id === activeTab)?.label}
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {navigationItems.find(item => item.id === activeTab)?.description}
              </p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Project Information Tab */}
            {activeTab === "project" && (
              <Card>
                <CardHeader>
                  <CardTitle>معلومات المشروع الأساسية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="projectName">اسم المشروع</Label>
                      <Input
                        id="projectName"
                        value={data.project.name}
                        onChange={(e) => handleProjectUpdate("name", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="licenseNumber">رقم الترخيص</Label>
                      <Input
                        id="licenseNumber"
                        value={data.project.licenseNumber}
                        onChange={(e) => handleProjectUpdate("licenseNumber", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <Button 
                      onClick={() => saveSection('project', data.project)} 
                      disabled={isSaving}
                      className="bg-[#540f6b] hover:bg-[#4a0d5f] disabled:opacity-50"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                          جاري الحفظ...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 ml-2" />
                          حفظ معلومات المشروع
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Default content for other tabs */}
            {!["project"].includes(activeTab) && (
              <Card>
                <CardHeader>
                  <CardTitle>مرحباً بك في لوحة التحكم</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">سيتم إضافة المحتوى هنا قريباً...</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
