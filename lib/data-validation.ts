// Data Validation Utilities
// This module provides validation functions for website data

import { WebsiteData, Apartment, StrategicFeature, ProjectHighlight, HeroInfo } from './website-data'

export interface ValidationError {
  field: string
  message: string
  section?: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
}

// Helper functions
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const isValidPhoneNumber = (phone: string): boolean => {
  // Saudi phone number pattern
  const phoneRegex = /^(\+966|00966|0)?[5][0-9]{8}$/
  return phoneRegex.test(phone.replace(/\s+/g, ''))
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Section validators
export const validateProjectInfo = (project: any): ValidationError[] => {
  const errors: ValidationError[] = []

  if (!project.name || project.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'اسم المشروع مطلوب ويجب أن يكون على الأقل حرفين', section: 'project' })
  }

  if (!project.licenseNumber || project.licenseNumber.trim().length === 0) {
    errors.push({ field: 'licenseNumber', message: 'رقم الترخيص مطلوب', section: 'project' })
  }

  if (!project.unifiedNumber || project.unifiedNumber.trim().length === 0) {
    errors.push({ field: 'unifiedNumber', message: 'الرقم الموحد مطلوب', section: 'project' })
  }

  if (!project.address || project.address.trim().length < 5) {
    errors.push({ field: 'address', message: 'العنوان مطلوب ويجب أن يكون مفصلاً', section: 'project' })
  }

  if (!project.description || project.description.trim().length < 10) {
    errors.push({ field: 'description', message: 'وصف المشروع مطلوب ويجب أن يكون على الأقل 10 أحرف', section: 'project' })
  }

  return errors
}

export const validateApartments = (apartments: Apartment[]): ValidationError[] => {
  const errors: ValidationError[] = []

  if (apartments.length === 0) {
    errors.push({ field: 'apartments', message: 'يجب إضافة شقة واحدة على الأقل', section: 'apartments' })
    return errors
  }

  apartments.forEach((apartment, index) => {
    const prefix = `نموذج ${apartment.id}`

    if (!apartment.name || apartment.name.trim().length < 2) {
      errors.push({ field: `apartments[${index}].name`, message: `${prefix}: اسم النموذج مطلوب`, section: 'apartments' })
    }

    if (!apartment.price || apartment.price.trim().length === 0) {
      errors.push({ field: `apartments[${index}].price`, message: `${prefix}: السعر مطلوب`, section: 'apartments' })
    }

    if (!apartment.area || apartment.area.trim().length === 0) {
      errors.push({ field: `apartments[${index}].area`, message: `${prefix}: المساحة مطلوبة`, section: 'apartments' })
    }

    if (apartment.rooms < 1 || apartment.rooms > 10) {
      errors.push({ field: `apartments[${index}].rooms`, message: `${prefix}: عدد الغرف يجب أن يكون بين 1 و 10`, section: 'apartments' })
    }

    if (apartment.bathrooms < 1 || apartment.bathrooms > 10) {
      errors.push({ field: `apartments[${index}].bathrooms`, message: `${prefix}: عدد دورات المياه يجب أن يكون بين 1 و 10`, section: 'apartments' })
    }

    if (apartment.features.length === 0) {
      errors.push({ field: `apartments[${index}].features`, message: `${prefix}: يجب إضافة ميزة واحدة على الأقل`, section: 'apartments' })
    }

    if (apartment.image && !isValidUrl(apartment.image) && !apartment.image.startsWith('/')) {
      errors.push({ field: `apartments[${index}].image`, message: `${prefix}: رابط الصورة غير صحيح`, section: 'apartments' })
    }
  })

  return errors
}

export const validateHeroInfo = (hero: HeroInfo): ValidationError[] => {
  const errors: ValidationError[] = []

  if (!hero.title || hero.title.trim().length < 2) {
    errors.push({ field: 'title', message: 'العنوان الرئيسي مطلوب', section: 'hero' })
  }

  if (!hero.subtitle || hero.subtitle.trim().length < 2) {
    errors.push({ field: 'subtitle', message: 'العنوان الفرعي مطلوب', section: 'hero' })
  }

  if (!hero.location || hero.location.trim().length < 3) {
    errors.push({ field: 'location', message: 'الموقع مطلوب', section: 'hero' })
  }

  if (!hero.startingPrice || hero.startingPrice.trim().length === 0) {
    errors.push({ field: 'startingPrice', message: 'السعر الأساسي مطلوب', section: 'hero' })
  }

  if (hero.backgroundImage && !isValidUrl(hero.backgroundImage) && !hero.backgroundImage.startsWith('/')) {
    errors.push({ field: 'backgroundImage', message: 'رابط صورة الخلفية غير صحيح', section: 'hero' })
  }

  return errors
}

export const validateContactInfo = (contact: any): ValidationError[] => {
  const errors: ValidationError[] = []

  if (!contact.phone || !isValidPhoneNumber(contact.phone)) {
    errors.push({ field: 'phone', message: 'رقم الهاتف غير صحيح. يجب أن يكون رقم سعودي صحيح', section: 'contact' })
  }

  if (!contact.whatsapp || !isValidPhoneNumber(contact.whatsapp)) {
    errors.push({ field: 'whatsapp', message: 'رقم الواتساب غير صحيح. يجب أن يكون رقم سعودي صحيح', section: 'contact' })
  }

  if (!contact.email || !isValidEmail(contact.email)) {
    errors.push({ field: 'email', message: 'البريد الإلكتروني غير صحيح', section: 'contact' })
  }

  return errors
}

export const validateSocialMedia = (socialMedia: any[]): ValidationError[] => {
  const errors: ValidationError[] = []

  socialMedia.forEach((social, index) => {
    if (!social.platform || social.platform.trim().length === 0) {
      errors.push({ field: `socialMedia[${index}].platform`, message: `المنصة ${index + 1}: اسم المنصة مطلوب`, section: 'social' })
    }

    if (!social.url || !isValidUrl(social.url)) {
      errors.push({ field: `socialMedia[${index}].url`, message: `المنصة ${index + 1}: رابط غير صحيح`, section: 'social' })
    }

    if (!social.icon || social.icon.trim().length === 0) {
      errors.push({ field: `socialMedia[${index}].icon`, message: `المنصة ${index + 1}: الأيقونة مطلوبة`, section: 'social' })
    }
  })

  return errors
}

export const validateStrategicFeatures = (features: StrategicFeature[]): ValidationError[] => {
  const errors: ValidationError[] = []

  if (features.length === 0) {
    errors.push({ field: 'strategicFeatures', message: 'يجب إضافة ميزة إستراتيجية واحدة على الأقل', section: 'strategic' })
    return errors
  }

  features.forEach((feature, index) => {
    if (!feature.title || feature.title.trim().length < 2) {
      errors.push({ field: `strategicFeatures[${index}].title`, message: `الميزة ${index + 1}: العنوان مطلوب`, section: 'strategic' })
    }

    if (!feature.icon || feature.icon.trim().length === 0) {
      errors.push({ field: `strategicFeatures[${index}].icon`, message: `الميزة ${index + 1}: الأيقونة مطلوبة`, section: 'strategic' })
    }
  })

  return errors
}

export const validateProjectHighlights = (highlights: ProjectHighlight[]): ValidationError[] => {
  const errors: ValidationError[] = []

  if (highlights.length === 0) {
    errors.push({ field: 'projectHighlights', message: 'يجب إضافة ميزة واحدة على الأقل للمشروع', section: 'highlights' })
    return errors
  }

  highlights.forEach((highlight, index) => {
    if (!highlight.title || highlight.title.trim().length < 2) {
      errors.push({ field: `projectHighlights[${index}].title`, message: `الميزة ${index + 1}: العنوان مطلوب`, section: 'highlights' })
    }

    if (!highlight.icon || highlight.icon.trim().length === 0) {
      errors.push({ field: `projectHighlights[${index}].icon`, message: `الميزة ${index + 1}: الأيقونة مطلوبة`, section: 'highlights' })
    }
  })

  return errors
}

// Main validation function
export const validateWebsiteData = (data: WebsiteData): ValidationResult => {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // Validate each section
  errors.push(...validateProjectInfo(data.project))
  errors.push(...validateApartments(data.apartments))
  errors.push(...validateHeroInfo(data.hero))
  errors.push(...validateContactInfo(data.contact))
  errors.push(...validateSocialMedia(data.socialMedia))
  errors.push(...validateStrategicFeatures(data.strategicFeatures))
  errors.push(...validateProjectHighlights(data.projectHighlights))

  // Add warnings for optional but recommended fields
  if (data.imageCarousel.images.length < 3) {
    warnings.push({ field: 'imageCarousel.images', message: 'يُنصح بإضافة على الأقل 3 صور في المعرض', section: 'gallery' })
  }

  if (data.trustIndicators.guarantees.length < 2) {
    warnings.push({ field: 'trustIndicators.guarantees', message: 'يُنصح بإضافة على الأقل ضمانين للمشروع', section: 'trust' })
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

// Quick validation for specific sections
export const validateSection = (section: string, data: any): ValidationError[] => {
  switch (section) {
    case 'project':
      return validateProjectInfo(data)
    case 'apartments':
      return validateApartments(data)
    case 'hero':
      return validateHeroInfo(data)
    case 'contact':
      return validateContactInfo(data)
    case 'social':
      return validateSocialMedia(data)
    case 'strategic':
      return validateStrategicFeatures(data)
    case 'highlights':
      return validateProjectHighlights(data)
    default:
      return []
  }
}
