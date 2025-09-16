import nodemailer from 'nodemailer'
import { config } from './config'

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    // Only create transporter if email is properly configured
    if (config.email.user && config.email.pass && config.email.pass !== 'your-app-password') {
      this.transporter = nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port,
        secure: config.email.secure,
        auth: {
          user: config.email.user,
          pass: config.email.pass
        },
        tls: {
          rejectUnauthorized: false // Allow self-signed certificates
        },
        debug: true, // Enable debug mode
        logger: true // Enable logging
      })
      
      // Verify connection configuration
      this.transporter.verify((error, success) => {
        if (error) {
          console.log('Email service verification failed:', error)
        } else {
          console.log('Email service is ready to send messages')
        }
      })
    } else {
      console.log('Email service not configured - using fallback mode')
      this.transporter = null as any
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    if (!this.transporter) {
      console.log('Email service not configured - skipping email send')
      return false
    }
    
    try {
      await this.transporter.sendMail({
        from: `"${config.email.fromName}" <${config.email.user}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text
      })
      return true
    } catch (error) {
      console.error('Email sending error:', error)
      return false
    }
  }

  async sendPasswordResetOTP(email: string, otpCode: string, userName: string): Promise<boolean> {
    const subject = 'إعادة تعيين كلمة السر - رمز التحقق'
    const html = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>إعادة تعيين كلمة السر</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e0e0e0;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 10px;
          }
          .otp-code {
            background-color: #f8f9fa;
            border: 2px dashed #2563eb;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
            border-radius: 8px;
          }
          .otp-number {
            font-size: 32px;
            font-weight: bold;
            color: #2563eb;
            letter-spacing: 5px;
            margin: 10px 0;
          }
          .warning {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            color: #666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">نظام إدارة الموقع</div>
            <h1>إعادة تعيين كلمة السر</h1>
          </div>
          
          <p>مرحباً ${userName}،</p>
          
          <p>تلقينا طلباً لإعادة تعيين كلمة السر لحسابك. استخدم رمز التحقق التالي:</p>
          
          <div class="otp-code">
            <p><strong>رمز التحقق:</strong></p>
            <div class="otp-number">${otpCode}</div>
            <p>هذا الرمز صالح لمدة 15 دقيقة</p>
          </div>
          
          <div class="warning">
            <strong>تنبيه:</strong> إذا لم تطلب إعادة تعيين كلمة السر، يرجى تجاهل هذا البريد الإلكتروني.
          </div>
          
          <p>إذا واجهت أي مشاكل، يرجى التواصل معنا.</p>
          
          <div class="footer">
            <p>هذا بريد إلكتروني تلقائي، يرجى عدم الرد عليه.</p>
            <p>&copy; ${new Date().getFullYear()} جميع الحقوق محفوظة</p>
          </div>
        </div>
      </body>
      </html>
    `

    return this.sendEmail({
      to: email,
      subject,
      html
    })
  }

  async sendWelcomeEmail(email: string, userName: string): Promise<boolean> {
    const subject = 'مرحباً بك في نظام إدارة الموقع'
    const html = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>مرحباً بك</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e0e0e0;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 10px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            color: #666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">نظام إدارة الموقع</div>
            <h1>مرحباً بك!</h1>
          </div>
          
          <p>مرحباً ${userName}،</p>
          
          <p>تم إنشاء حسابك بنجاح في نظام إدارة الموقع. يمكنك الآن تسجيل الدخول والاستفادة من جميع الميزات المتاحة.</p>
          
          <p>إذا كان لديك أي استفسارات، لا تتردد في التواصل معنا.</p>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} جميع الحقوق محفوظة</p>
          </div>
        </div>
      </body>
      </html>
    `

    return this.sendEmail({
      to: email,
      subject,
      html
    })
  }
}

export const emailService = new EmailService()
