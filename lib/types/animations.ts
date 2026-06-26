export type AnimationPresetName =
  | 'cardHover'
  | 'fadeIn'
  | 'pageTransition'
  | 'sectionReveal'
  | 'staggerChildren'
  | 'scrollSnap'
  | 'cylinderRotate'
  | 'expandCollapse'
  | 'categorySpin'
  | 'fogEntrance'
  | 'navFadeIn'
  | 'indicatorStagger'

export interface AnimationSpring {
  stiffness: number
  damping: number
  mass: number
}

export interface AnimationPreset {
  duration: number
  easing: string
  scale?: number
  translateY?: number | [number, number]
  opacity?: number | [number, number]
  delay?: number
  spring?: AnimationSpring
  opacityDelay?: number
  opacityDuration?: number
}

export interface AnimationsConfig {
  presets: Record<AnimationPresetName, AnimationPreset>
}

export type ResolvedAnimationPreset = AnimationPreset
