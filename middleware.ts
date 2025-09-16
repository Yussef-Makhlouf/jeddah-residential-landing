import { NextRequest, NextResponse } from 'next/server'
import { jwtService } from '@/lib/jwt-service'
import { config } from '@/lib/config'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is protected (admin routes)
  const isProtectedRoute = pathname.startsWith('/admin')
  const isAuthRoute = pathname.startsWith('/auth')

  // Get token from cookies
  const token = request.cookies.get('accessToken')?.value

  // If accessing protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If accessing protected route with token, verify it
  if (isProtectedRoute && token) {
    const payload = jwtService.decodeToken(token)
    
    if (!payload) {
      // Invalid token, redirect to login
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      const response = NextResponse.redirect(loginUrl)
      
      // Clear invalid cookies
      response.cookies.set('accessToken', '', { maxAge: 0 })
      response.cookies.set('refreshToken', '', { maxAge: 0 })
      
      return response
    }

    // Check if user has admin role for admin routes
    if (pathname.startsWith('/admin') && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  // If accessing auth routes while logged in, redirect to admin
  if (isAuthRoute && token) {
    const payload = jwtService.decodeToken(token)
    if (payload) {
      return NextResponse.redirect(new URL('/admin/control-panel', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/auth/:path*',
    '/api/admin/:path*'
  ]
}
