import jwt from 'jsonwebtoken'
import { IUser } from './models/User'
import { config } from './config'

interface JWTPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

class JWTService {
  private secret: string
  private expiresIn: string
  private refreshExpiresIn: string
  private issuer: string
  private audience: string

  constructor() {
    this.secret = config.jwt.secret
    this.expiresIn = config.jwt.expiresIn
    this.refreshExpiresIn = config.jwt.refreshExpiresIn
    this.issuer = config.jwt.issuer
    this.audience = config.jwt.audience
  }

  generateToken(user: IUser): string {
    const payload: JWTPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    }

    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
      issuer: this.issuer,
      audience: this.audience
    })
  }

  verifyToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, this.secret, {
        issuer: this.issuer,
        audience: this.audience
      }) as JWTPayload

      return decoded
    } catch (error) {
      console.error('JWT verification error:', error)
      return null
    }
  }

  // Simple JWT decoder for Edge Runtime (without verification)
  decodeToken(token: string): JWTPayload | null {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) {
        return null
      }

      const payload = JSON.parse(atob(parts[1])) as JWTPayload
      
      // Check if token is expired
      if (payload.exp && payload.exp < Date.now() / 1000) {
        return null
      }

      return payload
    } catch (error) {
      console.error('JWT decode error:', error)
      return null
    }
  }

  generateRefreshToken(user: IUser): string {
    const payload = {
      userId: user._id.toString(),
      type: 'refresh'
    }

    return jwt.sign(payload, this.secret, {
      expiresIn: this.refreshExpiresIn,
      issuer: this.issuer,
      audience: this.audience
    })
  }

  verifyRefreshToken(token: string): { userId: string } | null {
    try {
      const decoded = jwt.verify(token, this.secret, {
        issuer: this.issuer,
        audience: this.audience
      }) as any

      if (decoded.type !== 'refresh') {
        return null
      }

      return { userId: decoded.userId }
    } catch (error) {
      console.error('Refresh token verification error:', error)
      return null
    }
  }
}

export const jwtService = new JWTService()
