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
    /** CSS brightness multiplier when tab is active (1 = unchanged) */
    brightness: number
    /** When false, brightness is not applied (image stays natural; border/glow still show) */
    brightnessAffectsImage: boolean
  }
  default: {
    scale: number
  }
  depthOpacity: { active: number }
  title: { fontSize: number; fontWeight: number; padding: number; color: string }
  subtitle: { fontSize: number; fontWeight: number; color: string }
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
  activeHighlight: {
    /** `cardGlow` = theme box-shadow glow; `navStyle` = white border + nav text-style glow */
    mode: 'cardGlow' | 'navStyle'
    border?: {
      activeColor?: string
      activeWidth?: number
    }
    glow: {
      enabled: boolean
      /** Match nav bar text glow pulse (`active-text-glow`) */
      pulse: boolean
    }
  }
  placeholder: {
    gradientFrom: string
    gradientTo: string
    textColor: string
    fontSize: number
  }
}
