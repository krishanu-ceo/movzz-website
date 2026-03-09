'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'

const events = [
  {
    time:     '6:32 AM',
    app:      'Ola',
    letter:   'O',
    bg:       '#1A1500',
    fg:       '#FFD700',
    headline: 'No drivers in your area',
    sub:      '2 minutes of waiting — then silently rejected.',
    status:   'rejected' as const,
    stamp:    'REJECTED',
    stampColor: '#ef4444',
  },
  {
    time:     '6:35 AM',
    app:      'Rapido',
    letter:   'R',
    bg:       '#180800',
    fg:       '#FF6B35',
    headline: 'Driver accepted — then cancelled',
    sub:      'Moving toward you. 400m away. Then gone.',
    status:   'cancelled' as const,
    stamp:    'CANCELLED',
    stampColor: '#f97316',
  },
  {
    time:     '6:38 AM',
    app:      'Uber',
    letter:   'U',
    bg:       '#111',
    fg:       '#FFF',
    headline: 'Driver accepted! 12 min away.',
    sub:      'Finally. Relief. Heart rate drops slightly...',
    status:   'hope' as const,
    stamp:    'HOPE',
    stampColor: '#facc15',
  },
  {
    time:     '6:43 AM',
    app:      'Uber',
    letter:   'U',
    bg:       '#111',
    fg:       '#FFF',
    headline: 'Driver cancelled the trip.',
    sub:      'Still at home. Flight boards in 1h 47m.',
    status:   'crashed' as const,
    stamp:    'MISSION FAILED',
    stampColor: '#ef4444',
  },
]

/* ── Per-status style maps ───────────────────────────────────── */
const STATUS_STYLE = {
  rejected:  { border: 'rgba(239,68,68,0.18)',  bg: 'rgba(12,2,2,0.72)',  textColor: 'rgba(252,129,129,0.85)'  },
  cancelled: { border: 'rgba(249,115,22,0.22)', bg: 'rgba(12,6,2,0.72)',  textColor: 'rgba(253,186,116,0.85)'  },
  hope:      { border: 'rgba(250,204,21,0.22)', bg: 'rgba(6,16,6,0.65)',  textColor: 'rgba(253,224,71,0.85)'   },
  crashed:   { border: 'rgba(239,68,68,0.4)',   bg: 'rgba(14,2,2,0.88)',  textColor: 'rgba(252,129,129,0.95)'  },
}

const STATUS_INITIAL = {
  rejected:  { opacity: 0, x: 30,  y: 0,  scale: 0.96 },
  cancelled: { opacity: 0, x: 30,  y: 0,  scale: 0.96 },
  hope:      { opacity: 0, x: -20, y: 0,  scale: 0.95 },
  crashed:   { opacity: 0, x: 0,   y: 36, scale: 0.93 },
}

/* ── Single event card ───────────────────────────────────────── */
function EventCard({ event, index, visible, onCrash }: {
  event: typeof events[0]
  index: number
  visible: boolean
  onCrash?: () => void
}) {
  const [showStamp, setShowStamp] = useState(false)
  const [shake, setShake]         = useState(false)
  const style = STATUS_STYLE[event.status]
  const isCrashed   = event.status === 'crashed'
  const isHope      = event.status === 'hope'
  const isCancelled = event.status === 'cancelled'

  useEffect(() => {
    if (!visible) { setShowStamp(false); setShake(false); return }

    const t1 = setTimeout(() => setShowStamp(true), isCrashed ? 300 : 550)

    if (isCrashed || isCancelled) {
      const t2 = setTimeout(() => { setShake(true); onCrash?.() }, 200)
      const t3 = setTimeout(() => setShake(false), 700)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }
    return () => clearTimeout(t1)
  }, [visible, isCrashed, isCancelled, onCrash])

  const dotColor = isCrashed  ? 'bg-red-500/80 border-red-500/40'
                : isHope      ? 'bg-yellow-400/60 border-yellow-400/30'
                :               'bg-white/20 border-white/12'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={STATUS_INITIAL[event.status]}
          animate={shake
            ? { opacity: 1, x: [-6, 6, -4, 4, -2, 2, 0], y: 0, scale: 1 }
            : { opacity: 1, x: 0, y: 0, scale: 1 }
          }
          transition={{ type: 'spring', stiffness: 300, damping: 26, delay: 0.04 }}
          className="relative flex gap-4"
        >
          {/* Timeline dot + connector */}
          <div className="flex flex-col items-center pt-1.5 shrink-0">
            <div className="relative shrink-0">
              {(index === events.length - 1 && isCrashed) && (
                <span className="ping-dot" />
              )}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, delay: 0.08 }}
                className={`w-3 h-3 rounded-full border ${dotColor}`}
                style={isCrashed ? {
                  boxShadow: '0 0 10px rgba(239,68,68,0.5)',
                } : undefined}
              />
            </div>
            {index < events.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                className="w-px origin-top mt-2"
                style={{
                  background: isCrashed
                    ? 'rgba(239,68,68,0.25)'
                    : 'rgba(255,255,255,0.07)',
                  minHeight: '44px',
                  flex: '1 0 44px',
                }}
              />
            )}
          </div>

          {/* Card */}
          <div className="flex-1 mb-6 relative">
            <motion.div
              className="rounded-xl p-4 overflow-hidden relative"
              style={{ border: `1px solid ${style.border}`, background: style.bg }}
              animate={isCrashed ? {
                borderColor: ['rgba(239,68,68,0.4)', 'rgba(239,68,68,0.7)', 'rgba(239,68,68,0.4)'],
              } : {}}
              transition={{ duration: 1.5, repeat: isCrashed ? Infinity : 0 }}
              whileHover={{ y: -2, scale: 1.01 }}
            >
              {/* Top accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-0 left-0 right-0 h-[1.5px] origin-left"
                style={{ background: `linear-gradient(90deg, ${event.stampColor}88, transparent)` }}
              />

              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0"
                    style={{ background: event.bg, color: event.fg, border: `1px solid ${event.fg}22` }}
                  >
                    {event.letter}
                  </div>
                  <span className="text-sm font-semibold leading-tight" style={{ color: style.textColor }}>
                    {event.headline}
                  </span>
                </div>
                <span className="text-white/22 text-[10px] font-mono shrink-0 tabular-nums">{event.time}</span>
              </div>

              <p className="text-white/38 text-xs leading-relaxed pl-9">{event.sub}</p>

              {/* Status stamp */}
              <AnimatePresence>
                {showStamp && !isHope && (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.6, rotate: -12 }}
                    animate={{ opacity: 1, scale: 1, rotate: -8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    className="absolute top-3 right-3 px-2 py-0.5 rounded font-mono font-black text-[9px] tracking-[0.25em]"
                    style={{
                      border: `1px solid ${event.stampColor}55`,
                      color: event.stampColor,
                      background: `${event.stampColor}12`,
                      boxShadow: `0 0 10px ${event.stampColor}22`,
                    }}
                  >
                    {event.stamp}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Main section ────────────────────────────────────────────── */
export default function SpiralSection() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const isInView    = useInView(sectionRef, { once: false, margin: '-80px' })
  const [visible, setVisible]     = useState<number[]>([])
  const [mins, setMins]           = useState(120)
  const [secs, setSecs]           = useState(0)
  const [redFlash, setRedFlash]   = useState(false)
  const [stress, setStress]       = useState(0)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const headerY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  const isCritical = mins < 100

  const handleCrash = () => {
    setRedFlash(true)
    setTimeout(() => setRedFlash(false), 900)
  }

  useEffect(() => {
    if (!isInView) return
    setVisible([])
    setMins(120)
    setSecs(0)
    setStress(0)
    setRedFlash(false)

    const delays = [300, 1200, 2400, 3900]
    const stressLevels = [25, 55, 65, 100]

    const timers = delays.map((d, i) => setTimeout(() => {
      setVisible(prev => [...prev, i])
      setStress(stressLevels[i])
    }, d))

    const interval = setInterval(() => {
      setSecs(prev => {
        if (prev === 0) { setMins(m => Math.max(0, m - 1)); return 59 }
        return prev - 1
      })
    }, 1000)

    return () => { timers.forEach(clearTimeout); clearInterval(interval) }
  }, [isInView])

  const fmt = (n: number) => String(n).padStart(2, '0')

  return (
    <section
      id="spiral"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: '#020810' }}
    >
      {/* Red crash flash */}
      <AnimatePresence>
        {redFlash && (
          <motion.div
            key="redflash"
            initial={{ opacity: 0.25 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-20 pointer-events-none"
            style={{ background: 'rgba(239,68,68,0.15)' }}
          />
        )}
      </AnimatePresence>

      <div className="orb orb-blue   w-80 h-80 top-20  right-0  opacity-[0.07]" />
      <div className="orb orb-indigo w-60 h-60 bottom-0 left-0  opacity-[0.06]" />
      <div className="absolute inset-0 dot-pattern opacity-[0.16] pointer-events-none" />
      <div className="scanlines absolute inset-0 pointer-events-none opacity-[0.15]" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: headerY }}
          className="text-center mb-16"
        >
          <div className="section-label mb-4">Incident Log · 06:30 AM</div>
          <h2 className="text-section-title font-display font-black text-white mb-4">
            The App&#8209;Switching{' '}
            <span className="gradient-text-blue">Spiral</span>
          </h2>
          <p className="text-white/38 text-base max-w-lg mx-auto font-mono tracking-wide">
            3 apps. 4 attempts. 0 rides. 17 minutes gone.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* ── LEFT: sticky HUD ── */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 space-y-4">

              {/* Flight countdown */}
              <motion.div
                className="rounded-2xl p-6 text-center relative overflow-hidden"
                style={{
                  background: 'rgba(6,16,31,0.8)',
                  border: `1px solid ${isCritical ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.07)'}`,
                  boxShadow: isCritical ? '0 0 30px rgba(239,68,68,0.08)' : 'none',
                }}
                animate={{ borderColor: isCritical ? ['rgba(239,68,68,0.3)', 'rgba(239,68,68,0.5)', 'rgba(239,68,68,0.3)'] : 'rgba(255,255,255,0.07)' }}
                transition={{ duration: 1.5, repeat: isCritical ? Infinity : 0 }}
              >
                {/* Scanlines overlay */}
                <div className="scanlines absolute inset-0 opacity-20 pointer-events-none" />

                {isCritical && (
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="flex items-center justify-center gap-1.5 mb-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-red-400/70">CRITICAL</span>
                  </motion.div>
                )}

                <p className="text-white/30 text-xs font-mono mb-3 uppercase tracking-[0.18em]">
                  {isCritical ? '⚠ Flight departs in' : 'Flight departs in'}
                </p>

                <motion.div
                  className="font-mono font-black text-5xl tabular-nums"
                  animate={isCritical ? { scale: [1, 1.03, 1] } : {}}
                  transition={{ duration: 0.8, repeat: isCritical ? Infinity : 0 }}
                >
                  <motion.span
                    animate={{ color: isCritical ? '#f87171' : 'rgba(255,255,255,0.85)' }}
                    transition={{ duration: 1 }}
                  >
                    {fmt(mins)}
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-white/15 mx-1.5"
                  >
                    :
                  </motion.span>
                  <motion.span
                    animate={{ color: isCritical ? '#f87171' : 'rgba(255,255,255,0.85)' }}
                    transition={{ duration: 1 }}
                  >
                    {fmt(secs)}
                  </motion.span>
                </motion.div>

                {/* Depletion bar */}
                <div className="h-1 mt-5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    animate={{ width: `${((120 - mins) / 120) * 100}%` }}
                    transition={{ duration: 1 }}
                    className="h-full rounded-full"
                    style={{
                      background: isCritical
                        ? 'linear-gradient(90deg, #ef4444, #f87171)'
                        : 'linear-gradient(90deg, #2563eb, #3b82f6)',
                    }}
                  />
                </div>
              </motion.div>

              {/* Stress meter */}
              <div
                className="rounded-2xl p-4"
                style={{ background: 'rgba(6,16,31,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-white/25">Stress Level</span>
                  <span className="font-mono font-black text-sm" style={{
                    color: stress >= 80 ? '#ef4444' : stress >= 50 ? '#f97316' : '#3b82f6',
                  }}>{stress}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    animate={{ width: `${stress}%` }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full"
                    style={{
                      background: stress >= 80
                        ? 'linear-gradient(90deg, #dc2626, #ef4444)'
                        : stress >= 50
                        ? 'linear-gradient(90deg, #ea580c, #f97316)'
                        : 'linear-gradient(90deg, #1d4ed8, #3b82f6)',
                    }}
                  />
                </div>
                <div className="flex gap-1 mt-2.5">
                  {[0, 1, 2, 3].map(i => (
                    <div
                      key={i}
                      className="flex-1 h-0.5 rounded-full transition-all duration-700"
                      style={{ background: visible.includes(i) ? (i === 3 ? '#ef4444' : i === 2 ? '#facc15' : '#f97316') : 'rgba(255,255,255,0.06)' }}
                    />
                  ))}
                </div>
              </div>

              {/* Crashed callout */}
              <AnimatePresence>
                {visible.includes(3) && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="rounded-2xl p-5 text-center"
                    style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.22)' }}
                  >
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="font-mono text-[9px] tracking-[0.45em] uppercase text-red-400/65 mb-2"
                    >
                      ▶ Status Update
                    </motion.div>
                    <p className="text-red-400/85 font-bold text-sm mb-1">Still at home.</p>
                    <p className="text-white/30 text-xs">17 min wasted · 0 rides confirmed</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── RIGHT: events timeline ── */}
          <div className="lg:col-span-3">
            {events.map((ev, i) => (
              <EventCard
                key={i}
                event={ev}
                index={i}
                visible={visible.includes(i)}
                onCrash={ev.status === 'crashed' ? handleCrash : undefined}
              />
            ))}
          </div>
        </div>

        {/* Bottom callout */}
        <AnimatePresence>
          {visible.includes(3) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="text-center mt-20"
            >
              <p className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                This happens to{' '}
                <span className="gradient-text-blue">500 million</span>{' '}
                Indians. Every. Day.
              </p>
              <p className="text-white/40 text-lg">
                Not bad luck.{' '}
                <span className="text-white/72 font-medium">A broken system.</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
