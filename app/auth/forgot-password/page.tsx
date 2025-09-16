"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, ArrowRight } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [otpCode, setOtpCode] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError('البريد الإلكتروني مطلوب')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('البريد الإلكتروني غير صحيح')
      return
    }

    setIsLoading(true)
    setError('')

    const result = await forgotPassword(email)
    
    if (result.success) {
      setIsSubmitted(true)
      if (result.otp) {
        setOtpCode(result.otp)
      }
    }

    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-green-600">
                تم إرسال رمز التحقق
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  تحقق من بريدك الإلكتروني
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  تم إرسال رمز التحقق إلى <strong>{email}</strong>
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  يرجى التحقق من صندوق الوارد أو مجلد الرسائل المزعجة
                </p>
                
                {otpCode && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium mb-2">
                      رمز التحقق (للاستخدام الفوري):
                    </p>
                    <div className="text-2xl font-bold text-blue-900 tracking-wider">
                      {otpCode}
                    </div>
                    <p className="text-xs text-blue-600 mt-2">
                      هذا الرمز صالح لمدة 15 دقيقة
                    </p>
                  </div>
                )}
              </div>

              <Alert>
                <AlertDescription>
                  رمز التحقق صالح لمدة 15 دقيقة فقط
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Link href="/auth/reset-password">
                  <Button className="w-full">
                    إدخال رمز التحقق
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </Link>
                
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full">
                    العودة لتسجيل الدخول
                  </Button>
                </Link>
              </div>
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
            نسيان كلمة السر
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            أدخل بريدك الإلكتروني لإرسال رمز التحقق
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">إعادة تعيين كلمة السر</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    className={`pr-10 ${error ? 'border-red-500' : ''}`}
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>
                {error && (
                  <p className="mt-1 text-sm text-red-600">{error}</p>
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
                    جاري الإرسال...
                  </>
                ) : (
                  'إرسال رمز التحقق'
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
