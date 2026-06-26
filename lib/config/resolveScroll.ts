import { scroll } from '@/config/scroll'
import type { ResolvedScroll, ScrollPresetName } from '@/lib/types/scroll'

export function resolveScroll(
  presetName: ScrollPresetName = scroll.preset
): ResolvedScroll {
  return {
    presetName,
    ...scroll.presets[presetName],
  }
}
