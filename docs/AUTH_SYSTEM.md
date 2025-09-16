# نظام المصادقة المتكامل

هذا المستند يوضح نظام المصادقة المتكامل الذي تم تطويره للموقع.

## الميزات

### ✅ **الميزات المنجزة**

1. **نظام تسجيل الدخول والخروج**
   - تسجيل دخول آمن مع JWT
   - تسجيل خروج مع إزالة الكوكيز
   - حماية الصفحات بـ middleware

2. **نظام إعادة تعيين كلمة السر**
   - إرسال OTP عبر البريد الإلكتروني
   - التحقق من OTP
   - إعادة تعيين كلمة السر

3. **تغيير كلمة السر**
   - تغيير كلمة السر للمستخدمين المسجلين
   - التحقق من كلمة السر الحالية

4. **إدارة المستخدمين**
   - إنشاء حسابات جديدة
   - إدارة الملف الشخصي
   - نظام الصلاحيات (admin/user)

5. **الأمان**
   - تشفير كلمات السر بـ bcrypt
   - JWT tokens مع انتهاء صلاحية
   - HTTP-only cookies
   - حماية من CSRF

6. **إدارة الحالة**
   - React Context للتحكم في حالة المصادقة
   - Hook مخصص `useAuth` لسهولة الاستخدام
   - تحديث تلقائي للحالة

7. **رسائل المستخدم**
   - Toast notifications لجميع العمليات
   - رسائل نجاح وخطأ باللغة العربية
   - واجهة مستخدم متجاوبة

## الملفات الرئيسية

### النماذج (Models)
- `lib/models/User.ts` - نموذج المستخدم
- `lib/models/OTP.ts` - نموذج رموز التحقق

### الخدمات (Services)
- `lib/email-service.ts` - خدمة إرسال البريد الإلكتروني
- `lib/jwt-service.ts` - خدمة JWT tokens

### API Endpoints
- `app/api/auth/login/route.ts` - تسجيل الدخول
- `app/api/auth/logout/route.ts` - تسجيل الخروج
- `app/api/auth/forgot-password/route.ts` - طلب إعادة تعيين كلمة السر
- `app/api/auth/reset-password/route.ts` - إعادة تعيين كلمة السر
- `app/api/auth/change-password/route.ts` - تغيير كلمة السر
- `app/api/auth/me/route.ts` - معلومات المستخدم الحالي
- `app/api/auth/refresh/route.ts` - تحديث الرمز

### Admin API Endpoints
- `app/api/admin/users/route.ts` - إدارة المستخدمين (GET, POST)
- `app/api/admin/users/[id]/route.ts` - إدارة مستخدم محدد (GET, PUT, DELETE)
- `app/api/admin/users/[id]/reset-password/route.ts` - إعادة تعيين كلمة السر

### الصفحات
- `app/auth/login/page.tsx` - صفحة تسجيل الدخول
- `app/auth/forgot-password/page.tsx` - صفحة نسيان كلمة السر
- `app/auth/reset-password/page.tsx` - صفحة إعادة تعيين كلمة السر
- `app/unauthorized/page.tsx` - صفحة غير مصرح بالوصول

### المكونات
- `components/change-password-modal.tsx` - مودال تغيير كلمة السر
- `components/user-profile.tsx` - مكون الملف الشخصي
- `components/user-management.tsx` - مكون إدارة المستخدمين
- `hooks/use-auth.tsx` - Hook المصادقة

### الحماية
- `middleware.ts` - middleware لحماية الصفحات

## الإعداد

### 1. متغيرات البيئة

أنشئ ملف `.env.local` واملأ المتغيرات التالية:

```env
# Database
MONGODB_URI=mongodb+srv://yussefaliit:VOgctOW8wYt43J8W@cluster0.kh1mn12.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# JWT Configuration
JWT_SECRET=jeddah-residential-landing-super-secret-jwt-key-2024-production-ready
JWT_EXPIRES_IN=7d

# Email Configuration (SMTP) - Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=yussefaliit@gmail.com
SMTP_PASS=your-app-password-here
SMTP_FROM_NAME=نظام إدارة مشروع الزهراء السكني

# Application
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=jeddah-residential-landing-nextauth-secret-2024

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR=public/uploads
```

### 2. إعداد البريد الإلكتروني

لإعداد Gmail لإرسال البريد الإلكتروني:

1. اذهب إلى [Google Account Settings](https://myaccount.google.com/)
2. انتقل إلى "Security" > "2-Step Verification"
3. فعّل المصادقة الثنائية
4. اذهب إلى "App passwords"
5. أنشئ كلمة مرور تطبيق جديدة
6. استخدم كلمة المرور هذه في `SMTP_PASS`

### 3. إنشاء مستخدم إداري

```bash
npm run create-admin
```

سيتم إنشاء مستخدم إداري افتراضي:
- **البريد الإلكتروني**: admin@example.com
- **كلمة السر**: admin123
- **الصلاحية**: admin

⚠️ **مهم**: غيّر كلمة السر الافتراضية بعد أول تسجيل دخول!

### 4. تشغيل المشروع

```bash
npm run dev
```

## كيفية الاستخدام

### تسجيل الدخول
1. اذهب إلى `/auth/login`
2. أدخل البريد الإلكتروني وكلمة السر
3. سيتم توجيهك إلى لوحة التحكم

### نسيان كلمة السر
1. اذهب إلى `/auth/forgot-password`
2. أدخل بريدك الإلكتروني
3. تحقق من بريدك الإلكتروني للحصول على رمز التحقق
4. اذهب إلى `/auth/reset-password`
5. أدخل رمز التحقق وكلمة السر الجديدة

### تغيير كلمة السر
1. سجل دخول إلى لوحة التحكم
2. اذهب إلى قسم "الملف الشخصي"
3. انقر على "تغيير كلمة السر"
4. أدخل كلمة السر الحالية والجديدة

## استخدام Hook المصادقة

### في المكونات

```tsx
import { useAuth } from '@/hooks/use-auth'

function MyComponent() {
  const { 
    user, 
    isLoading, 
    isAuthenticated, 
    login, 
    logout, 
    changePassword 
  } = useAuth()

  // استخدام الحالة
  if (isLoading) return <div>جاري التحميل...</div>
  if (!isAuthenticated) return <div>غير مسجل الدخول</div>

  return (
    <div>
      <h1>مرحباً {user?.name}</h1>
      <button onClick={logout}>تسجيل الخروج</button>
    </div>
  )
}
```

### العمليات المتاحة

- `login(email, password)` - تسجيل الدخول
- `logout()` - تسجيل الخروج
- `forgotPassword(email)` - طلب إعادة تعيين كلمة السر
- `resetPassword(email, code, newPassword, confirmPassword)` - إعادة تعيين كلمة السر
- `changePassword(currentPassword, newPassword, confirmPassword)` - تغيير كلمة السر
- `refreshToken()` - تحديث الرمز

### إدارة المستخدمين

تم إزالة إمكانية تسجيل المستخدمين الجدد من الخارج لأسباب أمنية. الآن يمكن إدارة المستخدمين من داخل لوحة التحكم فقط:

- **إضافة مستخدمين جدد**: من قسم "إدارة المستخدمين" في لوحة التحكم
- **تعديل بيانات المستخدمين**: تغيير الاسم، البريد الإلكتروني، الصلاحية
- **إعادة تعيين كلمة السر**: للمستخدمين الموجودين
- **تفعيل/إلغاء تفعيل الحسابات**: إدارة حالة المستخدمين
- **حذف المستخدمين**: مع حماية من حذف الحساب الشخصي

## الأمان

### كلمات السر
- يتم تشفير كلمات السر باستخدام bcrypt مع salt rounds = 12
- الحد الأدنى لطول كلمة السر: 6 أحرف

### JWT Tokens
- Access Token: صالح لمدة 7 أيام
- Refresh Token: صالح لمدة 30 يوم
- يتم تخزين Tokens في HTTP-only cookies

### OTP
- رمز التحقق: 6 أرقام
- مدة الصلاحية: 15 دقيقة
- عدد المحاولات المسموح: 3

### الحماية
- جميع صفحات `/admin/*` محمية
- middleware يتحقق من صحة JWT
- إعادة توجيه تلقائي لصفحة تسجيل الدخول

## استكشاف الأخطاء

### مشاكل شائعة

1. **خطأ في الاتصال بقاعدة البيانات**
   - تأكد من صحة `MONGODB_URI`
   - تأكد من تشغيل MongoDB

2. **فشل في إرسال البريد الإلكتروني**
   - تأكد من صحة إعدادات SMTP
   - تأكد من تفعيل "App Password" في Gmail

3. **خطأ في JWT**
   - تأكد من وجود `JWT_SECRET`
   - تأكد من تطابق الإعدادات

### سجلات الأخطاء
- يتم تسجيل جميع الأخطاء في console
- تحقق من Network tab في Developer Tools

## التطوير المستقبلي

### ميزات مقترحة
- [ ] تسجيل الدخول بـ Google/Facebook
- [ ] التحقق من البريد الإلكتروني
- [ ] نظام الأدوار المتقدم
- [ ] سجل أنشطة المستخدمين
- [ ] إشعارات الأمان
- [ ] المصادقة الثنائية (2FA)

### تحسينات الأمان
- [ ] Rate limiting
- [ ] IP whitelisting
- [ ] Session management
- [ ] Audit logs
