import type { ThemeConfig } from '@/lib/types/theme'

const sharedTypography = {
  pageTitle: { fontSize: 32, fontWeight: 300 },
  pageDescription: { fontSize: 18, fontWeight: 300, lineHeight: 1.6 },
  pageSubtitle: { fontSize: 14, fontWeight: 300 },
}

export const theme: ThemeConfig = {
  preset: 'dark',
  glow: {
    blur: 14,
    spread: 1,
    transitionMs: 300,
    text: {
      blurMin: 4,
      spreadMin: 10,
      blurMax: 10,
      spreadMax: 22,
    },
    pulse: {
      durationMs: 2800,
      easing: 'ease-in-out',
    },
  },
  presets: {
    dark: {
      colors: {
        background: '#000000',
        surface: { dark: '#111827', muted: '#1f2937' },
        text: {
          primary: '#ffffff',
          secondary: 'rgba(255, 255, 255, 0.8)',
          muted: 'rgba(255, 255, 255, 0.7)',
        },
        ring: {
          active: 'rgba(255, 255, 255, 0.5)',
          inactive: 'rgba(255, 255, 255, 0.2)',
        },
        indicator: {
          active: '#ffffff',
          inactive: 'rgba(255, 255, 255, 0.3)',
        },
        overlay: {
          from: 'rgba(0, 0, 0, 0.8)',
          to: 'transparent',
        },
        glow: {
          active: 'rgba(255, 255, 255, 0.35)',
          activeBright: 'rgba(255, 255, 255, 0.6)',
        },
      },
      floor: {
        gradient:
          'radial-gradient(circle at center top, rgba(30, 30, 50, 0.3) 0%, rgba(20, 20, 35, 0.5) 30%, rgba(10, 10, 20, 0.7) 60%, rgba(0, 0, 0, 0.95) 100%)',
      },
      fog: {
        fogColor1: 'rgba(255, 255, 255, ',
        fogColor2: 'rgba(200, 200, 255, ',
        particleColor: 'rgba(255, 255, 255, ',
        fogBaseOpacity: 0.25,
        fogOpacityRange: 0.15,
        particleBaseOpacity: 0.3,
        particleOpacityRange: 0.2,
      },
      typography: sharedTypography,
    },
    grey: {
      colors: {
        background: '#111827',
        surface: { dark: '#1f2937', muted: '#374151' },
        text: {
          primary: '#f3f4f6',
          secondary: 'rgba(209, 213, 219, 0.9)',
          muted: 'rgba(156, 163, 175, 0.9)',
        },
        ring: {
          active: 'rgba(209, 213, 219, 0.5)',
          inactive: 'rgba(107, 114, 128, 0.2)',
        },
        indicator: {
          active: '#f3f4f6',
          inactive: '#6b7280',
        },
        overlay: {
          from: 'rgba(0, 0, 0, 0.8)',
          to: 'transparent',
        },
        glow: {
          active: 'rgba(243, 244, 246, 0.35)',
          activeBright: 'rgba(243, 244, 246, 0.6)',
        },
      },
      floor: {
        gradient:
          'radial-gradient(circle at center top, rgba(50, 50, 60, 0.3) 0%, rgba(40, 40, 50, 0.5) 30%, rgba(30, 30, 40, 0.7) 60%, rgba(20, 20, 30, 0.95) 100%)',
      },
      fog: {
        fogColor1: 'rgba(255, 255, 255, ',
        fogColor2: 'rgba(200, 200, 220, ',
        particleColor: 'rgba(255, 255, 255, ',
        fogBaseOpacity: 0.2,
        fogOpacityRange: 0.12,
        particleBaseOpacity: 0.25,
        particleOpacityRange: 0.15,
      },
      typography: sharedTypography,
    },
    light: {
      colors: {
        background: '#f3f4f6',
        surface: { dark: '#e5e7eb', muted: '#d1d5db' },
        text: {
          primary: '#111827',
          secondary: 'rgba(31, 41, 55, 0.9)',
          muted: 'rgba(55, 65, 81, 0.9)',
        },
        ring: {
          active: 'rgba(0, 0, 0, 0.5)',
          inactive: 'rgba(0, 0, 0, 0.2)',
        },
        indicator: {
          active: '#111827',
          inactive: '#9ca3af',
        },
        overlay: {
          from: 'rgba(0, 0, 0, 0.8)',
          to: 'transparent',
        },
        glow: {
          active: 'rgba(17, 24, 39, 0.25)',
          activeBright: 'rgba(17, 24, 39, 0.45)',
        },
      },
      floor: {
        gradient:
          'radial-gradient(circle at center top, rgba(240, 240, 250, 0.3) 0%, rgba(230, 230, 240, 0.5) 30%, rgba(220, 220, 230, 0.7) 60%, rgba(210, 210, 220, 0.95) 100%)',
      },
      fog: {
        fogColor1: 'rgba(100, 100, 120, ',
        fogColor2: 'rgba(80, 80, 100, ',
        particleColor: 'rgba(60, 60, 80, ',
        fogBaseOpacity: 0.35,
        fogOpacityRange: 0.2,
        particleBaseOpacity: 0.5,
        particleOpacityRange: 0.3,
      },
      typography: sharedTypography,
    },
  },
}
