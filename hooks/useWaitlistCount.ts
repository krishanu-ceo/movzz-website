'use client'

import { useState, useEffect, useCallback } from 'react'

let cachedCount: number | null = null
let lastFetched = 0
const CACHE_MS = 60_000 // re-fetch at most once per minute

// Subscribers so all mounted instances stay in sync
const subscribers = new Set<(n: number) => void>()

function broadcast(n: number) {
  cachedCount = n
  lastFetched = Date.now()
  subscribers.forEach(fn => fn(n))
}

export function useWaitlistCount(fallback = 527) {
  const [count, setCount] = useState<number>(cachedCount ?? fallback)

  useEffect(() => {
    subscribers.add(setCount)
    const now = Date.now()
    if (cachedCount !== null && now - lastFetched < CACHE_MS) {
      setCount(cachedCount)
    } else {
      fetch('/api/count')
        .then(r => r.json())
        .then(d => { if (typeof d.count === 'number') broadcast(d.count) })
        .catch(() => {})
    }
    return () => { subscribers.delete(setCount) }
  }, [])

  const bump = useCallback(() => {
    const next = (cachedCount ?? fallback) + 1
    broadcast(next)
    // Bust cache so next page load re-fetches fresh count
    lastFetched = 0
  }, [fallback])

  return { count, bump }
}
