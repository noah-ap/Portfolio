import type { ResolvedGlass } from '@/lib/types/glass'
import type { ResolvedTheme } from '@/lib/types/theme'

export function applyThemeGlassOverrides(
  glass: ResolvedGlass,
  theme: ResolvedTheme
): ResolvedGlass {
  const overrides = theme.glass
  if (!overrides) return glass

  return {
    ...glass,
    ...(overrides.saturation !== undefined && { saturation: overrides.saturation }),
    background: {
      ...glass.background,
      ...(overrides.background?.tint !== undefined && {
        tint: overrides.background.tint,
      }),
      ...(overrides.background?.opacity !== undefined && {
        opacity: overrides.background.opacity,
      }),
    },
  }
}
