'use client'

import { useWaitlistCount } from '@/hooks/useWaitlistCount'

export default function LiveCount() {
  const count = useWaitlistCount()
  return <>{count.toLocaleString()} people already joined</>
}
