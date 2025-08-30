#!/usr/bin/env npx tsx

/**
 * Migration Script: JSON File to MongoDB
 * 
 * This script migrates existing data from website-data.json to MongoDB
 * Run this once after setting up MongoDB to transfer your current data
 * 
 * Usage:
 * npm run migrate-to-mongodb
 * or
 * npx tsx scripts/migrate-to-mongodb.ts
 */

import fs from 'fs/promises'
import path from 'path'
import { MongoDBService } from '../lib/mongodb-service'
import { WebsiteData } from '../lib/website-data'

const JSON_FILE_PATH = path.join(process.cwd(), 'website-data.json')

async function migrateData() {
  console.log('🚀 Starting migration from JSON file to MongoDB...')
  
  try {
    // Check if JSON file exists
    try {
      await fs.access(JSON_FILE_PATH)
      console.log('✅ Found existing website-data.json file')
    } catch {
      console.log('⚠️  No website-data.json file found')
      console.log('Migration will use default data instead')
      return
    }

    // Read JSON file
    console.log('📖 Reading data from website-data.json...')
    const jsonData = await fs.readFile(JSON_FILE_PATH, 'utf-8')
    const websiteData: WebsiteData = JSON.parse(jsonData)
    
    console.log('✅ Successfully parsed JSON data')

    // Test MongoDB connection
    console.log('🔌 Testing MongoDB connection...')
    const connectionTest = await MongoDBService.testConnection()
    
    if (!connectionTest) {
      throw new Error('Failed to connect to MongoDB. Please check your MONGODB_URI in .env.local')
    }

    console.log('✅ MongoDB connection successful')

    // Check if MongoDB already has data
    const hasExistingData = await MongoDBService.databaseExists()
    
    if (hasExistingData) {
      console.log('⚠️  MongoDB already contains data!')
      console.log('Do you want to overwrite it? (This action cannot be undone)')
      
      // In a real scenario, you might want to prompt the user
      // For now, we'll create a backup and proceed
      console.log('📋 Creating backup of existing MongoDB data...')
      await MongoDBService.createBackup()
    }

    // Save data to MongoDB
    console.log('💾 Saving data to MongoDB...')
    await MongoDBService.saveData(websiteData)
    
    console.log('✅ Data successfully migrated to MongoDB!')

    // Verify the migration
    console.log('🔍 Verifying migration...')
    const loadedData = await MongoDBService.loadData()
    
    if (loadedData) {
      console.log('✅ Migration verification successful!')
      console.log(`📊 Migrated data includes:`)
      console.log(`   - Project: ${loadedData.project.name}`)
      console.log(`   - Apartments: ${loadedData.apartments.length} units`)
      console.log(`   - Features: ${loadedData.strategicFeatures.length} items`)
      console.log(`   - Social Media: ${loadedData.socialMedia.length} platforms`)
    } else {
      throw new Error('Migration verification failed - could not load data from MongoDB')
    }

    // Get MongoDB stats
    const stats = await MongoDBService.getStats()
    console.log('📈 MongoDB Statistics:')
    console.log(`   - Document ID: ${stats.documentId}`)
    console.log(`   - Created: ${stats.createdAt}`)
    console.log(`   - Last Updated: ${stats.lastUpdated}`)

    console.log('\n🎉 Migration completed successfully!')
    console.log('💡 You can now delete the website-data.json file if you want')
    console.log('🚀 Your application is ready for production deployment!')

  } catch (error) {
    console.error('❌ Migration failed:', error)
    console.log('\n🔧 Troubleshooting:')
    console.log('1. Make sure MONGODB_URI is set in .env.local')
    console.log('2. Check your MongoDB Atlas connection string')
    console.log('3. Ensure your IP address is whitelisted in MongoDB Atlas')
    console.log('4. Verify your MongoDB credentials are correct')
    process.exit(1)
  }
}

// Main execution
async function main() {
  try {
    await migrateData()
  } catch (error) {
    console.error('❌ Unexpected error:', error)
    process.exit(1)
  }
}

main().catch(console.error)
