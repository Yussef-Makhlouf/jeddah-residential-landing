// Website Data Management Service
// This service manages all dynamic content for the website

import { MongoDBService } from './mongodb-service'

export interface ProjectInfo {
  name: string
  licenseNumber: string
  unifiedNumber: string
  description: string
  address: string
}

export interface Apartment {
  id: string
  name: string
  price: string
  area: string
  rooms: number
  bathrooms: number
  features: string[]
  popular: boolean
  image: string
}

export interface LocationInfo {
  address: string
  mapUrl: string
  features: {
    title: string
    time: string
    icon: string
  }[]
}

export interface ContactInfo {
  phone: string
  whatsapp: string
  email: string
}

export interface SocialMedia {
  platform: string
  url: string
  icon: string
}

export interface StrategicFeature {
  icon: string
  title: string
  description?: string
  details?: string[]
  isMain: boolean
}

export interface ProjectHighlight {
  icon: string
  title: string
}

export interface TrustFactor {
  text: string
  icon: string
}

export interface HeroInfo {
  title: string
  subtitle: string
  location: string
  startingPrice: string
  backgroundImage: string
}

export interface GalleryImage {
  src: string
  alt: string
  title?: string
}

export interface ImageCarouselInfo {
  title: string
  subtitle: string
  images: GalleryImage[]
}

export interface ContactSectionInfo {
  title: string
  subtitle: string
  phone: string
  whatsapp: string
  email: string
  workingHours: {
    weekdays: string
    friday: string
  }
  formSettings: {
    showName: boolean
    showPhone: boolean
    showEmail: boolean
    showMessage: boolean
  }
}

export interface Guarantee {
  icon: string
  title: string
  subtitle: string
  description: string
}

export interface TrustIndicatorsInfo {
  title: string
  subtitle: string
  guarantees: Guarantee[]
  trustFactors: string[]
}

export interface WhatsAppCTAInfo {
  title: string
  subtitle: string
  phone: string
  message: string
  variant: 'primary' | 'secondary' | 'minimal'
  showPhone: boolean
  showMessage: boolean
}

export interface WhatsAppSectionInfo {
  title: string
  subtitle: string
  features: {
    icon: string
    title: string
    description: string
  }[]
  phone: string
  message: string
}

export interface WebsiteData {
  project: ProjectInfo
  apartments: Apartment[]
  location: LocationInfo
  contact: ContactInfo
  socialMedia: SocialMedia[]
  strategicFeatures: StrategicFeature[]
  projectHighlights: ProjectHighlight[]
  trustFactors: TrustFactor[]
  hero: HeroInfo
  imageCarousel: ImageCarouselInfo
  contactSection: ContactSectionInfo
  trustIndicators: TrustIndicatorsInfo
  whatsappCTA: WhatsAppCTAInfo
  whatsappSection: WhatsAppSectionInfo
}

// Default data - this would typically come from a database
const defaultData: WebsiteData = {
  project: {
    name: "مشروع راف 25",
    licenseNumber: "I20002693",
    unifiedNumber: "920031103",
    description: "مشروع سكني فاخر في حي الزهراء، جدة",
    address: "حي الزهراء، جدة، المملكة العربية السعودية"
  },
  apartments: [
    {
      id: "A",
      name: "نموذج A - واجهة أمامية",
      price: "890,000",
      area: "155",
      rooms: 4,
      bathrooms: 4,
      features: ["غرفة استقبال", "2 غرفة نوم", "4 دورات مياه", "مجلس نساء", "مطبخ", "غرفة سائق", "غرفة خادمة"],
      popular: true,
      image: "/a.jpg",
    },
    {
      id: "B", 
      name: "نموذج B - واجهة خلفية",
      price: "870,000",
      area: "151",
      rooms: 4,
      bathrooms: 4,
      features: ["غرفة استقبال", "2 غرفة نوم", "مجلس", "مطبخ", "4 دورات مياه", "غرفة خادمة", "غرفة سائق"],
      popular: false,
      image: "/b.jpg",
    },
    {
      id: "C",
      name: "نموذج C - واجهة خلفية", 
      price: "870,000",
      area: "151",
      rooms: 4,
      bathrooms: 4,
      features: ["2 غرفة نوم", "مجلس", "مطبخ", "4 دورات مياه", "غرفة سائق"],
      popular: false,
      image: "/c.jpg",
    },
    {
      id: "D",
      name: "نموذج D - واجهة أمامية",
      price: "890,000", 
      area: "155",
      rooms: 4,
      bathrooms: 4,
      features: ["2 غرفة نوم", "مجلس", "مطبخ", "4 دورات مياه", "غرفة خادمة", "غرفة سائق"],
      popular: false,
      image: "/d.jpg",
    }
  ],
  location: {
    address: "حي الزهراء، جدة، المملكة العربية السعودية",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3709.9005761511416!2d39.14023258505769!3d21.589803685697152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDM1JzIzLjMiTiAzOcKwMDgnMTcuMCJF!5e0!3m2!1sar!2seg!4v1755078085233!5m2!1sar!2seg",
    features: [
      { title: "قريب من الواجهة البحرية", time: "8 دقائق", icon: "MapPin" },
      { title: "قريب من المطار", time: "10 دقائق", icon: "Plane" },
      { title: "شوارع رئيسية", time: "مباشر", icon: "Car" },
      { title: "مركز المدينة", time: "20 دقيقة", icon: "Clock" }
    ]
  },
  contact: {
    phone: "+966536667967",
    whatsapp: "+966536667967",
    email: "info@rafco.sa"
  },
  socialMedia: [
    { platform: "TikTok", url: "https://www.tiktok.com/@raf_grope?_t=ZS-8ys0flOq8uW&_r=1", icon: "TikTok" },
    { platform: "Snapchat", url: "https://www.snapchat.com/add/rafgrope?sender_web_id=10a7b6f1-3aeb-4830-b990-cf1445633817&device_type=desktop&is_copy_url=true", icon: "Snapchat" },
    { platform: "Instagram", url: "https://www.instagram.com/rafgrope/", icon: "Instagram" },
    { platform: "X (Twitter)", url: "https://x.com/Rafgrope", icon: "Twitter" }
  ],
  strategicFeatures: [
    {
      icon: "MapPin",
      title: "موقع إستراتيجي",
      description: "وسط 3 شوارع رئيسية",
      details: ["شارع حلمي كتبي", "طريق الأمير سلطان", "شارع عبد الله كاظم"],
      isMain: true,
    },
    {
      icon: "Building2",
      title: "قريب من المسجد",
      isMain: false,
    },
    {
      icon: "TreePine",
      title: "حدائق ومتنزهات",
      isMain: false,
    },
    {
      icon: "School",
      title: "مدارس متميزة",
      isMain: false,
    },
    {
      icon: "Stethoscope",
      title: "مستشفى قريب",
      isMain: false,
    },
  ],
  projectHighlights: [
    {
      icon: "Shield",
      title: "بيئة سكنية متكاملة",
    },
    {
      icon: "LucideSnowflake",
      title: "مداخل مكيفة",
    },
    {
      icon: "Camera",
      title: "كاميرات مراقبة",
    },
    {
      icon: "Wifi",
      title: "سمارت هوم",
    },
    {
      icon: "Users",
      title: "تصميم مودرن",
    },
    {
      icon: "MapPin",
      title: "موقع مثالي",
    },
  ],
  trustFactors: [
    {
      text: "15 سنة ضمان على الهيكل الإنشائي",
      icon: "Building2",
    },
    {
      text: "25 سنة ضمان على القواطع والأفياش",
      icon: "Zap",
    },
    {
      text: "سنتين ضمان على السباكة",
      icon: "Droplets",
    },
    {
      text: "سنة ضمان على اتحاد الملاك",
      icon: "Users2",
    },
  ],
  hero: {
    title: "حقق حلمك",
    subtitle: "بتملك السكن المثالى",
    location: "في جدة - حي الزهراء",
    startingPrice: "870,000",
    backgroundImage: "/banner1.png"
  },
  imageCarousel: {
    title: "معرض الصور",
              subtitle: "شاهد أجمل صور مشروع راف 25",
          images: [
            { src: "/banner.png", alt: "مشروع الزهراء السكني", title: "مشروع راف 25" },
            { src: "/banner1.png", alt: "مشروع الزهراء السكني", title: "مشروع راف 25" },
            { src: "/banner2.png", alt: "مشروع الزهراء السكني", title: "مشروع راف 25" },
            { src: "/banner3.jpg", alt: "مشروع الزهراء السكني", title: "مشروع راف 25" },
            { src: "/banner4.jpg", alt: "مشروع الزهراء السكني", title: "مشروع راف 25" },
            { src: "/banner5.jpg", alt: "مشروع الزهراء السكني", title: "مشروع راف 25" }
    ]
  },
  contactSection: {
    title: "احجز موعد المعاينة",
    subtitle: "تواصل معنا الآن واحجز موعدك لمعاينة المشروع",
    phone: "+966536667967",
    whatsapp: "+966536667967",
    email: " info@rafco.sa",
    workingHours: {
      weekdays: "السبت - الخميس: 9:00 ص - 9:00 م",
      friday: "الجمعة: 2:00 م - 9:00 م"
    },
    formSettings: {
      showName: true,
      showPhone: true,
      showEmail: true,
      showMessage: true
    }
  },
  trustIndicators: {
    title: "ضمانات المشروع",
    subtitle: "نلتزم بأعلى معايير الجودة ونقدم ضمانات شاملة لراحة بالك وثقتك",
    guarantees: [
      {
        icon: "Shield",
        title: "15 سنة",
        subtitle: "الهيكل الإنشائي",
        description: "ضمان شامل على جودة البناء"
      },
      {
        icon: "Award",
        title: "25 سنة",
        subtitle: "قواطع وأفياش",
        description: "ضمان الأعمال الكهربائية"
      },
      {
        icon: "Clock",
        title: "سنتين",
        subtitle: "أعمال السباكة",
        description: "ضمان شامل للسباكة"
      },
      {
        icon: "Users",
        title: "سنة",
        subtitle: "اتحاد ملاك",
        description: "عضوية اتحاد الملاك"
      }
    ],
    trustFactors: [
      "مطور عقاري معتمد",
      "رخصة بناء سارية",
      "تأمين شامل على المشروع",
      "فريق هندسي متخصص",
      "مواد بناء عالية الجودة",
      "التزام بمواعيد التسليم"
    ]
  },
  whatsappCTA: {
    title: "تواصل معنا الآن",
    subtitle: "احصل على استشارة مجانية وتفاصيل المشروع",
    phone: "+966536667967",
    message: "مرحباً، أريد معرفة المزيد عن مشروع راف 25",
    variant: "primary",
    showPhone: true,
    showMessage: true
  },
  whatsappSection: {
    title: "مميزات مشروع راف 25",
    subtitle: "تمتع بالميزات التي تجمع بين الراحة والأمان",
    features: [
      {
        icon: "Shield",
        title: "بيئة سكنية متكاملة",
        description: "تم تصميم المبنى ليكون مناسباً للاستقرار والراحة"
      },
      {
        icon: "LucideSnowflake",
        title: "مداخل مكيفة",
        description: "تم تصميم المبنى ليكون مناسباً للاستقرار والراحة"
      },
      {
        icon: "Camera",
        title: "كاميرات مراقبة",
        description: "تم تصميم المبنى ليكون مناسباً للاستقرار والراحة"
      },
      {
        icon: "Wifi",
        title: "سمارت هوم",
        description: "تم تصميم المبنى ليكون مناسباً للاستقرار والراحة"
      },
      {
        icon: "Users",
        title: "تصميم مودرن",
        description: "تم تصميم المبنى ليكون مناسباً للاستقرار والراحة"
      },
      {
        icon: "MapPin",
        title: "موقع مثالي",
        description: "تم تصميم المبنى ليكون مناسباً للاستقرار والراحة"
      }
    ],
    phone: "+966536667967",
    message: "مرحباً، أريد معرفة المزيد عن مشروع راف 25"
  }
}

// In-memory storage - will be loaded from database
let currentData: WebsiteData = { ...defaultData }
let isInitialized = false

// Load data from MongoDB on server startup
const initializeDataOnServer = async () => {
  if (typeof window === 'undefined' && !isInitialized) {
    try {
      const databaseData = await MongoDBService.loadData()
      if (databaseData) {
        currentData = databaseData
        console.log('✅ Website data loaded from MongoDB on server startup')
      }
      isInitialized = true
    } catch (error) {
      console.error('❌ Error loading data from MongoDB on server startup:', error)
    }
  }
}

// Initialize immediately on server-side
if (typeof window === 'undefined') {
  initializeDataOnServer()
}

class WebsiteDataService {
  // Get all website data
  static async getData(): Promise<WebsiteData> {
    // Ensure data is loaded from database on server-side
    if (typeof window === 'undefined' && !isInitialized) {
      await initializeDataOnServer()
    }
    
    // Load from localStorage on client-side
    if (!isInitialized && typeof window !== 'undefined') {
      await this.init()
    }
    
    return currentData
  }
  
  // Synchronous version for compatibility
  static getDataSync(): WebsiteData {
    return currentData
  }

  // Get specific sections
  static getProjectInfo(): ProjectInfo {
    if (!isInitialized && typeof window !== 'undefined') {
      this.init()
    }
    return currentData.project
  }

  static getApartments(): Apartment[] {
    if (!isInitialized && typeof window !== 'undefined') {
      this.init()
    }
    return currentData.apartments
  }

  static getLocationInfo(): LocationInfo {
    if (!isInitialized && typeof window !== 'undefined') {
      this.init()
    }
    return currentData.location
  }

  static getContactInfo(): ContactInfo {
    if (!isInitialized && typeof window !== 'undefined') {
      this.init()
    }
    return currentData.contact
  }

  static getSocialMedia(): SocialMedia[] {
    if (!isInitialized && typeof window !== 'undefined') {
      this.init()
    }
    return currentData.socialMedia
  }

  static getStrategicFeatures(): StrategicFeature[] {
    if (!isInitialized && typeof window !== 'undefined') {
      this.init()
    }
    return currentData.strategicFeatures
  }

  static getProjectHighlights(): ProjectHighlight[] {
    if (!isInitialized && typeof window !== 'undefined') {
      this.init()
    }
    return currentData.projectHighlights
  }

  static getTrustFactors(): TrustFactor[] {
    if (!isInitialized && typeof window !== 'undefined') {
      this.init()
    }
    return currentData.trustFactors
  }

  static getHeroInfo(): HeroInfo {
    if (!isInitialized && typeof window !== 'undefined') {
      this.init()
    }
    return currentData.hero
  }

  static getImageCarouselInfo(): ImageCarouselInfo {
    if (!isInitialized && typeof window !== 'undefined') {
      this.init()
    }
    return currentData.imageCarousel
  }

  static getContactSectionInfo(): ContactSectionInfo {
    if (!isInitialized && typeof window !== 'undefined') {
      this.init()
    }
    return currentData.contactSection
  }

  static getTrustIndicatorsInfo(): TrustIndicatorsInfo {
    if (!isInitialized && typeof window !== 'undefined') {
      this.init()
    }
    return currentData.trustIndicators
  }

  static getWhatsappCTAInfo(): WhatsAppCTAInfo {
    if (!isInitialized && typeof window !== 'undefined') {
      this.init()
    }
    return currentData.whatsappCTA
  }

  static getWhatsappSectionInfo(): WhatsAppSectionInfo {
    if (!isInitialized && typeof window !== 'undefined') {
      this.init()
    }
    return currentData.whatsappSection
  }

  // Update methods
  static async updateProjectInfo(projectInfo: Partial<ProjectInfo>): Promise<void> {
    currentData.project = { ...currentData.project, ...projectInfo }
    await this.saveToStorage()
  }

  static async updateApartments(apartments: Apartment[]): Promise<void> {
    currentData.apartments = apartments
    await this.saveToStorage()
  }

  static async updateLocationInfo(locationInfo: Partial<LocationInfo>): Promise<void> {
    currentData.location = { ...currentData.location, ...locationInfo }
    await this.saveToStorage()
  }

  static async updateContactInfo(contactInfo: Partial<ContactInfo>): Promise<void> {
    currentData.contact = { ...currentData.contact, ...contactInfo }
    await this.saveToStorage()
  }

  static async updateSocialMedia(socialMedia: SocialMedia[]): Promise<void> {
    currentData.socialMedia = socialMedia
    await this.saveToStorage()
  }

  static async updateStrategicFeatures(strategicFeatures: StrategicFeature[]): Promise<void> {
    currentData.strategicFeatures = strategicFeatures
    await this.saveToStorage()
  }

  static async updateProjectHighlights(projectHighlights: ProjectHighlight[]): Promise<void> {
    currentData.projectHighlights = projectHighlights
    await this.saveToStorage()
  }

  static async updateTrustFactors(trustFactors: TrustFactor[]): Promise<void> {
    currentData.trustFactors = trustFactors
    await this.saveToStorage()
  }

  static async updateHeroInfo(heroInfo: Partial<HeroInfo>): Promise<void> {
    currentData.hero = { ...currentData.hero, ...heroInfo }
    await this.saveToStorage()
  }

  static async updateImageCarouselInfo(imageCarouselInfo: Partial<ImageCarouselInfo>): Promise<void> {
    currentData.imageCarousel = { ...currentData.imageCarousel, ...imageCarouselInfo }
    await this.saveToStorage()
  }

  static async updateContactSectionInfo(contactSectionInfo: Partial<ContactSectionInfo>): Promise<void> {
    currentData.contactSection = { ...currentData.contactSection, ...contactSectionInfo }
    await this.saveToStorage()
  }

  static async updateTrustIndicatorsInfo(trustIndicatorsInfo: Partial<TrustIndicatorsInfo>): Promise<void> {
    currentData.trustIndicators = { ...currentData.trustIndicators, ...trustIndicatorsInfo }
    await this.saveToStorage()
  }

  static async updateWhatsappCTAInfo(whatsappCTAInfo: Partial<WhatsAppCTAInfo>): Promise<void> {
    currentData.whatsappCTA = { ...currentData.whatsappCTA, ...whatsappCTAInfo }
    await this.saveToStorage()
  }

  static async updateWhatsappSectionInfo(whatsappSectionInfo: Partial<WhatsAppSectionInfo>): Promise<void> {
    currentData.whatsappSection = { ...currentData.whatsappSection, ...whatsappSectionInfo }
    await this.saveToStorage()
  }

  // Update entire website data
  static async updateAllData(data: WebsiteData): Promise<void> {
    currentData = { ...data }
    await this.saveToStorage()
  }

  // Reset to default data
  static async resetToDefault(): Promise<void> {
    currentData = { ...defaultData }
    await this.saveToStorage()
  }

  // Storage methods - now using persistent database
  private static async saveToStorage(): Promise<void> {
    try {
      // Save to both localStorage (for client-side) and MongoDB (for persistence)
      if (typeof window !== 'undefined') {
        localStorage.setItem('websiteData', JSON.stringify(currentData))
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('websiteDataUpdated'))
      }
      
      // Server-side: Save to MongoDB
      if (typeof window === 'undefined') {
        await MongoDBService.saveData(currentData)
      }
    } catch (error) {
      console.error('Error saving website data:', error)
    }
  }

  private static async loadFromStorage(): Promise<void> {
    try {
      // Server-side: Load from MongoDB first
      if (typeof window === 'undefined') {
        const databaseData = await MongoDBService.loadData()
        if (databaseData) {
          currentData = databaseData
          return
        }
      }
      
      // Client-side: Load from localStorage
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('websiteData')
        if (stored) {
          try {
            currentData = JSON.parse(stored)
          } catch (error) {
            console.error('Error loading website data from localStorage:', error)
            currentData = { ...defaultData }
          }
        }
      }
    } catch (error) {
      console.error('Error loading website data:', error)
      currentData = { ...defaultData }
    }
  }

  // Initialize the service
  static async init(): Promise<void> {
    if (typeof window !== 'undefined' && !isInitialized) {
      await this.loadFromStorage()
      isInitialized = true
    }
  }

  // Initialize MongoDB with default data (server-side only)
  static async initializeDatabase(): Promise<void> {
    if (typeof window === 'undefined') {
      await MongoDBService.initializeDatabase(defaultData)
    }
  }

  // Get project name with dynamic updates
  static getProjectName(): string {
    return this.getProjectInfo().name
  }

  // Update subtitle in image carousel with current project name
  static getImageCarouselSubtitle(): string {
    const projectName = this.getProjectName()
    const carousel = this.getImageCarouselInfo()
    if (carousel.subtitle.includes("مشروع راف 25")) {
      return carousel.subtitle.replace("مشروع راف 25", projectName)
    }
    return carousel.subtitle
  }

  // Update WhatsApp message with current project name
  static getWhatsAppMessage(): string {
    const projectName = this.getProjectName()
    return `مرحباً، أريد معرفة المزيد عن ${projectName}`
  }

  // Update WhatsApp section title with current project name
  static getWhatsAppSectionTitle(): string {
    const projectName = this.getProjectName()
    return `مميزات ${projectName}`
  }
}

// Don't auto-initialize during SSR
// The service will be initialized when first accessed on the client side

export default WebsiteDataService
