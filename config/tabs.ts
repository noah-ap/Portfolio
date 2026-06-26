import type { TabsConfig } from '@/lib/types/tabs'

export const tabs: TabsConfig = {
  card: {
    width: { min: 200, preferredVw: 16, max: 256 },
    height: { min: 250, preferredVw: 20, max: 320 },
    maxWidthVw: 90,
    maxHeightVh: 50,
    borderRadius: 8,
    backgroundColor: 'surface.dark',
    opacity: { inactive: 1 },
    imageHeight: '100%',
  },
  gap: 24,
  hover: {
    scale: 1.05,
    lift: -4,
    animation: 'cardHover',
  },
  active: {
    scale: 1.1,
    animation: 'cardHover',
  },
  default: {
    scale: 1,
  },
  depthOpacity: { active: 1 },
  title: { fontSize: 20, fontWeight: 300, padding: 16 },
  subtitle: { fontSize: 14, fontWeight: 300 },
  image: {
    objectFit: 'cover',
    objectPosition: 'center',
    activeBrightness: 1.1,
  },
  border: {
    activeWidth: 2,
    inactiveWidth: 1,
    activeColor: 'ring.active',
    inactiveColor: 'ring.inactive',
  },
  placeholder: {
    gradientFrom: 'surface.muted',
    gradientTo: 'surface.dark',
    textColor: 'text.muted',
    fontSize: 18,
  },
}
