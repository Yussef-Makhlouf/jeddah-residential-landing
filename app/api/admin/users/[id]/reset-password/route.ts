import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { User } from '@/lib/models/User'
import { jwtService } from '@/lib/jwt-service'
import { z } from 'zod'

const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, 'كلمة السر يجب أن تكون 6 أحرف على الأقل')
})

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    // Verify admin access
    const token = request.cookies.get('accessToken')?.value
    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'غير مصرح بالوصول'
      }, { status: 401 })
    }

    const payload = jwtService.verifyToken(token)
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({
        success: false,
        message: 'غير مصرح بالوصول'
      }, { status: 403 })
    }

    const body = await request.json()
    const { newPassword } = resetPasswordSchema.parse(body)

    // Find user
    const user = await User.findById(id)
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'المستخدم غير موجود'
      }, { status: 404 })
    }

    // Update password
    user.password = newPassword
    await user.save()

    return NextResponse.json({
      success: true,
      message: 'تم إعادة تعيين كلمة السر بنجاح'
    })

  } catch (error) {
    console.error('Reset password error:', error)
    
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