# نظام تتبع الواتساب حسب المنصة

## نظرة عامة

تم تطوير نظام جديد لإرسال رسائل مختلفة عبر واتساب بناءً على المنصة التي جاء منها الزائر. هذا النظام يسمح بتتبع مصدر الزيارات وإرسال رسائل مخصصة لكل منصة.

## الملفات المضافة/المحدثة

### 1. `lib/whatsapp-messages.ts`
الملف الرئيسي الذي يحتوي على:
- تكوين الرسائل وأرقام الهواتف لكل منصة
- دالة `getWhatsAppConfig()` للحصول على التكوين المناسب
- دالة `generateWhatsAppUrl()` لإنشاء رابط واتساب

### 2. `components/whatsapp-button.tsx`
مكون قابل لإعادة الاستخدام لأزرار الواتساب مع:
- دعم أنواع مختلفة من الأزرار (default, outline, ghost)
- أحجام مختلفة (sm, md, lg)
- تتبع تلقائي للمنصة

### 3. المكونات المحدثة
- `components/floating-buttons.tsx`
- `components/contact.tsx`
- `components/models.tsx`
- `components/strategic-features.tsx`
- `components/booking-form.tsx`

## الرسائل وأرقام الهواتف

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

## كيفية العمل

### 1. تتبع المصدر
النظام يستخدم `useSourceTracking` hook لتحديد:
- `source`: المصدر الرئيسي (مثل Facebook, Instagram, Google)
- `socialMedia`: وسيلة التواصل الاجتماعي المحددة

### 2. تحديد المنصة
```typescript
const platform = socialMedia || source || 'default'
```

### 3. إنشاء رابط واتساب
```typescript
const whatsappUrl = generateWhatsAppUrl(platform)
```

### 4. فتح واتساب
```typescript
window.open(whatsappUrl, "_blank")
```

## استخدام المكون

### استخدام مكون WhatsAppButton
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

## ملاحظات مهمة

1. **تتبع المصدر**: النظام يعتمد على `useSourceTracking` hook الذي يتتبع:
   - UTM parameters
   - Referrer headers
   - localStorage

2. **الرسائل المخصصة**: كل منصة لها رسالة مختلفة تناسب طبيعة المستخدمين

3. **أرقام الهواتف المختلفة**: كل منصة لها رقم هاتف مخصص لتتبع الأداء

4. **الافتراضي**: إذا لم يتم تحديد منصة، يتم استخدام الإعداد الافتراضي

## الاختبار

لاختبار النظام:
1. افتح الموقع من منصات مختلفة
2. انقر على أي زر واتساب
3. تحقق من أن الرسالة والرقم يتغيران حسب المنصة

## الدعم

لأي استفسارات أو تعديلات، يرجى التواصل مع فريق التطوير.
