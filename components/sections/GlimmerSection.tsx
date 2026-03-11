'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const providers = [
  { name: 'Fast Track',   score: 96, color: '#3B82F6' },
  { name: 'Chennai Cabs', score: 89, color: '#3B82F6' },
  { name: 'Ola',          score: 78, color: '#F59E0B' },
  { name: 'Uber',         score: 74, color: '#6B7280' },
  { name: 'Rapido',       score: 69, color: '#F97316' },
]

type DemoState = 'idle' | 'analyzing' | 'confirmed'


function PhoneDemo({ state }: { state: DemoState }) {
  const [bars, setBars] = useState<number[]>([])

  useEffect(() => {
    if (state !== 'analyzing') return
    const timers = providers.map((_, i) =>
      setTimeout(() => setBars(prev => [...prev, i]), i * 380 + 150)
    )
    return () => timers.forEach(clearTimeout)
  }, [state])

  return (
    <div
      className="phone-body animate-float"
      style={{
        animationDelay: '0.2s',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(37,99,235,0.2)',
      }}
    >
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-12 rounded-full blur-2xl bg-blue-500/30 animate-pulse" style={{ animationDuration: '3s' }} />

      <div className="phone-screen" style={{ background: '#04080F' }}>
        <div className="phone-notch" />

        <div className="flex justify-between items-center px-5 pt-11 pb-3 text-[10px]">
          <span className="font-mono font-semibold text-white/30">6:30</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-400/65 text-[10px] font-medium">Movzz</span>
          </div>
        </div>

        <div className="px-4 pt-1 pb-4">
          <div className="mb-3">
            <Image src="/logo.png" alt="Movzz" width={64} height={20} className="h-5 w-auto object-contain" />
          </div>

          <div className="rounded-xl p-3 mb-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-2 text-[10px]">
              <div className="flex flex-col items-center gap-1">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                <div className="w-px h-4 bg-white/15" />
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-sm" />
              </div>
              <div>
                <div className="text-white/60 font-medium">Nungambakkam</div>
                <div className="text-white/28">Chennai Airport T1</div>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {state === 'idle' && (
              <motion.button
                key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="w-full rounded-xl py-2.5 text-white text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}
              >
                Find Best Ride
              </motion.button>
            )}

            {state === 'analyzing' && (
              <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex items-center gap-1 mb-2">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-1 h-1 rounded-full bg-blue-400/55 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                  <p className="text-blue-300/60 text-[10px] ml-1">Analyzing providers...</p>
                </div>
                <div className="space-y-1.5">
                  {providers.map((p, i) => (
                    <AnimatePresence key={p.name}>
                      {bars.includes(i) && (
                        <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-1.5">
                          <span className="text-white/30 text-[10px] w-16 truncate">{p.name}</span>
                          <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                            <motion.div
                              initial={{ width: 0 }} animate={{ width: `${p.score}%` }}
                              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                              className="h-full rounded-full"
                              style={{ background: p.color }}
                            />
                          </div>
                          <span className="text-[10px] font-mono font-semibold" style={{ color: p.color }}>{p.score}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ))}
                </div>
              </motion.div>
            )}

            {state === 'confirmed' && (
              <motion.div
                key="confirmed" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }} className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                  style={{ background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.28)' }}
                >
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <p className="text-blue-400/80 font-bold text-xs mb-0.5">Ride Confirmed</p>
                <p className="text-white/40 text-[10px]">Fast Track · Raj Kumar</p>
                <p className="text-white/28 text-[10px] mb-2">Arriving in 4 min</p>
                <div className="flex items-center justify-center gap-1 rounded-lg px-2 py-1" style={{ background: 'rgba(37,99,235,0.08)' }}>
                  <span className="text-blue-300/65 text-[10px] font-semibold">96% reliable provider</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="phone-home" />
      </div>
    </div>
  )
}

export default function GlimmerSection() {
  const ref     = useRef<HTMLDivElement>(null)
  const secRef  = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [demo, setDemo] = useState<DemoState>('idle')
  const [timer, setTimer] = useState(0)

  const { scrollYProgress } = useScroll({ target: secRef, offset: ['start end', 'end start'] })
  const headerY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  const phoneY  = useTransform(scrollYProgress, [0, 1], ['3%', '-3%'])

  useEffect(() => {
    if (!isInView) return
    const t1 = setTimeout(() => setDemo('analyzing'), 800)
    const t2 = setTimeout(() => setDemo('confirmed'), 4200)
    const interval = setInterval(() => setTimer(p => p < 8 ? p + 1 : p), 780)
    return () => { clearTimeout(t1); clearTimeout(t2); clearInterval(interval) }
  }, [isInView])

  return (
    <section
      id="glimmer"
      ref={secRef}
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020810 0%, #030B18 60%, #06101F 100%)' }}
    >
      <div className="orb orb-blue w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2 opacity-[0.08]" />
      <div className="absolute inset-0 dot-pattern opacity-[0.16] pointer-events-none" />
      <div className="scanlines absolute inset-0 pointer-events-none opacity-[0.15]" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header with parallax */}
        <motion.div
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="section-label mb-4">Solution Protocol</div>
          <h2 className="text-section-title font-display font-black text-white mb-5">
            Imagine a{' '}
            <span className="gradient-text">Different Morning</span>
          </h2>
          <p className="text-white/40 text-xl max-w-md mx-auto leading-relaxed">
            Same 6:30 AM. One app. No drama. Just a confirmed ride.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — steps */}
          <div className="space-y-5">
            {[
              {
                num: '01',
                title: 'Open Movzz',
                desc: 'One tap. Enter your destination. Nothing else.',
                active: demo !== 'idle',
              },
              {
                num: '02',
                title: 'AI Scans All Providers',
                desc: '30+ real-time signals — availability, cancellation rates, surge, ETA, weather — all simultaneously.',
                active: demo === 'analyzing' || demo === 'confirmed',
              },
              {
                num: '03',
                title: 'Confirmed in 8 Seconds',
                desc: 'The highest-reliability option gets booked instantly. No switching. No stress.',
                active: demo === 'confirmed',
              },
            ].map(({ num, title, desc, active }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`flex gap-4 p-5 rounded-2xl transition-all duration-500 ${
                  active
                    ? 'border border-blue-500/22 bg-blue-950/20'
                    : 'border border-white/[0.05] bg-white/[0.015]'
                }`}
              >
                <div className={`font-mono font-black text-xs mt-0.5 w-7 shrink-0 transition-colors duration-400 ${active ? 'text-blue-400/65' : 'text-white/18'}`}>
                  {num}
                </div>
                <div>
                  <h3 className={`font-display font-bold text-base mb-1 transition-colors duration-300 ${active ? 'text-white/90' : 'text-white/40'}`}>{title}</h3>
                  <p className={`text-sm leading-relaxed transition-colors duration-300 ${active ? 'text-white/50' : 'text-white/25'}`}>{desc}</p>
                </div>
              </motion.div>
            ))}

            <AnimatePresence>
              {demo === 'confirmed' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-5 rounded-2xl"
                  style={{ background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.15)' }}
                >
                  <div>
                    <p className="text-blue-400/80 font-semibold text-base">Ride confirmed.</p>
                    <p className="text-white/32 text-sm">No stress. No missed flights.</p>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-black text-4xl text-blue-400/85">{timer}s</div>
                    <div className="text-white/25 text-xs mt-0.5">total time</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right — phone with parallax */}
          <motion.div
            style={{ y: phoneY }}
            initial={{ opacity: 0, scale: 0.92, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <PhoneDemo state={demo} />
          </motion.div>
        </div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 grid sm:grid-cols-2 gap-4 max-w-xl mx-auto"
        >
          <div className="rounded-2xl p-6 text-center" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.1)' }}>
            <div className="text-4xl font-display font-black text-red-400/75 mb-1">15 min</div>
            <div className="text-white/32 text-sm mb-1.5">Average wasted switching apps</div>
            <div className="text-red-400/45 text-xs font-medium uppercase tracking-wide">Uber · Ola · Rapido</div>
          </div>
          <div className="rounded-2xl p-6 text-center" style={{ background: 'rgba(37,99,235,0.04)', border: '1px solid rgba(37,99,235,0.12)' }}>
            <div className="text-4xl font-display font-black text-blue-400/80 mb-1">8 sec</div>
            <div className="text-white/32 text-sm mb-1.5">Movzz average confirmation</div>
            <div className="text-blue-400/50 text-xs font-medium uppercase tracking-wide">96% success rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
