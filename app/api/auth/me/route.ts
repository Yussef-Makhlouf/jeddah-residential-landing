import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { User } from '@/lib/models/User'
import { jwtService } from '@/lib/jwt-service'

export async function GET(request: NextRequest) {
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

    // Find user
    const user = await User.findById(payload.userId).select('-password')
    if (!user || !user.isActive) {
      return NextResponse.json({
        success: false,
        message: 'المستخدم غير موجود أو غير نشط'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        lastLogin: user.lastLogin
      }
    })

  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({
      success: false,
      message: 'حدث خطأ في الخادم'
    }, { status: 500 })
  }
}
