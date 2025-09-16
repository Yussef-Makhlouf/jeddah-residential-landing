import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { User } from '@/lib/models/User'
import { OTP } from '@/lib/models/OTP'
import { alternativeEmailService } from '@/lib/email-service-alternative'
import { z } from 'zod'

const forgotPasswordSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح')
})

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { email } = forgotPasswordSchema.parse(body)

    // Check if user exists
    const user = await User.findOne({ email, isActive: true })
    if (!user) {
      // Don't reveal if email exists or not for security
      return NextResponse.json({
        success: true,
        message: 'إذا كان البريد الإلكتروني مسجلاً، ستتلقى رمز التحقق'
      })
    }

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()

    // Delete any existing OTPs for this email
    await OTP.deleteMany({ email, type: 'password_reset' })

    // Create new OTP
    const otp = new OTP({
      email,
      code: otpCode,
      type: 'password_reset'
    })

    await otp.save()

    // Send OTP email
    const emailSent = await alternativeEmailService.sendPasswordResetOTP(email, otpCode, user.name)

    if (!emailSent) {
      console.error('Email service failed - SMTP not configured properly')
      // For development, return success but log the OTP
      console.log(`OTP for ${email}: ${otpCode}`)
      return NextResponse.json({
        success: true,
        message: 'تم إنشاء رمز التحقق بنجاح - يرجى التحقق من وحدة التحكم للحصول على الرمز',
        debug: process.env.NODE_ENV === 'development' ? { otp: otpCode } : undefined,
        otp: otpCode // Include OTP in response for immediate use
      })
    }

    return NextResponse.json({
      success: true,
      message: 'تم إرسال رمز التحقق إلى بريدك الإلكتروني'
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    
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
