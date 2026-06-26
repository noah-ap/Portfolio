'use client'

import { motion } from 'framer-motion'
import { resolveThemeToken } from '@/lib/config/resolveThemeToken'
import { getActiveTextGlowClassName } from '@/lib/styles/glowStyles'
import { resolveAnimation } from '@/lib/config/resolveAnimation'
import { getMotionTransition } from '@/lib/animations/resolveMotion'
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

function pickResponsive(
  values: { sm: number; md: number; lg: number },
  width: number,
  breakpoints: BreakpointsConfig
) {
  if (width < breakpoints.sm) return values.sm
  if (width < breakpoints.md) return values.md
  return values.lg
}

export function ThemeToggle({
  navigation,
  breakpoints,
  resolvedTheme,
  activePreset,
  onChange,
}: ThemeToggleProps) {
  const width = useViewportWidth()
  const { themeToggle } = navigation
  const navPreset = resolveAnimation('navFadeIn')
  const navTransition = getMotionTransition(navPreset)

  if (!themeToggle.enabled) return null

  const left = pickResponsive(themeToggle.position.left, width, breakpoints)
  const bottom = pickResponsive(themeToggle.position.bottom, width, breakpoints)
  const fontSize = pickResponsive(themeToggle.fontSize, width, breakpoints)
  const padding = pickResponsive(themeToggle.padding, width, breakpoints)

  return (
    <motion.div
      className="absolute z-30 flex flex-col"
      style={{ left, bottom, gap: themeToggle.gap }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={navTransition}
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
    </motion.div>
  )
}
