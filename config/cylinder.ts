import type { CylinderConfig } from '@/lib/types/cylinder'

export const cylinder: CylinderConfig = {
  radius: 300,
  horizontalRadius: 500,
  perspective: 1000,
  depth: { scaleRange: 0.3 },
  opacity: {
    active: 1,
    min: 0.3,
    falloffPerStep: 0.14,
    transitionDuration: 0,
  },
  responsive: {
    radiusVw: 0.15,
    horizontalRadiusVw: 0.25,
    minRadius: 200,
    minHorizontalRadius: 300,
  },
  reflection: {
    enabled: true,
    opacityMultiplier: 0.5,
    blur: 5,
    offsetY: 160,
    zScale: 0.3,
    maskGradient:
      'linear-gradient(to top, black 0%, black 50%, rgba(0,0,0,0.5) 75%, transparent 100%)',
  },
  expanded: {
    groupScale: 0.7,
    translateY: -150,
    floorOpacity: 0.3,
  },
  rotation: { animation: 'cylinderRotate' },
}
