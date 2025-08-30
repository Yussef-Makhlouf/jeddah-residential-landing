// Only import mongoose on server-side
let mongoose: any = null
let Schema: any = null
let Document: any = null

if (typeof window === 'undefined') {
  try {
    const mongooseModule = require('mongoose')
    mongoose = mongooseModule.default || mongooseModule
    Schema = mongoose.Schema
    Document = mongoose.Document
  } catch (error) {
    console.log('Mongoose not available in this environment')
  }
}

import { WebsiteData } from '../lib/website-data'

export interface IWebsiteData extends Document {
  _id: string
  data: WebsiteData
  createdAt: Date
  updatedAt: Date
}

// Define schema only on server-side
let WebsiteDataSchema: any = null

if (typeof window === 'undefined' && mongoose && Schema) {
  WebsiteDataSchema = new Schema<IWebsiteData>({
    // We store all website data as a single document for simplicity
    data: {
      type: Schema.Types.Mixed,
      required: true
    }
  }, {
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: 'website_settings' // Collection name
  })
}

// Add schema methods only on server-side
if (typeof window === 'undefined' && WebsiteDataSchema) {
  // Ensure only one document exists (singleton pattern)
  WebsiteDataSchema.index({}, { unique: true })

  // Pre-save middleware to ensure only one document
  WebsiteDataSchema.pre('save', async function(next: any) {
    // If this is a new document and there's already a document, update it instead
    if (this.isNew) {
      const existingDoc = await this.constructor.findOne({})
      if (existingDoc) {
        // Update existing document instead of creating new one
        await this.constructor.updateOne({}, { data: this.data })
        return next(new Error('Website data already exists, updated existing document'))
      }
    }
    next()
  })

  // Static methods
  WebsiteDataSchema.statics.getSingletonData = async function(): Promise<WebsiteData | null> {
    try {
      const doc = await this.findOne({}).lean()
      return doc ? doc.data : null
    } catch (error) {
      console.error('Error getting singleton data:', error)
      return null
    }
  }

  WebsiteDataSchema.statics.updateSingletonData = async function(data: WebsiteData): Promise<boolean> {
    try {
      const result = await this.findOneAndUpdate(
        {}, // Empty filter to match any document
        { data }, // Update data
        { 
          upsert: true, // Create if doesn't exist
          new: true, // Return updated document
          runValidators: true
        }
      )
      console.log('✅ Website data updated in MongoDB')
      return !!result
    } catch (error) {
      console.error('❌ Error updating singleton data:', error)
      return false
    }
  }

  WebsiteDataSchema.statics.initializeData = async function(defaultData: WebsiteData): Promise<void> {
    try {
      const existing = await this.findOne({})
      if (!existing) {
        await this.create({ data: defaultData })
        console.log('✅ MongoDB initialized with default data')
      } else {
        console.log('✅ MongoDB data already exists')
      }
    } catch (error) {
      console.error('❌ Error initializing MongoDB data:', error)
      throw error
    }
  }
}

// Create model only on server-side
let WebsiteDataModel: any = null

if (typeof window === 'undefined' && mongoose) {
  try {
    // Prevent re-compilation during development
    WebsiteDataModel = mongoose.models.WebsiteData || mongoose.model<IWebsiteData>('WebsiteData', WebsiteDataSchema)
  } catch (error) {
    console.log('Error creating WebsiteData model:', error)
  }
}

export default WebsiteDataModel
