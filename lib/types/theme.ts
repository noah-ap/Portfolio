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

export interface GlowSurfaceConfig {
  blurMin: number
  spreadMin: number
  blurMax: number
  spreadMax: number
}

export interface GlowCardConfig extends GlowSurfaceConfig {
  /** When false, active tab glow is static (no pulse animation) */
  pulse: boolean
}

export interface GlowPulseConfig {
  durationMs: number
  easing: string
}

export interface GlowEffectConfig {
  blur: number
  spread: number
  transitionMs: number
  text: GlowSurfaceConfig
  card: GlowCardConfig
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

export interface ThemeGlassOverride {
  background?: {
    /** Theme token, raw color, or `false` for no tint (transparent glass) */
    tint?: string | false
    opacity?: number
  }
  /** `1` disables backdrop saturation boost */
  saturation?: number
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
  /** Optional overrides for `GlassCard` when this theme preset is active */
  glass?: ThemeGlassOverride
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
