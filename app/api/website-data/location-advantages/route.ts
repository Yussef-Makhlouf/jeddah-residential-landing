import { NextRequest, NextResponse } from 'next/server'
import WebsiteDataService from '@/lib/website-data'

export async function GET() {
  try {
    const data = WebsiteDataService.getLocationInfo()
    return NextResponse.json({ 
      success: true, 
      data 
    })
  } catch (error) {
    console.error('Error getting location advantages:', error)
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

    await WebsiteDataService.updateLocationInfo(data)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Location advantages updated successfully' 
    })
  } catch (error) {
    console.error('Error updating location advantages:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    )
  }
}
