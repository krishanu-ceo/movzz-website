import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#030B18',
          borderRadius: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: '72px',
            fontWeight: 900,
            letterSpacing: '-3px',
            fontFamily: 'sans-serif',
          }}
        >
          <span style={{ color: '#ffffff' }}>M</span>
          <span style={{ color: '#2563EB', fontStyle: 'italic' }}>Z</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
