'use client'

import { motion } from 'framer-motion'
import { resolveAnimation } from '@/lib/config/resolveAnimation'
import { getMotionTransition } from '@/lib/animations/resolveMotion'
import type { CylinderConfig } from '@/lib/types/cylinder'
import type { ResolvedScene } from '@/lib/types/scene'
import type { ResolvedTheme } from '@/lib/types/theme'
import { FogCanvas } from './FogCanvas'
import { FloorLayer } from './FloorLayer'

interface SceneProps {
  scene: ResolvedScene
  cylinder: CylinderConfig
  resolvedTheme: ResolvedTheme
  isExpanded: boolean
}

export function Scene({
  scene,
  cylinder,
  resolvedTheme,
  isExpanded,
}: SceneProps) {
  const fogEntrance = resolveAnimation('fogEntrance')
  const fogTransition = getMotionTransition(fogEntrance)

  return (
    <>
      {scene.layers.map((layer) => {
        if (layer.type === 'fog') {
          return (
            <motion.div
              key="fog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={fogTransition}
              style={{ position: 'absolute', inset: 0, zIndex: layer.zIndex }}
            >
              <FogCanvas fog={scene.fog} resolvedTheme={resolvedTheme} />
            </motion.div>
          )
        }

        if (layer.type === 'floor') {
          return (
            <FloorLayer
              key="floor"
              floor={scene.floor}
              cylinder={cylinder}
              resolvedTheme={resolvedTheme}
              isExpanded={isExpanded}
            />
          )
        }

        return null
      })}
    </>
  )
}
