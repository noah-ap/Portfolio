import type { GlassConfig } from '@/lib/types/glass'

const sharedTransition = {
  durationMs: 300,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
}

export const glass: GlassConfig = {
  preset: 'liquid',
  presets: {
    liquid: {
      blur: { sm: 20, md: 28, lg: 36 },
      saturation: 1.35,
      background: {
        tint: 'surface.muted',
        opacity: 0.12,
      },
      borderRadius: { sm: 16, md: 20, lg: 24 },
      border: {
        width: 1,
        color: 'rgba(255, 255, 255, 0.18)',
      },
      highlight: {
        enabled: true,
        color: 'rgba(255, 255, 255, 1)',
        opacity: 0.22,
      },
      shadow: {
        blur: 40,
        spread: 0,
        offsetX: 0,
        offsetY: 12,
        color: 'rgba(0, 0, 0, 0.35)',
      },
      padding: { sm: 24, md: 32, lg: 40 },
      maxWidth: { sm: 640, md: 720, lg: 768 },
      margin: { sm: 16, md: 24, lg: 32 },
      animation: 'fadeIn',
      transition: sharedTransition,
    },
    subtle: {
      blur: { sm: 12, md: 16, lg: 20 },
      saturation: 1.15,
      background: {
        tint: 'surface.dark',
        opacity: 0.08,
      },
      borderRadius: { sm: 12, md: 16, lg: 20 },
      border: {
        width: 1,
        color: 'ring.inactive',
      },
      highlight: {
        enabled: true,
        color: 'rgba(255, 255, 255, 1)',
        opacity: 0.12,
      },
      shadow: {
        blur: 24,
        spread: 0,
        offsetX: 0,
        offsetY: 8,
        color: 'rgba(0, 0, 0, 0.25)',
      },
      padding: { sm: 20, md: 28, lg: 32 },
      maxWidth: { sm: 640, md: 720, lg: 768 },
      margin: { sm: 12, md: 20, lg: 24 },
      animation: 'fadeIn',
      transition: sharedTransition,
    },
  },
}
