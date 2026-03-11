'use client'

import { motion } from 'framer-motion'
import { Card3D } from '@/components/ui/Card3D'

const layers = [
  {
    num: '01',
    title: 'Every Provider, One Place',
    subtitle: 'Movzz connects to all major ride platforms simultaneously',
    items: ['Uber', 'Ola', 'Rapido', 'Fast Track', 'Chennai Cabs', '+ more'],
    color: 'blue',
  },
  {
    num: '02',
    title: 'AI Brain Analyzes 30+ Factors',
    subtitle: 'Real-time intelligence, not just a random pick',
    items: [
      'Provider reliability by time of day',
      'Success rate in your pickup area',
      'Current weather & traffic conditions',
      'Driver availability right now',
      'Historical cancellation rates',
      'Surge pricing vs. reliability tradeoff',
    ],
    color: 'indigo',
  },
  {
    num: '03',
    title: 'Smart Booking Strategy',
    subtitle: 'Whichever method gets you confirmed fastest',
    items: [
      'Sequential: Best provider first, fallback auto-triggers',
      'Parallel: Query top 3 simultaneously',
      'Cascade: Instant retry on cancellation',
    ],
    color: 'green',
  },
]

const guarantee = [
  {
    num: '01',
    title: 'Ride Guaranteed',
    desc: 'If top provider fails, AI instantly switches to the next best option.',
    color: '#2563EB',
    bg: 'rgba(37,99,235,0.08)',
    border: 'rgba(37,99,235,0.22)',
  },
  {
    num: '02',
    title: 'You Always Win',
    desc: 'If all providers fail, you get ₹100–200 instant credit + manual support.',
    color: '#6366F1',
    bg: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.22)',
  },
  {
    num: '03',
    title: '96% Success Rate',
    desc: 'vs 74% average across Uber/Ola/Rapido independently.',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.22)',
  },
]

const colorMap = {
  blue:   {
    bg: 'rgba(37,99,235,0.08)',
    border: 'rgba(37,99,235,0.2)',
    borderLeft: 'rgba(37,99,235,0.6)',
    text: '#93c5fd',
    glow: 'rgba(37,99,235,0.12)',
  },
  indigo: {
    bg: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.2)',
    borderLeft: 'rgba(99,102,241,0.6)',
    text: '#a5b4fc',
    glow: 'rgba(99,102,241,0.12)',
  },
  green:  {
    bg: 'rgba(14,165,233,0.08)',
    border: 'rgba(14,165,233,0.2)',
    borderLeft: 'rgba(14,165,233,0.6)',
    text: '#7dd3fc',
    glow: 'rgba(14,165,233,0.12)',
  },
}

export default function MagicSection() {
  return (
    <section
      id="magic"
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020810 0%, #030B18 100%)' }}
    >
      <div className="orb orb-blue   w-96 h-96 top-20   right-0  opacity-[0.07]" />
      <div className="orb orb-indigo w-80 h-80 bottom-0 left-0  opacity-[0.06]" />
      <div className="absolute inset-0 dot-pattern opacity-[0.18]" />
      <div className="scanlines absolute inset-0 pointer-events-none opacity-[0.15]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="section-label mb-4">System Architecture</div>
          <h2 className="text-section-title font-display font-black text-white mb-4">
            Here&apos;s How{' '}
            <span className="gradient-text-blue">Movzz Works</span>
          </h2>
          <p className="text-white/38 text-base max-w-xl mx-auto font-mono tracking-wide">
            3 intelligence layers · 30+ signals · 1 guaranteed ride
          </p>
        </motion.div>

        {/* Layers */}
        <div className="space-y-4 mb-20">
          {layers.map((layer, i) => {
            const c = colorMap[layer.color as keyof typeof colorMap]
            return (
              <motion.div
                key={layer.num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Card3D className="cursor-default" intensity={6}>
                  <div
                    className="rounded-2xl p-7 transition-all duration-300"
                    style={{
                      background: 'rgba(6,16,31,0.85)',
                      border: `1px solid ${c.border}`,
                      borderLeft: `3px solid ${c.borderLeft}`,
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Number badge */}
                      <div
                        className="font-mono font-black text-sm w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: c.bg,
                          border: `1px solid ${c.border}`,
                          color: c.text,
                          boxShadow: `0 0 20px ${c.glow}`,
                        }}
                      >
                        {layer.num}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-white/92 text-xl mb-1">{layer.title}</h3>
                        <p className="text-white/38 text-sm mb-5 leading-relaxed">{layer.subtitle}</p>
                        <div className="flex flex-wrap gap-2">
                          {layer.items.map((item) => (
                            <span
                              key={item}
                              className="px-3 py-1.5 text-sm rounded-lg font-medium transition-all"
                              style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            )
          })}
        </div>

        {/* Reliability chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-center font-display font-bold text-white/85 text-2xl mb-10">
            Provider Reliability Score
          </h3>
          <div
            className="space-y-3 max-w-xl mx-auto rounded-2xl p-6"
            style={{ background: 'rgba(6,16,31,0.7)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {[
              { name: 'Movzz (AI‑optimized)', score: 96, color: '#3b82f6', highlight: true },
              { name: 'Fast Track Cabs',       score: 89, color: '#0EA5E9' },
              { name: 'Ola',                   score: 78, color: '#F59E0B' },
              { name: 'Uber',                  score: 74, color: '#6B7280' },
              { name: 'Rapido',                score: 69, color: '#F97316' },
            ].map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-center gap-4 py-2 px-3 rounded-xl"
                style={p.highlight ? { background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.18)' } : {}}
              >
                <div className="w-36 text-sm font-medium text-right truncate"
                  style={{ color: p.highlight ? '#93c5fd' : 'rgba(255,255,255,0.38)' }}>
                  {p.name}
                </div>
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${p.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full"
                    style={{
                      background: p.highlight
                        ? 'linear-gradient(90deg, #2563eb, #60a5fa)'
                        : p.color,
                      boxShadow: p.highlight ? '0 0 10px rgba(37,99,235,0.5)' : undefined,
                    }}
                  />
                </div>
                <div className="w-10 text-sm font-mono font-bold text-right" style={{ color: p.color }}>
                  {p.score}%
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Guarantee cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-center font-display font-bold text-white/85 text-2xl mb-10">
            Our Promise to You
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {guarantee.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <Card3D intensity={9}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="rounded-2xl p-6 text-center h-full"
                    style={{
                      background: 'rgba(6,16,31,0.85)',
                      border: `1px solid ${g.border}`,
                    }}
                  >
                    {/* Glow icon badge */}
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5"
                      style={{
                        background: g.bg,
                        border: `1px solid ${g.border}`,
                        boxShadow: `0 0 30px ${g.color}22`,
                      }}
                    >
                      <span
                        className="font-mono font-black text-sm"
                        style={{ color: g.color }}
                      >
                        {g.num}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-white/88 text-base mb-2">{g.title}</h4>
                    <p className="text-white/38 text-sm leading-relaxed">{g.desc}</p>
                  </motion.div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
