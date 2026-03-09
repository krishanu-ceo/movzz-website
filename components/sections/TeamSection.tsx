'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

/* ── Founders data ───────────────────────────────────────────── */
/* Add actual photos to /public/team/ (e.g. km.jpg, tb.jpg, ss.jpg, sk.jpg) */
const FOUNDERS = [
  {
    id: 'km',
    initials: 'KM',
    photo: '/team/km.jpg',
    name: 'Krishanu Mahapatra',
    role: 'Founder & CEO',
    class: 'COMMANDER',
    classDesc: 'Mission Control',
    color: '#2563EB',
    dimColor: 'rgba(37,99,235,0.18)',
    borderColor: 'rgba(37,99,235,0.35)',
    glow: 'rgba(37,99,235,0.4)',
    grad: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)',
    brief: 'Visionary behind Movzz. Turned a personal missed-flight story into India\'s first AI ride reliability platform — and got it government registered before most startups find a name.',
    stats: [
      { label: 'Product Vision', val: 98, color: '#3B82F6' },
      { label: 'Leadership',     val: 96, color: '#60A5FA' },
      { label: 'Strategy',       val: 94, color: '#93C5FD' },
      { label: 'Execution',      val: 91, color: '#BFDBFE' },
    ],
    ability: 'Converts 6:30 AM disasters into billion-dollar ideas',
  },
  {
    id: 'tb',
    initials: 'TB',
    photo: '/team/tb.jpg',
    name: 'Tathagatha Bhatacharjee',
    role: 'Co-Founder & CTO',
    class: 'ARCHITECT',
    classDesc: 'System Design',
    color: '#6366F1',
    dimColor: 'rgba(99,102,241,0.18)',
    borderColor: 'rgba(99,102,241,0.35)',
    glow: 'rgba(99,102,241,0.4)',
    grad: 'linear-gradient(135deg, #4F46E5 0%, #818CF8 100%)',
    brief: 'The brain that makes the 8-second guarantee real. Architects the AI layer that scans 5+ providers simultaneously — turning what used to take 23 minutes of chaos into sub-10-second certainty.',
    stats: [
      { label: 'AI Engineering', val: 99, color: '#818CF8' },
      { label: 'Architecture',   val: 97, color: '#A5B4FC' },
      { label: 'Innovation',     val: 96, color: '#C7D2FE' },
      { label: 'Reliability',    val: 98, color: '#E0E7FF' },
    ],
    ability: 'Builds systems that never sleep, never cancel',
  },
  {
    id: 'ss',
    initials: 'SS',
    photo: '/team/ss.jpg',
    name: 'Shreyash Singh',
    role: 'Co-Founder & CMO',
    class: 'STRATEGIST',
    classDesc: 'Growth & Brand',
    color: '#0EA5E9',
    dimColor: 'rgba(14,165,233,0.18)',
    borderColor: 'rgba(14,165,233,0.35)',
    glow: 'rgba(14,165,233,0.4)',
    grad: 'linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)',
    brief: 'Turns Chennai\'s commuter pain into a movement. The force behind why 527 people signed up before a single line of app code shipped — because great marketing starts with a real story.',
    stats: [
      { label: 'Brand',        val: 98, color: '#38BDF8' },
      { label: 'Growth',       val: 96, color: '#7DD3FC' },
      { label: 'Storytelling', val: 99, color: '#BAE6FD' },
      { label: 'Community',    val: 94, color: '#E0F2FE' },
    ],
    ability: 'Makes people care before the product even launches',
  },
  {
    id: 'sk',
    initials: 'SK',
    photo: '/team/sk.jpg',
    name: 'Sambhav Kushwaha',
    role: 'Co-Founder & COO',
    class: 'OPERATOR',
    classDesc: 'Scale & Systems',
    color: '#8B5CF6',
    dimColor: 'rgba(139,92,246,0.18)',
    borderColor: 'rgba(139,92,246,0.35)',
    glow: 'rgba(139,92,246,0.4)',
    grad: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
    brief: 'Keeps the machine running. While everyone else ships features, Sambhav ships the processes that let Movzz scale from 527 waitlist users to 527,000 — without losing a single booking.',
    stats: [
      { label: 'Operations',    val: 97, color: '#A78BFA' },
      { label: 'Execution',     val: 98, color: '#C4B5FD' },
      { label: 'Process Design',val: 96, color: '#DDD6FE' },
      { label: 'Scalability',   val: 95, color: '#EDE9FE' },
    ],
    ability: 'Makes chaos look like clockwork',
  },
]

/* ── Stat bar ────────────────────────────────────────────────── */
function StatBar({ label, val, color, delay }: { label: string; val: number; color: string; delay: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-white/35 text-[11px] font-mono tracking-wider uppercase">{label}</span>
        <span className="font-mono font-black text-sm" style={{ color }}>{val}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${val}%` }}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
        />
      </div>
    </div>
  )
}

/* ── Avatar (photo with gradient fallback) ───────────────────── */
function FounderAvatar({ founder }: { founder: typeof FOUNDERS[0] }) {
  const [photoError, setPhotoError] = useState(false)

  if (!photoError) {
    return (
      <div className="relative w-32 h-32 rounded-2xl overflow-hidden"
        style={{ boxShadow: `0 0 50px ${founder.glow}, 0 12px 40px rgba(0,0,0,0.6)` }}>
        <Image
          src={founder.photo}
          alt={founder.name}
          fill
          className="object-cover object-top"
          onError={() => setPhotoError(true)}
          sizes="128px"
        />
        {/* Subtle gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
          style={{ background: `linear-gradient(0deg, ${founder.dimColor.replace('0.18','0.6')} 0%, transparent 100%)` }} />
      </div>
    )
  }

  /* Gradient initials fallback */
  return (
    <div
      className="w-32 h-32 rounded-2xl flex items-center justify-center font-mono font-black text-4xl text-white select-none"
      style={{ background: founder.grad, boxShadow: `0 0 50px ${founder.glow}, 0 12px 40px rgba(0,0,0,0.6)` }}
    >
      {founder.initials}
    </div>
  )
}

/* ── Main export ─────────────────────────────────────────────── */
export default function TeamSection() {
  const [selected, setSelected] = useState(0)
  const founder = FOUNDERS[selected]

  return (
    <section
      id="team"
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020810 0%, #030B18 40%, #020810 100%)' }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(37,99,235,0.04) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
      <div className="scanlines absolute inset-0 pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="section-label mb-5 mx-auto inline-flex">Squad Roster</div>
          <h2 className="text-section-title font-display font-black text-white mb-3">
            The <span className="gradient-text-blue">Founding Four</span>
          </h2>
          <p className="text-white/30 text-base font-mono tracking-wide">
            SELECT A PLAYER TO VIEW PROFILE
          </p>
        </motion.div>

        {/* Character select tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-4 gap-3 mb-6"
        >
          {FOUNDERS.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setSelected(i)}
              className="relative group rounded-xl p-4 text-left transition-all duration-250 focus:outline-none"
              style={{
                background:  selected === i ? f.dimColor : 'rgba(255,255,255,0.03)',
                border:      `1px solid ${selected === i ? f.borderColor : 'rgba(255,255,255,0.07)'}`,
                boxShadow:   selected === i ? `0 0 24px ${f.glow}` : 'none',
              }}
            >
              {selected === i && (
                <motion.div
                  layoutId="selector"
                  className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
                  style={{ background: f.color, boxShadow: `0 0 8px ${f.glow}` }}
                />
              )}

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-sm text-white mb-2"
                style={{
                  background: selected === i ? f.grad : 'rgba(255,255,255,0.06)',
                  boxShadow:  selected === i ? `0 4px 16px ${f.glow}` : 'none',
                }}
              >
                {f.initials}
              </div>

              <div
                className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase mb-0.5"
                style={{ color: selected === i ? f.color : 'rgba(255,255,255,0.3)' }}
              >
                {f.class}
              </div>
              <div className="text-white/40 text-[11px] truncate hidden sm:block">
                {f.name.split(' ')[0]}
              </div>
            </button>
          ))}
        </motion.div>

        {/* Profile panel */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border:     `1px solid ${founder.borderColor}`,
            background: 'rgba(3,8,18,0.97)',
            boxShadow:  `0 0 60px ${founder.glow.replace('0.4', '0.12')}, 0 32px 80px rgba(0,0,0,0.5)`,
          }}
        >
          {/* HUD header bar */}
          <div
            className="flex items-center justify-between px-6 py-3 border-b font-mono text-[10px]"
            style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(2,6,15,0.8)' }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: founder.color }}
              />
              <span className="tracking-[0.3em] uppercase" style={{ color: `${founder.color}99` }}>
                Player Profile — Active
              </span>
            </div>
            <span className="text-white/18 tracking-wider">MOVZZ · FOUNDING SQUAD</span>
            <div
              className="px-2 py-0.5 rounded font-bold tracking-[0.2em]"
              style={{ background: founder.dimColor, color: founder.color, border: `1px solid ${founder.borderColor}` }}
            >
              {founder.class}
            </div>
          </div>

          {/* Top accent line */}
          <motion.div
            key={founder.id + '-bar'}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] origin-left"
            style={{ background: `linear-gradient(90deg, ${founder.color}, transparent)` }}
          />

          {/* Main content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={founder.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-[1fr_1.15fr] gap-0"
            >
              {/* ── LEFT: identity ── */}
              <div className="border-b md:border-b-0 md:border-r" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>

                {/* Photo hero area */}
                <div
                  className="relative flex flex-col items-center justify-center pt-10 pb-7 px-7"
                  style={{
                    background: `radial-gradient(ellipse 90% 75% at 50% 30%, ${founder.dimColor.replace('0.18', '0.28')} 0%, transparent 70%)`,
                  }}
                >
                  <div className="scanlines absolute inset-0 opacity-[0.15] pointer-events-none" />

                  {/* Corner HUD labels */}
                  <span className="absolute top-3 left-4 font-mono text-[9px] tracking-[0.3em] uppercase text-white/15">
                    {String(selected + 1).padStart(2, '0')} / 04
                  </span>
                  <span className="absolute top-3 right-4 font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: `${founder.color}55` }}>
                    {founder.classDesc}
                  </span>

                  {/* Avatar / Photo */}
                  <motion.div
                    initial={{ scale: 0.72, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 0.05 }}
                    className="mb-5"
                  >
                    <FounderAvatar founder={founder} />
                  </motion.div>

                  {/* Name */}
                  <h3 className="font-display font-black text-white text-2xl mb-2 leading-tight text-center">
                    {founder.name}
                  </h3>

                  {/* Role badge */}
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ background: founder.dimColor, border: `1px solid ${founder.borderColor}`, color: founder.color }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: founder.color }} />
                    {founder.role}
                  </span>
                </div>

                {/* Bio + ability */}
                <div className="px-7 py-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                  <p className="text-white/42 text-sm leading-relaxed mb-5" style={{ fontFamily: 'var(--font-inter)' }}>
                    {founder.brief}
                  </p>

                  <div
                    className="rounded-xl px-4 py-3"
                    style={{ background: founder.dimColor, border: `1px solid ${founder.borderColor}` }}
                  >
                    <div className="text-[10px] font-mono tracking-[0.3em] uppercase mb-1" style={{ color: `${founder.color}99` }}>
                      Special Ability
                    </div>
                    <div className="text-white/65 text-sm font-medium" style={{ fontFamily: 'var(--font-inter)' }}>
                      &ldquo;{founder.ability}&rdquo;
                    </div>
                  </div>
                </div>
              </div>

              {/* ── RIGHT: stats ── */}
              <div className="p-8">
                <div className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/25 mb-6">
                  Attribute Breakdown
                </div>

                <div className="space-y-5">
                  {founder.stats.map((stat, i) => (
                    <StatBar
                      key={`${founder.id}-${stat.label}`}
                      label={stat.label}
                      val={stat.val}
                      color={stat.color}
                      delay={i * 0.1}
                    />
                  ))}
                </div>

                {/* Overall rating */}
                <div
                  className="mt-8 rounded-xl p-4 flex items-center justify-between"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div>
                    <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/25 mb-0.5">Overall</div>
                    <div className="text-white/40 text-xs">Founding Squad · Chennai</div>
                  </div>
                  <motion.div
                    key={founder.id + '-rating'}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.4 }}
                    className="font-mono font-black text-4xl"
                    style={{ color: founder.color, textShadow: `0 0 24px ${founder.glow}` }}
                  >
                    {Math.round(founder.stats.reduce((a, s) => a + s.val, 0) / founder.stats.length)}
                  </motion.div>
                </div>

                {/* Progress dots */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-1.5">
                    {FOUNDERS.map((f, i) => (
                      <button
                        key={f.id}
                        onClick={() => setSelected(i)}
                        className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                        style={{ background: i === selected ? f.color : 'rgba(255,255,255,0.15)' }}
                      />
                    ))}
                  </div>
                  <span className="text-white/18 text-[10px] font-mono tracking-widest">
                    {selected + 1} / {FOUNDERS.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Udyam badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-8"
        >
          <div
            className="flex items-center gap-3 rounded-xl px-5 py-2.5"
            style={{ background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.15)' }}
          >
            <svg className="w-4 h-4 text-blue-400/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span className="text-blue-300/60 text-xs font-mono tracking-wider">UDYAM-TN-34-0105416</span>
            <span className="text-white/15 text-xs">·</span>
            <span className="text-white/28 text-xs">Govt. Registered · Tamil Nadu · Jan 2026</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
