/**
 * Auto Database Initialization
 * 
 * This module automatically initializes the database when the server starts
 * It ensures that the database file exists and contains default data
 */

import { MongoDBService } from './mongodb-service'
import WebsiteDataService from './website-data'

let isInitialized = false

export async function autoInitializeDatabase() {
  // Only run once and only on server-side
  if (isInitialized || typeof window !== 'undefined') {
    return
  }

  try {
    console.log('🔍 Checking MongoDB initialization...')
    
    // Check if MongoDB has data
    const exists = await MongoDBService.databaseExists()
    
    if (!exists) {
      console.log('📝 MongoDB data not found. Initializing with default data...')
      
      // Get default data
      const defaultData = await WebsiteDataService.getData()
      
      // Initialize MongoDB
      await MongoDBService.initializeDatabase(defaultData)
      
      console.log('✅ MongoDB initialized successfully!')
    } else {
      console.log('✅ MongoDB already exists and ready to use')
    }
    
    isInitialized = true
  } catch (error) {
    console.error('❌ Error during auto MongoDB initialization:', error)
    // Don't throw error to prevent server startup failure
  }
}

// Auto-initialize when this module is imported (server-side only)
if (typeof window === 'undefined') {
  autoInitializeDatabase()
}
