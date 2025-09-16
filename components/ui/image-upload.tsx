"use client"

import React, { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Loader2, 
  CheckCircle,
  AlertCircle,
  Eye,
  Trash2
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  label?: string
  placeholder?: string
  className?: string
  accept?: string
  maxSize?: number // in MB
  showPreview?: boolean
  aspectRatio?: string
}

export function ImageUpload({
  value = "",
  onChange,
  label = "رفع صورة",
  placeholder = "اسحب وأفلت الصورة هنا أو انقر للاختيار",
  className,
  accept = "image/*",
  maxSize = 5, // 5MB default
  showPreview = true,
  aspectRatio = "aspect-video"
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(value || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return "الملف المحدد ليس صورة صالحة"
    }
    
    if (file.size > maxSize * 1024 * 1024) {
      return `حجم الصورة يجب أن يكون أقل من ${maxSize} ميجابايت`
    }
    
    return null
  }

  const handleFile = useCallback(async (file: File) => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setIsUploading(true)

    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append('image', file)

      // Upload to server
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('فشل في رفع الصورة')
      }

      const result = await response.json()
      
      if (result.success && result.url) {
        onChange(result.url)
        setPreview(result.url)
      } else {
        throw new Error(result.error || 'فشل في رفع الصورة')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ أثناء رفع الصورة')
    } finally {
      setIsUploading(false)
    }
  }, [maxSize, onChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFile(files[0])
    }
  }, [handleFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }, [handleFile])

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    onChange("")
    setPreview(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    onChange(url)
    setPreview(url)
    setError(null)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {label && <Label>{label}</Label>}
      
      {/* Upload Area */}
      <Card 
        className={cn(
          "border-2 border-dashed transition-colors cursor-pointer",
          isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400",
          isUploading && "opacity-50 pointer-events-none"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            {isUploading ? (
              <>
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm text-gray-600">جاري رفع الصورة...</p>
              </>
            ) : (
              <>
                <div className="p-3 rounded-full bg-gray-100">
                  <Upload className="w-6 h-6 text-gray-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">{placeholder}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF حتى {maxSize} ميجابايت
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInput}
        className="hidden"
      />

      {/* URL Input */}
      <div className="space-y-2">
        <Label htmlFor="image-url">أو أدخل رابط الصورة مباشرة</Label>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Input
            id="image-url"
            type="url"
            value={value}
            onChange={handleUrlChange}
            placeholder="https://example.com/image.jpg"
            className="flex-1"
          />
          {value && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleRemove}
              className="shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Preview */}
      {showPreview && preview && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>معاينة الصورة</Label>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => window.open(preview, '_blank')}
              >
                <Eye className="w-4 h-4 ml-2" />
                عرض
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemove}
              >
                <Trash2 className="w-4 h-4 ml-2" />
                حذف
              </Button>
            </div>
          </div>
          <div className={cn("relative overflow-hidden rounded-lg border", aspectRatio)}>
            <img
              src={preview}
              alt="معاينة الصورة"
              className="w-full h-full object-cover"
              onError={() => setError("فشل في تحميل الصورة")}
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Success Message */}
      {value && !error && !isUploading && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>تم رفع الصورة بنجاح</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
