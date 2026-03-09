'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const LINES = [
  { text: '> Establishing secure connection',       okDelay: 420  },
  { text: '> Loading ride intelligence engine',     okDelay: 860  },
  { text: '> Scanning providers: Uber, Ola, Rapido',okDelay: 1280 },
  { text: '> Calibrating AI booking layer',         okDelay: 1660 },
  { text: '> All systems ready',                    okDelay: 1950 },
]
const SHOW_DELAYS  = [120, 480, 900, 1320, 1700]
const DISMISS_AT   = 2600

export default function BootOverlay() {
  const [visible,  setVisible]  = useState(true)
  const [shown,    setShown]    = useState<number[]>([])
  const [ok,       setOk]       = useState<number[]>([])
  const [progress, setProgress] = useState(0)
  const [launched, setLaunched] = useState(false)

  const dismiss = useCallback(() => setVisible(false), [])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    SHOW_DELAYS.forEach((delay, i) => {
      timers.push(setTimeout(() => {
        setShown(p => [...p, i])
        setProgress(Math.round(((i + 1) / LINES.length) * 90))
      }, delay))
      timers.push(setTimeout(() => {
        setOk(p => [...p, i])
        if (i === LINES.length - 1) {
          setProgress(100)
          setLaunched(true)
        }
      }, LINES[i].okDelay))
    })

    timers.push(setTimeout(dismiss, DISMISS_AT))

    const onKey = () => dismiss()
    window.addEventListener('keydown', onKey)

    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('keydown', onKey)
    }
  }, [dismiss])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer select-none"
          style={{ background: '#02060F' }}
          onClick={dismiss}
        >
          {/* Textures */}
          <div className="scanlines absolute inset-0 pointer-events-none opacity-30" />
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(rgba(37,99,235,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)' }} />

          <div className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-7"
            >
              <Image src="/logo.png" alt="Movzz" width={120} height={36} className="h-9 w-auto object-contain" priority />
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.08 }}
              className="text-[10px] font-mono tracking-[0.5em] uppercase text-white/22 mb-8 text-center"
            >
              MOVZZ OS — BOOT SEQUENCE v1.0
            </motion.div>

            {/* Boot lines */}
            <div className="w-full space-y-2.5 font-mono mb-8">
              {LINES.map((line, i) => (
                shown.includes(i) ? (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className={`transition-colors duration-300 ${ok.includes(i) ? 'text-white/55' : 'text-white/35'}`}>
                      {line.text}
                    </span>
                    {ok.includes(i) ? (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="text-blue-400/80 font-bold text-xs ml-4 shrink-0"
                      >
                        [OK]
                      </motion.span>
                    ) : (
                      <motion.span
                        animate={{ opacity: [0.8, 0.2, 0.8] }}
                        transition={{ repeat: Infinity, duration: 0.75 }}
                        className="text-white/25 ml-4 shrink-0 text-xs"
                      >
                        ...
                      </motion.span>
                    )}
                  </motion.div>
                ) : null
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-full">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase">
                  {launched ? 'Launching Mission Briefing' : 'Initializing'}
                </span>
                <span className="font-mono text-[10px] text-blue-400/60">{progress}%</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.38, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #1D4ED8, #3B82F6)',
                    boxShadow: '0 0 8px rgba(59,130,246,0.5)',
                  }}
                />
              </div>
            </div>

            {/* Skip hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 font-mono text-[10px] text-white/15 tracking-[0.3em] uppercase"
            >
              Click or press any key to skip
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
