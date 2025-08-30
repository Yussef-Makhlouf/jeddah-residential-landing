import { NextRequest, NextResponse } from 'next/server'
import WebsiteDataService, { StrategicFeature } from '@/lib/website-data'

export async function GET() {
  try {
    const data = WebsiteDataService.getStrategicFeatures()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching strategic features data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch strategic features data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data }: { data: StrategicFeature[] } = body

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'No data provided' },
        { status: 400 }
      )
    }

    // Update the strategic features data
    await WebsiteDataService.updateStrategicFeatures(data)

    return NextResponse.json({ 
      success: true, 
      message: 'Strategic features data updated successfully' 
    })
  } catch (error) {
    console.error('Error updating strategic features data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update strategic features data' },
      { status: 500 }
    )
  }
}
