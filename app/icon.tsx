import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
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
          borderRadius: '6px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: '13px',
            fontWeight: 900,
            letterSpacing: '-0.5px',
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
