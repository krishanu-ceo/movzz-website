'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useWaitlistCount } from '@/hooks/useWaitlistCount'

/* ── Types ───────────────────────────────────────────────────── */
type Phase =
  | 'boot' | 'mission'
  | 'attempt1' | 'fail1'
  | 'attempt2' | 'fail2'
  | 'attempt3' | 'fail3'
  | 'gameover' | 'unlock'

const SEQUENCE: [Phase, number][] = [
  ['mission',   800],
  ['attempt1',  1900],
  ['fail1',     3600],
  ['attempt2',  4800],
  ['fail2',     6300],
  ['attempt3',  7500],
  ['fail3',     8900],
  ['gameover',  10100],
  ['unlock',    12800],
]

const APPS = [
  { phase: 'attempt1' as Phase, fail: 'fail1' as Phase, name: 'Uber',   letter: 'U', bg: '#111111', fg: '#FFFFFF', reason: 'No drivers available in your area.' },
  { phase: 'attempt2' as Phase, fail: 'fail2' as Phase, name: 'Ola',    letter: 'O', bg: '#1A1500', fg: '#FFD700', reason: 'Booking cancelled by driver.' },
  { phase: 'attempt3' as Phase, fail: 'fail3' as Phase, name: 'Rapido', letter: 'R', bg: '#180800', fg: '#FF6B35', reason: 'Surge ×3.2 — above your budget.' },
]

/* Deterministic particles — no Math.random() to avoid hydration mismatch */
const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  x:       (i * 43 + 7)  % 100,
  y:       (i * 31 + 13) % 100,
  size:    (i % 3) + 1,
  dur:     5 + (i % 7),
  delay:   -(i * 0.72) % 7,
  opacity: 0.06 + (i % 5) * 0.035,
}))

/* ── HUD (lives inside right panel) ─────────────────────────── */
function HUD({ stress, time, phase }: { stress: number; time: string; phase: Phase }) {
  const unlocked = phase === 'unlock'
  return (
    <div
      className="flex items-center justify-between px-5 py-2.5 text-xs font-mono border-b"
      style={{
        background: 'rgba(2,6,15,0.95)',
        borderColor: unlocked ? 'rgba(37,99,235,0.12)' : 'rgba(255,255,255,0.05)',
      }}
    >
      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${unlocked ? 'bg-blue-400' : 'bg-blue-500/65'}`} />
        <span className={`tracking-[0.2em] uppercase font-semibold text-[10px] ${unlocked ? 'text-blue-400/65' : 'text-blue-400/55'}`}>
          {unlocked ? 'System Online' : 'Mission_001'}
        </span>
      </div>
      <div className={`font-black text-sm tabular-nums tracking-wide ${time === '00:00:00' ? 'text-red-400 animate-pulse' : 'text-white/60'}`}>
        ✈ {time}
      </div>
      <div className="flex items-center gap-2">
        <div className="w-12 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <motion.div
            animate={{ width: `${stress}%` }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{
              background: stress > 75 ? '#ef4444' : stress > 45 ? '#f59e0b' : '#3b82f6',
              boxShadow: stress > 75 ? '0 0 6px rgba(239,68,68,0.7)' : undefined,
            }}
          />
        </div>
        <span className={`font-bold tabular-nums w-7 text-right text-[10px] ${stress > 75 ? 'text-red-400' : stress > 45 ? 'text-yellow-400' : 'text-blue-400'}`}>
          {stress}%
        </span>
      </div>
    </div>
  )
}

/* ── Boot Screen ─────────────────────────────────────────────── */
function BootScreen() {
  const lines = [
    { text: 'MOVZZ OS — BOOT SEQUENCE',         cls: 'text-white/50 font-semibold tracking-wider' },
    { text: '> Establishing secure connection', cls: 'text-blue-400/65' },
    { text: '> Loading ride intelligence...',   cls: 'text-blue-400/65' },
    { text: '> All systems ready.',             cls: 'text-blue-400/90' },
  ]
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-mono space-y-2 max-w-xs w-full">
      {lines.map((line, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.16 }}>
          <span className={`text-sm ${line.cls}`}>{line.text}</span>
        </motion.div>
      ))}
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.72, duration: 0.5 }}
        className="h-px origin-left mt-2" style={{ background: 'linear-gradient(90deg, rgba(37,99,235,0.5), transparent)' }} />
      <motion.span animate={{ opacity: [0.6, 0, 0.6] }} transition={{ delay: 1, duration: 0.85, repeat: Infinity }}
        className="text-blue-400/55 text-xs">▋</motion.span>
    </motion.div>
  )
}

/* ── Mission Brief ───────────────────────────────────────────── */
function MissionBrief() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className="w-full max-w-sm font-mono"
    >
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(37,99,235,0.2)', background: 'rgba(3,8,18,0.97)' }}>
        <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)', background: 'rgba(37,99,235,0.05)' }}>
          <span className="text-blue-400/65 text-[10px] tracking-[0.35em] uppercase font-bold">Mission Briefing</span>
          <span className="text-white/22 text-[10px]">06:30 AM</span>
        </div>
        <div className="px-5 py-4 space-y-3">
          {[
            { k: 'Objective', v: 'Ride to Chennai Airport',  vc: 'text-white/85'      },
            { k: 'Deadline',  v: 'Flight departs in 2h 30m', vc: 'text-yellow-400/80' },
            { k: 'Budget',    v: 'Up to \u20B9400',           vc: 'text-white/65'      },
          ].map(({ k, v, vc }) => (
            <div key={k} className="flex items-center justify-between text-sm">
              <span className="text-white/28 shrink-0 w-20">{k}</span>
              <span className={`${vc} font-medium text-right`}>{v}</span>
            </div>
          ))}
          <div className="flex items-center gap-2.5 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
            <span className="text-white/22 text-[10px]">Attempts</span>
            <div className="flex gap-1.5">
              {[0, 1, 2].map(i => (
                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 400 }}
                  className="w-1.5 h-1.5 rounded-full bg-white/75" />
              ))}
            </div>
          </div>
        </div>
        <div className="px-5 pb-4">
          <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.3 }}
            className="text-blue-400/55 text-[10px] tracking-[0.35em] uppercase">▶ Initiating...</motion.span>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Attempt Card ────────────────────────────────────────────── */
function AttemptCard({ phase }: { phase: Phase }) {
  const current   = APPS.find(a => phase === a.phase || phase === a.fail)
  if (!current) return null
  const failed     = phase === current.fail
  const attemptNum = current.phase === 'attempt1' ? 1 : current.phase === 'attempt2' ? 2 : 3
  const livesLeft  = 3 - attemptNum

  return (
    <motion.div
      key={current.name + String(failed)}
      initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      className="w-full max-w-sm font-mono"
    >
      <div className="rounded-2xl overflow-hidden"
        style={{ border: `1px solid ${failed ? 'rgba(239,68,68,0.22)' : 'rgba(255,255,255,0.07)'}`, background: failed ? 'rgba(10,2,2,0.97)' : 'rgba(3,8,18,0.97)' }}>
        <div className="flex items-center justify-between px-5 py-3 border-b"
          style={{ borderColor: failed ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.04)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
              style={{ background: current.bg, color: current.fg }}>{current.letter}</div>
            <span className="text-white/72 text-sm font-semibold">{current.name}</span>
          </div>
          <span className="text-white/20 text-[10px] tracking-wider">ATTEMPT {attemptNum} / 3</span>
        </div>
        <div className="px-5 py-5">
          <AnimatePresence mode="wait">
            {!failed ? (
              <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[0,1,2].map(i => <div key={i} className="w-1 h-1 rounded-full bg-blue-400/55 animate-bounce" style={{ animationDelay: `${i * 0.13}s` }} />)}
                  </div>
                  <span className="text-blue-400/55 text-xs">Searching for driver</span>
                </div>
                <div className="relative h-16 rounded-xl overflow-hidden flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(37,99,235,0.08)' }}>
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(37,99,235,0.07) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
                  <div className="w-10 h-10 rounded-full border border-blue-500/22 animate-ping" style={{ animationDuration: '1.6s' }} />
                  <div className="w-5 h-5 rounded-full border border-blue-500/35 animate-ping absolute" style={{ animationDuration: '2.2s' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400/70 absolute" />
                </div>
              </motion.div>
            ) : (
              <motion.div key="fail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-1">
                <motion.div
                  initial={{ scale: 1.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                  className="text-[10px] font-bold tracking-[0.42em] text-red-400/65 uppercase mb-2"
                >Failed</motion.div>
                <p className="text-white/45 text-sm mb-5 leading-relaxed">{current.reason}</p>
                <div className="flex justify-center gap-2">
                  {[0,1,2].map(i => (
                    <motion.div key={i}
                      initial={{ scale: i < livesLeft ? 1 : 1.4 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, delay: i * 0.06 }}
                      className={`w-1.5 h-1.5 rounded-full ${i < livesLeft ? 'bg-white/75' : 'bg-red-500/45'}`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Game Over ───────────────────────────────────────────────── */
function GameOver() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }} className="w-full max-w-sm text-center font-mono">
      <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <div className="text-[10px] tracking-[0.55em] uppercase text-red-400/45 mb-3">Mission Failed</div>
        <motion.h2
          className="text-5xl font-black text-red-500 mb-2 tracking-[0.1em]"
          style={{ textShadow: '0 0 50px rgba(239,68,68,0.55), 0 0 100px rgba(239,68,68,0.2)' }}
          animate={{ x: [0, -4, 4, -2, 2, 0] }}
          transition={{ duration: 0.12, repeat: 4, repeatDelay: 3.8, delay: 0.3 }}
        >
          GAME<br />OVER
        </motion.h2>
        <p className="text-white/30 text-sm mt-2">You missed your flight. Again.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="grid grid-cols-3 gap-2 mt-6">
        {[
          { label: 'Confirmed', value: '0 / 3',  color: 'text-red-400/85'    },
          { label: 'Wasted',    value: '23 min', color: 'text-yellow-400/75' },
          { label: 'Loss',      value: '\u20B974K',   color: 'text-red-400/85'    },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-xl py-3 px-2 text-center"
            style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.09)' }}>
            <div className={`font-black text-base ${color}`}>{value}</div>
            <div className="text-white/22 text-[9px] mt-1 uppercase tracking-wider">{label}</div>
          </div>
        ))}
      </motion.div>

      <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ delay: 0.8, duration: 1.2, repeat: Infinity }}
        className="text-blue-400/40 text-[10px] tracking-[0.45em] uppercase mt-6">
        ▶ Searching for alternative
      </motion.div>
    </motion.div>
  )
}

/* ── 3D Logo ─────────────────────────────────────────────────── */
function Float3DLogo() {
  const ref = useRef<HTMLDivElement>(null)
  const rx  = useMotionValue(0)
  const ry  = useMotionValue(0)
  const rotX = useSpring(rx, { stiffness: 200, damping: 25 })
  const rotY = useSpring(ry, { stiffness: 200, damping: 25 })

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    rx.set(-((e.clientY - rect.top)  / rect.height - 0.5) * 18)
    ry.set( ((e.clientX - rect.left) / rect.width  - 0.5) * 18)
  }

  return (
    <div ref={ref} style={{ perspective: '700px' }}
      onMouseMove={handleMove} onMouseLeave={() => { rx.set(0); ry.set(0) }}
      className="select-none cursor-pointer">
      <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }} className="relative">
        <div className="absolute inset-0 rounded-2xl scale-110 blur-2xl"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.35) 0%, transparent 70%)' }} />
        <motion.div style={{ transform: 'translateZ(24px)' }} className="relative px-8 py-5">
          <Image src="/logo.png" alt="Movzz" width={180} height={54} className="h-14 w-auto object-contain" priority />
        </motion.div>
        <div className="absolute inset-x-8 bottom-0 h-6 rounded-full blur-xl"
          style={{ transform: 'translateZ(-12px) translateY(16px)', background: 'rgba(37,99,235,0.35)' }} />
      </motion.div>
    </div>
  )
}

/* ── Panel Unlock (compact, lives in right column) ───────────── */
function PanelUnlock() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center w-full">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        className="font-mono text-[10px] tracking-[0.5em] uppercase text-blue-400/60 mb-5">
        Solution Found
      </motion.div>

      <motion.div
        initial={{ scale: 0.55, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 160, damping: 18 }}
        className="flex justify-center mb-5"
      >
        <Float3DLogo />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <p className="text-white/45 text-sm leading-relaxed mb-4">
          AI-confirmed in 8 seconds.<br />Across 5 providers. Zero stress.
        </p>
        <div className="flex justify-center gap-6">
          {[
            { val: '96%', label: 'Success', color: '#3B82F6' },
            { val: '8s',  label: 'Confirm', color: '#60A5FA' },
            { val: '5×',  label: 'Apps',    color: '#8B5CF6' },
          ].map(({ val, label, color }) => (
            <div key={label} className="text-center">
              <div className="font-black text-xl" style={{ color }}>{val}</div>
              <div className="text-white/25 text-[10px] tracking-wider uppercase">{label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Main Export ─────────────────────────────────────────────── */
export default function HeroSection() {
  const waitlistCount = useWaitlistCount()
  const [phase, setPhase]   = useState<Phase>('boot')
  const [stress, setStress] = useState(12)
  const [secs, setSecs]     = useState(150 * 60)
  const [shake, setShake]   = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const leftY   = useTransform(scrollYProgress, [0, 1], [0,  -70])
  const rightY  = useTransform(scrollYProgress, [0, 1], [0, -110])
  const fadeOut = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  useEffect(() => {
    const timers = SEQUENCE.map(([p, delay]) => setTimeout(() => setPhase(p), delay))
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (phase === 'fail1')    setStress(42)
    if (phase === 'fail2')    setStress(75)
    if (phase === 'fail3')    setStress(97)
    if (phase === 'gameover') setStress(100)
    if (phase === 'unlock')   setTimeout(() => setStress(3), 1200)
  }, [phase])

  useEffect(() => {
    if (!(['fail1', 'fail2', 'fail3'] as Phase[]).includes(phase)) return
    setShake(true)
    const t = setTimeout(() => setShake(false), 600)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase === 'unlock' || phase === 'gameover') return
    const id = setInterval(() => setSecs(s => Math.max(0, s - 4)), 500)
    return () => clearInterval(id)
  }, [phase])

  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = secs % 60
  const timeDisplay = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
  const attemptPhases: Phase[] = ['attempt1','fail1','attempt2','fail2','attempt3','fail3']

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #02060F 0%, #020810 55%, #030D1C 100%)' }}>

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-blue-400${i % 2 === 1 ? ' hidden sm:block' : ''}`}
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: p.opacity }}
            animate={{ y: [-10, 10, -10], opacity: [p.opacity, p.opacity * 3.5, p.opacity] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* ── Orbs ── */}
      <div className="orb orb-blue   w-[650px] h-[650px] -top-40  right-0   opacity-[0.09]" />
      <div className="orb orb-indigo w-[400px] h-[400px]  bottom-0 -left-20  opacity-[0.07]" />

      {/* ── Dot grid ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(37,99,235,0.048) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />

      {/* ── Scanlines ── */}
      <div className="scanlines absolute inset-0 pointer-events-none z-0 opacity-40" />

      {/* Nav spacer */}
      <div className="h-20" />

      {/* ── Two-column layout ── */}
      <motion.div
        style={{ opacity: fadeOut }}
        className="relative z-10 flex items-center px-6 pt-4 pb-20 max-w-7xl mx-auto"
      >
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-20 items-center w-full">

          {/* LEFT — immediate value prop, always visible */}
          <motion.div style={{ y: leftY }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="section-label mb-7 inline-flex">96% Guaranteed · Chennai 2026</div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-hero font-display font-black text-white mb-6"
              style={{ lineHeight: 1.04 }}
            >
              Never<br />
              Miss a Ride.<br />
              <span className="gradient-text-blue">Again.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-white/45 text-lg md:text-xl mb-10 max-w-md leading-relaxed"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              One tap. AI scans Uber, Ola, Rapido & more — books the most reliable option.{' '}
              <span className="text-blue-400/80 font-semibold">Guaranteed in 8 seconds.</span>
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="flex gap-8 sm:gap-12 mb-10"
            >
              {[
                { val: '96%', label: 'Guaranteed',   color: '#3B82F6' },
                { val: '8s',  label: 'Avg confirm',  color: '#60A5FA' },
                { val: '5×',  label: 'Providers',    color: '#8B5CF6' },
              ].map(({ val, label, color }) => (
                <div key={label}>
                  <div className="font-display font-black text-2xl sm:text-3xl mb-0.5" style={{ color }}>{val}</div>
                  <div className="text-white/30 text-xs uppercase tracking-widest">{label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.46 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="relative inline-flex">
                <span className="btn-ring"  />
                <span className="btn-ring-2" />
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary text-base py-4 px-8"
                >
                  Join Waitlist — Free
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.button>
              </div>
              <p className="text-white/28 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
                <span className="text-blue-400/70 font-medium">{waitlistCount.toLocaleString()} people</span> waiting · No card needed
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT — cinematic game sequence */}
          <motion.div
            style={{ y: rightY }}
            initial={{ opacity: 0, x: 40, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 rounded-3xl scale-110 blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 70%)' }} />

            {/* Game card */}
            <motion.div
              className="relative rounded-3xl overflow-hidden"
              animate={shake ? { x: [-10, 10, -7, 7, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.48, ease: 'easeOut' }}
              style={{
                border: '1px solid rgba(37,99,235,0.18)',
                background: 'rgba(3,8,18,0.98)',
                boxShadow: '0 40px 120px rgba(0,0,0,0.75), 0 0 80px rgba(37,99,235,0.1)',
              }}
            >
              {/* Fail flash overlay */}
              <AnimatePresence>
                {(['fail1', 'fail2', 'fail3'] as Phase[]).includes(phase) && (
                  <motion.div
                    key={phase + '-flash'}
                    initial={{ opacity: 0.35 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.9 }}
                    className="absolute inset-0 z-30 pointer-events-none rounded-3xl"
                    style={{ background: 'rgba(239,68,68,0.22)' }}
                  />
                )}
              </AnimatePresence>
              <HUD stress={stress} time={timeDisplay} phase={phase} />

              <div className="relative flex items-center justify-center px-6 py-8 min-h-[360px] sm:min-h-[400px]">
                <div className="scanlines absolute inset-0 pointer-events-none opacity-25" />
                <AnimatePresence mode="wait">
                  {phase === 'boot'              && <BootScreen   key="boot"     />}
                  {phase === 'mission'           && <MissionBrief key="mission"  />}
                  {attemptPhases.includes(phase) && <AttemptCard  key="attempts" phase={phase} />}
                  {phase === 'gameover'          && <GameOver     key="gameover" />}
                  {phase === 'unlock'            && <PanelUnlock  key="unlock"   />}
                </AnimatePresence>
              </div>

              {/* Card footer */}
              <div className="px-5 py-2.5 border-t flex items-center justify-between"
                style={{ borderColor: 'rgba(255,255,255,0.04)', background: 'rgba(2,6,15,0.8)' }}>
                <span className="font-mono text-[10px] text-white/18 tracking-[0.3em] uppercase">Chennai · 6:30 AM</span>
                <div className="flex gap-1.5">
                  {[0,1,2].map(i => {
                    const allFailed = ['fail3','gameover','unlock'].includes(phase)
                    return <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${allFailed ? 'bg-red-500/40' : 'bg-white/30'}`} />
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-mono text-[10px] text-white/18 tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-4 h-7 border border-white/12 rounded-full flex items-start justify-center p-1">
          <motion.div animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-0.5 h-1.5 bg-blue-400/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
