import type { AnimationPresetName } from '@/lib/types/animations'

export interface ResponsiveSize {
  min: number
  preferredVw: number
  max: number
}

export interface TabsConfig {
  card: {
    width: ResponsiveSize
    height: ResponsiveSize
    maxWidthVw: number
    maxHeightVh: number
    borderRadius: number
    backgroundColor: string
    opacity: { inactive: number }
    imageHeight: string
  }
  gap: number
  hover: {
    scale: number
    lift: number
    animation: AnimationPresetName
  }
  active: {
    scale: number
    animation: AnimationPresetName
  }
  default: {
    scale: number
  }
  depthOpacity: { active: number }
  title: { fontSize: number; fontWeight: number; padding: number }
  subtitle: { fontSize: number; fontWeight: number }
  image: {
    objectFit: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
    objectPosition: string
    activeBrightness: number
  }
  border: {
    activeWidth: number
    inactiveWidth: number
    activeColor: string
    inactiveColor: string
  }
  placeholder: {
    gradientFrom: string
    gradientTo: string
    textColor: string
    fontSize: number
  }
}
