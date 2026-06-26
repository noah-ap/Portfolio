import type { CylinderConfig } from '@/lib/types/cylinder'

export const cylinder: CylinderConfig = {
  radius: 300,
  horizontalRadius: 500,
  perspective: 1000,
  depth: { minOpacity: 0.3, scaleRange: 0.3 },
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
