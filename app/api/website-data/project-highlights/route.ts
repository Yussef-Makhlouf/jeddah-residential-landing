import { NextRequest, NextResponse } from 'next/server'
import WebsiteDataService, { ProjectHighlight } from '@/lib/website-data'

export async function GET() {
  try {
    const data = WebsiteDataService.getProjectHighlights()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching project highlights data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project highlights data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data }: { data: ProjectHighlight[] } = body

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'No data provided' },
        { status: 400 }
      )
    }

    // Update the project highlights data
    await WebsiteDataService.updateProjectHighlights(data)

    return NextResponse.json({ 
      success: true, 
      message: 'Project highlights data updated successfully' 
    })
  } catch (error) {
    console.error('Error updating project highlights data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update project highlights data' },
      { status: 500 }
    )
  }
}
