import type { ResponsiveOffset } from '@/lib/types/navigation'

export interface SiteNavConfig {
  enabled: boolean
  position: 'overlay' | 'inline'
  height: ResponsiveOffset
  padding: {
    x: ResponsiveOffset
    y: ResponsiveOffset
  }
  gap: ResponsiveOffset
  fontSize: ResponsiveOffset
  selectedOpacity: number
  unselectedOpacity: number
  selectedWeight: number
  unselectedWeight: number
  colors: {
    active: string
    inactive: string
  }
  hover: {
    opacity: number
  }
  activeIndicator: {
    enabled: boolean
    height: number
    borderRadius: number
    color: string
  }
  background: {
    color: string
    opacity: number
  }
  border: {
    width: number
    color: string
  }
  borderRadius: number
  justify: 'start' | 'center' | 'end' | 'space-between'
  animation: string
}
