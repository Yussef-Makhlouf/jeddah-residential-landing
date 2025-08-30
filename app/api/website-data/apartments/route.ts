import { NextRequest, NextResponse } from 'next/server'
import WebsiteDataService, { Apartment } from '@/lib/website-data'

export async function GET() {
  try {
    const data = WebsiteDataService.getApartments()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching apartments data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch apartments data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data }: { data: Apartment[] } = body

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'No data provided' },
        { status: 400 }
      )
    }

    // Update the apartments data with database persistence
    await WebsiteDataService.updateApartments(data)

    return NextResponse.json({ 
      success: true, 
      message: 'Apartments data updated successfully' 
    })
  } catch (error) {
    console.error('Error updating apartments data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update apartments data' },
      { status: 500 }
    )
  }
}
