import { NextRequest, NextResponse } from 'next/server'
import WebsiteDataService, { HeroInfo } from '@/lib/website-data'

export async function GET() {
  try {
    const data = WebsiteDataService.getHeroInfo()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching hero data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hero data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data }: { data: Partial<HeroInfo> } = body

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'No data provided' },
        { status: 400 }
      )
    }

    // Update the hero data
    await WebsiteDataService.updateHeroInfo(data)

    return NextResponse.json({ 
      success: true, 
      message: 'Hero data updated successfully' 
    })
  } catch (error) {
    console.error('Error updating hero data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update hero data' },
      { status: 500 }
    )
  }
}
