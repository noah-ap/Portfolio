import type { CSSProperties } from 'react'
import { resolveThemeToken } from '@/lib/config/resolveThemeToken'
import { pickResponsive } from '@/lib/layout/pickResponsive'
import type { BreakpointsConfig } from '@/lib/types/breakpoints'
import type { NavigationConfig } from '@/lib/types/navigation'
import type { ResolvedTheme } from '@/lib/types/theme'
export interface NavItemStyleConfig {
  selectedOpacity: number
  unselectedOpacity: number
  selectedWeight: number
  unselectedWeight: number
  colors: {
    active: string
    inactive: string
  }
}

export function getNavItemStyle(
  nav: NavItemStyleConfig,
  theme: ResolvedTheme,
  isActive: boolean,
  fontSize: number
): CSSProperties {
  return {
    fontWeight: isActive ? nav.selectedWeight : nav.unselectedWeight,
    fontSize,
    opacity: isActive ? nav.selectedOpacity : nav.unselectedOpacity,
    color: resolveThemeToken(
      isActive ? nav.colors.active : nav.colors.inactive,
      theme
    ),
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    textDecoration: 'none',
  }
}

export function getVisibleOrderedItems<T extends { visible: boolean; order: number }>(
  items: T[]
): T[] {
  return items.filter((item) => item.visible).sort((a, b) => a.order - b.order)
}

export function isActiveRoute(pathname: string, route: string): boolean {
  if (route === '/') return pathname === '/'
  return pathname === route || pathname.startsWith(`${route}/`)
}

export function getThemeToggleContainerStyle(
  themeToggle: NavigationConfig['themeToggle'],
  width: number,
  breakpoints: BreakpointsConfig
): CSSProperties {
  const left = pickResponsive(themeToggle.position.left, width, breakpoints)
  const bottom = pickResponsive(themeToggle.position.bottom, width, breakpoints)

  return {
    position: themeToggle.position.anchor === 'viewport' ? 'fixed' : 'absolute',
    left,
    bottom,
    gap: themeToggle.gap,
    zIndex: 30,
  }
}