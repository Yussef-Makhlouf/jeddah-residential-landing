import { NextRequest, NextResponse } from 'next/server'
import WebsiteDataService, { WhatsAppSectionInfo } from '@/lib/website-data'

export async function GET() {
  try {
    const data = WebsiteDataService.getWhatsappSectionInfo()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching WhatsApp section data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch WhatsApp section data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data }: { data: Partial<WhatsAppSectionInfo> } = body

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'No data provided' },
        { status: 400 }
      )
    }

    // Update the WhatsApp section data
    await WebsiteDataService.updateWhatsappSectionInfo(data)

    return NextResponse.json({ 
      success: true, 
      message: 'WhatsApp section data updated successfully' 
    })
  } catch (error) {
    console.error('Error updating WhatsApp section data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update WhatsApp section data' },
      { status: 500 }
    )
  }
}
