'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ACHIEVEMENTS: Record<string, { title: string; sub: string; xp: number; color: string }> = {
  'hero':         { title: 'Mission Briefing',     sub: 'The mission to end missed rides — begins.',   xp: 50,  color: '#3B82F6' },
  'spiral':       { title: 'Incident Logged',       sub: '3 apps. 4 attempts. 0 rides confirmed.',      xp: 75,  color: '#EF4444' },
  'consequence':  { title: 'Damage Calculated',     sub: 'Total loss documented: ₹74,700.',             xp: 100, color: '#F87171' },
  'glimmer':      { title: 'Protocol Deployed',     sub: 'Solution acquired. Confirmed in 8 seconds.',  xp: 150, color: '#3B82F6' },
  'magic':        { title: 'Architecture Unlocked', sub: '3 intelligence layers decoded.',              xp: 200, color: '#6366F1' },
  'social-proof': { title: 'Intel Gathered',        sub: '527 operatives confirmed in the field.',      xp: 175, color: '#0EA5E9' },
  'team':         { title: 'Squad Assembled',       sub: 'Four founders. One mission. Zero excuses.',   xp: 225, color: '#8B5CF6' },
  'urgency':      { title: 'Mission Window Active', sub: 'First 500 slots. Clock is running.',          xp: 250, color: '#F59E0B' },
  'waitlist':     { title: 'Enlisting Initiated',   sub: 'Welcome to the founding squad, pioneer.',     xp: 500, color: '#3B82F6' },
}

export default function AchievementToast() {
  const [queue,   setQueue]   = useState<string[]>([])
  const [current, setCurrent] = useState<string | null>(null)
  const [totalXp, setTotalXp] = useState(0)
  const seen    = useRef(new Set<string>())
  const timer   = useRef<ReturnType<typeof setTimeout>>()

  // Process queue
  const next = useCallback(() => {
    setQueue(q => {
      if (q.length === 0) { setCurrent(null); return q }
      const [head, ...tail] = q
      setCurrent(head)
      return tail
    })
  }, [])

  // Watch sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !seen.current.has(entry.target.id)) {
            const id = entry.target.id
            if (ACHIEVEMENTS[id]) {
              seen.current.add(id)
              setQueue(q => [...q, id])
            }
          }
        })
      },
      { rootMargin: '-5% 0px -55% 0px', threshold: 0 }
    )

    Object.keys(ACHIEVEMENTS).forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Start next when idle
  useEffect(() => {
    if (!current && queue.length > 0) next()
  }, [queue, current, next])

  // Auto-dismiss
  useEffect(() => {
    if (!current) return
    setTotalXp(prev => prev + (ACHIEVEMENTS[current]?.xp ?? 0))
    timer.current = setTimeout(() => { setCurrent(null) }, 3800)
    return () => clearTimeout(timer.current)
  }, [current])

  const ach = current ? ACHIEVEMENTS[current] : null

  return (
    <div className="fixed bottom-6 left-6 z-[200] pointer-events-none" style={{ maxWidth: '300px' }}>
      <AnimatePresence mode="wait">
        {ach && (
          <motion.div
            key={current}
            initial={{ opacity: 0, x: -48, scale: 0.88 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -24, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: 'rgba(3,8,18,0.97)',
                border: `1px solid ${ach.color}35`,
                boxShadow: `0 0 40px ${ach.color}18, 0 12px 40px rgba(0,0,0,0.6)`,
                backdropFilter: 'blur(24px)',
              }}
            >
              {/* Color top bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="h-[2px] origin-left"
                style={{ background: `linear-gradient(90deg, ${ach.color}, ${ach.color}40, transparent)` }}
              />

              <div className="px-4 py-3.5">
                {/* Header label */}
                <div
                  className="text-[9px] font-mono tracking-[0.38em] uppercase mb-2.5"
                  style={{ color: `${ach.color}85` }}
                >
                  ◆ Achievement Unlocked
                </div>

                <div className="flex items-start gap-3">
                  {/* Icon badge */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${ach.color}12`, border: `1px solid ${ach.color}28` }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke={ach.color}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                      />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-white/88 text-sm font-display font-bold mb-0.5 leading-tight">
                      {ach.title}
                    </div>
                    <div className="text-white/32 text-xs leading-relaxed">
                      {ach.sub}
                    </div>
                  </div>

                  {/* XP badge */}
                  <div className="text-right shrink-0 ml-1">
                    <div
                      className="font-mono font-black text-sm leading-tight"
                      style={{ color: ach.color }}
                    >
                      +{ach.xp}
                    </div>
                    <div className="text-white/20 text-[9px] font-mono tracking-wider">XP</div>
                  </div>
                </div>

                {/* Total XP strip */}
                {totalXp > 0 && (
                  <div
                    className="mt-3 pt-2.5 flex items-center justify-between"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <span className="text-[9px] font-mono tracking-widest uppercase text-white/18">Total XP</span>
                    <span className="font-mono font-bold text-[11px]" style={{ color: `${ach.color}90` }}>
                      {totalXp.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
