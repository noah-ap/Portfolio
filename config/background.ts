import type { BackgroundConfig } from '@/lib/types/background'

export const background: BackgroundConfig = {
  preset: 'solid',
  presets: {
    solid: {
      type: 'solid',
      color: 'colors.background',
    },
    gradient: {
      type: 'gradient',
      from: '#0a0a14',
      to: '#000000',
      angle: 180,
    },
    image: {
      type: 'image',
      src: '',
      opacity: 1,
      blur: 0,
      brightness: 1,
      parallax: false,
      speed: 0,
    },
    video: {
      type: 'video',
      src: '',
      opacity: 1,
      blur: 0,
      brightness: 1,
    },
    particles: {
      type: 'particles',
      density: 50,
      speed: 1,
      opacity: 0.3,
    },
    canvas: {
      type: 'canvas',
      renderer: 'none',
    },
  },
}
