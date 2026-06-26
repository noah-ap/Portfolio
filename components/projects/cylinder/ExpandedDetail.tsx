'use client'

import { motion } from 'framer-motion'
import { resolveAnimation } from '@/lib/config/resolveAnimation'
import { getMotionTransition } from '@/lib/animations/resolveMotion'
import type { LayoutConfig } from '@/lib/types/layout'
import type { Project } from '@/lib/types/project'
import type { ResolvedTheme } from '@/lib/types/theme'
import type { SpacingConfig } from '@/lib/types/spacing'
import {
  getActiveDescriptionStyle,
  getActiveSubtitleStyle,
  getActiveTitleStyle,
  getPageContentStyle,
} from '@/lib/styles/layoutStyles'

interface ExpandedDetailProps {
  project: Project
  layout: LayoutConfig
  spacing: SpacingConfig
  resolvedTheme: ResolvedTheme
  visible: boolean
}

export function ExpandedDetail({
  project,
  layout,
  spacing,
  resolvedTheme,
  visible,
}: ExpandedDetailProps) {
  const preset = resolveAnimation('expandCollapse')
  const transition = getMotionTransition(preset)

  if (!visible) return null

  return (
    <motion.div
      className="absolute left-0 right-0 z-20"
      style={{
        top: `calc(50vh + ${spacing.xl}px)`,
        bottom: 0,
      }}
      initial={{ opacity: 0, y: spacing.xxl }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: spacing.xxl }}
      transition={transition}
    >
      <div style={getPageContentStyle(layout, spacing)}>
        <h1 style={getActiveTitleStyle(resolvedTheme, spacing)}>
          {project.title}
        </h1>
        {project.subtitle && (
          <p style={getActiveSubtitleStyle(resolvedTheme, spacing)}>
            {project.subtitle}
          </p>
        )}
        {project.description && (
          <p style={getActiveDescriptionStyle(resolvedTheme)}>
            {project.description}
          </p>
        )}
      </div>
    </motion.div>
  )
}
