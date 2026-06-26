'use client'

import { motion } from 'framer-motion'
import { resolveAnimation } from '@/lib/config/resolveAnimation'
import { resolveThemeToken } from '@/lib/config/resolveThemeToken'
import { getMotionTransition } from '@/lib/animations/resolveMotion'
import { useViewportWidth } from '@/lib/hooks/useViewportWidth'
import type { NavigationConfig } from '@/lib/types/navigation'
import type { Project } from '@/lib/types/project'
import type { ResolvedTheme } from '@/lib/types/theme'
import type { BreakpointsConfig } from '@/lib/types/breakpoints'

interface VerticalIndicatorsProps {
  projects: Project[]
  activeIndex: number
  navigation: NavigationConfig
  breakpoints: BreakpointsConfig
  resolvedTheme: ResolvedTheme
  onSelect: (index: number) => void
}

function pickResponsive(
  values: { sm: number; md: number; lg: number },
  width: number,
  breakpoints: BreakpointsConfig
) {
  if (width < breakpoints.sm) return values.sm
  if (width < breakpoints.md) return values.md
  return values.lg
}

export function VerticalIndicators({
  projects,
  activeIndex,
  navigation,
  breakpoints,
  resolvedTheme,
  onSelect,
}: VerticalIndicatorsProps) {
  const width = useViewportWidth()
  const { indicators } = navigation
  const navPreset = resolveAnimation('navFadeIn')
  const staggerPreset = resolveAnimation('indicatorStagger')
  const navTransition = getMotionTransition(navPreset)
  const staggerTransition = getMotionTransition(staggerPreset)

  if (!indicators.enabled) return null

  const offset = pickResponsive(indicators.position.offset, width, breakpoints)
  const edgePosition =
    indicators.position.side === 'right' ? { right: offset } : { left: offset }
  const gap = width < breakpoints.sm ? indicators.gap * 0.75 : indicators.gap
  const dotWidth = width < breakpoints.sm ? indicators.size * 0.75 : indicators.size
  const activeHeight =
    width < breakpoints.sm ? indicators.activeHeight * 0.75 : indicators.activeHeight

  const staggerDelaySec = (staggerPreset.delay ?? 0) / 1000

  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 flex flex-col z-30"
      style={{ ...edgePosition, gap }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={navTransition}
    >
      {projects.map((project, index) => {
        const isActive = index === activeIndex
        return (
          <motion.button
            key={project.id}
            type="button"
            aria-label={`Navigate to ${project.title}`}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => onSelect(index)}
            style={{
              width: dotWidth,
              borderRadius: dotWidth,
              backgroundColor: resolveThemeToken(
                isActive ? indicators.colors.active : indicators.colors.inactive,
                resolvedTheme
              ),
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
              outline: 'none',
            }}
            initial={{ opacity: 0, scale: staggerPreset.scale ?? 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              height: isActive ? activeHeight : dotWidth,
            }}
            transition={{
              opacity: {
                ...staggerTransition,
                delay: staggerDelaySec * index,
              },
              scale: {
                ...staggerTransition,
                delay: staggerDelaySec * index,
              },
              height: { duration: 0.2, ease: 'easeOut' },
            }}
          />
        )
      })}
    </motion.div>
  )
}
