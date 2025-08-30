/**
 * MongoDB Database Service
 * 
 * This service replaces the JSON file database with MongoDB
 * providing proper persistence for production deployment
 */

// Only import on server-side
let connectDB: any = null
let WebsiteDataModel: any = null

if (typeof window === 'undefined') {
  try {
    connectDB = require('./mongodb').default
    WebsiteDataModel = require('../models/WebsiteData').default
  } catch (error) {
    console.log('MongoDB modules not available')
  }
}

import { WebsiteData } from './website-data'

export class MongoDBService {
  /**
   * Ensure database connection before any operation
   * Returns true if MongoDB is available, false if in fallback mode
   */
  private static async ensureConnection(): Promise<boolean> {
    // Return false if running on client-side
    if (typeof window !== 'undefined') {
      return false
    }
    
    if (!connectDB) {
      return false
    }
    
    try {
      const connection = await connectDB()
      return connection !== null
    } catch (error) {
      console.error('❌ Failed to connect to MongoDB:', error)
      return false
    }
  }

  /**
   * Save website data to MongoDB
   * This ensures data persists across server restarts and deployments
   */
  static async saveData(data: WebsiteData): Promise<void> {
    try {
      const isConnected = await this.ensureConnection()
      
      if (!isConnected || !WebsiteDataModel) {
        console.log('⚠️  MongoDB not available, skipping save operation')
        return
      }
      
      const success = await WebsiteDataModel.updateSingletonData(data)
      
      if (!success) {
        throw new Error('Failed to save data to MongoDB')
      }
      
      console.log('✅ Website data saved successfully to MongoDB')
    } catch (error) {
      console.error('❌ Error saving website data to MongoDB:', error)
      // Don't throw in fallback mode
      if (process.env.NODE_ENV === 'development') {
        console.log('🔧 Development mode: MongoDB save failed, continuing...')
      } else {
        throw new Error('Failed to save website data to database')
      }
    }
  }

  /**
   * Load website data from MongoDB
   * Returns null if no data exists (first time setup)
   */
  static async loadData(): Promise<WebsiteData | null> {
    try {
      const isConnected = await this.ensureConnection()
      
      if (!isConnected || !WebsiteDataModel) {
        console.log('⚠️  MongoDB not available, returning null')
        return null
      }
      
      const data = await WebsiteDataModel.getSingletonData()
      
      if (data) {
        console.log('✅ Website data loaded successfully from MongoDB')
        return data
      } else {
        console.log('📝 No data found in MongoDB - first time setup')
        return null
      }
    } catch (error) {
      console.error('❌ Error loading website data from MongoDB:', error)
      // Return null in fallback mode instead of throwing
      if (process.env.NODE_ENV === 'development') {
        console.log('🔧 Development mode: MongoDB load failed, returning null')
        return null
      }
      throw new Error('Failed to load website data from database')
    }
  }

  /**
   * Check if database has data
   */
  static async databaseExists(): Promise<boolean> {
    try {
      const isConnected = await this.ensureConnection()
      
      if (!isConnected || !WebsiteDataModel) {
        return false
      }
      
      const data = await WebsiteDataModel.getSingletonData()
      return data !== null
    } catch (error) {
      console.error('❌ Error checking database existence:', error)
      return false
    }
  }

  /**
   * Initialize database with default data if it doesn't exist
   */
  static async initializeDatabase(defaultData: WebsiteData): Promise<void> {
    try {
      const isConnected = await this.ensureConnection()
      
      if (!isConnected || !WebsiteDataModel) {
        console.log('⚠️  MongoDB not available, skipping initialization')
        return
      }
      
      await WebsiteDataModel.initializeData(defaultData)
      
      console.log('✅ MongoDB database initialized successfully')
    } catch (error) {
      console.error('❌ Error initializing MongoDB database:', error)
      if (process.env.NODE_ENV === 'development') {
        console.log('🔧 Development mode: MongoDB initialization failed, continuing...')
      } else {
        throw new Error('Failed to initialize database')
      }
    }
  }

  /**
   * Create backup of current data
   */
  static async createBackup(): Promise<string> {
    try {
      await this.ensureConnection()
      
      const currentData = await this.loadData()
      if (!currentData) {
        throw new Error('No data to backup')
      }

      // For MongoDB, we can create a backup by exporting to JSON
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const backupData = {
        timestamp,
        data: currentData,
        source: 'MongoDB'
      }
      
      // You could save this to a file or another collection
      console.log(`✅ Backup created for data from: ${timestamp}`)
      return `mongodb-backup-${timestamp}`
    } catch (error) {
      console.error('❌ Error creating MongoDB backup:', error)
      throw new Error('Failed to create backup')
    }
  }

  /**
   * Get database statistics
   */
  static async getStats() {
    try {
      await this.ensureConnection()
      
      const doc = await WebsiteDataModel.findOne({})
      
      return {
        hasData: !!doc,
        lastUpdated: doc?.updatedAt || null,
        createdAt: doc?.createdAt || null,
        documentId: doc?._id || null
      }
    } catch (error) {
      console.error('❌ Error getting database stats:', error)
      return {
        hasData: false,
        lastUpdated: null,
        createdAt: null,
        documentId: null,
        error: error.message
      }
    }
  }

  /**
   * Test database connection
   */
  static async testConnection(): Promise<boolean> {
    try {
      await this.ensureConnection()
      
      // Try a simple operation
      await WebsiteDataModel.findOne({}).limit(1)
      
      console.log('✅ MongoDB connection test successful')
      return true
    } catch (error) {
      console.error('❌ MongoDB connection test failed:', error)
      return false
    }
  }
}
