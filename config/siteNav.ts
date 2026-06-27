import type { SiteNavConfig } from '@/lib/types/siteNav'

export const siteNav: SiteNavConfig = {
  enabled: true,
  position: 'overlay',
  height: { sm: 48, md: 56, lg: 64 },
  padding: {
    x: { sm: 16, md: 24, lg: 32 },
    y: { sm: 8, md: 10, lg: 12 },
  },
  gap: { sm: 20, md: 28, lg: 36 },
  fontSize: { sm: 14, md: 16, lg: 18 },
  selectedOpacity: 1,
  unselectedOpacity: 0.5,
  selectedWeight: 400,
  unselectedWeight: 300,
  colors: {
    active: 'text.secondary',
    inactive: 'text.muted',
  },
  hover: {
    opacity: 0.85,
  },
  activeIndicator: {
    enabled: false,
    height: 2,
    borderRadius: 1,
    color: 'ring.active',
  },
  background: {
    color: 'colors.background',
    opacity: 0,
  },
  border: {
    width: 0,
    color: 'ring.inactive',
  },
  borderRadius: 0,
  justify: 'center',
  animation: 'navFadeIn',
}
