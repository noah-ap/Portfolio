import type { BreakpointsConfig } from '@/lib/types/breakpoints'

export function getTabScale(
  width: number,
  breakpoints: BreakpointsConfig
): number {
  if (width < breakpoints.sm) return breakpoints.tabScale.sm
  if (width < breakpoints.md) return breakpoints.tabScale.md
  return breakpoints.tabScale.lg
}
