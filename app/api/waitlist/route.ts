import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const SHEET_WEBHOOK  = process.env.GOOGLE_SHEET_WEBHOOK_URL
const RESEND_API_KEY = process.env.RESEND_API_KEY
const GMAIL_USER     = process.env.GMAIL_USER
const FAST2SMS_KEY   = process.env.FAST2SMS_API_KEY
const BASE_COUNT     = parseInt(process.env.WAITLIST_BASE_COUNT || '500', 10)

// ── In-memory rate limiting (per IP, resets on cold start) ────
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_MS = 60_000 // 1 request per IP per minute

// ── Input validation ──────────────────────────────────────────
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
}
function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, '').slice(-10)
  return digits.length === 10 && /^[6-9]/.test(digits)
}

export async function POST(req: NextRequest) {
  try {
    // ── Rate limit by IP ───────────────────────────────────────
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const lastRequest = rateLimitMap.get(ip)
    if (lastRequest && Date.now() - lastRequest < RATE_LIMIT_MS) {
      return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 })
    }
    rateLimitMap.set(ip, Date.now())

    const { phone, email, city } = await req.json()

    // ── Server-side validation ─────────────────────────────────
    if (!phone || !email) {
      return NextResponse.json({ error: 'Phone and email are required.' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }
    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: 'Please enter a valid 10-digit Indian mobile number.' }, { status: 400 })
    }

    // ── Get current sheet count for sequential spot number ─────
    let sheetRows = 0
    if (SHEET_WEBHOOK) {
      try {
        const res = await fetch(SHEET_WEBHOOK)
        const data = await res.json()
        sheetRows = typeof data.count === 'number' ? data.count : 0
      } catch { /* fall back to 0 */ }
    }
    const spotNumber = BASE_COUNT + sheetRows + 1

    // ── 1. Save to Google Sheets (fire-and-forget) ────────────
    if (SHEET_WEBHOOK) {
      fetch(SHEET_WEBHOOK, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          email,
          city,
          spotNumber,
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        }),
      }).catch(err => console.error('Sheet error:', err))
    }

    // ── 2. Confirmation email via Resend ──────────────────────
    if (RESEND_API_KEY && email) {
      try {
        const resend = new Resend(RESEND_API_KEY)
        const { error } = await resend.emails.send({
          from:    'Movzz Waitlist <krishanu@movzzy.com>',
          to:      email,
          replyTo: GMAIL_USER ?? 'krishanu@movzzy.com',
          subject: `You're #${spotNumber} on the Movzz waitlist`,
          text:    buildEmailText(spotNumber, city),
          html:    buildEmailHtml(spotNumber, city),
        })
        if (error) {
          console.error('[email] Resend error:', error)
        } else {
          console.log(`[email] sent to ${email} (spot #${spotNumber})`)
        }
      } catch (err) {
        console.error('[email] FAILED to send to', email, '— error:', err)
      }
    }

    // ── 3. SMS via Fast2SMS (fire-and-forget) ─────────────────
    if (FAST2SMS_KEY && phone) {
      const mobile = phone.replace(/\D/g, '').slice(-10)
      const msg = `Welcome to Movzz! You are #${spotNumber} on our waitlist. AI-confirmed rides in 8 seconds launching Chennai 2026. - Team Movzz`
      fetch('https://www.fast2sms.com/dev/bulkV2', {
        method:  'POST',
        headers: { authorization: FAST2SMS_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ route: 'q', message: msg, language: 'english', flash: 0, numbers: mobile }),
      }).catch(err => console.error('SMS error:', err))
    }

    return NextResponse.json({ success: true, spotNumber })
  } catch (err) {
    console.error('Waitlist API error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}

/* ── Email plain-text template ───────────────────────────────── */
function buildEmailText(spot: number, city: string) {
  return `MOVZZ — You're on the waitlist!

Your spot: #${spot}
City: ${city}

You're in! We're launching in Chennai in 2026.
You'll be among the first to get AI-confirmed rides in 8 seconds — across Uber, Ola, Rapido & more.

96% ride success rate · 8s confirmation · 5 providers

—
Movzz — India's first AI-powered ride reliability platform
Chennai launch · 2026`
}

/* ── Email HTML template ─────────────────────────────────────── */
function buildEmailHtml(spot: number, city: string) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#030B18;font-family:'Inter',Arial,sans-serif">
  <div style="max-width:540px;margin:0 auto;padding:40px 24px">

    <div style="text-align:center;margin-bottom:32px">
      <span style="font-size:28px;font-weight:900;letter-spacing:-1px">
        <span style="color:#ffffff">MOV</span><span style="color:#2563EB;font-style:italic">ZZ</span>
      </span>
    </div>

    <div style="background:#0D1A2D;border:1px solid rgba(37,99,235,0.25);border-radius:16px;padding:32px;text-align:center">
      <div style="font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:rgba(96,165,250,0.6);margin-bottom:16px;font-family:monospace">
        Access Granted
      </div>
      <div style="font-size:48px;font-weight:900;color:#3B82F6;margin-bottom:4px;font-family:monospace">
        #${spot}
      </div>
      <div style="font-size:14px;color:rgba(255,255,255,0.4);margin-bottom:24px">
        Your spot on the Movzz waitlist
      </div>

      <div style="background:rgba(37,99,235,0.08);border:1px solid rgba(37,99,235,0.18);border-radius:12px;padding:20px;margin-bottom:24px">
        <p style="margin:0 0 8px;font-size:15px;color:rgba(255,255,255,0.85);font-weight:600">
          You're in, ${city}! 🎉
        </p>
        <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.4);line-height:1.6">
          We're launching in Chennai in 2026. You'll be among the first to get<br>
          AI-confirmed rides in 8 seconds — across Uber, Ola, Rapido &amp; more.
        </p>
      </div>

      <div style="display:flex;justify-content:center;gap:24px;margin-bottom:28px">
        <div style="text-align:center">
          <div style="font-size:15px;font-weight:700;color:#60A5FA">96%</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.1em">Guaranteed</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:15px;font-weight:700;color:#60A5FA">8s</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.1em">Confirm</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:15px;font-weight:700;color:#60A5FA">5</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.1em">Providers</div>
        </div>
      </div>

      <div style="font-size:11px;color:rgba(255,255,255,0.2);font-family:monospace;letter-spacing:0.2em">
        PIONEER · ${city.toUpperCase()} · SPOT #${spot}
      </div>
    </div>

    <p style="text-align:center;font-size:12px;color:rgba(255,255,255,0.18);margin-top:28px">
      Movzz — India's first AI-powered ride reliability platform.<br>
      Chennai launch · 2026
    </p>
  </div>
</body>
</html>`
}
