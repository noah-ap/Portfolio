import type { ResolvedAnimationPreset } from '@/lib/types/animations'

export function presetToTransition(preset: ResolvedAnimationPreset) {
  return {
    duration: preset.duration / 1000,
    ease: parseEasing(preset.easing),
    delay: preset.delay ? preset.delay / 1000 : 0,
  }
}

export function presetToSpring(preset: ResolvedAnimationPreset) {
  if (!preset.spring) return undefined
  return {
    type: 'spring' as const,
    stiffness: preset.spring.stiffness,
    damping: preset.spring.damping,
    mass: preset.spring.mass,
  }
}

const CSS_TO_MOTION_EASING: Record<string, string> = {
  linear: 'linear',
  ease: 'easeInOut',
  'ease-in': 'easeIn',
  'ease-out': 'easeOut',
  'ease-in-out': 'easeInOut',
}

function parseEasing(easing: string): number[] | string {
  const match = easing.match(/cubic-bezier\(([^)]+)\)/)
  if (match) {
    return match[1].split(',').map((v) => parseFloat(v.trim()))
  }
  return CSS_TO_MOTION_EASING[easing] ?? easing
}

export function getMotionTransition(
  preset: ResolvedAnimationPreset,
  useSpring = false
) {
  if (useSpring && preset.spring) {
    return presetToSpring(preset)
  }
  return presetToTransition(preset)
}
