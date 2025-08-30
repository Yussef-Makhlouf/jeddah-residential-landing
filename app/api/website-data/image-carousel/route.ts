import { NextRequest, NextResponse } from 'next/server'
import WebsiteDataService, { ImageCarouselInfo } from '@/lib/website-data'

export async function GET() {
  try {
    const data = WebsiteDataService.getImageCarouselInfo()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching image carousel data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch image carousel data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data }: { data: Partial<ImageCarouselInfo> } = body

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'No data provided' },
        { status: 400 }
      )
    }

    // Update the image carousel data with database persistence
    await WebsiteDataService.updateImageCarouselInfo(data)

    return NextResponse.json({ 
      success: true, 
      message: 'Image carousel data updated successfully' 
    })
  } catch (error) {
    console.error('Error updating image carousel data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update image carousel data' },
      { status: 500 }
    )
  }
}
