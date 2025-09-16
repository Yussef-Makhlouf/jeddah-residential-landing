import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import { config } from '../config'

export interface IUser extends Document {
  email: string
  password: string
  name: string
  role: 'admin' | 'user'
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, 'البريد الإلكتروني مطلوب'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'البريد الإلكتروني غير صحيح']
  },
  password: {
    type: String,
    required: [true, 'كلمة السر مطلوبة'],
    minlength: [config.password.minLength, `كلمة السر يجب أن تكون ${config.password.minLength} أحرف على الأقل`]
  },
  name: {
    type: String,
    required: [true, 'الاسم مطلوب'],
    trim: true,
    maxlength: [50, 'الاسم يجب أن يكون أقل من 50 حرف']
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
})

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  try {
    const salt = await bcrypt.genSalt(config.password.bcryptRounds)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error as Error)
  }
})

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// Remove password from JSON output
UserSchema.methods.toJSON = function() {
  const userObject = this.toObject()
  delete userObject.password
  return userObject
}

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
