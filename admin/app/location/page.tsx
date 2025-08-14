"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Clock, 
  Car, 
  Plane, 
  Edit, 
  Save, 
  X,
  Plus,
  Trash2,
  Navigation,
  Target,
  Globe
} from "lucide-react"

interface LocationFeature {
  id: string
  title: string
  time: string
  icon: string
  isActive: boolean
  order: number
}

interface LocationInfo {
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  mapUrl: string
  description: string
  mainStreets: string[]
  nearbyPlaces: string[]
}

export default function LocationPage() {
  const [locationFeatures, setLocationFeatures] = useState<LocationFeature[]>([
    {
      id: "1",
      title: "قريب من الواجهة البحرية",
      time: "8 دقائق",
      icon: "MapPin",
      isActive: true,
      order: 1
    },
    {
      id: "2",
      title: "قريب من المطار",
      time: "10 دقيقة",
      icon: "Plane",
      isActive: true,
      order: 2
    },
    {
      id: "3",
      title: "شوارع رئيسية",
      time: "مباشر",
      icon: "Car",
      isActive: true,
      order: 3
    },
    {
      id: "4",
      title: "مركز المدينة",
      time: "20 دقيقة",
      icon: "Clock",
      isActive: true,
      order: 4
    }
  ])

  const [locationInfo, setLocationInfo] = useState<LocationInfo>({
    address: "حي الزهراء، جدة، المملكة العربية السعودية",
    coordinates: {
      lat: 21.589803685697152,
      lng: 39.14023258505769
    },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3709.9005761511416!2d39.14023258505769!3d21.589803685697152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDM1JzIzLjMiTiAzOcKwMDgnMTcuMCJF!5e0!3m2!1sar!2seg!4v1755078085233!5m2!1sar!2seg",
    description: "يتميز المشروع بموقعه الإستراتيجي الذي يوفر سهولة الوصول لجميع المرافق والخدمات المهمة في جدة",
    mainStreets: ["شارع حلمي كتبي", "طريق الأمير سلطان", "شارع عبد الله كاظم"],
    nearbyPlaces: ["الواجهة البحرية", "مطار الملك عبد العزيز", "مركز المدينة", "المسجد الحرام"]
  })

  const [editingFeatureId, setEditingFeatureId] = useState<string | null>(null)
  const [editingFeature, setEditingFeature] = useState<LocationFeature | null>(null)
  const [editingLocation, setEditingLocation] = useState<LocationInfo | null>(null)
  const [isEditingLocation, setIsEditingLocation] = useState(false)

  const iconOptions = [
    { value: "MapPin", label: "موقع" },
    { value: "Clock", label: "ساعة" },
    { value: "Car", label: "سيارة" },
    { value: "Plane", label: "طائرة" },
    { value: "Navigation", label: "ملاحة" },
    { value: "Target", label: "هدف" }
  ]

  // Feature handlers
  const handleEditFeature = (feature: LocationFeature) => {
    setEditingFeatureId(feature.id)
    setEditingFeature({ ...feature })
  }

  const handleSaveFeature = () => {
    if (editingFeature) {
      setLocationFeatures(locationFeatures.map(f => 
        f.id === editingFeature.id ? editingFeature : f
      ))
      setEditingFeatureId(null)
      setEditingFeature(null)
    }
  }

  const handleCancelFeature = () => {
    setEditingFeatureId(null)
    setEditingFeature(null)
  }

  const handleInputChangeFeature = (field: keyof LocationFeature, value: any) => {
    if (editingFeature) {
      setEditingFeature({ ...editingFeature, [field]: value })
    }
  }

  const addFeature = () => {
    const newFeature: LocationFeature = {
      id: Date.now().toString(),
      title: "ميزة موقع جديدة",
      time: "5 دقائق",
      icon: "MapPin",
      isActive: true,
      order: locationFeatures.length + 1
    }
    setLocationFeatures([...locationFeatures, newFeature])
  }

  const deleteFeature = (id: string) => {
    setLocationFeatures(locationFeatures.filter(f => f.id !== id))
  }

  // Location info handlers
  const handleEditLocation = () => {
    setEditingLocation({ ...locationInfo })
    setIsEditingLocation(true)
  }

  const handleSaveLocation = () => {
    if (editingLocation) {
      setLocationInfo(editingLocation)
      setIsEditingLocation(false)
      setEditingLocation(null)
    }
  }

  const handleCancelLocation = () => {
    setIsEditingLocation(false)
    setEditingLocation(null)
  }

  const handleInputChangeLocation = (field: keyof LocationInfo, value: any) => {
    if (editingLocation) {
      setEditingLocation({ ...editingLocation, [field]: value })
    }
  }

  const handleCoordinateChange = (type: 'lat' | 'lng', value: string) => {
    if (editingLocation) {
      setEditingLocation({
        ...editingLocation,
        coordinates: {
          ...editingLocation.coordinates,
          [type]: parseFloat(value) || 0
        }
      })
    }
  }

  const currentLocation = isEditingLocation ? editingLocation : locationInfo

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">إدارة الموقع والخرائط</h1>
        <p className="mt-2 text-gray-600">تعديل معلومات الموقع والخرائط والمسافات</p>
      </div>

      {/* Location Information */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">معلومات الموقع الأساسية</h2>
          {!isEditingLocation && (
            <Button onClick={handleEditLocation}>
              <Edit className="w-4 h-4 ml-2" />
              تعديل
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label>العنوان</Label>
              <Textarea
                value={currentLocation?.address || ""}
                onChange={(e) => handleInputChangeLocation("address", e.target.value)}
                disabled={!isEditingLocation}
                rows={3}
              />
            </div>

            <div>
              <Label>وصف الموقع</Label>
              <Textarea
                value={currentLocation?.description || ""}
                onChange={(e) => handleInputChangeLocation("description", e.target.value)}
                disabled={!isEditingLocation}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>خط العرض (Latitude)</Label>
                <Input
                  type="number"
                  step="any"
                  value={currentLocation?.coordinates.lat || 0}
                  onChange={(e) => handleCoordinateChange('lat', e.target.value)}
                  disabled={!isEditingLocation}
                  dir="ltr"
                />
              </div>
              <div>
                <Label>خط الطول (Longitude)</Label>
                <Input
                  type="number"
                  step="any"
                  value={currentLocation?.coordinates.lng || 0}
                  onChange={(e) => handleCoordinateChange('lng', e.target.value)}
                  disabled={!isEditingLocation}
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <Label>رابط الخريطة</Label>
              <Input
                value={currentLocation?.mapUrl || ""}
                onChange={(e) => handleInputChangeLocation("mapUrl", e.target.value)}
                disabled={!isEditingLocation}
                dir="ltr"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>الشوارع الرئيسية</Label>
              <div className="space-y-2">
                {currentLocation?.mainStreets.map((street, index) => (
                  <div key={index} className="flex space-x-2 space-x-reverse">
                    <Input
                      value={street}
                      onChange={(e) => {
                        if (editingLocation) {
                          const newStreets = [...editingLocation.mainStreets]
                          newStreets[index] = e.target.value
                          handleInputChangeLocation("mainStreets", newStreets)
                        }
                      }}
                      disabled={!isEditingLocation}
                    />
                    {isEditingLocation && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (editingLocation) {
                            const newStreets = editingLocation.mainStreets.filter((_, i) => i !== index)
                            handleInputChangeLocation("mainStreets", newStreets)
                          }
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {isEditingLocation && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (editingLocation) {
                        handleInputChangeLocation("mainStreets", [...editingLocation.mainStreets, ""])
                      }
                    }}
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة شارع
                  </Button>
                )}
              </div>
            </div>

            <div>
              <Label>الأماكن القريبة</Label>
              <div className="space-y-2">
                {currentLocation?.nearbyPlaces.map((place, index) => (
                  <div key={index} className="flex space-x-2 space-x-reverse">
                    <Input
                      value={place}
                      onChange={(e) => {
                        if (editingLocation) {
                          const newPlaces = [...editingLocation.nearbyPlaces]
                          newPlaces[index] = e.target.value
                          handleInputChangeLocation("nearbyPlaces", newPlaces)
                        }
                      }}
                      disabled={!isEditingLocation}
                    />
                    {isEditingLocation && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (editingLocation) {
                            const newPlaces = editingLocation.nearbyPlaces.filter((_, i) => i !== index)
                            handleInputChangeLocation("nearbyPlaces", newPlaces)
                          }
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {isEditingLocation && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (editingLocation) {
                        handleInputChangeLocation("nearbyPlaces", [...editingLocation.nearbyPlaces, ""])
                      }
                    }}
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة مكان
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {isEditingLocation && (
          <div className="flex space-x-2 space-x-reverse mt-6">
            <Button onClick={handleSaveLocation} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 ml-2" />
              حفظ
            </Button>
            <Button variant="outline" onClick={handleCancelLocation}>
              إلغاء
            </Button>
          </div>
        )}
      </Card>

      {/* Location Features */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">مميزات الموقع</h2>
          <Button onClick={addFeature}>
            <Plus className="w-4 h-4 ml-2" />
            إضافة ميزة
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {locationFeatures.map((feature) => (
            <Card key={feature.id} className="p-4">
              {editingFeatureId === feature.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">تعديل الميزة</h3>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm" onClick={handleSaveFeature} className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 ml-1" />
                        حفظ
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancelFeature}>
                        <X className="w-4 h-4 ml-1" />
                        إلغاء
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label>عنوان الميزة</Label>
                      <Input
                        value={editingFeature?.title || ""}
                        onChange={(e) => handleInputChangeFeature("title", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>الوقت/المسافة</Label>
                      <Input
                        value={editingFeature?.time || ""}
                        onChange={(e) => handleInputChangeFeature("time", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>الأيقونة</Label>
                      <select
                        value={editingFeature?.icon || ""}
                        onChange={(e) => handleInputChangeFeature("icon", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        {iconOptions.map((icon) => (
                          <option key={icon.value} value={icon.value}>
                            {icon.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        id={`active-location-${feature.id}`}
                        checked={editingFeature?.isActive || false}
                        onChange={(e) => handleInputChangeFeature("isActive", e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor={`active-location-${feature.id}`}>نشط</Label>
                    </div>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    </div>
                    <Badge variant={feature.isActive ? "default" : "secondary"}>
                      {feature.isActive ? "نشط" : "غير نشط"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">الوقت: {feature.time}</span>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm" onClick={() => handleEditFeature(feature)}>
                        <Edit className="w-4 h-4 ml-1" />
                        تعديل
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deleteFeature(feature.id)} className="text-red-600">
                        <Trash2 className="w-4 h-4 ml-1" />
                        حذف
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </Card>

      {/* Map Preview */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">معاينة الخريطة</h2>
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <iframe
            src={locationInfo.mapUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="خريطة موقع المشروع"
          />
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>الإحداثيات:</strong> {locationInfo.coordinates.lat}, {locationInfo.coordinates.lng}
          </p>
        </div>
      </Card>

      {/* Statistics */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">إحصائيات الموقع</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{locationFeatures.length}</p>
            <p className="text-sm text-gray-600">مميزات الموقع</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{locationFeatures.filter(f => f.isActive).length}</p>
            <p className="text-sm text-gray-600">المميزات النشطة</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{locationInfo.mainStreets.length}</p>
            <p className="text-sm text-gray-600">الشوارع الرئيسية</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{locationInfo.nearbyPlaces.length}</p>
            <p className="text-sm text-gray-600">الأماكن القريبة</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
