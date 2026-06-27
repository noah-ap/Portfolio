import type { CSSProperties } from 'react'
import { pickResponsive } from '@/lib/layout/pickResponsive'
import type { BreakpointsConfig } from '@/lib/types/breakpoints'
import type {
  CategoryNavLayoutMode,
  NavigationConfig,
} from '@/lib/types/navigation'

export function getCategoryNavContainerStyle(
  layoutMode: CategoryNavLayoutMode,
  categoryNav: NavigationConfig['categoryNav'],
  width: number,
  breakpoints: BreakpointsConfig
): CSSProperties {
  if (layoutMode === 'horizontal-bottom') {
    const { horizontal } = categoryNav.layout
    const paddingX = pickResponsive(horizontal.paddingX, width, breakpoints)
    const paddingY = pickResponsive(horizontal.paddingY, width, breakpoints)
    const gap = pickResponsive(horizontal.gap, width, breakpoints)

    return {
      position: horizontal.anchor === 'viewport' ? 'fixed' : 'absolute',
      left: 0,
      right: 0,
      bottom: pickResponsive(horizontal.bottom, width, breakpoints),
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: horizontal.justify,
      alignItems: 'center',
      gap,
      paddingLeft: paddingX,
      paddingRight: paddingX,
      paddingTop: paddingY,
      paddingBottom: `calc(${paddingY}px + env(safe-area-inset-bottom, 0px))`,
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      scrollbarWidth: 'none',
      zIndex: 30,
    }
  }

  const { vertical } = categoryNav.layout
  const left = pickResponsive(vertical.position.left, width, breakpoints)
  const gap = pickResponsive(categoryNav.gap, width, breakpoints)

  return {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap,
    zIndex: 30,
  }
}

export function getCategoryNavItemStyle(
  layoutMode: CategoryNavLayoutMode,
  categoryNav: NavigationConfig['categoryNav'],
  width: number,
  breakpoints: BreakpointsConfig
): CSSProperties {
  if (layoutMode !== 'horizontal-bottom') {
    return { textAlign: 'left' }
  }

  const touchMinHeight = categoryNav.layout.horizontal.touchMinHeight

  return {
    textAlign: 'center',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    minHeight: touchMinHeight,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: pickResponsive(categoryNav.layout.horizontal.itemPaddingX, width, breakpoints),
    paddingRight: pickResponsive(categoryNav.layout.horizontal.itemPaddingX, width, breakpoints),
  }
}
