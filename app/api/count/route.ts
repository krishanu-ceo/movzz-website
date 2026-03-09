import { NextResponse } from 'next/server'

const SHEET_WEBHOOK = process.env.GOOGLE_SHEET_WEBHOOK_URL
// Base count before the sheet was set up (pre-launch signups)
const BASE_COUNT    = parseInt(process.env.WAITLIST_BASE_COUNT || '500', 10)

export const revalidate = 60 // cache for 60 seconds

export async function GET() {
  try {
    if (!SHEET_WEBHOOK) {
      return NextResponse.json({ count: BASE_COUNT })
    }
    // Call the same Apps Script URL with GET — requires doGet in the script
    const res  = await fetch(SHEET_WEBHOOK, { next: { revalidate: 60 } })
    const data = await res.json()
    const sheetRows = typeof data.count === 'number' ? data.count : 0
    return NextResponse.json({ count: BASE_COUNT + sheetRows })
  } catch {
    return NextResponse.json({ count: BASE_COUNT })
  }
}
