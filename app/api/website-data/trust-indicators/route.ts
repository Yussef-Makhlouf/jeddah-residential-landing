import { NextRequest, NextResponse } from 'next/server'
import WebsiteDataService, { TrustIndicatorsInfo } from '@/lib/website-data'

export async function GET() {
  try {
    const data = WebsiteDataService.getTrustIndicatorsInfo()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching trust indicators data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trust indicators data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data }: { data: Partial<TrustIndicatorsInfo> } = body

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'No data provided' },
        { status: 400 }
      )
    }

    // Update the trust indicators data
    await WebsiteDataService.updateTrustIndicatorsInfo(data)

    return NextResponse.json({ 
      success: true, 
      message: 'Trust indicators data updated successfully' 
    })
  } catch (error) {
    console.error('Error updating trust indicators data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update trust indicators data' },
      { status: 500 }
    )
  }
}
