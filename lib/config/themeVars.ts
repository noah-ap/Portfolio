import type { ResolvedTheme } from '@/lib/types/theme'

export function themeToCssVars(resolved: ResolvedTheme): Record<string, string> {
  const { colors, typography } = resolved

  return {
    '--color-background': colors.background,
    '--color-surface-dark': colors.surface.dark,
    '--color-surface-muted': colors.surface.muted,
    '--color-text-primary': colors.text.primary,
    '--color-text-secondary': colors.text.secondary,
    '--color-text-muted': colors.text.muted,
    '--color-ring-active': colors.ring.active,
    '--color-ring-inactive': colors.ring.inactive,
    '--color-indicator-active': colors.indicator.active,
    '--color-indicator-inactive': colors.indicator.inactive,
    '--color-overlay-from': colors.overlay.from,
    '--color-overlay-to': colors.overlay.to,
    '--font-page-title-size': `${typography.pageTitle.fontSize}px`,
    '--font-page-title-weight': String(typography.pageTitle.fontWeight),
    '--font-page-description-size': `${typography.pageDescription.fontSize}px`,
    '--font-page-description-weight': String(typography.pageDescription.fontWeight),
    '--font-page-description-line-height': String(typography.pageDescription.lineHeight),
    '--font-page-subtitle-size': `${typography.pageSubtitle.fontSize}px`,
    '--font-page-subtitle-weight': String(typography.pageSubtitle.fontWeight),
  }
}

export function themeVarsToStyleBlock(vars: Record<string, string>): string {
  const declarations = Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')
  return `:root {\n${declarations}\n}`
}
