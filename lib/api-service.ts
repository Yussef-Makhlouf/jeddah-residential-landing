// API Service for Website Data Management
// This service handles all communication with the backend APIs

import { WebsiteData, HeroInfo, Apartment, StrategicFeature, ProjectHighlight, TrustFactor, ImageCarouselInfo, ContactSectionInfo, TrustIndicatorsInfo, WhatsAppCTAInfo, WhatsAppSectionInfo } from './website-data'

const API_BASE_URL = '/api/website-data'

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

class ApiService {
  // Generic API methods
  private async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`)
      const result: ApiResponse<T> = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'API request failed')
      }
      
      return result.data!
    } catch (error) {
      console.error(`Error fetching from ${endpoint}:`, error)
      throw error
    }
  }

  private async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      })
      
      const result: ApiResponse<T> = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'API request failed')
      }
      
      return result
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error)
      throw error
    }
  }

  // Main website data methods
  async getAllData(): Promise<WebsiteData> {
    return this.get<WebsiteData>('')
  }

  async updateAllData(data: WebsiteData): Promise<void> {
    await this.post<void>('', data)
  }

  // Hero section methods
  async getHeroData(): Promise<HeroInfo> {
    return this.get<HeroInfo>('/hero')
  }

  async updateHeroData(data: Partial<HeroInfo>): Promise<void> {
    await this.post<void>('/hero', data)
  }

  // Apartments methods
  async getApartmentsData(): Promise<Apartment[]> {
    return this.get<Apartment[]>('/apartments')
  }

  async updateApartmentsData(data: Apartment[]): Promise<void> {
    await this.post<void>('/apartments', data)
  }

  // Strategic features methods
  async getStrategicFeaturesData(): Promise<StrategicFeature[]> {
    return this.get<StrategicFeature[]>('/strategic-features')
  }

  async updateStrategicFeaturesData(data: StrategicFeature[]): Promise<void> {
    await this.post<void>('/strategic-features', data)
  }

  // Project highlights methods
  async getProjectHighlightsData(): Promise<ProjectHighlight[]> {
    return this.get<ProjectHighlight[]>('/project-highlights')
  }

  async updateProjectHighlightsData(data: ProjectHighlight[]): Promise<void> {
    await this.post<void>('/project-highlights', data)
  }

  // Trust factors methods
  async getTrustFactorsData(): Promise<TrustFactor[]> {
    return this.get<TrustFactor[]>('/trust-factors')
  }

  async updateTrustFactorsData(data: TrustFactor[]): Promise<void> {
    await this.post<void>('/trust-factors', data)
  }

  // Image carousel methods
  async getImageCarouselData(): Promise<ImageCarouselInfo> {
    return this.get<ImageCarouselInfo>('/image-carousel')
  }

  async updateImageCarouselData(data: Partial<ImageCarouselInfo>): Promise<void> {
    await this.post<void>('/image-carousel', data)
  }

  // Contact section methods
  async getContactSectionData(): Promise<ContactSectionInfo> {
    return this.get<ContactSectionInfo>('/contact-section')
  }

  async updateContactSectionData(data: Partial<ContactSectionInfo>): Promise<void> {
    await this.post<void>('/contact-section', data)
  }

  // Trust indicators methods
  async getTrustIndicatorsData(): Promise<TrustIndicatorsInfo> {
    return this.get<TrustIndicatorsInfo>('/trust-indicators')
  }

  async updateTrustIndicatorsData(data: Partial<TrustIndicatorsInfo>): Promise<void> {
    await this.post<void>('/trust-indicators', data)
  }

  // WhatsApp CTA methods
  async getWhatsAppCTAData(): Promise<WhatsAppCTAInfo> {
    return this.get<WhatsAppCTAInfo>('/whatsapp-cta')
  }

  async updateWhatsAppCTAData(data: Partial<WhatsAppCTAInfo>): Promise<void> {
    await this.post<void>('/whatsapp-cta', data)
  }

  // WhatsApp section methods
  async getWhatsAppSectionData(): Promise<WhatsAppSectionInfo> {
    return this.get<WhatsAppSectionInfo>('/whatsapp-section')
  }

  async updateWhatsAppSectionData(data: Partial<WhatsAppSectionInfo>): Promise<void> {
    await this.post<void>('/whatsapp-section', data)
  }

  // Location advantages methods
  async getLocationAdvantagesData(): Promise<any> {
    return this.get<any>('/location-advantages')
  }

  async updateLocationAdvantagesData(data: any): Promise<void> {
    await this.post<void>('/location-advantages', data)
  }

  // Social media methods
  async getSocialMediaData(): Promise<any> {
    return this.get<any>('/social-media')
  }

  async updateSocialMediaData(data: any): Promise<void> {
    await this.post<void>('/social-media', data)
  }

  // Utility methods
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch('/api/health')
      return response.ok
    } catch (error) {
      console.error('Health check failed:', error)
      return false
    }
  }

  // Error handling
  handleError(error: any): string {
    if (error instanceof Error) {
      return error.message
    }
    return 'An unexpected error occurred'
  }
}

// Create and export a singleton instance
const apiService = new ApiService()
export default apiService
