import { background } from '@/config/background'
import { resolveTheme } from '@/lib/config/resolveTheme'
import { resolveThemeToken } from '@/lib/config/resolveThemeToken'
import type {
  BackgroundPresetName,
  ResolvedBackground,
} from '@/lib/types/background'

export function resolveBackground(
  presetName: BackgroundPresetName = background.preset
): ResolvedBackground {
  const preset = background.presets[presetName]

  if (preset.type === 'solid' && preset.color.startsWith('colors.')) {
    return {
      presetName,
      type: 'solid',
      color: resolveThemeToken(preset.color, resolveTheme()),
    }
  }

  return { presetName, ...preset }
}
