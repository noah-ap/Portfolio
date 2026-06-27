'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { resolveAnimation } from '@/lib/config/resolveAnimation'
import { getMotionTransition } from '@/lib/animations/resolveMotion'
import { useViewportWidth } from '@/lib/hooks/useViewportWidth'
import { getGlassCardStyle } from '@/lib/styles/glassStyles'
import type { BreakpointsConfig } from '@/lib/types/breakpoints'
import type { ResolvedGlass } from '@/lib/types/glass'
import type { ResolvedTheme } from '@/lib/types/theme'

interface GlassCardProps {
  glass: ResolvedGlass
  resolvedTheme: ResolvedTheme
  breakpoints: BreakpointsConfig
  animateEntrance?: boolean
  children: ReactNode
}

export function GlassCard({
  glass,
  resolvedTheme,
  breakpoints,
  animateEntrance = true,
  children,
}: GlassCardProps) {
  const width = useViewportWidth()
  const style = getGlassCardStyle(glass, resolvedTheme, width, breakpoints)

  if (!animateEntrance) {
    return <div style={style}>{children}</div>
  }

  const entrance = resolveAnimation(glass.animation)
  const entranceTransition = getMotionTransition(entrance)
  const initialOpacity = Array.isArray(entrance.opacity)
    ? entrance.opacity[0]
    : (entrance.opacity ?? 0)

  return (
    <motion.div
      style={style}
      initial={{ opacity: initialOpacity }}
      animate={{ opacity: 1 }}
      transition={entranceTransition}
    >
      {children}
    </motion.div>
  )
}
