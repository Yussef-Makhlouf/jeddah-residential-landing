import { NextRequest, NextResponse } from 'next/server'
import WebsiteDataService from '@/lib/website-data'

export async function GET() {
  try {
    const data = WebsiteDataService.getSocialMedia()
    return NextResponse.json({ 
      success: true, 
      data 
    })
  } catch (error) {
    console.error('Error getting social media:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { data } = await request.json()
    
    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Data is required' },
        { status: 400 }
      )
    }

    await WebsiteDataService.updateSocialMedia(data)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Social media updated successfully' 
    })
  } catch (error) {
    console.error('Error updating social media:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    )
  }
}
