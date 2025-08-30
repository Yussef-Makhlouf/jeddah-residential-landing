// Hook for Real-time Website Data Management
// This hook manages real-time updates from the admin panel to the website

import { useState, useEffect, useCallback } from 'react'
import apiService from '@/lib/api-service'
import { WebsiteData } from '@/lib/website-data'

interface UseWebsiteDataOptions {
  autoRefresh?: boolean
  refreshInterval?: number
}

interface UseWebsiteDataReturn {
  data: WebsiteData | null
  isLoading: boolean
  error: string | null
  refresh: () => Promise<void>
  updateData: (newData: Partial<WebsiteData>) => void
}

export function useWebsiteData(options: UseWebsiteDataOptions = {}): UseWebsiteDataReturn {
  const { autoRefresh = false, refreshInterval = 30000 } = options
  
  const [data, setData] = useState<WebsiteData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now())

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const websiteData = await apiService.getAllData()
      setData(websiteData)
      setLastUpdated(Date.now())
    } catch (err) {
      const errorMessage = apiService.handleError(err)
      setError(errorMessage)
      console.error('Error loading website data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const refresh = useCallback(async () => {
    await loadData()
  }, [loadData])

  const updateData = useCallback((newData: Partial<WebsiteData>) => {
    setData(prevData => {
      if (!prevData) return null
      return { ...prevData, ...newData }
    })
  }, [])

  // Initial load
  useEffect(() => {
    loadData()
  }, [loadData])

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh || refreshInterval <= 0) return

    const interval = setInterval(() => {
      // Only refresh if data is older than refresh interval
      if (Date.now() - lastUpdated >= refreshInterval) {
        loadData()
      }
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval, lastUpdated, loadData])

  // Listen for storage events (when admin updates data)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin-data-updated') {
        // Refresh data when admin makes changes
        refresh()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [refresh])

  return {
    data,
    isLoading,
    error,
    refresh,
    updateData
  }
}

// Specialized hooks for specific data sections
export function useHeroData() {
  const { data, isLoading, error, refresh } = useWebsiteData()
  return {
    heroData: data?.hero || null,
    isLoading,
    error,
    refresh
  }
}

export function useApartmentsData() {
  const { data, isLoading, error, refresh } = useWebsiteData()
  return {
    apartments: data?.apartments || [],
    isLoading,
    error,
    refresh
  }
}

export function useStrategicFeaturesData() {
  const { data, isLoading, error, refresh } = useWebsiteData()
  return {
    features: data?.strategicFeatures || [],
    isLoading,
    error,
    refresh
  }
}

export function useProjectHighlightsData() {
  const { data, isLoading, error, refresh } = useWebsiteData()
  return {
    highlights: data?.projectHighlights || [],
    trustFactors: data?.trustFactors || [],
    isLoading,
    error,
    refresh
  }
}

export function useImageCarouselData() {
  const { data, isLoading, error, refresh } = useWebsiteData()
  return {
    carouselData: data?.imageCarousel || null,
    isLoading,
    error,
    refresh
  }
}

export function useLocationData() {
  const { data, isLoading, error, refresh } = useWebsiteData()
  return {
    locationData: data?.location || null,
    isLoading,
    error,
    refresh
  }
}

export function useProjectData() {
  const { data, isLoading, error, refresh } = useWebsiteData()
  return {
    projectData: data?.project || null,
    isLoading,
    error,
    refresh
  }
}

// Hook for dynamic project name in different contexts
export function useDynamicProjectData() {
  const { data, isLoading, error, refresh } = useWebsiteData()
  
  return {
    projectName: data?.project?.name || "مشروع راف 25",
    getImageCarouselSubtitle: () => {
      const projectName = data?.project?.name || "مشروع راف 25"
      const subtitle = data?.imageCarousel?.subtitle || "  "
      return subtitle.includes("مشروع راف 25") 
        ? subtitle.replace("مشروع راف 25", projectName)
        : subtitle
    },
    getWhatsAppMessage: () => {
      const projectName = data?.project?.name || "مشروع راف 25"
      return `مرحباً، أريد معرفة المزيد عن ${projectName}`
    },
    getWhatsAppSectionTitle: () => {
      const projectName = data?.project?.name || "مشروع راف 25"
      return `مميزات ${projectName}`
    },
    isLoading,
    error,
    refresh
  }
}