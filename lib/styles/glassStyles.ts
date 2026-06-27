import type { CSSProperties } from 'react'
import { applyThemeGlassOverrides } from '@/lib/config/applyThemeGlassOverrides'
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
  const resolvedGlass = applyThemeGlassOverrides(glass, theme)
  const blur = pickResponsive(resolvedGlass.blur, width, breakpoints)
  const borderRadius = pickResponsive(resolvedGlass.borderRadius, width, breakpoints)
  const padding = pickResponsive(resolvedGlass.padding, width, breakpoints)
  const maxWidth = pickResponsive(resolvedGlass.maxWidth, width, breakpoints)
  const margin = pickResponsive(resolvedGlass.margin, width, breakpoints)

  const borderColor = resolveThemeToken(resolvedGlass.border.color, theme)
  const backgroundColor =
    resolvedGlass.background.tint === false
      ? 'transparent'
      : withAlpha(
          resolveThemeToken(resolvedGlass.background.tint, theme),
          resolvedGlass.background.opacity
        )

  const highlightShadow =
    resolvedGlass.highlight.enabled
      ? `inset 0 1px 0 ${withAlpha(
          resolveThemeToken(resolvedGlass.highlight.color, theme),
          resolvedGlass.highlight.opacity
        )}`
      : ''

  const dropShadow = `${resolvedGlass.shadow.offsetX}px ${resolvedGlass.shadow.offsetY}px ${resolvedGlass.shadow.blur}px ${resolvedGlass.shadow.spread}px ${resolvedGlass.shadow.color}`

  return {
    width: '100%',
    maxWidth,
    margin: `${margin}px auto`,
    padding,
    borderRadius,
    border: `${resolvedGlass.border.width}px solid ${borderColor}`,
    backgroundColor,
    backdropFilter: `blur(${blur}px) saturate(${resolvedGlass.saturation})`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${resolvedGlass.saturation})`,
    boxShadow: [dropShadow, highlightShadow].filter(Boolean).join(', '),
    transition: `box-shadow ${resolvedGlass.transition.durationMs}ms ${resolvedGlass.transition.easing}, background-color ${resolvedGlass.transition.durationMs}ms ${resolvedGlass.transition.easing}`,
  }
}
