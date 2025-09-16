// إعدادات البريد الإلكتروني المخصصة لـ Hostinger
export const emailConfig = {
  // إعدادات SMTP الخاصة بـ Hostinger
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // false for port 587, true for port 465
    auth: {
      user: process.env.SMTP_USER || '25_project@raf-advanced.sa',
      pass: process.env.SMTP_PASS || '25Project@raf',
    },
    tls: {
      rejectUnauthorized: false // مهم لـ Hostinger
    }
  },
  
  // إعدادات البريد الإلكتروني
  email: {
    from: process.env.SMTP_USER || '25_project@raf-advanced.sa',
    fromName: process.env.SMTP_FROM_NAME || 'نظام إدارة مشروع الزهراء السكني',
    recipient: process.env.RECIPIENT_EMAIL || '25_project@raf-advanced.sa'
  },
  
  // إعدادات إضافية لضمان التسليم
  delivery: {
    // إعدادات SPF و DKIM
    dkim: {
      domainName: 'raf-advanced.sa',
      keySelector: 'default',
      privateKey: process.env.DKIM_PRIVATE_KEY || ''
    },
    
    // إعدادات إضافية
    headers: {
      'X-Mailer': 'نظام إدارة مشروع الزهراء السكني',
      'X-Priority': '3',
      'X-MSMail-Priority': 'Normal'
    }
  }
}

// دالة للتحقق من صحة إعدادات البريد الإلكتروني
export const validateEmailConfig = () => {
  const required = ['SMTP_USER', 'SMTP_PASS']
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    console.warn(`⚠️ متغيرات البيئة المفقودة: ${missing.join(', ')}`)
    return false
  }
  
  return true
}

// دالة للحصول على إعدادات SMTP مع القيم الافتراضية
export const getSMTPConfig = () => {
  return {
    host: emailConfig.smtp.host,
    port: emailConfig.smtp.port,
    secure: emailConfig.smtp.secure,
    auth: emailConfig.smtp.auth,
    tls: emailConfig.smtp.tls
  }
}
