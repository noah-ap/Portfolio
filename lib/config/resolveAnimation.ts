import { animations } from '@/config/animations'
import type {
  AnimationPresetName,
  ResolvedAnimationPreset,
} from '@/lib/types/animations'

export function resolveAnimation(
  presetName: AnimationPresetName
): ResolvedAnimationPreset {
  return animations.presets[presetName]
}
