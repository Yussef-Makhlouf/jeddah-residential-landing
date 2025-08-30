import { NextRequest, NextResponse } from 'next/server'
import WebsiteDataService, { TrustFactor } from '@/lib/website-data'

export async function GET() {
  try {
    const data = WebsiteDataService.getTrustFactors()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching trust factors data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trust factors data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data }: { data: TrustFactor[] } = body

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'No data provided' },
        { status: 400 }
      )
    }

    // Update the trust factors data
    await WebsiteDataService.updateTrustFactors(data)

    return NextResponse.json({ 
      success: true, 
      message: 'Trust factors data updated successfully' 
    })
  } catch (error) {
    console.error('Error updating trust factors data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update trust factors data' },
      { status: 500 }
    )
  }
}
