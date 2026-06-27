import type { BreakpointsConfig } from '@/lib/types/breakpoints'
import type {
  CategoryNavLayoutMode,
  NavigationConfig,
} from '@/lib/types/navigation'

export function resolveCategoryNavLayout(
  width: number,
  isPortrait: boolean,
  categoryNav: NavigationConfig['categoryNav'],
  breakpoints: BreakpointsConfig
): CategoryNavLayoutMode {
  const { switch: rules } = categoryNav.layout
  const narrowMax = rules.narrowMaxWidth ?? breakpoints.md

  if (isPortrait) return rules.portrait
  if (width < narrowMax) return rules.narrow
  return rules.landscape
}
