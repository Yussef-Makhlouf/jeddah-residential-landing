// Configuration file for the application
export const config = {
  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'jeddah-residential-landing-super-secret-jwt-key-2024-production-ready',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshExpiresIn: '30d',
    issuer: 'jeddah-residential-landing',
    audience: 'admin-panel'
  },

  // Email Configuration
  email: {
    host: process.env.SMTP_HOST || 'mail.raf-advanced.sa',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '25_project@raf-advanced.sa',
    pass: process.env.SMTP_PASS || '25Project@raf',
    fromName: process.env.SMTP_FROM_NAME || 'نظام إدارة مشروع الزهراء السكني'
  },

  // Application Configuration
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    baseUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    secret: process.env.NEXTAUTH_SECRET || 'jeddah-residential-landing-super-secret-jwt-key-2024-production-ready'
  },

  // File Upload Configuration
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB
    uploadDir: process.env.UPLOAD_DIR || 'public/uploads',
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },

  // OTP Configuration
  otp: {
    length: 6,
    expiresIn: 15 * 60 * 1000, // 15 minutes
    maxAttempts: 3
  },

  // Password Configuration
  password: {
    minLength: 6,
    bcryptRounds: 12
  }
}
