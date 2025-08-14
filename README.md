# مشروع جدة السكني - حي الزهراء

موقع إلكتروني متطور لمشروع سكني في حي الزهراء بجدة، مع نظام تتبع متقدم للزوار ورسائل مخصصة عبر الواتساب.

## المميزات الرئيسية

### 🏠 مشروع سكني متكامل
- 4 نماذج مختلفة للشقق
- موقع إستراتيجي في قلب جدة
- ضمانات شاملة على البناء
- مميزات عصرية وتقنيات ذكية

### 📱 نظام تتبع متقدم
- تتبع مصدر الزيارات (فيسبوك، إنستغرام، جوجل، إلخ)
- رسائل مخصصة لكل منصة
- أرقام هواتف مختلفة لتتبع الأداء
- تحليلات مفصلة للزوار

### 💬 نظام واتساب ذكي
- رسائل مختلفة حسب المنصة
- أرقام هواتف مخصصة لكل منصة
- تتبع تلقائي للمصدر
- واجهة مستخدم محسنة

## الرسائل وأرقام الهواتف حسب المنصة

| المنصة | رقم الهاتف | الرسالة |
|--------|------------|---------|
| ميتا (فيسبوك) | 0539488805 | مرحبا، أرغب بالإستفسار عن المشروع |
| سناب شات | 0555812257 | مرحبا السلام عليكم ورحمة الله، أرغب بالإستفسار عن المشروع |
| جوجل إعلانات | 0543766262 | مرحبا السلام عليكم ورحمة الله وبركاته، أرغب بالإستفسار عن المشروع |
| واتساب | 0552845403 | مرحبا السلام عليكم ورحمة الله وبركاته ✨\nأرغب بالإستفسار عن مشروع ٢٤ - حي الزهراء في جدة |
| إنستغرام | 0536667967 | مرحبا، أرغب بالإستفسار عن مشروع الزهراء السكني |
| تويتر | 0536667967 | مرحبا، أرغب بالإستفسار عن مشروع الزهراء السكني |
| تيك توك | 0536667967 | مرحبا، أرغب بالإستفسار عن مشروع الزهراء السكني |
| يوتيوب | 0536667967 | مرحبا، أرغب بالإستفسار عن مشروع الزهراء السكني |
| لينكد إن | 0536667967 | مرحبا، أرغب بالإستفسار عن مشروع الزهراء السكني |
| تليجرام | 0536667967 | مرحبا، أرغب بالإستفسار عن مشروع الزهراء السكني |
| افتراضي | 0536667967 | مرحبا، أرغب بالإستفسار عن مشروع الزهراء السكني |

## الملفات الرئيسية

### نظام تتبع الواتساب
- `lib/whatsapp-messages.ts` - تكوين الرسائل وأرقام الهواتف
- `components/whatsapp-button.tsx` - مكون زر واتساب قابل لإعادة الاستخدام
- `components/whatsapp-section.tsx` - قسم واتساب مخصص
- `components/whatsapp-cta.tsx` - مكون Call-to-Action للواتساب

### تتبع المصدر
- `hooks/use-source-tracking.ts` - Hook لتتبع مصدر الزيارات
- `lib/tracking.ts` - مكتبة التتبع الأساسية

### المكونات المحدثة
- `components/floating-buttons.tsx` - الأزرار العائمة مع تتبع المنصة
- `components/contact.tsx` - صفحة الاتصال مع رسائل مخصصة
- `components/models.tsx` - نماذج المشروع مع أزرار واتساب
- `components/strategic-features.tsx` - الميزات الإستراتيجية
- `components/booking-form.tsx` - نموذج الحجز

## كيفية الاستخدام

### إضافة زر واتساب
```tsx
import { WhatsAppButton } from "@/components/whatsapp-button"

// زر افتراضي
<WhatsAppButton />

// زر مخصص
<WhatsAppButton 
  variant="outline" 
  size="lg" 
  className="custom-class"
>
  تواصل معنا
</WhatsAppButton>
```

### إضافة قسم واتساب
```tsx
import { WhatsAppSection } from "@/components/whatsapp-section"

<WhatsAppSection />
```

### إضافة Call-to-Action
```tsx
import { WhatsAppCTA } from "@/components/whatsapp-cta"

<WhatsAppCTA 
  title="تواصل معنا الآن"
  subtitle="احصل على استشارة مجانية"
  variant="primary"
  showPhone={true}
  showMessage={true}
/>
```

### استخدام الدالة مباشرة
```tsx
import { generateWhatsAppUrl } from "@/lib/whatsapp-messages"
import { useSourceTracking } from "@/hooks/use-source-tracking"

const { source, socialMedia } = useSourceTracking()
const platform = socialMedia || source || 'default'
const whatsappUrl = generateWhatsAppUrl(platform)
```

## إضافة منصة جديدة

لإضافة منصة جديدة، أضف التكوين في `lib/whatsapp-messages.ts`:

```typescript
export const WHATSAPP_CONFIGS: Record<string, WhatsAppConfig> = {
  // ... المنصات الحالية
  
  'new-platform': {
    phone: '05xxxxxxxx',
    message: 'رسالة مخصصة للمنصة الجديدة'
  },
  
  // ...
}
```

## التثبيت والتشغيل

```bash
# تثبيت التبعيات
npm install

# تشغيل المشروع في وضع التطوير
npm run dev

# بناء المشروع للإنتاج
npm run build
```

## المتغيرات البيئية

```env
# إعدادات البريد الإلكتروني
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-password
RECIPIENT_EMAIL=recipient@domain.com

# إعدادات الموقع
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## المميزات التقنية

- **Next.js 14** - إطار عمل React الحديث
- **TypeScript** - أمان الأنواع
- **Tailwind CSS** - تصميم متجاوب
- **Shadcn/ui** - مكونات UI جاهزة
- **Nodemailer** - إرسال البريد الإلكتروني
- **Local Storage** - حفظ بيانات التتبع

## الدعم والمساعدة

لأي استفسارات أو تعديلات، يرجى التواصل مع فريق التطوير.

## الترخيص

هذا المشروع مملوك لشركة تطوير المشروع السكني في جدة.
