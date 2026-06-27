import type { SceneConfig } from '@/lib/types/scene'

export const scene: SceneConfig = {
  preset: 'noahDarkRoom',
  presets: {
    noahDarkRoom: {
      layers: [
        { type: 'fog', animation: 'fogEntrance', zIndex: 0 },
        { type: 'floor', zIndex: 1 },
      ],
    },
    fogOnly: {
      layers: [{ type: 'fog', animation: 'fogEntrance', zIndex: 0 }],
    },
    minimal: {
      layers: [{ type: 'floor', zIndex: 0 }],
    },
  },
  fog: {
    layerCount: 8,
    particleCount: 30,
    speed: 0.3,
    blendMode: 'screen',
    fogSizeMin: 150,
    fogSizeRange: 200,
  },
  floor: {
    blur: 2,
    height: '50vh',
    top: '50vh',
    surfaceShine: {
      from: 'rgba(255, 255, 255, 0.08)',
      mid: 'rgba(255, 255, 255, 0.04)',
      to: 'transparent',
    },
    expandedMask: 'linear-gradient(to bottom, transparent 0%, black 100%)',
    collapsedMask:
      'linear-gradient(to bottom, transparent 0%, black 20%, black 100%)',
  },
}
