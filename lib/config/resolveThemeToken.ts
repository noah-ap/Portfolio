import type { ResolvedTheme, ThemeToken } from '@/lib/types/theme'

export function resolveThemeToken(
  token: string,
  resolvedTheme: ResolvedTheme
): string {
  if (
    token.startsWith('#') ||
    token.startsWith('rgba') ||
    token.startsWith('rgb') ||
    token.startsWith('linear-gradient') ||
    token.startsWith('radial-gradient')
  ) {
    return token
  }

  const { colors } = resolvedTheme
  const map: Record<string, string> = {
    'colors.background': colors.background,
    'surface.dark': colors.surface.dark,
    'surface.muted': colors.surface.muted,
    'text.primary': colors.text.primary,
    'text.secondary': colors.text.secondary,
    'text.muted': colors.text.muted,
    'ring.active': colors.ring.active,
    'ring.inactive': colors.ring.inactive,
    'indicator.active': colors.indicator.active,
    'indicator.inactive': colors.indicator.inactive,
    'overlay.from': colors.overlay.from,
    'overlay.to': colors.overlay.to,
  }

  return map[token] ?? token
}

export type { ThemeToken }
