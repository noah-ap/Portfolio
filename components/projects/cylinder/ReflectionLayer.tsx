'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { resolveAnimation } from '@/lib/config/resolveAnimation'
import { getCategoryTransitionMotion } from '@/lib/animations/categoryTransition'
import { getMotionTransition } from '@/lib/animations/resolveMotion'
import {
  calculateCylinderX,
  calculateCylinderZ,
  calculateAngularDistanceOpacity,
  getResponsiveRadius,
} from '@/lib/layout/cylinderMath'
import type { BreakpointsConfig } from '@/lib/types/breakpoints'
import type { CylinderConfig } from '@/lib/types/cylinder'
import type { Project } from '@/lib/types/project'
import type { ResolvedTheme } from '@/lib/types/theme'
import type { SpacingConfig } from '@/lib/types/spacing'
import type { TabsConfig } from '@/lib/types/tabs'
import type { ResolvedAnimationPreset } from '@/lib/types/animations'
import { useBreakpointScale } from '@/lib/hooks/useBreakpointScale'
import { useViewportWidth } from '@/lib/hooks/useViewportWidth'
import { ProjectTab } from '../ProjectTab'

interface ReflectionLayerProps {
  projects: Project[]
  activeIndex: number
  currentRotation: number
  tabs: TabsConfig
  cylinder: CylinderConfig
  breakpoints: BreakpointsConfig
  resolvedTheme: ResolvedTheme
  spacing: SpacingConfig
  hoverPreset: ResolvedAnimationPreset
  isExpanded: boolean
  isExiting: boolean
  groupKey: string
  categoryTransition: ResolvedAnimationPreset
}

export function ReflectionLayer({
  projects,
  activeIndex,
  currentRotation,
  tabs,
  cylinder,
  breakpoints,
  resolvedTheme,
  spacing,
  hoverPreset,
  isExpanded,
  isExiting,
  groupKey,
  categoryTransition,
}: ReflectionLayerProps) {
  const width = useViewportWidth()
  const tabScale = useBreakpointScale(breakpoints)
  const expandPreset = resolveAnimation('expandCollapse')
  const expandTransition = getMotionTransition(expandPreset)

  const responsiveRadius = useMemo(
    () =>
      getResponsiveRadius(
        cylinder.radius,
        width,
        cylinder.responsive.radiusVw,
        cylinder.responsive.minRadius
      ),
    [cylinder, width]
  )

  const responsiveHorizontalRadius = useMemo(
    () =>
      getResponsiveRadius(
        cylinder.horizontalRadius,
        width,
        cylinder.responsive.horizontalRadiusVw,
        cylinder.responsive.minHorizontalRadius
      ),
    [cylinder, width]
  )

  if (!cylinder.reflection.enabled) return null

  const groupScale = isExpanded
    ? cylinder.expanded.groupScale * tabScale
    : tabScale

  return (
    <motion.div
      className="absolute left-0 right-0 pointer-events-none"
      style={{
        top: '50vh',
        height: '50vh',
        overflow: 'visible',
        zIndex: 1,
      }}
      animate={{
        y: isExpanded ? cylinder.expanded.translateY : 0,
        opacity: isExpanded ? 0 : 1,
        scale: isExpanded ? cylinder.expanded.groupScale : 1,
      }}
      transition={expandTransition}
    >
      <div
        className="relative w-full h-full flex items-start justify-center"
        style={{
          perspective: cylinder.perspective,
          perspectiveOrigin: '50% 0%',
        }}
      >
        <div
          style={{
            position: 'relative',
            transformStyle: 'preserve-3d',
            width: 0,
            height: 0,
            transform: `scale(${groupScale})`,
          }}
        >
          {projects.map((project, index) => {
            const z = calculateCylinderZ(
              index,
              projects.length,
              responsiveRadius,
              currentRotation
            )
            const x = calculateCylinderX(
              index,
              projects.length,
              responsiveHorizontalRadius,
              currentRotation
            )
            const opacity = calculateAngularDistanceOpacity(
              index,
              projects.length,
              currentRotation,
              cylinder.opacity.active,
              cylinder.opacity.min,
              cylinder.opacity.falloffPerStep
            )
            const reflectionOpacity = Math.max(
              0,
              opacity * cylinder.reflection.opacityMultiplier
            )
            const isActive = index === activeIndex
            const normalizedZ = (z + responsiveRadius) / (2 * responsiveRadius)
            const brightness = 0.6 + normalizedZ * 0.4

            return (
              <motion.div
                key={`reflection-${groupKey}-${project.id}`}
                className="absolute pointer-events-none overflow-hidden"
                style={{
                  left: 0,
                  top: 0,
                  transform: `translate3d(calc(-50% + ${x}px), ${cylinder.reflection.offsetY + z * cylinder.reflection.zScale}px, ${z}px) scaleY(-1)`,
                  opacity: isExiting ? undefined : reflectionOpacity,
                  transformStyle: 'preserve-3d',
                  filter: `blur(${cylinder.reflection.blur}px) brightness(${brightness})`,
                  borderRadius: tabs.card.borderRadius,
                  WebkitMaskImage: cylinder.reflection.maskGradient,
                  maskImage: cylinder.reflection.maskGradient,
                }}
                animate={
                  isExiting
                    ? { opacity: 0 }
                    : cylinder.opacity.transitionDuration > 0
                      ? { opacity: reflectionOpacity }
                      : undefined
                }
                transition={
                  isExiting
                    ? getCategoryTransitionMotion(categoryTransition)
                    : cylinder.opacity.transitionDuration > 0
                      ? {
                          ...getMotionTransition(
                            resolveAnimation('cylinderRotate')
                          ),
                          duration:
                            cylinder.opacity.transitionDuration / 1000,
                        }
                      : undefined
                }
              >
                <ProjectTab
                  project={project}
                  isActive={isActive}
                  tabs={tabs}
                  theme={resolvedTheme}
                  spacing={spacing}
                  hoverPreset={hoverPreset}
                  onSelect={() => {}}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
