import type { BreakpointsConfig } from '@/lib/types/breakpoints'

export interface ResponsiveValues {
  sm: number
  md: number
  lg: number
}

export function pickResponsive(
  values: ResponsiveValues,
  width: number,
  breakpoints: BreakpointsConfig
): number {
  if (width < breakpoints.sm) return values.sm
  if (width < breakpoints.md) return values.md
  return values.lg
}
