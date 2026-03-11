'use client'

import { motion } from 'framer-motion'
import { useWaitlistCount } from '@/hooks/useWaitlistCount'

const benefits = [
  {
    tag: '01',
    title: 'Early Access',
    subtitle: 'Be first in Chennai',
    desc: 'Get access before the public launch. First to experience Movzz.',
    accent: '#2563EB',
    bg: 'rgba(37,99,235,0.05)',
    border: 'rgba(37,99,235,0.18)',
    glow: 'rgba(37,99,235,0.12)',
  },
  {
    tag: '02',
    title: '₹500 Free Credits',
    subtitle: 'First 500 users only',
    desc: 'Free ride credits loaded to your account the day we launch. No conditions.',
    accent: '#0EA5E9',
    bg: 'rgba(14,165,233,0.05)',
    border: 'rgba(14,165,233,0.22)',
    glow: 'rgba(14,165,233,0.12)',
    highlight: true,
  },
  {
    tag: '03',
    title: 'Skip the Queue',
    subtitle: 'Refer 3 → jump 100 spots',
    desc: 'Share your unique link. Every 3 friends who join moves you 100 spots ahead.',
    accent: '#8B5CF6',
    bg: 'rgba(139,92,246,0.05)',
    border: 'rgba(139,92,246,0.18)',
    glow: 'rgba(139,92,246,0.12)',
  },
]

function LaunchTBA() {
  return (
    <div className="text-center">
      <p className="text-white/25 text-xs mb-6 uppercase tracking-[0.22em] font-medium font-mono">
        Chennai Beta Launch Window
      </p>
      <div className="flex items-center justify-center gap-2 mb-5">
        {['??', '??', '??', '??'].map((val, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="text-center">
              <div
                className="relative rounded-xl px-4 py-3 min-w-[68px] overflow-hidden"
                style={{
                  background: 'rgba(3,8,18,0.92)',
                  border: '1px solid rgba(37,99,235,0.15)',
                }}
              >
                <div className="scanlines absolute inset-0 opacity-40 pointer-events-none" />
                <div className="font-mono font-black text-3xl tabular-nums select-none"
                  style={{ color: 'rgba(37,99,235,0.35)', letterSpacing: '0.1em' }}>
                  {val}
                </div>
              </div>
              <div className="text-white/18 text-[10px] mt-1.5 uppercase tracking-[0.2em] font-medium font-mono">
                {['Days', 'Hours', 'Min', 'Sec'][i]}
              </div>
            </div>
            {i < 3 && (
              <div className="font-mono font-black text-xl text-white/10 mb-4 select-none">:</div>
            )}
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
        style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.18)' }}
      >
        <motion.div
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-blue-400"
        />
        <span className="font-mono text-xs text-blue-400/65 tracking-[0.2em] uppercase">
          Announcing very soon — waitlist gets first access
        </span>
      </motion.div>
    </div>
  )
}

const TOTAL_SPOTS = 500

export default function UrgencySection() {
  const { count: waitlistCount } = useWaitlistCount()
  const claimed = Math.min(waitlistCount, TOTAL_SPOTS)
  const spotsLeft = Math.max(0, TOTAL_SPOTS - claimed)
  const pct = Math.min(100, (claimed / TOTAL_SPOTS) * 100).toFixed(1)

  return (
    <section
      id="urgency"
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #030B18 0%, #04101E 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(37,99,235,0.07) 0%, transparent 70%)' }}
      />
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="scanlines absolute inset-0 pointer-events-none opacity-[0.15]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="section-label mb-4 mx-auto inline-flex">Mission Window</div>
          <h2 className="text-section-title font-display font-black text-white mb-4">
            Why Join{' '}
            <span className="gradient-text-blue">Right Now</span>
          </h2>
          <p className="text-white/38 text-base font-mono tracking-wide">
            First 500 only. No exceptions. No extensions.
          </p>
        </motion.div>

        {/* Benefit cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-14">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -8, boxShadow: `0 28px 70px rgba(0,0,0,0.5), 0 0 50px ${b.glow}` }}
              className="relative rounded-2xl p-6 cursor-default"
              style={{
                background: b.bg,
                border: `1px solid ${b.border}`,
                transition: 'box-shadow 0.3s ease',
              }}
            >
              {/* Most Popular badge with animated ring */}
              {b.highlight && (
                <div className="absolute -top-3 left-6">
                  <div className="relative">
                    <motion.span
                      animate={{ boxShadow: ['0 0 0px rgba(14,165,233,0)', '0 0 16px rgba(14,165,233,0.5)', '0 0 0px rgba(14,165,233,0)'] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-[10px] font-bold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full relative z-10"
                      style={{
                        background: 'rgba(14,165,233,0.16)',
                        color: '#0EA5E9',
                        border: '1px solid rgba(14,165,233,0.38)',
                        display: 'inline-block',
                      }}
                    >
                      Most Popular
                    </motion.span>
                  </div>
                </div>
              )}

              {/* Tag badge */}
              <div
                className="font-mono font-black text-xs mb-5 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: `${b.accent}16`,
                  border: `1px solid ${b.accent}30`,
                  color: b.accent,
                  boxShadow: `0 0 20px ${b.accent}18`,
                }}
              >
                {b.tag}
              </div>

              <h3 className="font-display font-bold text-white text-lg mb-1">{b.title}</h3>
              <p className="text-xs font-semibold mb-3 tracking-wide" style={{ color: `${b.accent}99` }}>
                {b.subtitle}
              </p>
              <p className="text-white/38 text-sm leading-relaxed">{b.desc}</p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px rounded-full opacity-40"
                style={{ background: `linear-gradient(90deg, transparent, ${b.accent}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl p-6 mb-12"
          style={{ background: 'rgba(6,16,31,0.75)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 font-semibold text-sm">₹500 Credit Bonus Spots</p>
              <p className="text-white/30 text-xs mt-0.5">Only first 500 users qualify</p>
            </div>
            <div className="text-right">
              <div className="font-mono font-black text-2xl text-white/88">{spotsLeft}</div>
              <div className="text-white/25 text-xs mt-0.5">spots left</div>
            </div>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #2563EB, #3B82F6, #60a5fa)',
                boxShadow: '0 0 12px rgba(37,99,235,0.5)',
              }}
              initial={{ width: '0%' }}
              whileInView={{ width: `${pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-2.5">
            <span className="text-white/22 text-xs">{claimed} claimed</span>
            <span className="font-medium text-xs" style={{ color: 'rgba(96,165,250,0.7)' }}>{pct}% filled</span>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-white/25 text-xs mb-6 uppercase tracking-[0.22em] font-medium">
            Chennai Beta Launch In
          </p>
          <LaunchTBA />
        </motion.div>
      </div>
    </section>
  )
}
