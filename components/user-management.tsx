"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  User as UserIcon,
  Mail,
  Calendar,
  Key,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react'
import { toast } from 'react-toastify'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  isActive: boolean
  lastLogin?: string
  createdAt: string
  updatedAt: string
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [createForm, setCreateForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' as 'admin' | 'user'
  })

  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    role: 'user' as 'admin' | 'user',
    isActive: true
  })

  const [resetPasswordForm, setResetPasswordForm] = useState({
    newPassword: ''
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
      } else {
        toast.error('فشل في تحميل المستخدمين')
      }
    } catch (error) {
      toast.error('حدث خطأ في الاتصال')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createForm)
      })

      const data = await response.json()

      if (data.success) {
        toast.success(data.message)
        setIsCreateModalOpen(false)
        setCreateForm({ name: '', email: '', password: '', role: 'user' })
        fetchUsers()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('حدث خطأ في الاتصال')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editForm)
      })

      const data = await response.json()

      if (data.success) {
        toast.success(data.message)
        setIsEditModalOpen(false)
        setSelectedUser(null)
        fetchUsers()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('حدث خطأ في الاتصال')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resetPasswordForm)
      })

      const data = await response.json()

      if (data.success) {
        toast.success(data.message)
        setIsResetPasswordModalOpen(false)
        setSelectedUser(null)
        setResetPasswordForm({ newPassword: '' })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('حدث خطأ في الاتصال')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (data.success) {
        toast.success(data.message)
        fetchUsers()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('حدث خطأ في الاتصال')
    }
  }

  const openEditModal = (user: User) => {
    setSelectedUser(user)
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive
    })
    setIsEditModalOpen(true)
  }

  const openResetPasswordModal = (user: User) => {
    setSelectedUser(user)
    setResetPasswordForm({ newPassword: '' })
    setIsResetPasswordModalOpen(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getRoleBadge = (role: string) => {
    return role === 'admin' 
      ? <Badge variant="default" className="bg-red-100 text-red-800">مدير</Badge>
      : <Badge variant="secondary">مستخدم</Badge>
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 ml-2" />
              إدارة المستخدمين
            </CardTitle>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة مستخدم جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>إضافة مستخدم جديد</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div>
                    <Label htmlFor="create-name">الاسم</Label>
                    <Input
                      id="create-name"
                      value={createForm.name}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="create-email">البريد الإلكتروني</Label>
                    <Input
                      id="create-email"
                      type="email"
                      value={createForm.email}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="create-password">كلمة السر</Label>
                    <div className="relative">
                      <Input
                        id="create-password"
                        type={showPassword ? 'text' : 'password'}
                        value={createForm.password}
                        onChange={(e) => setCreateForm(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <button
                        type="button"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="create-role">الصلاحية</Label>
                    <Select value={createForm.role} onValueChange={(value: 'admin' | 'user') => setCreateForm(prev => ({ ...prev, role: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">مستخدم</SelectItem>
                        <SelectItem value="admin">مدير</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2 rtl:space-x-reverse pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCreateModalOpen(false)}
                      className="flex-1"
                    >
                      إلغاء
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                          جاري الإنشاء...
                        </>
                      ) : (
                        'إنشاء المستخدم'
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <h3 className="font-medium">{user.name}</h3>
                      {getRoleBadge(user.role)}
                      {!user.isActive && <Badge variant="outline" className="text-red-600">غير نشط</Badge>}
                    </div>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 ml-1" />
                        {user.email}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 ml-1" />
                        {formatDate(user.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(user)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openResetPasswordModal(user)}
                  >
                    <Key className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit User Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل المستخدم</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditUser} className="space-y-4">
            <div>
              <Label htmlFor="edit-name">الاسم</Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-email">البريد الإلكتروني</Label>
              <Input
                id="edit-email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-role">الصلاحية</Label>
              <Select value={editForm.role} onValueChange={(value: 'admin' | 'user') => setEditForm(prev => ({ ...prev, role: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">مستخدم</SelectItem>
                  <SelectItem value="admin">مدير</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="checkbox"
                id="edit-active"
                checked={editForm.isActive}
                onChange={(e) => setEditForm(prev => ({ ...prev, isActive: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="edit-active">نشط</Label>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1"
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    جاري التحديث...
                  </>
                ) : (
                  'تحديث المستخدم'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Reset Password Modal */}
      <Dialog open={isResetPasswordModalOpen} onOpenChange={setIsResetPasswordModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إعادة تعيين كلمة السر</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <Alert>
              <AlertDescription>
                سيتم إعادة تعيين كلمة سر المستخدم: <strong>{selectedUser?.name}</strong>
              </AlertDescription>
            </Alert>
            <div>
              <Label htmlFor="reset-password">كلمة السر الجديدة</Label>
              <div className="relative">
                <Input
                  id="reset-password"
                  type={showPassword ? 'text' : 'password'}
                  value={resetPasswordForm.newPassword}
                  onChange={(e) => setResetPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  required
                />
                <button
                  type="button"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsResetPasswordModalOpen(false)}
                className="flex-1"
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    جاري التحديث...
                  </>
                ) : (
                  'إعادة تعيين كلمة السر'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
