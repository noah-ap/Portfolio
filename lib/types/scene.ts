import type { AnimationPresetName } from '@/lib/types/animations'

export type ScenePresetName = 'noahDarkRoom' | 'minimal'

export interface SceneLayer {
  type: 'fog' | 'floor'
  animation?: AnimationPresetName
  zIndex: number
}

export interface SceneFogConfig {
  layerCount: number
  particleCount: number
  speed: number
  blendMode: 'screen' | 'multiply' | 'normal'
  fogSizeMin: number
  fogSizeRange: number
}

export interface SceneFloorConfig {
  blur: number
  height: string
  top: string
  surfaceShine: {
    from: string
    mid: string
    to: string
  }
  expandedMask: string
  collapsedMask: string
}

export interface SceneConfig {
  preset: ScenePresetName
  presets: Record<ScenePresetName, { layers: SceneLayer[] }>
  fog: SceneFogConfig
  floor: SceneFloorConfig
}

export interface ResolvedScene {
  presetName: ScenePresetName
  layers: SceneLayer[]
  fog: SceneFogConfig
  floor: SceneFloorConfig
}
