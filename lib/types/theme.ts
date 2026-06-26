export type ThemePresetName = 'dark' | 'grey' | 'light'

export interface ThemeColors {
  background: string
  surface: { dark: string; muted: string }
  text: { primary: string; secondary: string; muted: string }
  ring: { active: string; inactive: string }
  indicator: { active: string; inactive: string }
  overlay: { from: string; to: string }
  glow: { active: string; activeBright: string }
}

export interface GlowTextConfig {
  blurMin: number
  spreadMin: number
  blurMax: number
  spreadMax: number
}

export interface GlowPulseConfig {
  durationMs: number
  easing: string
}

export interface GlowEffectConfig {
  blur: number
  spread: number
  transitionMs: number
  text: GlowTextConfig
  pulse: GlowPulseConfig
}

export interface ThemeFogColors {
  fogColor1: string
  fogColor2: string
  particleColor: string
  fogBaseOpacity: number
  fogOpacityRange: number
  particleBaseOpacity: number
  particleOpacityRange: number
}

export interface ThemeFloor {
  gradient: string
}

export interface ThemePreset {
  colors: ThemeColors
  floor: ThemeFloor
  fog: ThemeFogColors
  typography: {
    pageTitle: { fontSize: number; fontWeight: number }
    pageDescription: { fontSize: number; fontWeight: number; lineHeight: number }
    pageSubtitle: { fontSize: number; fontWeight: number }
  }
}

export interface ThemeConfig {
  preset: ThemePresetName
  glow: GlowEffectConfig
  presets: Record<ThemePresetName, ThemePreset>
}

export type ResolvedTheme = ThemePreset & {
  presetName: ThemePresetName
  glow: GlowEffectConfig
}

export type ThemeToken =
  | 'colors.background'
  | 'surface.dark'
  | 'surface.muted'
  | 'text.primary'
  | 'text.secondary'
  | 'text.muted'
  | 'ring.active'
  | 'ring.inactive'
  | 'indicator.active'
  | 'indicator.inactive'
  | 'overlay.from'
  | 'overlay.to'
  | 'glow.active'
  | 'glow.activeBright'
