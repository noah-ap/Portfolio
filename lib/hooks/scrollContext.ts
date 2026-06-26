'use client'

import { createContext, useContext } from 'react'
import type { ResolvedScroll } from '@/lib/types/scroll'

export interface ScrollContextValue {
  config: ResolvedScroll
}

export const ScrollContext = createContext<ScrollContextValue | null>(null)

export function useScrollContext(): ScrollContextValue {
  const ctx = useContext(ScrollContext)
  if (!ctx) {
    throw new Error('useScrollContext must be used within ScrollProvider')
  }
  return ctx
}
