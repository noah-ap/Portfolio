'use client'

import { resolveThemeToken } from '@/lib/config/resolveThemeToken'
import { getActiveTextGlowClassName } from '@/lib/styles/glowStyles'
import { getThemeToggleContainerStyle } from '@/lib/styles/navItemStyles'
import { pickResponsive } from '@/lib/layout/pickResponsive'
import { useViewportWidth } from '@/lib/hooks/useViewportWidth'
import type { BreakpointsConfig } from '@/lib/types/breakpoints'
import type { NavigationConfig } from '@/lib/types/navigation'
import type { ResolvedTheme, ThemePresetName } from '@/lib/types/theme'

interface ThemeToggleProps {
  navigation: NavigationConfig
  breakpoints: BreakpointsConfig
  resolvedTheme: ResolvedTheme
  activePreset: ThemePresetName
  onChange: (preset: ThemePresetName) => void
}

const PRESETS: ThemePresetName[] = ['dark', 'grey', 'light']

export function ThemeToggle({
  navigation,
  breakpoints,
  resolvedTheme,
  activePreset,
  onChange,
}: ThemeToggleProps) {
  const width = useViewportWidth()
  const { themeToggle } = navigation

  if (!themeToggle.enabled) return null

  const fontSize = pickResponsive(themeToggle.fontSize, width, breakpoints)
  const padding = pickResponsive(themeToggle.padding, width, breakpoints)

  return (
    <div
      className="flex flex-col"
      style={getThemeToggleContainerStyle(themeToggle, width, breakpoints)}
    >
      {PRESETS.map((preset) => {
        const isActive = preset === activePreset
        return (
          <button
            key={preset}
            type="button"
            className={getActiveTextGlowClassName(isActive)}
            onClick={() => onChange(preset)}
            style={{
              padding: `${padding * 0.75}px ${padding}px`,
              fontSize,
              fontWeight: 300,
              color: resolveThemeToken(
                isActive ? 'text.primary' : 'text.muted',
                resolvedTheme
              ),
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {preset}
          </button>
        )
      })}
    </div>
  )
}
