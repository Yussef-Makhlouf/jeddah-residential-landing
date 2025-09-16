"use client"

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Shield, Home, ArrowRight } from 'lucide-react'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            غير مصرح بالوصول
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            ليس لديك صلاحية للوصول إلى هذه الصفحة
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-red-600">
              خطأ في الصلاحيات
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                الصفحة التي تحاول الوصول إليها تتطلب صلاحيات إدارية
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Link href="/auth/login">
                <Button className="w-full">
                  تسجيل الدخول بحساب آخر
                  <ArrowRight className="w-4 h-4 mr-2" />
                </Button>
              </Link>
              
              <Link href="/">
                <Button variant="outline" className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  العودة للصفحة الرئيسية
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                إذا كنت تعتقد أن هذا خطأ، يرجى التواصل مع المسؤول
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
