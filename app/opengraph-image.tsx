import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Movzz — Never Miss a Ride Again'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#030B18',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(37,99,235,0.12) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Blue glow orb */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '700px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(37,99,235,0.25) 0%, transparent 70%)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '36px',
            fontSize: '52px',
            fontWeight: 900,
            letterSpacing: '-2px',
            fontFamily: 'sans-serif',
          }}
        >
          <span style={{ color: '#ffffff' }}>MOV</span>
          <span style={{ color: '#2563EB', fontStyle: 'italic' }}>ZZ</span>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 900,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.1,
            letterSpacing: '-2px',
            marginBottom: '20px',
            fontFamily: 'sans-serif',
            maxWidth: '900px',
          }}
        >
          Never Miss a Ride Again
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: '24px',
            color: 'rgba(255,255,255,0.45)',
            textAlign: 'center',
            maxWidth: '700px',
            lineHeight: 1.5,
            marginBottom: '48px',
            fontFamily: 'sans-serif',
          }}
        >
          India&apos;s first AI-powered ride reliability platform.
          One tap confirms your ride in 8 seconds.
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '48px', marginBottom: '48px' }}>
          {[
            { val: '96%', label: 'Guaranteed' },
            { val: '8s',  label: 'Confirm Time' },
            { val: '5+',  label: 'Providers' },
          ].map(({ val, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '40px', fontWeight: 900, color: '#3B82F6', fontFamily: 'monospace' }}>{val}</span>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '3px', fontFamily: 'sans-serif' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* CTA pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(37,99,235,0.15)',
            border: '1px solid rgba(37,99,235,0.4)',
            borderRadius: '100px',
            padding: '14px 32px',
          }}
        >
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3B82F6' }} />
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '20px', fontFamily: 'sans-serif' }}>
            Join the waitlist · movzzy.com · Chennai 2026
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
