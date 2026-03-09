'use client'

import { useState, useEffect } from 'react'

let cachedCount: number | null = null
let lastFetched = 0
const CACHE_MS = 60_000 // re-fetch at most once per minute

export function useWaitlistCount(fallback = 527) {
  const [count, setCount] = useState<number>(cachedCount ?? fallback)

  useEffect(() => {
    const now = Date.now()
    if (cachedCount !== null && now - lastFetched < CACHE_MS) {
      setCount(cachedCount)
      return
    }
    fetch('/api/count')
      .then(r => r.json())
      .then(d => {
        if (typeof d.count === 'number') {
          cachedCount  = d.count
          lastFetched  = Date.now()
          setCount(d.count)
        }
      })
      .catch(() => {}) // silently fall back to default
  }, [])

  return count
}
