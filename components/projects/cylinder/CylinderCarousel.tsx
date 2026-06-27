'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { resolveAnimation } from '@/lib/config/resolveAnimation'
import { getCategoryTransitionMotion } from '@/lib/animations/categoryTransition'
import { getMotionTransition } from '@/lib/animations/resolveMotion'
import {
  calculateCylinderX,
  calculateCylinderZ,
  calculateAngularDistanceOpacity,
  calculateDepthScale,
  getResponsiveRadius,
  getTargetRotation,
} from '@/lib/layout/cylinderMath'
import type { BreakpointsConfig } from '@/lib/types/breakpoints'
import type { CylinderConfig } from '@/lib/types/cylinder'
import type { Project } from '@/lib/types/project'
import type { ResolvedAnimationPreset } from '@/lib/types/animations'
import type { ResolvedTheme } from '@/lib/types/theme'
import type { SpacingConfig } from '@/lib/types/spacing'
import type { TabsConfig } from '@/lib/types/tabs'
import { useBreakpointScale } from '@/lib/hooks/useBreakpointScale'
import { useViewportWidth } from '@/lib/hooks/useViewportWidth'
import { ProjectTab } from '../ProjectTab'

interface CylinderCarouselProps {
  projects: Project[]
  activeIndex: number
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
  onSelect: (index: number) => void
  onSelectActive: () => void
  onRotationChange: (rotation: number) => void
}

export function CylinderCarousel({
  projects,
  activeIndex,
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
  onSelect,
  onSelectActive,
  onRotationChange,
}: CylinderCarouselProps) {
  const width = useViewportWidth()
  const tabScale = useBreakpointScale(breakpoints)
  const rotatePreset = resolveAnimation(cylinder.rotation.animation)
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

  const rotation = useMotionValue(0)
  const springRotation = useSpring(rotation, rotatePreset.spring ?? {
    stiffness: 100,
    damping: 30,
    mass: 1,
  })

  const [currentRotation, setCurrentRotation] = useState(0)

  useEffect(() => {
    const target = getTargetRotation(activeIndex, projects.length)
    rotation.set(target)
  }, [activeIndex, projects.length, rotation])

  useEffect(() => {
    const unsubscribe = springRotation.on('change', (latest) => {
      setCurrentRotation(latest)
      onRotationChange(latest)
    })
    return () => unsubscribe()
  }, [springRotation, onRotationChange])

  const groupScale = isExpanded
    ? cylinder.expanded.groupScale * tabScale
    : tabScale

  const transformValues = useMemo(() => {
    if (projects.length === 0) return []
    return projects.map((_, index) => {
      const z = calculateCylinderZ(
        index,
        projects.length,
        responsiveRadius,
        currentRotation
      )
      return {
        x: calculateCylinderX(
          index,
          projects.length,
          responsiveHorizontalRadius,
          currentRotation
        ),
        z,
        scale: calculateDepthScale(
          z,
          responsiveRadius,
          1,
          cylinder.depth.scaleRange
        ),
        opacity: calculateAngularDistanceOpacity(
          index,
          projects.length,
          currentRotation,
          cylinder.opacity.active,
          cylinder.opacity.min,
          cylinder.opacity.falloffPerStep
        ),
      }
    })
  }, [
    projects,
    currentRotation,
    responsiveRadius,
    responsiveHorizontalRadius,
    cylinder.depth,
    cylinder.opacity,
  ])

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center"
      style={{
        perspective: cylinder.perspective,
        perspectiveOrigin: '50% 50%',
        zIndex: 10,
        overflow: 'visible',
      }}
      animate={{
        y: isExpanded ? cylinder.expanded.translateY : 0,
        opacity: 1,
      }}
      transition={expandTransition}
    >
      <motion.div
        key={groupKey}
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          width: 0,
          height: 0,
          transform: `scale(${groupScale})`,
        }}
      >
        {projects.map((project, index) => {
          const values = transformValues[index]
          if (!values) return null
          const isActive = index === activeIndex

          return (
            <div
              key={`${groupKey}-${project.id}`}
              className="absolute"
              style={{
                left: 0,
                top: 0,
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.div
                style={{
                  transform: `translate3d(calc(-50% + ${values.x}px), -50%, ${values.z}px)`,
                  opacity: isExiting ? undefined : values.opacity,
                }}
                animate={
                  isExiting
                    ? { opacity: 0 }
                    : cylinder.opacity.transitionDuration > 0
                      ? { opacity: values.opacity }
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
                  onSelect={() => {
                    if (index === activeIndex) onSelectActive()
                    else onSelect(index)
                  }}
                />
              </motion.div>
            </div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
