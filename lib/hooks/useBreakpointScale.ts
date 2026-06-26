'use client'

import { useEffect, useState } from 'react'
import type { BreakpointsConfig } from '@/lib/types/breakpoints'

export function useBreakpointScale(breakpoints: BreakpointsConfig): number {
  const [scale, setScale] = useState(breakpoints.tabScale.lg)

  useEffect(() => {
    function update() {
      const width = window.innerWidth
      if (width < breakpoints.sm) {
        setScale(breakpoints.tabScale.sm)
      } else if (width < breakpoints.md) {
        setScale(breakpoints.tabScale.md)
      } else {
        setScale(breakpoints.tabScale.lg)
      }
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [breakpoints])

  return scale
}
