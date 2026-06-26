'use client'

import { motion } from 'framer-motion'
import { resolveAnimation } from '@/lib/config/resolveAnimation'
import { getMotionTransition } from '@/lib/animations/resolveMotion'
import type { CylinderConfig } from '@/lib/types/cylinder'
import type { SceneFloorConfig } from '@/lib/types/scene'
import type { ResolvedTheme } from '@/lib/types/theme'

interface FloorLayerProps {
  floor: SceneFloorConfig
  cylinder: CylinderConfig
  resolvedTheme: ResolvedTheme
  isExpanded: boolean
}

export function FloorLayer({
  floor,
  cylinder,
  resolvedTheme,
  isExpanded,
}: FloorLayerProps) {
  const expandPreset = resolveAnimation('expandCollapse')
  const transition = getMotionTransition(expandPreset)

  return (
    <motion.div
      aria-hidden
      className="absolute left-0 right-0 pointer-events-none"
      style={{
        bottom: 0,
        zIndex: 1,
        background: resolvedTheme.floor.gradient,
        WebkitMaskImage: isExpanded
          ? floor.expandedMask
          : floor.collapsedMask,
        maskImage: isExpanded ? floor.expandedMask : floor.collapsedMask,
      }}
      animate={{
        top: isExpanded
          ? `calc(${floor.top} - ${Math.abs(cylinder.expanded.translateY)}px)`
          : floor.top,
        height: isExpanded
          ? `calc(${floor.height} + 200px)`
          : floor.height,
        opacity: isExpanded ? cylinder.expanded.floorOpacity : 1,
      }}
      transition={transition}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${floor.surfaceShine.from} 0%, ${floor.surfaceShine.mid} 50%, ${floor.surfaceShine.to} 100%)`,
          backdropFilter: `blur(${floor.blur}px)`,
        }}
      />
    </motion.div>
  )
}
