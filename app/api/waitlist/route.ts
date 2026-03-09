import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const SHEET_WEBHOOK  = process.env.GOOGLE_SHEET_WEBHOOK_URL
const GMAIL_USER     = process.env.GMAIL_USER
const GMAIL_PASS     = process.env.GMAIL_APP_PASSWORD   // Gmail App Password (not normal password)
const FAST2SMS_KEY   = process.env.FAST2SMS_API_KEY

export async function POST(req: NextRequest) {
  try {
    const { phone, email, city } = await req.json()

    if (!phone || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const spotNumber = 528 + Math.floor(Math.random() * 50) + 1

    // ── 1. Save to Google Sheets ──────────────────────────────
    if (SHEET_WEBHOOK) {
      await fetch(SHEET_WEBHOOK, {
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

    // ── 2. Confirmation email via Gmail (free) ────────────────
    if (GMAIL_USER && GMAIL_PASS && email) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: GMAIL_USER, pass: GMAIL_PASS },
      })
      await transporter.sendMail({
        from:    `"Movzz" <${GMAIL_USER}>`,
        to:      email,
        subject: `You're #${spotNumber} on the Movzz waitlist 🚀`,
        html:    buildEmailHtml(spotNumber, city),
      }).catch(err => console.error('Email error:', err))
    }

    // ── 3. SMS via Fast2SMS (free credits, Indian) ────────────
    if (FAST2SMS_KEY && phone) {
      const mobile = phone.replace(/\D/g, '').slice(-10)
      const msg = `Welcome to Movzz! You are #${spotNumber} on our waitlist. AI-confirmed rides in 8 seconds launching Chennai 2026. - Team Movzz`
      await fetch('https://www.fast2sms.com/dev/bulkV2', {
        method:  'POST',
        headers: {
          authorization: FAST2SMS_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          route:    'q',
          message:  msg,
          language: 'english',
          flash:    0,
          numbers:  mobile,
        }),
      }).catch(err => console.error('SMS error:', err))
    }

    return NextResponse.json({ success: true, spotNumber })
  } catch (err) {
    console.error('Waitlist API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
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
