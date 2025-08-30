"use client"

import { useState, useEffect } from 'react'

interface UsePageLoadingReturn {
  isLoading: boolean
  isInitialLoad: boolean
}

export function usePageLoading(): UsePageLoadingReturn {
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    // Check if this is a page reload by looking at the performance navigation type
    const checkPageReload = () => {
      if (typeof window !== 'undefined') {
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
        if (navigationEntries.length > 0) {
          const navigationType = navigationEntries[0].type
          // If it's a reload, show loader for longer
          if (navigationType === 'reload') {
            setIsLoading(true)
            setIsInitialLoad(false)
            
            // Show loader for reload for at least 1.5 seconds
            const timer = setTimeout(() => {
              setIsLoading(false)
            }, 1500)
            
            return () => clearTimeout(timer)
          }
        }
        
        // For normal navigation, shorter loading time
        const timer = setTimeout(() => {
          setIsLoading(false)
          setIsInitialLoad(false)
        }, 800)
        
        return () => clearTimeout(timer)
      }
    }

    // Handle page visibility change (when user comes back to tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !isInitialLoad) {
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
        }, 600)
      }
    }

    // Handle beforeunload to show loader when page is about to reload
    const handleBeforeUnload = () => {
      setIsLoading(true)
    }

    checkPageReload()
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isInitialLoad])

  // Also handle router events for Next.js navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleRouteChangeStart = () => {
        setIsLoading(true)
      }

      const handleRouteChangeComplete = () => {
        setTimeout(() => {
          setIsLoading(false)
        }, 300)
      }

      // Listen for popstate (back/forward navigation)
      const handlePopState = () => {
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }

      window.addEventListener('popstate', handlePopState)

      return () => {
        window.removeEventListener('popstate', handlePopState)
      }
    }
  }, [])

  return {
    isLoading,
    isInitialLoad
  }
}
