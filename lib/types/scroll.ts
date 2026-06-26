export type ScrollPresetName = 'noah' | 'minimal' | 'parallax' | 'snap' | 'cinematic'

export type BodyOverflow = 'hidden' | 'auto'
export type WheelAction = 'expand' | 'collapse' | 'rotateNext' | 'rotatePrev' | 'nextCategory' | 'prevCategory' | 'none'
export type ArrowHorizontalAction = 'rotateTabs' | 'none'
export type ArrowVerticalAction = 'expandOrCollapse' | 'categoryNav' | 'none'
export type EnterKeyAction = 'expand' | 'none'

export interface ScrollRevealConfig {
  distance: number
  opacity: [number, number]
  scale: [number, number]
  duration: number
  stagger: number
}

export interface ScrollPreset {
  enabled: boolean
  smoothScrolling: boolean
  momentum: boolean
  wheelNavigation: boolean
  bodyOverflow: BodyOverflow
  wheelDown: WheelAction
  wheelUp: WheelAction
  arrowHorizontal: ArrowHorizontalAction
  arrowVertical: ArrowVerticalAction
  enterKey: EnterKeyAction
  springNavigation: boolean
  reveal: ScrollRevealConfig
  snap: { enabled: boolean }
}

export interface ScrollConfig {
  preset: ScrollPresetName
  presets: Record<ScrollPresetName, ScrollPreset>
}

export type ResolvedScroll = ScrollPreset & { presetName: ScrollPresetName }
