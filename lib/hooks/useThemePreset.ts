'use client'

import { useCallback, useEffect, useState } from 'react'
import type { ThemePresetName } from '@/lib/types/theme'

const STORAGE_KEY = 'portfolio-theme-preset'

export function useThemePreset(
  defaultPreset: ThemePresetName
): [ThemePresetName, (preset: ThemePresetName) => void] {
  const [preset, setPresetState] = useState<ThemePresetName>(defaultPreset)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemePresetName | null
    if (saved && ['dark', 'grey', 'light'].includes(saved)) {
      setPresetState(saved)
    }
  }, [])

  const setPreset = useCallback((next: ThemePresetName) => {
    setPresetState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  return [preset, setPreset]
}
