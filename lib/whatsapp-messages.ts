export interface WhatsAppConfig {
  phone: string
  message: string
}

import WebsiteDataService from './website-data'

export const WHATSAPP_CONFIGS: Record<string, WhatsAppConfig> = {
  // تيك توك
  'tiktok': {
    phone: '0539488805',
    message: 'مرحبا، السلام عليكم ورحمة الله، أرغب بالإستفسار عن مشروع راف 25'
  },
  
  // ميتا (فيسبوك)
  'facebook': {
    phone: '0555812257',
    message: " مرحبا، أرغب بالإستفسار عن مشروع راف 25"
  },
  'meta': {
    phone: '0555812257',
    message: "مرحبا، أرغب بالإستفسار عن مشروع راف 25"
  },
  'instagram': {
    phone: '0555812257',
    message: "مرحبا، أرغب بالإستفسار عن مشروع راف 25"
  },
  
  // سناب شات
  'snapchat': {
    phone: '0543766262',
    message: 'مرحبا السلام عليكم ورحمة الله، أرغب بالإستفسار عن مشروع راف 25'
  },
  
  // جوجل إعلانات
  'google': {
    phone: '0536667967',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته، أرغب بالإستفسار عن مشروع راف 25'
  },
  'google ads': {
    phone: '0536667967',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته، أرغب بالإستفسار عن مشروع راف 25'
  },
  'googleads': {
    phone: '0536667967',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته، أرغب بالإستفسار عن مشروع راف 25'
  },
  
  // واتساب
  'whatsapp': {
    phone: '0536667967',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته \nأرغب بالإستفسار عن مشروع راف 25 - حي الزهراء في جدة'
  },
  
  // افتراضي أو موقع الويب المباشر
  'default': {
    phone: '0536667967',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته \nأرغب بالإستفسار عن مشروع راف 25 - حي الزهراء في جدة'
  },
  
  // تويتر
  'twitter': {
    phone: '0536667967',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته \nأرغب بالإستفسار عن مشروع راف 25 - حي الزهراء في جدة'
  },
  'x': {
    phone: '0536667967',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته \nأرغب بالإستفسار عن مشروع راف 25 - حي الزهراء في جدة'
  },
  
  // يوتيوب
  'youtube': {
    phone: '0536667967',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته \nأرغب بالإستفسار عن مشروع راف 25 - حي الزهراء في جدة'
  },
  
  // لينكد إن
  'linkedin': {
    phone: '0536667967',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته \nأرغب بالإستفسار عن مشروع راف 25 - حي الزهراء في جدة'
  },
  
  // تليجرام
  'telegram': {
    phone: '0536667967',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته \nأرغب بالإستفسار عن مشروع راف 25 - حي الزهراء في جدة'
  },
  
  // موقع الويب المباشر
  'موقع الويب': {
    phone: '0536667967',
    message: 'مرحبا السلام عليكم ورحمة الله وبركاته \nأرغب بالإستفسار عن مشروع راف 25 - حي الزهراء في جدة'
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
  // Replace project name dynamically in message
  const projectName = WebsiteDataService.getProjectName ? WebsiteDataService.getProjectName() : 'مشروع راف 25'
  const dynamicMessage = config.message.replace(/مشروع راف 25/g, projectName)
  const encodedMessage = encodeURIComponent(dynamicMessage)
  return `https://wa.me/966${config.phone.replace(/^0/, '')}?text=${encodedMessage}`
}
