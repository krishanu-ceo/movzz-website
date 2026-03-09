'use client'

import { useEffect, useRef } from 'react'

export default function CursorSpotlight() {
  const innerRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const inner = innerRef.current
    const outer = outerRef.current
    if (!inner || !outer) return

    let mx = -1200, my = -1200
    let cx = mx, cy = my
    let ox = mx, oy = my
    let raf: number

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      // Inner follows fast
      cx = lerp(cx, mx - 350, 0.12)
      cy = lerp(cy, my - 350, 0.12)
      inner.style.transform = `translate3d(${cx}px,${cy}px,0)`

      // Outer follows slower — creates depth
      ox = lerp(ox, mx - 500, 0.06)
      oy = lerp(oy, my - 500, 0.06)
      outer.style.transform = `translate3d(${ox}px,${oy}px,0)`

      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Outer ambient — large, very subtle */}
      <div
        ref={outerRef}
        className="pointer-events-none fixed top-0 left-0 z-[2] will-change-transform"
        style={{
          width: 1000,
          height: 1000,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 65%)',
        }}
      />
      {/* Inner core — tighter, stronger */}
      <div
        ref={innerRef}
        className="pointer-events-none fixed top-0 left-0 z-[3] will-change-transform"
        style={{
          width: 700,
          height: 700,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(37,99,235,0.13) 0%, rgba(37,99,235,0.05) 38%, transparent 68%)',
        }}
      />
    </>
  )
}
