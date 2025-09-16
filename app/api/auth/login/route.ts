import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { User } from '@/lib/models/User'
import { jwtService } from '@/lib/jwt-service'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(6, 'كلمة السر يجب أن تكون 6 أحرف على الأقل')
})

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    // Find user by email
    const user = await User.findOne({ email, isActive: true })
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'البريد الإلكتروني أو كلمة السر غير صحيحة'
      }, { status: 401 })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: 'البريد الإلكتروني أو كلمة السر غير صحيحة'
      }, { status: 401 })
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate tokens
    const accessToken = jwtService.generateToken(user)
    const refreshToken = jwtService.generateRefreshToken(user)

    // Set HTTP-only cookies
    const response = NextResponse.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })

    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    
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
