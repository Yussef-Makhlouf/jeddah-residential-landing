import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { User } from '@/lib/models/User'
import { jwtService } from '@/lib/jwt-service'
import { z } from 'zod'

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'كلمة السر الحالية مطلوبة'),
  newPassword: z.string().min(6, 'كلمة السر الجديدة يجب أن تكون 6 أحرف على الأقل'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'كلمة السر غير متطابقة',
  path: ['confirmPassword']
})

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    // Get token from cookies
    const token = request.cookies.get('accessToken')?.value
    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'غير مصرح بالوصول'
      }, { status: 401 })
    }

    // Verify token
    const payload = jwtService.verifyToken(token)
    if (!payload) {
      return NextResponse.json({
        success: false,
        message: 'رمز المصادقة غير صحيح'
      }, { status: 401 })
    }

    const body = await request.json()
    const { currentPassword, newPassword } = changePasswordSchema.parse(body)

    // Find user
    const user = await User.findById(payload.userId)
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'المستخدم غير موجود'
      }, { status: 404 })
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword)
    if (!isCurrentPasswordValid) {
      return NextResponse.json({
        success: false,
        message: 'كلمة السر الحالية غير صحيحة'
      }, { status: 400 })
    }

    // Update password
    user.password = newPassword
    await user.save()

    return NextResponse.json({
      success: true,
      message: 'تم تغيير كلمة السر بنجاح'
    })

  } catch (error) {
    console.error('Change password error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'البيانات المدخلة غير صحيحة',
        errors: error.errors.map(err => ({
          field: err.path[0],
          message: err.message
        }))
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      message: 'حدث خطأ في الخادم'
    }, { status: 500 })
  }
}
