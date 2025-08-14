# نظام تتبع وسائل التواصل الاجتماعي

## نظرة عامة

تم إنشاء نظام تتبع لمعرفة من أي منصة اجتماعية جاء المستخدمون إلى الموقع. النظام يدعم 4 منصات رئيسية مع امتدادات مختصرة:

- **فيسبوك** (`/facebook` أو `/fb`)
- **إنستغرام** (`/instagram` أو `/ig`) 
- **تويتر** (`/twitter` أو `/tw`)
- **لينكد إن** (`/linkedin` أو `/li`)

## كيفية العمل

### 1. الروابط المتاحة

**الروابط الكاملة:**
```
https://yoursite.com/facebook
https://yoursite.com/instagram
https://yoursite.com/twitter
https://yoursite.com/linkedin
```

**الروابط المختصرة:**
```
https://yoursite.com/fb
https://yoursite.com/ig
https://yoursite.com/tw
https://yoursite.com/li
```

### 2. إضافة معاملات UTM (اختياري)

```
https://yoursite.com/fb?utm_campaign=spring_2024
https://yoursite.com/ig?utm_campaign=summer_promo&utm_medium=social
```

### 3. ما يحدث عند زيارة الرابط

1. يتم حفظ بيانات التتبع في:
   - `localStorage` (للوصول السريع)
   - `cookies` (للوصول من الخادم)
2. يتم توجيه المستخدم تلقائياً إلى الصفحة الرئيسية

## الملفات المضافة

### 1. `app/[platform]/page.tsx`
- صفحة ديناميكية لمعالجة روابط التتبع
- تحفظ بيانات التتبع وتوجه المستخدم

### 2. `lib/tracking.ts`
- مكتبة مساعدة لإدارة بيانات التتبع
- دوال لقراءة وكتابة بيانات التتبع
- توليد روابط التتبع

### 3. `hooks/use-social-media-tracking.ts`
- Hook مخصص للوصول لبيانات التتبع
- يوفر أسماء وأيقونات المنصات بالعربية

### 4. `components/social-media-links.tsx`
- مكون لتوليد روابط التتبع
- يسمح بنسخ الروابط بسهولة

### 6. `app/admin/tracking/page.tsx`
- صفحة إدارية لعرض بيانات التتبع
- توليد روابط التتبع

## كيفية الاستخدام

### للمطورين

```typescript
import { useSocialMediaTracking } from '@/hooks/use-social-media-tracking'

function MyComponent() {
  const { trackingData, hasTrackingData } = useSocialMediaTracking()
  
  if (hasTrackingData) {
    console.log('User came from:', trackingData.platform)
  }
}
```

### للمسوقين

1. اذهب إلى `/admin/tracking`
2. أدخل اسم الحملة (اختياري)
3. انسخ الروابط المولدة
4. استخدمها في منشورات وسائل التواصل الاجتماعي

## بيانات التتبع المحفوظة

```typescript
{
  platform: "facebook",           // المنصة
  timestamp: "2024-01-01T...",   // وقت الزيارة
  utm_source: "facebook",         // مصدر UTM
  utm_medium: "social",           // وسيط UTM
  utm_campaign: "spring_2024"     // حملة UTM
}
```

## الامتدادات المختصرة

النظام يدعم امتدادات مختصرة لكل منصة:

| المنصة | الامتداد الكامل | الامتداد المختصر |
|--------|----------------|------------------|
| فيسبوك | `/facebook` | `/fb` |
| إنستغرام | `/instagram` | `/ig` |
| تويتر | `/twitter` | `/tw` |
| لينكد إن | `/linkedin` | `/li` |

يمكنك اختيار استخدام الامتدادات المختصرة أو الكاملة حسب الحاجة.

## تخصيص المنصات

لإضافة منصات جديدة، قم بتحديث:

1. `SOCIAL_MEDIA_PLATFORMS` في `lib/tracking.ts`
2. `SOCIAL_MEDIA_EXTENSIONS` في `lib/tracking.ts`
3. أسماء وأيقونات المنصات في `hooks/use-social-media-tracking.ts`
4. معلومات المنصات في `components/social-media-links.tsx`

## ملاحظات مهمة

- البيانات محفوظة لمدة 30 يوم في الكوكيز
- البيانات محفوظة في localStorage حتى يتم مسحها
- النظام يعمل فقط في المتصفح (client-side)
- يمكن إضافة تتبع من جانب الخادم لتحسين الأمان
