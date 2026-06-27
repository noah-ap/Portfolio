import type { CSSProperties } from 'react'
import { resolveThemeToken } from '@/lib/config/resolveThemeToken'
import { pickResponsive } from '@/lib/layout/pickResponsive'
import type { BreakpointsConfig } from '@/lib/types/breakpoints'
import type { ResolvedGlass } from '@/lib/types/glass'
import type { ResolvedTheme } from '@/lib/types/theme'

function withAlpha(color: string, alpha: number): string {
  if (color.startsWith('rgba')) {
    return color.replace(/[\d.]+\)$/, `${alpha})`)
  }
  if (color.startsWith('#') && color.length === 7) {
    const hex = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, '0')
    return `${color}${hex}`
  }
  return color
}

export function getGlassCardStyle(
  glass: ResolvedGlass,
  theme: ResolvedTheme,
  width: number,
  breakpoints: BreakpointsConfig
): CSSProperties {
  const blur = pickResponsive(glass.blur, width, breakpoints)
  const borderRadius = pickResponsive(glass.borderRadius, width, breakpoints)
  const padding = pickResponsive(glass.padding, width, breakpoints)
  const maxWidth = pickResponsive(glass.maxWidth, width, breakpoints)
  const margin = pickResponsive(glass.margin, width, breakpoints)

  const tint = resolveThemeToken(glass.background.tint, theme)
  const borderColor = resolveThemeToken(glass.border.color, theme)
  const backgroundColor = withAlpha(tint, glass.background.opacity)

  const highlightShadow =
    glass.highlight.enabled
      ? `inset 0 1px 0 ${withAlpha(
          resolveThemeToken(glass.highlight.color, theme),
          glass.highlight.opacity
        )}`
      : ''

  const dropShadow = `${glass.shadow.offsetX}px ${glass.shadow.offsetY}px ${glass.shadow.blur}px ${glass.shadow.spread}px ${glass.shadow.color}`

  return {
    width: '100%',
    maxWidth,
    margin: `${margin}px auto`,
    padding,
    borderRadius,
    border: `${glass.border.width}px solid ${borderColor}`,
    backgroundColor,
    backdropFilter: `blur(${blur}px) saturate(${glass.saturation})`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${glass.saturation})`,
    boxShadow: [dropShadow, highlightShadow].filter(Boolean).join(', '),
    transition: `box-shadow ${glass.transition.durationMs}ms ${glass.transition.easing}, background-color ${glass.transition.durationMs}ms ${glass.transition.easing}`,
  }
}
