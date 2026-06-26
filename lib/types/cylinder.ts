import type { AnimationPresetName } from '@/lib/types/animations'

export interface CylinderConfig {
  radius: number
  horizontalRadius: number
  perspective: number
  depth: { scaleRange: number }
  opacity: {
    active: number
    min: number
    falloffPerStep: number
    /** Opacity transition during rotation in ms. 0 = instant, tied to carousel spin. */
    transitionDuration: number
  }
  responsive: {
    radiusVw: number
    horizontalRadiusVw: number
    minRadius: number
    minHorizontalRadius: number
  }
  reflection: {
    enabled: boolean
    opacityMultiplier: number
    blur: number
    offsetY: number
    zScale: number
    maskGradient: string
  }
  expanded: {
    groupScale: number
    translateY: number
    floorOpacity: number
  }
  rotation: { animation: AnimationPresetName }
}
