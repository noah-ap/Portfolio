import { scene } from '@/config/scene'
import type { ResolvedScene, ScenePresetName } from '@/lib/types/scene'

export function resolveScene(
  presetName: ScenePresetName = scene.preset
): ResolvedScene {
  const preset = scene.presets[presetName]
  return {
    presetName,
    layers: preset.layers,
    fog: scene.fog,
    floor: scene.floor,
  }
}
