import type { ScenePresetName } from '@/lib/types/scene'
import type { GlassPresetName } from '@/lib/types/glass'

export interface ContentPagesConfig {
  pageIds: string[]
  scene: {
    preset: ScenePresetName
  }
  content: {
    zIndex: number
    backgroundOpacity: number
  }
  glass: {
    enabled: boolean
    preset: GlassPresetName
    animateEntrance: boolean
  }
}