import type { CSSProperties } from 'react'
import type { ResolvedAnimationPreset } from '@/lib/types/animations'
import type { ScrollRevealConfig } from '@/lib/types/scroll'

export function presetToTransition(preset: ResolvedAnimationPreset): string {
  return `${preset.duration}ms ${preset.easing}`
}

export function getRevealInitialStyle(
  reveal: ScrollRevealConfig,
  preset: ResolvedAnimationPreset
): CSSProperties {
  return {
    opacity: reveal.opacity[0],
    transform: `translateY(${reveal.distance}px) scale(${reveal.scale[0]})`,
    transition: `opacity ${reveal.duration}ms ${preset.easing}, transform ${reveal.duration}ms ${preset.easing}`,
  }
}

export function getRevealVisibleStyle(
  reveal: ScrollRevealConfig,
  preset: ResolvedAnimationPreset
): CSSProperties {
  return {
    opacity: reveal.opacity[1],
    transform: `translateY(0) scale(${reveal.scale[1]})`,
    transition: `opacity ${reveal.duration}ms ${preset.easing}, transform ${reveal.duration}ms ${preset.easing}`,
  }
}

export function getHoverTransformVars(
  scale: number,
  lift: number,
  preset: ResolvedAnimationPreset
): CSSProperties {
  return {
    ['--tab-hover-scale' as string]: scale,
    ['--tab-hover-lift' as string]: `${lift}px`,
    ['--tab-transition' as string]: presetToTransition(preset),
  }
}
