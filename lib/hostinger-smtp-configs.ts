// إعدادات SMTP متعددة لـ Hostinger
export const hostingerSMTPConfigs = [
  // الإعداد الأساسي - mail.hostinger.com
  {
    name: 'Hostinger Mail Server (Primary)',
    config: {
      host: 'mail.hostinger.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || '25_project@raf-advanced.sa',
        pass: process.env.SMTP_PASS || '25Project@raf',
      },
      tls: {
        rejectUnauthorized: false
      }
    }
  },
  
  // الإعداد البديل - smtp.hostinger.com
  {
    name: 'Hostinger SMTP Server (Alternative)',
    config: {
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || '25_project@raf-advanced.sa',
        pass: process.env.SMTP_PASS || '25Project@raf',
      },
      tls: {
        rejectUnauthorized: false
      }
    }
  },
  
  // الإعداد مع SSL
  {
    name: 'Hostinger SSL (Port 465)',
    config: {
      host: 'mail.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || '25_project@raf-advanced.sa',
        pass: process.env.SMTP_PASS || '25Project@raf',
      },
      tls: {
        rejectUnauthorized: false
      }
    }
  },
  
  // الإعداد مع المنفذ 25
  {
    name: 'Hostinger Port 25',
    config: {
      host: 'mail.hostinger.com',
      port: 25,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || '25_project@raf-advanced.sa',
        pass: process.env.SMTP_PASS || '25Project@raf',
      },
      tls: {
        rejectUnauthorized: false
      }
    }
  },
  
  // إعداد Gmail كبديل
  {
    name: 'Gmail SMTP (Fallback)',
    config: {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || '25_project@raf-advanced.sa',
        pass: process.env.SMTP_PASS || '25Project@raf',
      }
    }
  }
]

// دالة للحصول على أفضل إعداد
export const getBestSMTPConfig = async () => {
  const nodemailer = require('nodemailer')
  
  for (const { name, config } of hostingerSMTPConfigs) {
    try {
      console.log(`🔍 اختبار ${name}...`)
      const transporter = nodemailer.createTransport(config)
      await transporter.verify()
      console.log(`✅ ${name} يعمل بنجاح!`)
      return { name, config }
    } catch (error) {
      console.log(`❌ ${name} فشل: ${(error as Error).message}`)
    }
  }
  
  throw new Error('جميع إعدادات SMTP فشلت')
}
