import type { NavigationConfig } from '@/lib/types/navigation'

export const navigation: NavigationConfig = {
  indicators: {
    enabled: true,
    orientation: 'vertical',
    size: 8,
    activeHeight: 32,
    gap: 8,
    position: {
      side: 'left',
      offset: { sm: 12, md: 16, lg: 32 },
    },
    colors: {
      active: 'indicator.active',
      inactive: 'indicator.inactive',
    },
    animation: 'indicatorStagger',
  },
  categoryNav: {
    enabled: true,
    gap: { sm: 12, md: 16, lg: 16 },
    fontSize: { sm: 14, md: 16, lg: 18 },
    selectedOpacity: 1,
    unselectedOpacity: 0.5,
    selectedWeight: 400,
    unselectedWeight: 300,
    colors: {
      active: 'text.secondary',
      inactive: 'text.muted',
    },
    layout: {
      switch: {
        portrait: 'horizontal-bottom',
        landscape: 'vertical-left',
        narrow: 'horizontal-bottom',
      },
      vertical: {
        position: { left: { sm: 48, md: 64, lg: 96 } },
      },
      horizontal: {
        anchor: 'viewport',
        bottom: { sm: 12, md: 16, lg: 16 },
        paddingX: { sm: 16, md: 24, lg: 32 },
        paddingY: { sm: 10, md: 12, lg: 12 },
        gap: { sm: 16, md: 20, lg: 28 },
        itemPaddingX: { sm: 8, md: 10, lg: 12 },
        justify: 'center',
        touchMinHeight: 44,
      },
    },
  },
  themeToggle: {
    enabled: true,
    position: {
      anchor: 'viewport',
      left: { sm: 12, md: 16, lg: 32 },
      bottom: { sm: 12, md: 16, lg: 32 },
    },
    gap: 4,
    fontSize: { sm: 10, md: 11, lg: 12 },
    padding: { sm: 6, md: 8, lg: 8 },
  },
  keyboard: { enabled: true },
  categoryTransition: {
    animation: 'categorySpin',
    tabScroll: {
      enabled: true,
      stepDurationMs: 180,
    },
  },
}
