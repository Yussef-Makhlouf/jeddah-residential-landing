"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Lock, Eye, EyeOff, Settings } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

interface ChangePasswordModalProps {
  children?: React.ReactNode
}

export function ChangePasswordModal({ children }: ChangePasswordModalProps) {
  const { changePassword } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'كلمة السر الحالية مطلوبة'
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'كلمة السر الجديدة مطلوبة'
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'كلمة السر يجب أن تكون 6 أحرف على الأقل'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'تأكيد كلمة السر مطلوب'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمة السر غير متطابقة'
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'كلمة السر الجديدة يجب أن تكون مختلفة عن الحالية'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    const success = await changePassword(
      formData.currentPassword,
      formData.newPassword,
      formData.confirmPassword
    )
    
    if (success) {
      setIsOpen(false)
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    }

    setIsLoading(false)
  }

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 ml-2" />
            تغيير كلمة السر
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>تغيير كلمة السر</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">كلمة السر الحالية</Label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="currentPassword"
                name="currentPassword"
                type={showPasswords.current ? 'text' : 'password'}
                required
                value={formData.currentPassword}
                onChange={handleInputChange}
                className={`pr-10 pl-10 ${errors.currentPassword ? 'border-red-500' : ''}`}
                placeholder="أدخل كلمة السر الحالية"
              />
              <button
                type="button"
                className="absolute inset-y-0 left-0 pl-3 flex items-center"
                onClick={() => togglePasswordVisibility('current')}
              >
                {showPasswords.current ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
            )}
          </div>

          <div>
            <Label htmlFor="newPassword">كلمة السر الجديدة</Label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="newPassword"
                name="newPassword"
                type={showPasswords.new ? 'text' : 'password'}
                required
                value={formData.newPassword}
                onChange={handleInputChange}
                className={`pr-10 pl-10 ${errors.newPassword ? 'border-red-500' : ''}`}
                placeholder="أدخل كلمة السر الجديدة"
              />
              <button
                type="button"
                className="absolute inset-y-0 left-0 pl-3 flex items-center"
                onClick={() => togglePasswordVisibility('new')}
              >
                {showPasswords.new ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">تأكيد كلمة السر</Label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPasswords.confirm ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`pr-10 pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                placeholder="أعد إدخال كلمة السر الجديدة"
              />
              <button
                type="button"
                className="absolute inset-y-0 left-0 pl-3 flex items-center"
                onClick={() => togglePasswordVisibility('confirm')}
              >
                {showPasswords.confirm ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex space-x-2 rtl:space-x-reverse pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  جاري التحديث...
                </>
              ) : (
                'تغيير كلمة السر'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
