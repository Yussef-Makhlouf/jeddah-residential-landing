import { NextRequest, NextResponse } from 'next/server'
import WebsiteDataService, { ContactSectionInfo } from '@/lib/website-data'

export async function GET() {
  try {
    const data = WebsiteDataService.getContactSectionInfo()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching contact section data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contact section data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data }: { data: Partial<ContactSectionInfo> } = body

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'No data provided' },
        { status: 400 }
      )
    }

    // Update the contact section data with database persistence
    await WebsiteDataService.updateContactSectionInfo(data)

    return NextResponse.json({ 
      success: true, 
      message: 'Contact section data updated successfully' 
    })
  } catch (error) {
    console.error('Error updating contact section data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update contact section data' },
      { status: 500 }
    )
  }
}
