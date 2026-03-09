'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWaitlistCount } from '@/hooks/useWaitlistCount'

type FormState = 'idle' | 'submitting' | 'success'

const liveSignups = [
  'Priya K. just joined from Chennai',
  'Arun M. just joined from Bangalore',
  'Sneha R. just joined from Chennai',
  'Vikram S. just joined from Hyderabad',
  'Deepa L. just joined from Chennai',
]

function LiveTicker() {
  const [idx, setIdx] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setShow(false)
      setTimeout(() => { setIdx(i => (i + 1) % liveSignups.length); setShow(true) }, 350)
    }, 3200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      <div className="relative flex items-center">
        <div className="w-2 h-2 rounded-full bg-blue-400" />
        <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-50" />
      </div>
      <motion.span
        key={idx}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: show ? 1 : 0, y: show ? 0 : -6 }}
        transition={{ duration: 0.3 }}
        className="text-xs text-white/40"
      >
        {liveSignups[idx]}
      </motion.span>
    </div>
  )
}

function ConfettiPiece({ style }: { style: React.CSSProperties }) {
  return <div className="confetti-piece" style={style} />
}

function SuccessState({ spotNumber, city }: { spotNumber: number; city: string }) {
  const [phase, setPhase]                     = useState<'flash' | 'main'>('flash')
  const [showDetails, setShowDetails]         = useState(false)
  const [xp, setXp]                           = useState(0)
  const [unlockedBenefits, setUnlockedBenefits] = useState<number[]>([])
  const [confetti, setConfetti]               = useState<React.CSSProperties[]>([])

  useEffect(() => {
    const COLORS = ['#2563EB','#3B82F6','#60A5FA','#93C5FD','#FFFFFF','#6366F1','#8B5CF6','#FBBF24','#F472B6']
    setConfetti(Array.from({ length: 90 }, (_, i) => ({
      left:              `${(i * 13 + 3) % 100}%`,
      animationDuration: `${2 + (i % 5) * 0.4}s`,
      animationDelay:    `${(i * 0.07) % 1.4}s`,
      background:        COLORS[i % COLORS.length],
      transform:         `rotate(${(i * 43) % 360}deg)`,
      width:             `${5 + (i % 8)}px`,
      height:            `${4 + (i % 6)}px`,
      borderRadius:      i % 3 === 0 ? '50%' : '2px',
    })))

    const t1 = setTimeout(() => setPhase('main'), 700)
    const t2 = setTimeout(() => setShowDetails(true), 2500)
    const t3 = setTimeout(() => setConfetti([]), 5500)

    // XP counter
    const t4 = setTimeout(() => {
      let n = 0
      const id = setInterval(() => {
        n = Math.min(n + 14, 500)
        setXp(n)
        if (n >= 500) clearInterval(id)
      }, 20)
    }, 950)

    // Benefits unlock one by one
    const t5 = setTimeout(() => setUnlockedBenefits([0]),       2700)
    const t6 = setTimeout(() => setUnlockedBenefits([0,1]),     2950)
    const t7 = setTimeout(() => setUnlockedBenefits([0,1,2]),   3200)

    return () => { [t1,t2,t3,t4,t5,t6,t7].forEach(clearTimeout) }
  }, [])

  return (
    <>
      {confetti.map((s, i) => <ConfettiPiece key={i} style={s} />)}

      <AnimatePresence mode="wait">
        {phase === 'flash' ? (
          /* ── PHASE 1: Access Granted flash ── */
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.28 }}
            className="flex flex-col items-center justify-center min-h-[320px] rounded-2xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.97) 0%, rgba(99,102,241,0.97) 100%)' }}
          >
            <div className="scanlines absolute inset-0 opacity-30 pointer-events-none rounded-2xl" />

            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.08, type: 'spring', stiffness: 320, damping: 24 }}
              className="text-center px-6"
            >
              <div className="font-mono text-[10px] tracking-[0.55em] uppercase text-blue-200/60 mb-4">
                ▶ Authenticating Operative
              </div>
              <motion.div
                animate={{ opacity: [1, 0.55, 1, 0.7, 1] }}
                transition={{ duration: 0.35, times: [0, 0.2, 0.5, 0.75, 1] }}
                className="font-mono font-black text-4xl text-white tracking-[0.18em] mb-4"
                style={{ textShadow: '0 0 40px rgba(255,255,255,0.5)' }}
              >
                ACCESS<br />GRANTED
              </motion.div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.45, delay: 0.18 }}
                className="h-px origin-left"
                style={{ background: 'rgba(255,255,255,0.35)' }}
              />
              <div className="font-mono text-blue-200/55 text-[11px] tracking-[0.45em] uppercase mt-4">
                Enlisting to Squad...
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* ── PHASE 2+3: Player card + details ── */
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.91, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 210, damping: 22 }}
            className="py-1"
          >
            {/* ── Player Card ── */}
            <div
              className="rounded-2xl overflow-hidden mb-4"
              style={{
                background: 'rgba(4,10,22,0.99)',
                border: '1px solid rgba(37,99,235,0.38)',
                boxShadow: '0 0 60px rgba(37,99,235,0.18), 0 24px 60px rgba(0,0,0,0.55)',
              }}
            >
              {/* Top gradient bar */}
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.22,1,0.36,1] }}
                className="h-[3px] origin-left"
                style={{ background: 'linear-gradient(90deg, #2563EB, #6366F1, #8B5CF6, transparent)' }}
              />

              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-3 border-b"
                style={{ borderColor: 'rgba(37,99,235,0.1)', background: 'rgba(37,99,235,0.05)' }}
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ opacity: [1, 0.25, 1] }}
                    transition={{ duration: 1.3, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-blue-400"
                  />
                  <span className="font-mono text-[10px] tracking-[0.38em] uppercase text-blue-400/65">
                    Player Enlisted
                  </span>
                </div>
                <span className="font-mono text-[10px] text-white/18 tracking-wider">MOVZZ · FOUNDING SQUAD</span>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                {([
                  { label: 'SQUAD NO.',  value: `#${spotNumber}`,         color: '#3B82F6' },
                  { label: 'XP EARNED',  value: `+${xp}`,                 color: '#8B5CF6' },
                  { label: 'CITY',       value: city.toUpperCase(),        color: '#0EA5E9' },
                ] as const).map(({ label, value, color }, i) => (
                  <div
                    key={label}
                    className="px-3 py-5 text-center"
                    style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18 + i * 0.09 }}
                      className="font-mono font-black text-xl tabular-nums"
                      style={{ color, textShadow: `0 0 20px ${color}55` }}
                    >
                      {value}
                    </motion.div>
                    <div className="text-[9px] font-mono tracking-[0.22em] uppercase text-white/22 mt-1">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Rank row */}
              <div className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.28)' }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="#3B82F6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono font-bold text-sm text-blue-400 tracking-wider">PIONEER</div>
                    <div className="text-white/25 text-[10px] font-mono">Founding Squad · March 2026</div>
                  </div>
                </div>
                <motion.div
                  animate={{ opacity: [1, 0.35, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="flex items-center gap-1.5"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="font-mono text-[10px] text-blue-400/70 tracking-widest uppercase">Active</span>
                </motion.div>
              </div>
            </div>

            {/* ── Details (benefits + referral) ── */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="space-y-3"
                >
                  {/* Benefit unlocks */}
                  <div className="space-y-2">
                    {[
                      'Confirmation SMS sent to your phone',
                      '₹500 free credits at launch — no conditions',
                      'Priority access · March 2026 · Chennai',
                    ].map((text, i) => (
                      <AnimatePresence key={i}>
                        {unlockedBenefits.includes(i) && (
                          <motion.div
                            initial={{ opacity: 0, x: -14 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: 'spring', stiffness: 340, damping: 26 }}
                            className="flex items-center gap-2.5 text-sm text-white/55"
                          >
                            <motion.div
                              initial={{ scale: 0 }} animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 500, delay: 0.06 }}
                              className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                              style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.45)' }}
                            >
                              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </motion.div>
                            <span>{text}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    ))}
                  </div>

                  {/* Referral */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="rounded-2xl p-4"
                    style={{ background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.15)' }}
                  >
                    <p className="text-white/75 font-semibold text-sm mb-0.5">Move up the list faster</p>
                    <p className="text-white/35 text-xs mb-3">Refer 3 friends → skip 100 spots + earn ₹100 extra</p>
                    <div className="flex items-center gap-2 rounded-xl px-3 py-2 mb-3" style={{ background: 'rgba(3,8,18,0.7)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <span className="text-white/45 text-xs font-mono flex-1 truncate">movzz.app/join/REF{spotNumber}</span>
                      <button
                        onClick={() => navigator.clipboard?.writeText(`movzz.app/join/REF${spotNumber}`)}
                        className="text-[11px] text-blue-400/70 hover:text-blue-300 font-semibold transition-colors whitespace-nowrap"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="flex justify-center gap-2">
                      {[
                        { label: 'WhatsApp', bg: '#25D366' },
                        { label: 'Twitter',  bg: '#1DA1F2' },
                      ].map(({ label, bg }) => (
                        <button
                          key={label}
                          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-white text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                          style={{ background: bg }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function WaitlistSection() {
  const waitlistCount = useWaitlistCount()
  const [formState, setFormState] = useState<FormState>('idle')
  const [spot, setSpot]   = useState(0)
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity]   = useState('Chennai')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!phone || phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a valid 10-digit number'
    if (!email || !/\S+@\S+\.\S+/.test(email))          e.email = 'Enter a valid email address'
    return e
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setFormState('submitting')
    try {
      const res  = await fetch('/api/waitlist', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ phone, email, city }),
      })
      const data = await res.json()
      if (data.spotNumber) setSpot(data.spotNumber)
      else setSpot(waitlistCount + 1)
    } catch {
      setSpot(waitlistCount + 1)
    }
    setFormState('success')
  }

  return (
    <section
      id="waitlist"
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #030B18 0%, #04101E 50%, #0A1628 100%)' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(37,99,235,0.08) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 dot-pattern opacity-25" />
      <div className="scanlines absolute inset-0 pointer-events-none opacity-[0.15]" />

      <div className="relative z-10 max-w-lg mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <LiveTicker />
          <div className="section-label mb-5 mx-auto inline-flex">Enlist Now · Free · Limited</div>
          <h2 className="text-section-title font-display font-black text-white mb-4">
            Never Miss a Ride.<br />
            <span className="gradient-text-blue">Starting Now.</span>
          </h2>
          <p className="text-white/40 text-base">
            30 seconds. No credit card. ₹500 in free credits at launch.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Glowing border */}
          <div className="absolute -inset-px rounded-3xl neon-border pointer-events-none" />

          <div className="relative rounded-3xl p-8" style={{ background: 'rgba(4,10,22,0.97)', border: '1px solid rgba(37,99,235,0.15)' }}>
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <SuccessState key="success" spotNumber={spot} city={city} />
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                  onSubmit={handleSubmit} className="space-y-4"
                >
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-white/55 mb-1.5">Phone Number</label>
                    <div
                      className={`flex items-center rounded-[10px] transition-all duration-200 focus-within:ring-[3px] focus-within:ring-blue-600/14 ${errors.phone ? 'border border-red-500/60' : 'border border-white/10 focus-within:border-blue-600'}`}
                      style={{ background: 'rgba(3,8,18,0.92)' }}
                    >
                      <span className="pl-4 pr-3 py-[13px] text-white/30 text-sm font-medium border-r border-white/10 shrink-0 select-none">+91</span>
                      <input
                        type="tel" inputMode="numeric"
                        value={phone}
                        onChange={e => { setPhone(e.target.value); setErrors(p => ({ ...p, phone: '' })) }}
                        placeholder="98765 43210"
                        className="flex-1 bg-transparent px-4 py-[13px] text-white/88 text-[15px] outline-none placeholder:text-white/20"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      />
                    </div>
                    {errors.phone && (
                      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-400/75 text-xs mt-1">
                        {errors.phone}
                      </motion.p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-white/55 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })) }}
                      placeholder="you@example.com"
                      className={`input-field ${errors.email ? 'border-red-500/60' : ''}`}
                    />
                    {errors.email && (
                      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-400/75 text-xs mt-1">
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-white/55 mb-1.5">City</label>
                    <select
                      value={city} onChange={e => setCity(e.target.value)}
                      className="input-field appearance-none cursor-pointer"
                      style={{
                        backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 14px center',
                        backgroundSize: '18px',
                      }}
                    >
                      <option value="Chennai">Chennai</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Submit */}
                  <div className="relative mt-2">
                    {formState !== 'submitting' && (
                      <>
                        <span className="btn-ring"  />
                        <span className="btn-ring-2" />
                      </>
                    )}
                    <motion.button
                      type="submit"
                      disabled={formState === 'submitting'}
                      whileHover={formState !== 'submitting' ? { scale: 1.02, y: -2 } : {}}
                      whileTap={formState !== 'submitting' ? { scale: 0.97 } : {}}
                      className="w-full btn-primary text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {formState === 'submitting' ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Reserving your spot...
                        </>
                      ) : (
                        <>
                          Reserve My Spot — Free
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </motion.button>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <p className="text-center text-sm text-blue-400/65 font-medium">
                      ₹500 credits + Priority access at launch
                    </p>
                    <p className="text-center text-xs text-white/22">
                      No spam. Unsubscribe anytime.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Trust */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mt-7"
        >
          {[
            { label: `${waitlistCount.toLocaleString()} signed up` },
            { label: 'No card needed' },
            { label: 'Cancel anytime' },
          ].map(({ label }) => (
            <div key={label} className="flex items-center gap-1.5 text-white/28 text-sm">
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
