'use client'

import { useMemo } from 'react'
import { getTabScale } from '@/lib/layout/getTabScale'
import { useViewportWidth } from '@/lib/hooks/useViewportWidth'
import type { BreakpointsConfig } from '@/lib/types/breakpoints'

export function useBreakpointScale(breakpoints: BreakpointsConfig): number {
  const width = useViewportWidth()
  return useMemo(() => getTabScale(width, breakpoints), [width, breakpoints])
}
