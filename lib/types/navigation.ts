export interface ResponsiveOffset {
  sm: number
  md: number
  lg: number
}

export type CategoryNavLayoutMode = 'vertical-left' | 'horizontal-bottom'

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
    layout: {
      switch: {
        portrait: CategoryNavLayoutMode
        landscape: CategoryNavLayoutMode
        narrow: CategoryNavLayoutMode
        /** Width below which `narrow` layout applies (defaults to `breakpoints.md`) */
        narrowMaxWidth?: number
      }
      vertical: {
        position: { left: ResponsiveOffset }
      }
      horizontal: {
        anchor: 'viewport' | 'container'
        bottom: ResponsiveOffset
        paddingX: ResponsiveOffset
        paddingY: ResponsiveOffset
        gap: ResponsiveOffset
        itemPaddingX: ResponsiveOffset
        justify: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around'
        touchMinHeight: number
      }
    }
  }
  themeToggle: {
    enabled: boolean
    position: {
      anchor: 'viewport' | 'container'
      left: ResponsiveOffset
      bottom: ResponsiveOffset
    }
    gap: number
    fontSize: ResponsiveOffset
    padding: ResponsiveOffset
  }
  keyboard: { enabled: boolean }
  categoryTransition: {
    animation: string
    tabScroll: {
      enabled: boolean
      stepDurationMs: number
    }
  }
}
