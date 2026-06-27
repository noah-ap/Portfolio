import { glass } from '@/config/glass'
import type { GlassPresetName, ResolvedGlass } from '@/lib/types/glass'

export function resolveGlass(
  presetName: GlassPresetName = glass.preset
): ResolvedGlass {
  const preset = glass.presets[presetName]
  return {
    presetName,
    ...preset,
  }
}
