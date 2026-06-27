import type { AnimationPresetName } from '@/lib/types/animations'
import type { ResponsiveOffset } from '@/lib/types/navigation'

export type GlassPresetName = 'liquid' | 'subtle'

export interface GlassSurfaceConfig {
  blur: ResponsiveOffset
  saturation: number
  background: {
    tint: string | false
    opacity: number
  }
  borderRadius: ResponsiveOffset
  border: {
    width: number
    color: string
  }
  highlight: {
    enabled: boolean
    color: string
    opacity: number
  }
  shadow: {
    blur: number
    spread: number
    offsetX: number
    offsetY: number
    color: string
  }
  padding: ResponsiveOffset
  maxWidth: ResponsiveOffset
  margin: ResponsiveOffset
  animation: AnimationPresetName
  transition: {
    durationMs: number
    easing: string
  }
}

export interface GlassConfig {
  preset: GlassPresetName
  presets: Record<GlassPresetName, GlassSurfaceConfig>
}

export type ResolvedGlass = GlassSurfaceConfig & { presetName: GlassPresetName }
