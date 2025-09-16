"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    code: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
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

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح'
    }

    if (!formData.code) {
      newErrors.code = 'رمز التحقق مطلوب'
    } else if (formData.code.length !== 6) {
      newErrors.code = 'رمز التحقق يجب أن يكون 6 أرقام'
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

    const success = await resetPassword(
      formData.email,
      formData.code,
      formData.newPassword,
      formData.confirmPassword
    )
    
    if (success) {
      setIsSuccess(true)
    }

    setIsLoading(false)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-green-600">
                تم تغيير كلمة السر بنجاح
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  تم تغيير كلمة السر
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  يمكنك الآن تسجيل الدخول بكلمة السر الجديدة
                </p>
              </div>

              <Link href="/auth/login">
                <Button className="w-full">
                  تسجيل الدخول
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            إعادة تعيين كلمة السر
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            أدخل رمز التحقق وكلمة السر الجديدة
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">كلمة سر جديدة</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'border-red-500' : ''}
                  placeholder="أدخل بريدك الإلكتروني"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="code">رمز التحقق</Label>
                <Input
                  id="code"
                  name="code"
                  type="text"
                  maxLength={6}
                  required
                  value={formData.code}
                  onChange={handleInputChange}
                  className={errors.code ? 'border-red-500' : ''}
                  placeholder="أدخل رمز التحقق (6 أرقام)"
                />
                {errors.code && (
                  <p className="mt-1 text-sm text-red-600">{errors.code}</p>
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
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className={`pr-10 pl-10 ${errors.newPassword ? 'border-red-500' : ''}`}
                    placeholder="أدخل كلمة السر الجديدة"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 left-0 pl-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
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
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`pr-10 pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    placeholder="أعد إدخال كلمة السر الجديدة"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 left-0 pl-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
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

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
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
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/auth/login"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                العودة لتسجيل الدخول
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
