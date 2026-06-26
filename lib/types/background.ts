export type BackgroundPresetName =
  | 'solid'
  | 'gradient'
  | 'image'
  | 'video'
  | 'particles'
  | 'canvas'

export interface SolidBackground {
  type: 'solid'
  color: string
}

export interface GradientBackground {
  type: 'gradient'
  from: string
  to: string
  angle: number
}

export interface ImageBackground {
  type: 'image'
  src: string
  opacity: number
  blur: number
  brightness: number
  parallax: boolean
  speed: number
}

export interface VideoBackground {
  type: 'video'
  src: string
  opacity: number
  blur: number
  brightness: number
}

export interface ParticlesBackground {
  type: 'particles'
  density: number
  speed: number
  opacity: number
}

export interface CanvasBackground {
  type: 'canvas'
  renderer: string
}

export type BackgroundPreset =
  | SolidBackground
  | GradientBackground
  | ImageBackground
  | VideoBackground
  | ParticlesBackground
  | CanvasBackground

export interface BackgroundConfig {
  preset: BackgroundPresetName
  presets: Record<BackgroundPresetName, BackgroundPreset>
}

export type ResolvedBackground = BackgroundPreset & {
  presetName: BackgroundPresetName
}
