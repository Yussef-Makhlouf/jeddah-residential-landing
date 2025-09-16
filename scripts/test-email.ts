// ملف اختبار البريد الإلكتروني
import { alternativeEmailService } from '../lib/email-service-alternative'
import { getSMTPConfig, validateEmailConfig } from '../lib/email-config'
import { getBestSMTPConfig, hostingerSMTPConfigs } from '../lib/hostinger-smtp-configs'
import nodemailer from 'nodemailer'

async function testEmailService() {
  console.log('🧪 بدء اختبار خدمة البريد الإلكتروني...\n')
  
  // التحقق من صحة الإعدادات
  console.log('1️⃣ التحقق من إعدادات البريد الإلكتروني:')
  const isValid = validateEmailConfig()
  console.log(`   النتيجة: ${isValid ? '✅ صحيح' : '❌ غير صحيح'}\n`)
  
  // عرض إعدادات SMTP
  console.log('2️⃣ إعدادات SMTP:')
  const smtpConfig = getSMTPConfig()
  console.log(`   الخادم: ${smtpConfig.host}`)
  console.log(`   المنفذ: ${smtpConfig.port}`)
  console.log(`   آمن: ${smtpConfig.secure}`)
  console.log(`   المستخدم: ${smtpConfig.auth?.user}`)
  console.log(`   كلمة المرور: ${smtpConfig.auth?.pass ? '***محددة***' : '❌ غير محددة'}\n`)
  
  // اختبار الاتصال بـ SMTP
  console.log('3️⃣ اختبار الاتصال بـ SMTP:')
  try {
    const bestConfig = await getBestSMTPConfig()
    console.log(`   ✅ أفضل إعداد SMTP: ${bestConfig.name}\n`)
  } catch (error) {
    console.log(`   ❌ فشل في العثور على إعداد SMTP يعمل: ${(error as Error).message}\n`)
  }
  
  // اختبار إرسال بريد إلكتروني
  console.log('4️⃣ اختبار إرسال بريد إلكتروني:')
  try {
    const testEmail = '25_project@raf-advanced.sa'
    const result = await alternativeEmailService.sendPasswordResetOTP(
      testEmail,
      '123456',
      'مستخدم الاختبار'
    )
    
    if (result) {
      console.log('   ✅ تم إرسال البريد الإلكتروني بنجاح')
    } else {
      console.log('   ❌ فشل في إرسال البريد الإلكتروني')
    }
  } catch (error) {
    console.log(`   ❌ خطأ في إرسال البريد الإلكتروني: ${(error as Error).message}`)
  }
  
  console.log('\n🏁 انتهى الاختبار')
}

// تشغيل الاختبار
if (require.main === module) {
  testEmailService().catch(console.error)
}

export { testEmailService }
