import type { ResolvedAnimationPreset } from '@/lib/types/animations'
import { getMotionTransition } from '@/lib/animations/resolveMotion'

export function getCategoryTransitionDuration(
  preset: ResolvedAnimationPreset
): number {
  const fadeDuration = preset.opacityDuration ?? preset.duration
  const fadeDelay = preset.opacityDelay ?? 0
  return Math.max(preset.duration, fadeDelay + fadeDuration)
}

export function getCategoryTransitionMotion(
  preset: ResolvedAnimationPreset
) {
  const base = getMotionTransition(preset)
  return {
    ...base,
    duration: (preset.opacityDuration ?? preset.duration) / 1000,
    delay: (preset.opacityDelay ?? 0) / 1000,
  }
}

export function getCategoryStaggerDelaySec(
  preset: ResolvedAnimationPreset,
  index: number
): number {
  return ((preset.delay ?? 0) / 1000) * index
}
