import mongoose, { Document, Schema } from 'mongoose'
import { config } from '../config'

export interface IOTP extends Document {
  email: string
  code: string
  type: 'password_reset' | 'email_verification'
  expiresAt: Date
  isUsed: boolean
  attempts: number
  createdAt: Date
  updatedAt: Date
}

export interface IOTPModel extends mongoose.Model<IOTP> {
  generateOTP(): string
  verifyOTP(email: string, code: string, type: string): Promise<{ valid: boolean; message?: string; otp?: IOTP }>
}

const OTPSchema = new Schema<IOTP>({
  email: {
    type: String,
    required: [true, 'البريد الإلكتروني مطلوب'],
    lowercase: true,
    trim: true
  },
  code: {
    type: String,
    required: [true, 'رمز التحقق مطلوب'],
    length: 6
  },
  type: {
    type: String,
    enum: ['password_reset', 'email_verification'],
    required: [true, 'نوع رمز التحقق مطلوب']
  },
  expiresAt: {
    type: Date,
    required: [true, 'تاريخ انتهاء الصلاحية مطلوب'],
    default: () => new Date(Date.now() + config.otp.expiresIn)
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  attempts: {
    type: Number,
    default: 0,
    max: config.otp.maxAttempts
  }
}, {
  timestamps: true
})

// Index for cleanup
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

// Static method to generate OTP
OTPSchema.statics.generateOTP = function(): string {
  const length = config.otp.length
  const min = Math.pow(10, length - 1)
  const max = Math.pow(10, length) - 1
  return Math.floor(min + Math.random() * (max - min + 1)).toString()
}

// Static method to verify OTP
OTPSchema.statics.verifyOTP = async function(email: string, code: string, type: string) {
  const otp = await this.findOne({
    email,
    code,
    type,
    isUsed: false,
    expiresAt: { $gt: new Date() }
  })

  if (!otp) {
    return { valid: false, message: 'رمز التحقق غير صحيح أو منتهي الصلاحية' }
  }

  if (otp.attempts >= config.otp.maxAttempts) {
    return { valid: false, message: 'تم تجاوز عدد المحاولات المسموح' }
  }

  return { valid: true, otp }
}

export const OTP = mongoose.models.OTP || mongoose.model<IOTP, IOTPModel>('OTP', OTPSchema)
