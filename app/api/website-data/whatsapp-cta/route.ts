import { NextRequest, NextResponse } from 'next/server'
import WebsiteDataService, { WhatsAppCTAInfo } from '@/lib/website-data'

export async function GET() {
  try {
    const data = WebsiteDataService.getWhatsappCTAInfo()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching WhatsApp CTA data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch WhatsApp CTA data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data }: { data: Partial<WhatsAppCTAInfo> } = body

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'No data provided' },
        { status: 400 }
      )
    }

    // Update the WhatsApp CTA data
    await WebsiteDataService.updateWhatsappCTAInfo(data)

    return NextResponse.json({ 
      success: true, 
      message: 'WhatsApp CTA data updated successfully' 
    })
  } catch (error) {
    console.error('Error updating WhatsApp CTA data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update WhatsApp CTA data' },
      { status: 500 }
    )
  }
}
