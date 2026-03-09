'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import CountUp from 'react-countup'

const costs = [
  { label: 'Rebooking flight',    amount: 28000, color: '#f87171' },
  { label: 'Hotel (1 night)',      amount: 5500,  color: '#fca5a5' },
  { label: 'Meals & transport',   amount: 1200,  color: '#fca5a5' },
  { label: 'Lost client meeting', amount: 40000, color: '#ef4444' },
]
const total = costs.reduce((s, c) => s + c.amount, 0)

const story = [
  { step: '01', text: 'You finally take an auto rickshaw.',             red: false },
  { step: '02', text: 'Traffic. Red lights everywhere. Panic builds.',  red: false },
  { step: '03', text: "Your flight's gate is closing...",               red: true  },
  { step: '04', text: 'You arrive at the airport. 6 minutes too late.', red: true  },
]

function CostRow({ label, amount, color, delay, inView, index }: {
  label: string; amount: number; color: string; delay: number; inView: boolean; index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-between py-3.5 relative group"
      style={{ borderBottom: '1px solid rgba(239,68,68,0.08)' }}
    >
      {/* Hover highlight */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.1 }}
        className="absolute left-0 top-0 bottom-0 w-0.5 origin-top rounded-full"
        style={{ background: color, opacity: 0.5 }}
      />

      <div className="flex items-center gap-3 pl-4">
        <div
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: color, boxShadow: `0 0 6px ${color}88` }}
        />
        <span className="text-white/55 text-sm font-mono">{label}</span>
      </div>

      <div className="flex items-center gap-1 font-mono font-bold text-sm" style={{ color }}>
        <span className="text-white/30 font-normal">₹</span>
        {inView && <CountUp end={amount} duration={1.8} delay={delay} separator="," />}
      </div>
    </motion.div>
  )
}

export default function ConsequenceSection() {
  const secRef   = useRef<HTMLElement>(null)
  const ref      = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeStep, setActiveStep] = useState(-1)
  const [totalVisible, setTotalVisible] = useState(false)

  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ['start 70%', 'end 30%'],
  })

  const lineProgress = useTransform(scrollYProgress, [0.05, 0.62], [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if      (v < 0.08) setActiveStep(-1)
    else if (v < 0.24) setActiveStep(0)
    else if (v < 0.40) setActiveStep(1)
    else if (v < 0.55) setActiveStep(2)
    else               setActiveStep(3)
  })

  return (
    <section
      id="consequence"
      ref={secRef}
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #030B18 0%, #020810 100%)' }}
    >
      <div className="orb orb-blue w-80 h-80 -bottom-20 -left-20 opacity-[0.07]" />
      <div className="absolute inset-0 dot-pattern opacity-[0.18]" />
      <div className="scanlines absolute inset-0 pointer-events-none opacity-[0.15]" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="section-label mb-4">Damage Report</div>
          <h2 className="text-section-title font-display font-black text-white mb-4">
            The Price of{' '}
            <span style={{ color: '#F87171' }}>Unreliability</span>
          </h2>
        </motion.div>

        {/* Split */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">

          {/* LEFT: Story timeline */}
          <div className="space-y-5">
            <div className="relative">
              <div className="absolute w-px pointer-events-none"
                style={{ left: '13px', top: '14px', bottom: '14px', background: 'rgba(255,255,255,0.06)' }} />
              <motion.div
                className="absolute w-px pointer-events-none origin-top"
                style={{
                  left: '13px', top: '14px',
                  height: 'calc(100% - 28px)',
                  scaleY: lineProgress,
                  background: 'linear-gradient(180deg, rgba(59,130,246,0.6) 0%, rgba(239,68,68,0.8) 100%)',
                }}
              />
              <div className="space-y-6">
                {story.map(({ step, text, red }, i) => {
                  const isActive = activeStep >= i
                  return (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: i * 0.12 }}
                      className="flex items-start gap-4"
                    >
                      <motion.div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 relative z-10"
                        animate={{
                          backgroundColor: isActive
                            ? red ? 'rgba(239,68,68,0.18)' : 'rgba(37,99,235,0.18)'
                            : 'rgba(10,20,38,1)',
                          borderColor: isActive
                            ? red ? 'rgba(239,68,68,0.5)' : 'rgba(37,99,235,0.5)'
                            : 'rgba(255,255,255,0.1)',
                          scale: isActive ? [1, 1.15, 1] : 0.88,
                        }}
                        transition={{ duration: 0.4 }}
                        style={{ borderWidth: '1px', borderStyle: 'solid' }}
                      >
                        <motion.span
                          className="font-mono font-black text-[10px]"
                          animate={{ color: isActive ? (red ? '#F87171' : '#60A5FA') : 'rgba(255,255,255,0.22)' }}
                        >
                          {step}
                        </motion.span>
                      </motion.div>

                      <motion.p
                        className="text-base font-medium leading-snug pt-0.5"
                        animate={{ color: isActive ? (red ? 'rgba(252,129,129,0.9)' : 'rgba(255,255,255,0.82)') : 'rgba(255,255,255,0.28)' }}
                        transition={{ duration: 0.42 }}
                      >
                        {text}
                      </motion.p>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <motion.div
              animate={{ opacity: activeStep >= 3 ? 1 : 0.18, y: activeStep >= 3 ? 0 : 10 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              <motion.div
                className="absolute inset-x-0 top-0 h-[1.5px]"
                animate={activeStep >= 3 ? { opacity: [0.4, 1, 0.4] } : { opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ background: 'linear-gradient(90deg, transparent, #ef4444, transparent)' }}
              />
              <p className="text-xl font-display font-bold text-red-300/85 mb-1">
                You missed your flight.
              </p>
              <p className="text-white/35 text-sm">
                Because no driver accepted your ride at 6:30 AM.
              </p>
            </motion.div>
          </div>

          {/* RIGHT: Damage terminal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.3 } }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(6,14,28,0.95)',
              border: '1px solid rgba(239,68,68,0.15)',
              boxShadow: '0 0 60px rgba(239,68,68,0.06), 0 24px 60px rgba(0,0,0,0.4)',
            }}
          >
            {/* Terminal header */}
            <div
              className="flex items-center justify-between px-5 py-3 border-b"
              style={{ borderColor: 'rgba(239,68,68,0.1)', background: 'rgba(239,68,68,0.05)' }}
            >
              <div className="flex items-center gap-2.5">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-red-500"
                  style={{ boxShadow: '0 0 8px rgba(239,68,68,0.7)' }}
                />
                <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-red-400/65">
                  Financial Damage Report
                </span>
              </div>
              <span className="font-mono text-[10px] text-white/15">SYS://LOSS_CALC</span>
            </div>

            {/* Accent bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-[1.5px] origin-left"
              style={{ background: 'linear-gradient(90deg, #ef4444, transparent)' }}
            />

            {/* Rows */}
            <div className="px-5 pt-4 pb-2">
              {costs.map((cost, i) => (
                <CostRow
                  key={cost.label}
                  label={cost.label}
                  amount={cost.amount}
                  color={cost.color}
                  delay={0.4 + i * 0.15}
                  inView={isInView}
                  index={i}
                />
              ))}
            </div>

            {/* Total */}
            <div className="px-5 pb-5 pt-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.3 }}
                onAnimationComplete={() => setTotalVisible(true)}
                className="rounded-xl p-4 relative overflow-hidden"
                style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)' }}
              >
                <motion.div
                  animate={totalVisible ? {
                    boxShadow: ['0 0 0px rgba(239,68,68,0)', '0 0 40px rgba(239,68,68,0.25)', '0 0 0px rgba(239,68,68,0)'],
                  } : {}}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className="absolute inset-0 rounded-xl"
                />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.35em] uppercase text-red-400/45 mb-0.5">Total Loss</div>
                    <div className="text-white/35 text-xs">One missed ride at 6:30 AM</div>
                  </div>
                  <motion.div
                    animate={totalVisible ? { scale: [1, 1.08, 1] } : {}}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="font-mono font-black text-2xl"
                    style={{ color: '#ef4444', textShadow: '0 0 20px rgba(239,68,68,0.5)' }}
                  >
                    ₹{isInView && <CountUp end={total} duration={2.5} delay={1.3} separator="," />}
                  </motion.div>
                </div>
              </motion.div>

              <p className="text-white/18 text-xs mt-3 text-center font-mono">
                * Because no driver accepted a ride at 6:30 AM
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scale stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-white/35 text-base mb-8">
            This isn&apos;t just your story. Multiply it across India:
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { stat: '500M+',   label: 'Ride app users in India',     color: '#60A5FA' },
              { stat: '40%',     label: 'Rides fail or get cancelled', color: '#F87171' },
              { stat: '₹200Cr+', label: 'Lost daily in India',         color: '#FBBF24' },
            ].map(({ stat, label, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="rounded-2xl p-5 relative overflow-hidden group cursor-default"
                style={{
                  background: 'rgba(6,16,31,0.8)',
                  border: `1px solid ${color}22`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 50% 60%, ${color}12, transparent 70%)` }}
                />
                <div
                  className="font-display font-black text-3xl md:text-4xl mb-2"
                  style={{ color, textShadow: `0 0 20px ${color}44` }}
                >
                  {stat}
                </div>
                <p className="text-white/35 text-sm">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Transition text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-20"
        >
          <p className="text-white/35 text-lg mb-3">Maybe this was you this morning.</p>
          <motion.p
            className="text-4xl md:text-5xl font-display font-black text-white"
            whileInView={{ opacity: [0, 1], y: [20, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            It doesn&apos;t have to be.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
