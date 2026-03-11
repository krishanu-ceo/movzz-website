'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useWaitlistCount } from '@/hooks/useWaitlistCount'

const SECTIONS = [
  { id: 'hero',         name: 'Mission Briefing'    },
  { id: 'spiral',       name: 'Incident Log'         },
  { id: 'consequence',  name: 'Damage Report'        },
  { id: 'glimmer',      name: 'Solution Protocol'    },
  { id: 'magic',        name: 'System Architecture'  },
  { id: 'social-proof', name: 'Field Intelligence'   },
  { id: 'team',         name: 'Squad Roster'         },
  { id: 'urgency',      name: 'Mission Window'       },
  { id: 'waitlist',     name: 'Enlist Now'           },
]

export default function Navigation() {
  const waitlistCount = useWaitlistCount()
  const [scrolled,        setScrolled]        = useState(false)
  const [menuOpen,        setMenuOpen]        = useState(false)
  const [scrollPct,       setScrollPct]       = useState(0)
  const [currentSection,  setCurrentSection]  = useState('hero')
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set(['hero']))
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollPct(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track current section via IntersectionObserver
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id)
            setVisitedSections(prev => { const n = new Set(prev); n.add(entry.target.id); return n })
          }
        })
      },
      { rootMargin: '-10% 0px -60% 0px', threshold: 0 }
    )

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const currentName = SECTIONS.find(s => s.id === currentSection)?.name ?? 'Mission Briefing'
  const currentIdx  = SECTIONS.findIndex(s => s.id === currentSection)

  return (
    <>
      {/* XP/Scroll progress bar — styled as a game XP bar */}
      <div className="scroll-progress-track">
        <div className="scroll-progress-fill" style={{ width: `${scrollPct}%` }} />
      </div>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2.5 mx-4 mt-3 rounded-2xl glass' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between gap-4">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="focus:outline-none flex items-center gap-2.5 shrink-0"
          >
            <Image src="/logo.png" alt="Movzz" width={108} height={32} className="h-8 w-auto object-contain" priority />
            {scrolled && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:flex items-center gap-1.5"
              >
                <span className="text-white/12 text-xs">·</span>
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                  className="w-1 h-1 rounded-full bg-blue-400"
                />
                <span className="font-mono text-[10px] text-blue-400/50 tracking-[0.2em] uppercase">Active</span>
              </motion.div>
            )}
          </button>

          {/* Center — switches between nav links and HUD objective */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <AnimatePresence mode="wait">
              {!scrolled ? (
                /* Normal nav links */
                <motion.div
                  key="links"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-8"
                >
                  {[
                    { label: 'How It Works', id: 'magic' },
                    { label: 'Why Movzz',   id: 'social-proof' },
                  ].map(({ label, id }) => (
                    <button
                      key={id}
                      onClick={() => scrollTo(id)}
                      className="text-sm font-medium text-white/40 hover:text-white/85 transition-colors duration-200 tracking-wide"
                    >
                      {label}
                    </button>
                  ))}
                </motion.div>
              ) : (
                /* HUD objective display */
                <motion.div
                  key="hud"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-4"
                >
                  {/* Objective label */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1.8 }}
                        className="w-1 h-1 rounded-full bg-blue-400"
                      />
                      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/25">Objective</span>
                    </div>
                    <span className="text-white/12 text-xs">─</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentSection}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs font-medium text-white/65 font-mono"
                      >
                        {currentName}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  {/* Section progress dots */}
                  <div className="flex items-center gap-1">
                    {SECTIONS.map((s, i) => (
                      <button
                        key={s.id}
                        onClick={() => scrollTo(s.id)}
                        title={s.name}
                        className="transition-all duration-300"
                        style={{
                          width:  i === currentIdx ? 12 : 5,
                          height: 5,
                          borderRadius: 3,
                          background: i === currentIdx
                            ? '#3B82F6'
                            : visitedSections.has(s.id)
                              ? 'rgba(59,130,246,0.35)'
                              : 'rgba(255,255,255,0.1)',
                          boxShadow: i === currentIdx ? '0 0 6px rgba(59,130,246,0.7)' : 'none',
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Live badge — hidden when HUD is showing (prevents clutter) */}
            {!scrolled && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.2)' }}
              >
                <span className="relative flex items-center justify-center w-2 h-2">
                  <span className="absolute w-2 h-2 rounded-full bg-blue-400 animate-ping opacity-60" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                </span>
                <span className="text-blue-400/80 text-xs font-semibold">{waitlistCount.toLocaleString()} waiting</span>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('waitlist')}
              className="btn-primary text-sm py-2.5 px-5"
            >
              {scrolled ? 'Enlist' : 'Join Waitlist'}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-white/08 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 left-4 right-4 z-40 glass rounded-2xl p-6 flex flex-col gap-1"
          >
            {[
              { label: 'How It Works',  id: 'magic' },
              { label: 'Why Movzz',    id: 'social-proof' },
              { label: 'Meet the Squad', id: 'team' },
              { label: 'Enlist Now',   id: 'waitlist', highlight: true },
            ].map(({ label, id, highlight }, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => scrollTo(id)}
                className={`text-left text-base font-medium py-3 px-3 rounded-xl transition-all ${
                  highlight
                    ? 'text-blue-400 bg-blue-500/08 hover:bg-blue-500/12'
                    : 'text-white/65 hover:text-white hover:bg-white/04'
                }`}
              >
                {label}
              </motion.button>
            ))}

            {/* HUD detail in mobile menu */}
            <div className="px-3 pt-3 border-t border-white/06 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-white/30 text-xs font-mono">{waitlistCount.toLocaleString()} enlisted · MOVZZ OS v1.0</span>
              </div>
              <div className="font-mono text-[10px] text-white/18 tracking-wider uppercase">
                ▶ {currentName}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
