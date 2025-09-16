import nodemailer from 'nodemailer'
import { config } from './config'
import { getSMTPConfig, validateEmailConfig } from './email-config'

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

class AlternativeEmailService {
  private transporters: nodemailer.Transporter[] = []

  constructor() {
    this.initializeTransporters()
  }

  private initializeTransporters() {
    // التحقق من صحة الإعدادات
    if (!validateEmailConfig()) {
      console.warn('⚠️ إعدادات البريد الإلكتروني غير مكتملة، سيتم استخدام القيم الافتراضية');
    }

    // Try multiple SMTP configurations
    const smtpConfigs = [
      // Hostinger SMTP (Primary) - smtp.hostinger.com
      {
        name: 'Hostinger SMTP (Primary)',
        config: {
          host: 'smtp.hostinger.com',
          port: 587,
          secure: false,
          auth: {
            user: config.email.user,
            pass: config.email.pass
          },
          tls: {
            rejectUnauthorized: false
          }
        }
      },
      // Hostinger SMTP (Alternative) - mail.hostinger.com
      {
        name: 'Hostinger SMTP (Alternative)',
        config: {
          host: 'mail.hostinger.com',
          port: 587,
          secure: false,
          auth: {
            user: config.email.user,
            pass: config.email.pass
          },
          tls: {
            rejectUnauthorized: false
          }
        }
      },
      // Hostinger SMTP (SSL) - Port 465
      {
        name: 'Hostinger SMTP (SSL)',
        config: {
          host: 'smtp.hostinger.com',
          port: 465,
          secure: true,
          auth: {
            user: config.email.user,
            pass: config.email.pass
          },
          tls: {
            rejectUnauthorized: false
          }
        }
      },
      // Generic SMTP with TLS (fallback)
      {
        name: 'Generic SMTP',
        config: getSMTPConfig()
      }
    ]

    // Create transporters for each configuration
    smtpConfigs.forEach(({ name, config: smtpConfig }) => {
      try {
        const transporter = nodemailer.createTransport(smtpConfig)
        this.transporters.push(transporter)
        console.log(`✅ ${name} transporter created`)
      } catch (error) {
        console.log(`❌ Failed to create ${name} transporter:`, error)
      }
    })
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    if (this.transporters.length === 0) {
      console.log('No email transporters available')
      return false
    }

    // Try each transporter until one works
    for (let i = 0; i < this.transporters.length; i++) {
      const transporter = this.transporters[i]
      
      try {
        // Verify transporter first
        await transporter.verify()
        console.log(`✅ Transporter ${i + 1} verified successfully`)

        // Send email
        await transporter.sendMail({
          from: `"${config.email.fromName}" <${config.email.user}>`,
          to: options.to,
          subject: options.subject,
          html: options.html,
          text: options.text
        })

        console.log(`✅ Email sent successfully using transporter ${i + 1}`)
        return true

      } catch (error) {
        console.log(`❌ Transporter ${i + 1} failed:`, (error as Error).message)
        
        // If this is the last transporter, log the error
        if (i === this.transporters.length - 1) {
          console.error('All email transporters failed:', error)
        }
      }
    }

    return false
  }

  async sendPasswordResetOTP(email: string, otpCode: string, userName: string): Promise<boolean> {
    const subject = '🔐 إعادة تعيين كلمة السر - رمز التحقق'
    const html = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>إعادة تعيين كلمة السر - رمز التحقق</title>
        <style>
          body {
            font-family: 'Segoe UI', 'Tahoma', 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
          }
          .container {
            background-color: #ffffff;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            border: 1px solid #e2e8f0;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 25px;
            border-bottom: 3px solid #3b82f6;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 15px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .subtitle {
            color: #64748b;
            font-size: 16px;
            margin-top: 10px;
          }
          .otp-code {
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            border: 3px dashed #3b82f6;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
            border-radius: 12px;
            position: relative;
          }
          .otp-code::before {
            content: "🔐";
            position: absolute;
            top: -15px;
            right: 20px;
            background: #3b82f6;
            color: white;
            padding: 8px 12px;
            border-radius: 50%;
            font-size: 16px;
          }
          .otp-number {
            font-size: 36px;
            font-weight: bold;
            color: #1e40af;
            letter-spacing: 8px;
            margin: 15px 0;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            font-family: 'Courier New', monospace;
          }
          .otp-label {
            font-size: 18px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 10px;
          }
          .otp-timer {
            font-size: 14px;
            color: #ef4444;
            font-weight: 600;
            margin-top: 10px;
          }
          .warning {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border: 2px solid #f59e0b;
            color: #92400e;
            padding: 20px;
            border-radius: 10px;
            margin: 25px 0;
            font-weight: 500;
          }
          .warning-icon {
            font-size: 20px;
            margin-left: 10px;
          }
          .info-box {
            background-color: #f0f9ff;
            border: 1px solid #0ea5e9;
            padding: 20px;
            border-radius: 10px;
            margin: 25px 0;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 25px;
            border-top: 2px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
          .company-info {
            background-color: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            font-size: 12px;
            color: #64748b;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo"> نظام إدارة مشروع الزهراء السكني</div>
            <h1 style="color: #1e40af; margin: 0;">إعادة تعيين كلمة السر</h1>
            <p class="subtitle">رمز التحقق الأمني</p>
          </div>
          
          <p style="font-size: 16px; color: #374151;">مرحباً <strong>${userName}</strong>،</p>
          
          <p style="font-size: 16px; color: #4b5563;">
            تلقينا طلباً لإعادة تعيين كلمة السر لحسابك في نظام إدارة الموقع. 
            استخدم رمز التحقق التالي لإكمال العملية:
          </p>
          
          <div class="otp-code">
            <div class="otp-label">رمز التحقق الأمني</div>
            <div class="otp-number">${otpCode}</div>
            <div class="otp-timer">⏰ صالح لمدة 15 دقيقة فقط</div>
          </div>
    
          
   
          
          <div class="footer">
            <p style="margin: 0 0 10px 0;">📧 هذا بريد إلكتروني تلقائي من النظام</p>
            <div class="company-info">
              <strong>شركة راف العقاريه</strong><br>
              مشروع25  الزهراء السكني - جدة<br>
              📅 ${new Date().toLocaleDateString('ar-SA')} | ⏰ ${new Date().toLocaleTimeString('ar-SA')}
            </div>
            <p style="margin: 15px 0 0 0; font-size: 12px;">
              &copy; ${new Date().getFullYear()} جميع الحقوق محفوظة لشركة راف العقاريه
            </p>
          </div>
        </div>
      </body>
      </html>
    `

    console.log(`📧 Sending OTP email to: ${email}`)
    console.log(`📧 Email subject: ${subject}`)
    console.log(`📧 OTP code: ${otpCode}`)
    
    const textContent = `
مرحباً ${userName}،

تلقينا طلباً لإعادة تعيين كلمة السر لحسابك في نظام إدارة مشروع الزهراء السكني.

رمز التحقق الأمني: ${otpCode}

هذا الرمز صالح لمدة 15 دقيقة فقط.



شركة راف العقاريه
مشروع 25 الزهراء السكني - جدة
${new Date().toLocaleDateString('ar-SA')}
    `.trim()

    const result = this.sendEmail({
      to: email,
      subject,
      html,
      text: textContent
    })
    
    console.log(`📧 Email sending result: ${result}`)
    return result
  }
}

export const alternativeEmailService = new AlternativeEmailService()
