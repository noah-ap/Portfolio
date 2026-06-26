export interface ResponsiveOffset {
  sm: number
  md: number
  lg: number
}

export interface NavigationConfig {
  indicators: {
    enabled: boolean
    orientation: 'vertical' | 'horizontal'
    size: number
    activeHeight: number
    gap: number
    position: {
      side: 'left' | 'right'
      offset: ResponsiveOffset
    }
    colors: {
      active: string
      inactive: string
    }
    animation: string
  }
  categoryNav: {
    enabled: boolean
    position: { left: ResponsiveOffset }
    gap: ResponsiveOffset
    fontSize: ResponsiveOffset
    selectedOpacity: number
    unselectedOpacity: number
    selectedWeight: number
    unselectedWeight: number
  }
  themeToggle: {
    enabled: boolean
    position: {
      left: ResponsiveOffset
      bottom: ResponsiveOffset
    }
    gap: number
    fontSize: ResponsiveOffset
    padding: ResponsiveOffset
  }
  keyboard: { enabled: boolean }
}
