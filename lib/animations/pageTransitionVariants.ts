import type { ResolvedAnimationPreset } from '@/lib/types/animations'

function getEnterY(preset: ResolvedAnimationPreset): number {
  if (!Array.isArray(preset.translateY)) return 0
  const [from, to] = preset.translateY
  return from < to ? from : Math.abs(to) || 20
}

function getExitY(preset: ResolvedAnimationPreset): number {
  if (!Array.isArray(preset.translateY)) return 0
  const [from, to] = preset.translateY
  return from > to ? to : -Math.abs(to) || -20
}

export function getPageTransitionVariants(preset: ResolvedAnimationPreset) {
  const opacity = preset.opacity

  if (Array.isArray(opacity) && opacity[0] < opacity[1]) {
    return {
      initial: { opacity: opacity[0], y: getEnterY(preset) },
      animate: { opacity: opacity[1], y: 0 },
      exit: { opacity: opacity[0], y: getExitY(preset) },
    }
  }

  return {
    initial: { opacity: 0, y: getEnterY(preset) },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: getExitY(preset) },
  }
}
