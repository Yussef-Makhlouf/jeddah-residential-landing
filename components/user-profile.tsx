"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ChangePasswordModal } from '@/components/change-password-modal'
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  LogOut, 
  Settings,
  Clock
} from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

interface UserData {
  id: string
  email: string
  name: string
  role: string
  lastLogin?: string
}

export function UserProfile() {
  const { user, logout, isLoading } = useAuth()

  const handleLogout = async () => {
    await logout()
    window.location.href = '/auth/login'
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'لم يتم تسجيل الدخول'
    
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge variant="default" className="bg-red-100 text-red-800">مدير</Badge>
      case 'user':
        return <Badge variant="secondary">مستخدم</Badge>
      default:
        return <Badge variant="outline">غير محدد</Badge>
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            فشل في تحميل بيانات المستخدم
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="w-5 h-5 ml-2" />
          الملف الشخصي
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                {getRoleBadge(user.role)}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{user.email}</span>
            </div>

            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Shield className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                الصلاحية: {user.role === 'admin' ? 'مدير' : 'مستخدم'}
              </span>
            </div>

            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                آخر دخول: {formatDate(user.lastLogin)}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Actions */}
        <div className="space-y-3">
          <ChangePasswordModal>
            <Button variant="outline" className="w-full justify-start">
              <Settings className="w-4 h-4 ml-2" />
              تغيير كلمة السر
            </Button>
          </ChangePasswordModal>

          <Button 
            variant="outline" 
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
