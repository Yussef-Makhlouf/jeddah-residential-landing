export interface WhatsAppConfig {
  phone: string
  message: string
}

export const WHATSAPP_CONFIGS: Record<string, WhatsAppConfig> = {
  // ميتا (فيسبوك)
  'facebook': {
    phone: '0539488805',
    message: 'مرحبا، السلام عليكم ورحمة الله، أرغب بالإستفسار عن المشروع'
  },
  'meta': {
    phone: '0539488805',
    message: 'مرحبا، السلام عليكم ورحمة الله، أرغب بالإستفسار عن المشروع'
  },
  
  // سناب شات
  'snapchat': {
    phone: '0555812257',
    message: 'مرحبا، أرغب بالإستفسار عن المشروع'
  },
  
  // جوجل إعلانات
  'google': {
    phone: '0543766262',
    message: 'مرحبا السلام عليكم ورحمة الله، أرغب بالإستفسار عن المشروع'
  },
  'google ads': {
    phone: '0543766262',
    message: 'مرحبا السلام عليكم ورحمة الله، أرغب بالإستفسار عن المشروع'
  },
  'googleads': {
    phone: '0543766262',
    message: 'مرحبا السلام عليكم ورحمة الله، أرغب بالإستفسار عن المشروع'
  },
  
  // واتساب
  'whatsapp': {
    phone: '0552845403',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته، أرغب بالإستفسار عن المشروع'
  },
  
  // افتراضي أو موقع الويب المباشر
  'default': {
    phone: '0536667967',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته \nأرغب بالإستفسار عن مشروع 25 - حي الزهراء في جدة'
  },
  
  // إنستغرام
  'instagram': {
    phone: '0536667967',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته \nأرغب بالإستفسار عن مشروع 25 - حي الزهراء في جدة'
  },
  
  // تويتر
  'twitter': {
    phone: '0536667967',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته \nأرغب بالإستفسار عن مشروع 25 - حي الزهراء في جدة'
  },
  'x': {
    phone: '0536667967',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته \nأرغب بالإستفسار عن مشروع 25 - حي الزهراء في جدة'
  },
  
  // تيك توك
  'tiktok': {
    phone: '0536667967',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته ✨\nأرغب بالإستفسار عن مشروع 25 - حي الزهراء في جدة'
  },
  
  // يوتيوب
  'youtube': {
    phone: '0536667967',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته \nأرغب بالإستفسار عن مشروع 25 - حي الزهراء في جدة'
  },
  
  // لينكد إن
  'linkedin': {
    phone: '0536667967',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته \nأرغب بالإستفسار عن مشروع 25 - حي الزهراء في جدة'
  },
  
  // تليجرام
  'telegram': {
    phone: '0536667967',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته \nأرغب بالإستفسار عن مشروع 25 - حي الزهراء في جدة'
  },
  
  // موقع الويب المباشر
  'موقع الويب': {
    phone: '0536667967',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته \nأرغب بالإستفسار عن مشروع 25 - حي الزهراء في جدة'
  }
}

export const getWhatsAppConfig = (platform: string): WhatsAppConfig => {
  const normalizedPlatform = platform.toLowerCase()
  
  // البحث عن التطابق الدقيق
  if (WHATSAPP_CONFIGS[normalizedPlatform]) {
    return WHATSAPP_CONFIGS[normalizedPlatform]
  }
  
  // البحث عن تطابق جزئي
  for (const [key, config] of Object.entries(WHATSAPP_CONFIGS)) {
    if (normalizedPlatform.includes(key) || key.includes(normalizedPlatform)) {
      return config
    }
  }
  
  // إرجاع الإعداد الافتراضي
  return WHATSAPP_CONFIGS['default']
}

export const generateWhatsAppUrl = (platform: string): string => {
  const config = getWhatsAppConfig(platform)
  const encodedMessage = encodeURIComponent(config.message)
  return `https://wa.me/966${config.phone.replace(/^0/, '')}?text=${encodedMessage}`
}
