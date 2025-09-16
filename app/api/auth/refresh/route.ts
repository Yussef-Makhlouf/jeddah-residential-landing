import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { User } from '@/lib/models/User'
import { jwtService } from '@/lib/jwt-service'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    // Get refresh token from cookies
    const refreshToken = request.cookies.get('refreshToken')?.value
    if (!refreshToken) {
      return NextResponse.json({
        success: false,
        message: 'رمز التحديث غير موجود'
      }, { status: 401 })
    }

    // Verify refresh token
    const payload = jwtService.verifyRefreshToken(refreshToken)
    if (!payload) {
      return NextResponse.json({
        success: false,
        message: 'رمز التحديث غير صحيح أو منتهي الصلاحية'
      }, { status: 401 })
    }

    // Find user
    const user = await User.findById(payload.userId).select('-password')
    if (!user || !user.isActive) {
      return NextResponse.json({
        success: false,
        message: 'المستخدم غير موجود أو غير نشط'
      }, { status: 404 })
    }

    // Generate new tokens
    const newAccessToken = jwtService.generateToken(user)
    const newRefreshToken = jwtService.generateRefreshToken(user)

    // Set new cookies
    const response = NextResponse.json({
      success: true,
      message: 'تم تحديث الرمز بنجاح',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })

    response.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    })

    return response

  } catch (error) {
    console.error('Token refresh error:', error)
    return NextResponse.json({
      success: false,
      message: 'حدث خطأ في الخادم'
    }, { status: 500 })
  }
}
