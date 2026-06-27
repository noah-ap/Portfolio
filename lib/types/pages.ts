import type { AnimationPresetName } from '@/lib/types/animations'

export interface PageDefinition {
  id: string
  title: string
  route: string
  icon?: string
  visible: boolean
  order: number
}

export interface PagesConfig {
  transition: {
    animation: AnimationPresetName
    /** Multiplier applied to preset duration (0.5 = 2× faster) */
    durationScale?: number
  }
  items: PageDefinition[]
}