import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { User } from '@/lib/models/User'
import { OTP } from '@/lib/models/OTP'
import { z } from 'zod'

const resetPasswordSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  code: z.string().length(6, 'رمز التحقق يجب أن يكون 6 أرقام'),
  newPassword: z.string().min(6, 'كلمة السر الجديدة يجب أن تكون 6 أحرف على الأقل'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'كلمة السر غير متطابقة',
  path: ['confirmPassword']
})

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { email, code, newPassword } = resetPasswordSchema.parse(body)

    // Verify OTP
    const otpResult = await OTP.verifyOTP(email, code, 'password_reset')
    
    if (!otpResult.valid) {
      return NextResponse.json({
        success: false,
        message: otpResult.message
      }, { status: 400 })
    }

    // Find user
    const user = await User.findOne({ email, isActive: true })
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'المستخدم غير موجود'
      }, { status: 404 })
    }

    // Update password
    user.password = newPassword
    await user.save()

    // Mark OTP as used
    if (otpResult.otp) {
      otpResult.otp.isUsed = true
      await otpResult.otp.save()
    }

    return NextResponse.json({
      success: true,
      message: 'تم تغيير كلمة السر بنجاح'
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
