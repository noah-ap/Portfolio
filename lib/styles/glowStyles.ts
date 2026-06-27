import type { CSSProperties } from 'react'
import { theme as themeConfig } from '@/config/theme'
import { resolveThemeToken } from '@/lib/config/resolveThemeToken'
import type { ResolvedTheme } from '@/lib/types/theme'

export const ACTIVE_TEXT_GLOW_CLASS = 'active-text-glow'
export const ACTIVE_CARD_GLOW_CLASS = 'active-card-glow'
export const ACTIVE_TAB_NAV_GLOW_CLASS = 'active-tab-nav-glow'

function buildTextGlowShadow(
  blur: number,
  spread: number,
  color: string
): string {
  return `0 0 ${blur}px ${color}, 0 0 ${spread}px ${color}`
}

function buildCardGlowShadow(
  blur: number,
  spread: number,
  color: string
): string {
  return `0 0 ${blur}px ${spread}px ${color}`
}

export function isCardGlowPulseEnabled(theme?: ResolvedTheme): boolean {
  const pulse = theme?.glow?.card?.pulse
  if (typeof pulse === 'boolean') return pulse
  return themeConfig.glow.card.pulse
}

export function buildGlowCssVars(resolved: ResolvedTheme): Record<string, string> {
  const { colors, glow } = resolved
  const dim = colors.glow.active
  const bright = colors.glow.activeBright
  const { text, card } = glow

  return {
    '--glow-text-shadow-min': buildTextGlowShadow(
      text.blurMin,
      text.spreadMin,
      dim
    ),
    '--glow-text-shadow-max': [
      buildTextGlowShadow(text.blurMax, text.spreadMax, bright),
      `0 0 ${Math.round(text.spreadMax * 1.4)}px ${dim}`,
    ].join(', '),
    '--glow-card-shadow-min': buildCardGlowShadow(
      card.blurMin,
      card.spreadMin,
      dim
    ),
    '--glow-card-shadow-max': [
      buildCardGlowShadow(card.blurMax, card.spreadMax, bright),
      `0 0 ${Math.round(card.spreadMax * 1.4)}px 0px ${dim}`,
    ].join(', '),
    '--glow-card-shadow-static': [
      buildCardGlowShadow(card.blurMax, card.spreadMax, bright),
      `0 0 ${Math.round(card.spreadMax * 1.4)}px 0px ${dim}`,
    ].join(', '),
    '--glow-pulse-duration': `${glow.pulse.durationMs}ms`,
    '--glow-pulse-easing': glow.pulse.easing,
  }
}

export function buildTextGlowCssVars(resolved: ResolvedTheme): Record<string, string> {
  return buildGlowCssVars(resolved)
}

export function getActiveGlowStyle(
  theme: ResolvedTheme,
  isActive: boolean
): CSSProperties {
  const { glow } = theme
  const color = resolveThemeToken('glow.active', theme)
  const shadow = isActive
    ? `0 0 ${glow.blur}px ${glow.spread}px ${color}`
    : 'none'

  return {
    boxShadow: shadow,
    transition: `box-shadow ${glow.transitionMs}ms ease`,
  }
}

export function getActiveTextGlowClassName(isActive: boolean): string | undefined {
  return isActive ? ACTIVE_TEXT_GLOW_CLASS : undefined
}

export function getActiveCardGlowClassName(
  isActive: boolean,
  theme?: ResolvedTheme
): string | undefined {
  if (!isActive || !isCardGlowPulseEnabled(theme)) return undefined
  return ACTIVE_CARD_GLOW_CLASS
}

export function getActiveCardGlowStyle(
  theme: ResolvedTheme,
  isActive: boolean
): CSSProperties {
  if (!isActive || isCardGlowPulseEnabled(theme)) return {}

  return {
    boxShadow: 'var(--glow-card-shadow-static)',
    animation: 'none',
  }
}

export function isTabCardGlowMode(tabs: { activeHighlight: { mode: string } }): boolean {
  return tabs.activeHighlight.mode === 'cardGlow'
}

export function getActiveTabHighlightClassName(
  tabs: { activeHighlight: { mode: string; glow: { enabled: boolean; pulse: boolean } } },
  isActive: boolean,
  theme?: ResolvedTheme
): string | undefined {
  if (!isActive) return undefined

  if (isTabCardGlowMode(tabs)) {
    return getActiveCardGlowClassName(isActive, theme)
  }

  if (!tabs.activeHighlight.glow.enabled) return undefined
  if (tabs.activeHighlight.glow.pulse) return ACTIVE_TAB_NAV_GLOW_CLASS
  return undefined
}

export function getActiveTabHighlightStyle(
  tabs: { activeHighlight: { mode: string; glow: { enabled: boolean; pulse: boolean } } },
  isActive: boolean,
  theme?: ResolvedTheme
): CSSProperties {
  if (!isActive) return {}

  if (isTabCardGlowMode(tabs)) {
    return getActiveCardGlowStyle(theme!, isActive)
  }

  if (!tabs.activeHighlight.glow.enabled || tabs.activeHighlight.glow.pulse) {
    return {}
  }

  return {
    boxShadow: 'var(--glow-text-shadow-min)',
    animation: 'none',
  }
}
