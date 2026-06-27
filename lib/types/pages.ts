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
  }
  items: PageDefinition[]
}