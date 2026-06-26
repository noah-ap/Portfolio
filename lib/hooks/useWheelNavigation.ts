'use client'

import { useEffect } from 'react'
import { useScrollContext } from '@/lib/hooks/scrollContext'

interface WheelNavigationOptions {
  onNext: () => void
  onPrev: () => void
  enabled?: boolean
}

export function useWheelNavigation({
  onNext,
  onPrev,
  enabled = true,
}: WheelNavigationOptions) {
  const { config } = useScrollContext()

  useEffect(() => {
    if (!enabled || !config.wheelNavigation) return

    function handleWheel(e: WheelEvent) {
      const atTop = window.scrollY <= 0
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 1

      if (e.deltaY > 0 && atBottom) {
        e.preventDefault()
        onNext()
      } else if (e.deltaY < 0 && atTop) {
        e.preventDefault()
        onPrev()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [config.wheelNavigation, enabled, onNext, onPrev])
}
