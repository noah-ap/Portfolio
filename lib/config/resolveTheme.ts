import { theme } from '@/config/theme'
import type { ResolvedTheme, ThemePresetName } from '@/lib/types/theme'

export function resolveTheme(
  presetName: ThemePresetName = theme.preset
): ResolvedTheme {
  return {
    presetName,
    ...theme.presets[presetName],
    glow: theme.glow,
  }
}
