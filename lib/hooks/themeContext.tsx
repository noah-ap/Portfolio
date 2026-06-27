'use client'

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react'
import { resolveTheme } from '@/lib/config/resolveTheme'
import { themeToCssVars, themeVarsToStyleBlock } from '@/lib/config/themeVars'
import { useThemePreset } from '@/lib/hooks/useThemePreset'
import type { ResolvedTheme, ThemePresetName } from '@/lib/types/theme'

interface ThemeContextValue {
  preset: ThemePresetName
  setPreset: (preset: ThemePresetName) => void
  resolvedTheme: ResolvedTheme
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

interface ThemeProviderProps {
  defaultPreset: ThemePresetName
  children: ReactNode
}

export function ThemeProvider({ defaultPreset, children }: ThemeProviderProps) {
  const [preset, setPreset] = useThemePreset(defaultPreset)
  const resolvedTheme = useMemo(() => resolveTheme(preset), [preset])

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: themeVarsToStyleBlock(themeToCssVars(resolvedTheme)),
        }}
      />
      <ThemeContext.Provider value={{ preset, setPreset, resolvedTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  )
}

export function useSiteTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useSiteTheme must be used within ThemeProvider')
  }
  return context
}
