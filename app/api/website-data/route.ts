import { NextRequest, NextResponse } from 'next/server'
import WebsiteDataService, { WebsiteData } from '@/lib/website-data'

export async function GET() {
  try {
    const data = await WebsiteDataService.getData()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching website data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch website data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data }: { data: WebsiteData } = body

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'No data provided' },
        { status: 400 }
      )
    }

    // Update the data service with database persistence
    await WebsiteDataService.updateAllData(data)

    return NextResponse.json({ 
      success: true, 
      message: 'Website data updated successfully and saved to database' 
    })
  } catch (error) {
    console.error('Error updating website data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update website data' },
      { status: 500 }
    )
  }
}
