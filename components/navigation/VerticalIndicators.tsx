'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { resolveAnimation } from '@/lib/config/resolveAnimation'
import { resolveThemeToken } from '@/lib/config/resolveThemeToken'
import { getMotionTransition } from '@/lib/animations/resolveMotion'
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

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1920
  )
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return width
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
  const width = useWindowWidth()
  const { indicators } = navigation
  const navPreset = resolveAnimation('navFadeIn')
  const staggerPreset = resolveAnimation('indicatorStagger')
  const navTransition = getMotionTransition(navPreset)
  const staggerTransition = getMotionTransition(staggerPreset)

  if (!indicators.enabled) return null

  const left = pickResponsive(indicators.position.left, width, breakpoints)
  const gap = width < breakpoints.sm ? indicators.gap * 0.75 : indicators.gap
  const dotWidth = width < breakpoints.sm ? indicators.size * 0.75 : indicators.size
  const activeHeight =
    width < breakpoints.sm ? indicators.activeHeight * 0.75 : indicators.activeHeight

  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 flex flex-col z-30"
      style={{ left, gap }}
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
            onClick={() => onSelect(index)}
            style={{
              width: dotWidth,
              height: isActive ? activeHeight : dotWidth,
              borderRadius: dotWidth,
              backgroundColor: resolveThemeToken(
                isActive ? indicators.colors.active : indicators.colors.inactive,
                resolvedTheme
              ),
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            initial={{ opacity: 0, scale: staggerPreset.scale ?? 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              ...staggerTransition,
              delay: (staggerPreset.delay ?? 0) * index,
            }}
          />
        )
      })}
    </motion.div>
  )
}
