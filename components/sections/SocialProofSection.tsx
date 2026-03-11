'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { Card3D } from '@/components/ui/Card3D'
import { useWaitlistCount } from '@/hooks/useWaitlistCount'

const testimonials = [
  {
    quote: "I showed this to my whole team. Everyone's waiting. This is exactly what Chennai needs right now.",
    name: 'Sharma R.',
    role: 'Fast Track Call Taxi Owner',
    avatar: 'SR',
    stars: 5,
    color: '#2563EB',
  },
  {
    quote: "Missed a client meeting because Uber cancelled on me 3 times. If this existed last month, I'd have saved ₹60,000.",
    name: 'Priya K.',
    role: 'Marketing Director, Chennai',
    avatar: 'PK',
    stars: 5,
    color: '#2563EB',
  },
  {
    quote: "Finally someone's solving the actual problem. Not adding more apps—fixing the reliability.",
    name: 'Vikram S.',
    role: 'Software Engineer, Bangalore',
    avatar: 'VS',
    stars: 5,
    color: '#8B5CF6',
  },
]

const recentSignups = [
  { name: 'Priya K. from Chennai',   mins: 2  },
  { name: 'Raj M. from Bangalore',   mins: 5  },
  { name: 'Amit S. from Chennai',    mins: 3  },
  { name: 'Kavya R. from Chennai',   mins: 8  },
  { name: 'Sanjay P. from Mumbai',   mins: 12 },
  { name: 'Deepa N. from Chennai',   mins: 4  },
  { name: 'Arjun T. from Hyderabad', mins: 7  },
  { name: 'Meera L. from Chennai',   mins: 1  },
  { name: 'Ravi B. from Coimbatore', mins: 9  },
  { name: 'Ananya M. from Chennai',  mins: 6  },
]

const STATIC_STATS = [
  { label: 'Cities Interested', value: 12, suffix: '+', prefix: '' },
  { label: 'Avg Reliability Gain', value: 22, suffix: '%', prefix: '+' },
]

export default function SocialProofSection() {
  const { count: waitlistCount } = useWaitlistCount()
  const stats = [
    { label: 'Beta Users Waiting', value: waitlistCount, suffix: '', prefix: '' },
    ...STATIC_STATS,
  ]
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="social-proof" ref={ref} className="relative py-28 bg-navy-900 overflow-hidden">
      <div className="orb orb-indigo w-96 h-96 top-0 left-0 opacity-20" />
      <div className="orb orb-blue w-80 h-80 bottom-0 right-0 opacity-20" />
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="scanlines absolute inset-0 pointer-events-none opacity-[0.15]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="section-label mb-4">Field Intelligence</div>
          <h2 className="text-section-title font-display font-black text-white mb-4">
            {waitlistCount.toLocaleString()} People Already{' '}
            <span className="gradient-text-blue">Trust Movzz</span>
          </h2>
          <p className="text-white/28 text-xs font-mono tracking-[0.25em] uppercase mt-2">
            Live data · +23 joined this hour · Chennai &amp; beyond
          </p>
        </motion.div>

        {/* Main counter — stadium reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            {/* Radial glow behind number */}
            <div className="absolute inset-0 blur-3xl scale-150 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)' }} />

            <motion.div
              initial={{ scale: 0.55, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 110, damping: 16, delay: 0.1 }}
              className="relative"
            >
              <div
                className="font-mono font-black leading-none"
                style={{
                  fontSize: 'clamp(5rem, 14vw, 10rem)',
                  color: 'rgba(255,255,255,0.92)',
                  textShadow: '0 0 80px rgba(37,99,235,0.32), 0 0 160px rgba(37,99,235,0.12)',
                }}
              >
                {isInView ? <CountUp end={waitlistCount} duration={2.2} separator="," /> : '0'}
              </div>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="h-px origin-center mt-3 mx-auto max-w-xs"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.55), transparent)' }}
            />
          </div>

          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.4 }} className="text-white/55 text-lg font-medium mt-4">
            People Already on the Waitlist
          </motion.p>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.55 }}
            className="text-white/28 text-sm mt-1.5 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block animate-pulse" />
            +23 joined in the last hour
          </motion.p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-16 max-w-2xl mx-auto">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-mono font-black text-3xl md:text-4xl gradient-text-blue mb-1">
                {s.prefix}
                {isInView ? <CountUp end={s.value} duration={2} delay={0.5} /> : '0'}
                {s.suffix}
              </div>
              <p className="text-gray-400 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Live ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-2xl px-6 py-4 mb-16 overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Live Signups</span>
          </div>
          <div className="ticker-container">
            <div className="ticker-inner gap-12">
              {[...recentSignups, ...recentSignups].map((signup, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 mr-12 text-sm text-gray-300 whitespace-nowrap"
                >
                  <span className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-300">
                    {signup.name[0]}
                  </span>
                  {signup.name} joined{' '}
                  <span className="text-gray-500">{signup.mins} min ago</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
            <Card3D className="card p-6 flex flex-col h-full" intensity={9}>
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.stars)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-200 text-base leading-relaxed flex-1 mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
            </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
