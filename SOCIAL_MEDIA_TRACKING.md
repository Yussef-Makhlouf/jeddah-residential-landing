# تتبع وسائل التواصل الاجتماعي - مشروع جدة السكني

## نظرة عامة

تم إضافة نظام تتبع متقدم لتحديد مصدر الزيارات من وسائل التواصل الاجتماعي ومحركات البحث.

## الميزات المضافة

### 1. تتبع تلقائي للمصادر
- Facebook, Instagram, Twitter/X, LinkedIn
- YouTube, TikTok, Snapchat
- WhatsApp, Telegram
- Google, Bing, Yahoo
- المواقع الأخرى

### 2. دعم UTM Parameters
يمكن استخدام UTM parameters لتتبع الحملات الإعلانية بدقة:

```
https://yourdomain.com?utm_source=facebook&utm_medium=social&utm_campaign=summer2024
```

### 3. معلومات مفصلة في البريد الإلكتروني
- مصدر الزيارة
- وسيلة التواصل الاجتماعي
- عنوان IP
- نوع المتصفح
- تاريخ ووقت الطلب

## كيفية استخدام UTM Parameters

### 1. روابط Facebook
```
https://yourdomain.com?utm_source=facebook&utm_medium=social&utm_campaign=apartments
```

### 2. روابط Instagram
```
https://yourdomain.com?utm_source=instagram&utm_medium=social&utm_campaign=apartments
```

### 3. روابط Google Ads
```
https://yourdomain.com?utm_source=google&utm_medium=cpc&utm_campaign=apartments
```

### 4. روابط Email Marketing
```
https://yourdomain.com?utm_source=email&utm_medium=newsletter&utm_campaign=apartments
```

## أمثلة على الاستخدام

### Facebook Post
```
انضم إلينا في مشروع جدة السكني الفاخر! 🏢✨
احجز شقتك الآن واستمتع بأفضل العروض

🔗 https://yourdomain.com?utm_source=facebook&utm_medium=social&utm_campaign=apartments_launch

#جدة_السكني #شقق_فاخرة #استثمار_عقاري
```

### Instagram Story
```
🏢 مشروع جدة السكني
📍 موقع استراتيجي
💰 عروض خاصة

رابط الحجز في البايو 👆
https://yourdomain.com?utm_source=instagram&utm_medium=story&utm_campaign=apartments
```

### WhatsApp Business
```
مرحباً! 👋

نقدم لك عروض خاصة على شقق مشروع جدة السكني الفاخر

🔗 https://yourdomain.com?utm_source=whatsapp&utm_medium=chat&utm_campaign=apartments

للحجز أو الاستفسار: 0501234567
```

## تتبع الأداء

### 1. في البريد الإلكتروني
ستظهر معلومات مفصلة عن كل طلب:
- مصدر الزيارة (Facebook, Instagram, إلخ)
- وسيلة التواصل الاجتماعي
- عنوان IP للمستخدم
- نوع المتصفح المستخدم
- تاريخ ووقت الطلب

### 2. في وحدة التحكم
يمكن مراقبة البيانات في وحدة تحكم المتصفح:
```javascript
// عرض معلومات المصدر
console.log(localStorage.getItem('sourceInfo'))
```

## إعدادات متقدمة

### 1. تخصيص المصادر
يمكن تعديل قائمة المصادر في `hooks/use-source-tracking.ts`:

```typescript
// إضافة مصدر جديد
} else if (hostname.includes('your-custom-site.com')) {
  source = 'موقع مخصص'
  socialMedia = 'Custom'
}
```

### 2. إضافة معايير تتبع إضافية
```typescript
// إضافة معايير جديدة
const utmContent = urlParams.get('utm_content')
const utmTerm = urlParams.get('utm_term')
```

## أفضل الممارسات

### 1. استخدام أسماء حملات واضحة
- `apartments_launch` - إطلاق المشروع
- `summer_promotion` - عروض الصيف
- `winter_special` - عروض الشتاء

### 2. تتبع المصادر المختلفة
- `utm_medium=social` - وسائل التواصل الاجتماعي
- `utm_medium=cpc` - إعلانات مدفوعة
- `utm_medium=email` - البريد الإلكتروني
- `utm_medium=organic` - البحث العضوي

### 3. تحليل البيانات
- مراجعة البريد الإلكتروني بانتظام
- تحديد المصادر الأكثر فعالية
- تحسين الحملات بناءً على البيانات

## استكشاف الأخطاء

### 1. عدم ظهور المصدر
- تأكد من استخدام UTM parameters
- تحقق من إعدادات المتصفح
- راجع سجلات وحدة التحكم

### 2. معلومات غير دقيقة
- تحقق من صحة الروابط
- تأكد من إعدادات Referrer
- راجع إعدادات الخصوصية

## الدعم

للمساعدة في إعداد التتبع أو حل المشاكل:
1. راجع هذا الملف
2. تحقق من سجلات وحدة التحكم
3. اختبر الروابط قبل النشر
